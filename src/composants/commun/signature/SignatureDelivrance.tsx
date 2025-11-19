import { CONFIG_POST_RECUPERER_DOCUMENTS_REPONSES_A_SIGNER } from "@api/configurations/requete/documentsReponses/PostRecupererDocumentsReponsesASignerConfigApi";
import TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES from "@api/traitements/signature/TraitementEnregistrerDocumentsSignes";
import { Droit } from "@model/agent/enum/Droit";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import CircularProgress from "@mui/material/CircularProgress";
import {
  aucuneMentionsNationalite,
  getNaturesMentions
} from "@views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { useContext, useEffect, useMemo, useState } from "react";
import { RECEContextData } from "../../../contexts/RECEContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import useTraitementApi from "../../../hooks/api/TraitementApiHook";
import Signature, { CODES_ERREUR_BLOQUANTS, CODE_PIN_INVALIDE, IDocumentASigner, IDocumentSigne } from "../../../utils/Signature";
import Bouton from "../bouton/Bouton";
import PageChargeur from "../chargeurs/PageChargeur";
import ConteneurModale from "../conteneurs/modale/ConteneurModale";
import CodePinForm from "./CodePinForm";
import InformationsDeveloppeur from "./InformationsDeveloppeur";
import ListeErreursSignature from "./ListeErreursSignature";

interface ISignatureDelivranceProps {
  titreBouton: string;
  titreModale: string;
  numerosFonctionnel: string[];
  apreSignature?: (succes?: boolean) => void;
  donneesAvertissementsMentions?: { acte?: FicheActe; documents: IDocumentReponse[] } | null;
  chargerDocumentsAuClic?: boolean;
}

interface IInformationsSignature {
  modaleOuverte: boolean;
  statut: "attente-pin" | "en-cours" | "termine";
  avertissementsMentions: string[] | null;
  codePin: string | null;
  erreurPin: boolean;
  erreur: string | null;
  aSigner: IDocumentASigner[] | null;
  signes: IDocumentSigne[];
  total: number;
}

const INFORMATIONS_SIGNATURE_DEFAUT: IInformationsSignature = {
  modaleOuverte: false,
  statut: "attente-pin",
  avertissementsMentions: null,
  codePin: null,
  erreurPin: false,
  erreur: null,
  aSigner: null,
  signes: [],
  total: 0
};

const genererMessagesMentions = (acte?: FicheActe, documents?: IDocumentReponse[]): string[] | null => {
  const estActeACQouOP2ouOP3 = acte?.registre && ["OP2", "OP3", "ACQ"].includes(acte.registre.famille);
  const estActeNaissance = acte?.nature === "NAISSANCE";

  const messagesMentions =
    documents?.reduce((messages: string[], document) => {
      DocumentDelivrance.estExtraitAvecFilliation(document?.typeDocument) &&
        estActeACQouOP2ouOP3 &&
        estActeNaissance &&
        aucuneMentionsNationalite(
          document.mentionsRetirees?.map(mentionRetiree => mentionRetiree.idMention),
          acte?.mentions
        ) &&
        messages.push(`Aucune mention de nationalité n'a été cochée pour le document ${document.nom}`);

      DocumentDelivrance.estExtraitAvecOuSansFilliation(document?.typeDocument) &&
        NatureMention.ilExisteUneMentionInterdite(
          getNaturesMentions(
            document.mentionsRetirees?.map(mentionRetiree => mentionRetiree.idMention),
            acte?.mentions
          ),
          acte?.nature,
          DocumentDelivrance.depuisId(document.typeDocument)
        ) &&
        messages.push(`Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter pour le document ${document.nom}`);

      return messages;
    }, []) ?? [];

  return messagesMentions.length ? messagesMentions : null;
};

const SignatureDelivrance: React.FC<ISignatureDelivranceProps> = ({
  titreBouton,
  titreModale,
  numerosFonctionnel,
  apreSignature,
  donneesAvertissementsMentions,
  chargerDocumentsAuClic = false
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const aDroitSigner = useMemo(
    () => utilisateurConnecte.estHabilitePour({ leDroit: Droit.SIGNER_DELIVRANCE_DEMAT }),
    [utilisateurConnecte]
  );
  const [informationsSignature, setInformationsSignature] = useState<IInformationsSignature>({ ...INFORMATIONS_SIGNATURE_DEFAUT });
  const { appelApi: appelRecupererDocumentsReponses, enAttenteDeReponseApi: enRecuperationDocuments } = useFetchApi(
    CONFIG_POST_RECUPERER_DOCUMENTS_REPONSES_A_SIGNER
  );
  const { lancerTraitement: lancerTraitementEnregistrement } = useTraitementApi(TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES);

  useEffect(() => {
    if (!numerosFonctionnel.length) {
      setInformationsSignature({ ...INFORMATIONS_SIGNATURE_DEFAUT });

      return;
    }

    const peutChargerDocuments = chargerDocumentsAuClic
      ? informationsSignature.modaleOuverte && informationsSignature.aSigner === null
      : Boolean(
          numerosFonctionnel.filter(
            numeroFonctionnel =>
              !informationsSignature.aSigner?.find(documentASigner => documentASigner.numeroFonctionnel === numeroFonctionnel)
          ).length
        );

    if (!peutChargerDocuments) {
      return;
    }

    appelRecupererDocumentsReponses({
      parametres: { body: numerosFonctionnel },
      apresSucces: documents => {
        if (chargerDocumentsAuClic && !documents.length) {
          setInformationsSignature(prec => ({
            ...prec,
            statut: "termine",
            erreur: "Aucun document à signer"
          }));

          return;
        }

        documents.length &&
          setInformationsSignature(prec => ({
            ...prec,
            avertissementsMentions: donneesAvertissementsMentions
              ? genererMessagesMentions(donneesAvertissementsMentions.acte, donneesAvertissementsMentions.documents)
              : null,
            aSigner: documents,
            total: documents.length
          }));
      }
    });
  }, [numerosFonctionnel, informationsSignature.modaleOuverte]);

  useEffect(() => {
    if (informationsSignature.aSigner === null || !informationsSignature.codePin || informationsSignature.statut === "termine") {
      return;
    }

    if (informationsSignature.aSigner.length) {
      const listeDocumentsASigner = [...informationsSignature.aSigner];
      const documentASigner = listeDocumentsASigner.shift() as IDocumentASigner;
      Signature.signerDocumentDelivrance({
        parametres: {
          document: documentASigner,
          codePin: informationsSignature.codePin,
          idAgent: utilisateurConnecte.id
        },
        apresReponse: documentSigne => {
          switch (true) {
            case documentSigne.erreur?.code === CODE_PIN_INVALIDE:
              setInformationsSignature(prec => ({
                ...prec,
                statut: "attente-pin",
                erreurPin: true,
                codePin: null
              }));
              break;
            case CODES_ERREUR_BLOQUANTS.includes(documentSigne.erreur?.code ?? ""):
              setInformationsSignature(prec => ({
                ...prec,
                statut: "termine",
                erreur: documentSigne.erreur?.libelle ?? "Erreur inconnue",
                codePin: null
              }));
              break;
            default:
              setInformationsSignature(prec => ({
                ...prec,
                aSigner: listeDocumentsASigner,
                signes: [...prec.signes, documentSigne]
              }));
          }
        }
      });

      return;
    }

    const documentsAEnregistrer = informationsSignature.signes.filter(documentSigne => Boolean(documentSigne.contenu?.length));
    if (!documentsAEnregistrer.length) {
      setInformationsSignature(prec => ({
        ...prec,
        statut: "termine",
        erreur: "Aucun document n'a pu être signé"
      }));

      return;
    }

    lancerTraitementEnregistrement({
      parametres: { documentsSigne: documentsAEnregistrer },
      apresSucces: () =>
        setInformationsSignature(prec => ({
          ...prec,
          statut: "termine"
        })),
      apresErreur: () =>
        setInformationsSignature(prec => ({
          ...prec,
          statut: "termine",
          erreur: "Une erreur est survenue lors de l'enregistrement des documents"
        }))
    });
  }, [informationsSignature]);

  return (
    <>
      {chargerDocumentsAuClic && enRecuperationDocuments && <PageChargeur />}

      <Bouton
        type="button"
        title={titreBouton}
        onClick={() => setInformationsSignature(prec => ({ ...prec, modaleOuverte: true }))}
        disabled={!aDroitSigner || !(informationsSignature.total || chargerDocumentsAuClic) || enRecuperationDocuments}
      >
        {titreBouton}
      </Bouton>

      {aDroitSigner && !enRecuperationDocuments && informationsSignature.modaleOuverte && Boolean(informationsSignature.total) && (
        <ConteneurModale>
          <div className="border-3 w-[28rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
            <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">{titreModale}</h2>

            {informationsSignature.statut === "attente-pin" && (
              <>
                {informationsSignature.avertissementsMentions?.length ? (
                  <div className="text-start">
                    {informationsSignature.avertissementsMentions.map(message => (
                      <div key={message}>{message}</div>
                    ))}

                    <div className="mt-2 text-center">{"Voulez-vous continuer ?"}</div>

                    <div className="mt-6 flex justify-center gap-4">
                      <Bouton
                        title="Non"
                        type="button"
                        styleBouton="secondaire"
                        onClick={() =>
                          setInformationsSignature(prec => ({
                            ...prec,
                            modaleOuverte: false,
                            avertissementMentions: null,
                            codePin: null,
                            erreurPin: false,
                            statut: "attente-pin",
                            ...(chargerDocumentsAuClic ? { aSigner: null } : {})
                          }))
                        }
                      >
                        {"Non"}
                      </Bouton>

                      <Bouton
                        title="Oui"
                        type="button"
                        styleBouton="principal"
                        onClick={() => setInformationsSignature(prec => ({ ...prec, avertissementMentions: null }))}
                      >
                        {"Oui"}
                      </Bouton>
                    </div>
                  </div>
                ) : (
                  <>
                    <InformationsDeveloppeur />
                    <CodePinForm
                      onSubmit={codePin =>
                        setInformationsSignature(prec => ({
                          ...prec,
                          codePin: codePin,
                          erreurPin: false,
                          statut: "en-cours"
                        }))
                      }
                      fermerModale={() =>
                        setInformationsSignature(prec => ({
                          ...prec,
                          modaleOuverte: false,
                          codePin: null,
                          erreurPin: false,
                          statut: "attente-pin",
                          ...(chargerDocumentsAuClic ? { aSigner: null } : {})
                        }))
                      }
                      erreurPin={informationsSignature.erreurPin}
                    />
                  </>
                )}
              </>
            )}

            {informationsSignature.statut === "en-cours" && (
              <div>
                <div className="text-center">{`Documents signés : ${informationsSignature.signes.length}/${informationsSignature.total}`}</div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-solid border-gris">
                  <div
                    className="h-full bg-bleu"
                    style={{
                      width: `${(informationsSignature.signes.length * 100) / informationsSignature.total}%`,
                      transition: "width .4s ease"
                    }}
                  ></div>
                </div>
                {informationsSignature.signes.length === informationsSignature.total && (
                  <div className="text-center">{"Enregistrement des documents signés en cours ..."}</div>
                )}
                <div className="pt-4 text-center">
                  <CircularProgress size={30} />
                </div>
                {informationsSignature.signes.some(documentSigne => documentSigne.erreur) && (
                  <ListeErreursSignature documentsSignes={informationsSignature.signes} />
                )}
              </div>
            )}

            {informationsSignature.statut === "termine" && (
              <div className="text-center">
                {informationsSignature.erreur ? (
                  <>
                    <div className="font-bold text-rouge">{"⚠ Impossible d'effectuer la signature :"}</div>
                    <div className="text-rouge">{informationsSignature.erreur}</div>
                  </>
                ) : (
                  <>
                    <div>{"Signature des documents effectuée."}</div>
                    {informationsSignature.signes.some(documentSigne => documentSigne.erreur) && (
                      <ListeErreursSignature documentsSignes={informationsSignature.signes} />
                    )}
                  </>
                )}
                <Bouton
                  className="mt-6"
                  title="Fermer"
                  type="button"
                  styleBouton="principal"
                  onClick={() => {
                    setInformationsSignature(prec => ({
                      ...prec,
                      modaleOuverte: false,
                      codePin: null,
                      statut: "attente-pin",
                      erreur: null,
                      aSigner: null,
                      signes: [],
                      total: 0
                    }));
                    apreSignature?.(!informationsSignature.erreur);
                  }}
                >
                  {"Fermer"}
                </Bouton>
              </div>
            )}
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default SignatureDelivrance;
