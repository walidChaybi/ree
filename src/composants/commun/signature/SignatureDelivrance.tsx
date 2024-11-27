import { CONFIG_POST_RECUPERER_DOCUMENTS_REPONSES_A_SIGNER } from "@api/configurations/requete/documentsReponses/PostRecupererDocumentsReponsesASignerConfigApi";
import TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES from "@api/traitements/signature/TraitementEnregistrerDocumentsSignes";
import { RECEContextData } from "@core/contexts/RECEContext";
import { utilisateurADroit } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { useContext, useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import useTraitementApi from "../../../hooks/api/TraitementApiHook";
import Signature, { CODES_ERREUR_BLOQUANTS, CODE_PIN_INVALIDE, IDocumentASigner, IDocumentSigne } from "../../../utils/Signature";
import Bouton from "../bouton/Bouton";
import ConteneurModale from "../conteneurs/modale/ConteneurModale";
import CodePinForm from "./CodePinForm";
import ListeErreursSignature from "./ListeErreursSignature";

interface IModaleSignatureDelivranceProps {
  titreBouton: string;
  titreModale: string;
  numerosFonctionnel: string[];
  apreSignature?: () => void;
}

interface IInformationsSignature {
  modaleOuverte: boolean;
  statut: "attente-pin" | "en-cours" | "termine";
  codePin: string | null;
  erreurPin: boolean;
  erreur: string | null;
  aSigner: IDocumentASigner[] | null;
  signes: IDocumentSigne[];
  total: number;
}

const SignatureDelivrance: React.FC<IModaleSignatureDelivranceProps> = ({
  titreBouton,
  titreModale,
  numerosFonctionnel,
  apreSignature
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const aDroitSigner = useMemo(() => utilisateurADroit(Droit.SIGNER_DELIVRANCE_DEMAT, utilisateurConnecte), [utilisateurConnecte]);
  const [informationsSignature, setInformationsSignature] = useState<IInformationsSignature>({
    modaleOuverte: false,
    statut: "attente-pin",
    codePin: null,
    erreurPin: false,
    erreur: null,
    aSigner: null,
    signes: [],
    total: 0
  });
  const { appelApi: appelRecupererDocumentsReponses } = useFetchApi(CONFIG_POST_RECUPERER_DOCUMENTS_REPONSES_A_SIGNER);
  const { lancerTraitement: lancerTraitementEnregistrement } = useTraitementApi(TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES);

  useEffect(() => {
    setInformationsSignature({
      modaleOuverte: false,
      statut: "attente-pin",
      codePin: null,
      erreurPin: false,
      erreur: null,
      aSigner: null,
      signes: [],
      total: 0
    });
    if (!numerosFonctionnel.length) {
      return;
    }

    appelRecupererDocumentsReponses({
      parametres: { body: numerosFonctionnel },
      apresSucces: documents =>
        documents.length &&
        setInformationsSignature(prec => ({
          ...prec,
          aSigner: documents,
          total: documents.length
        }))
    });
  }, [numerosFonctionnel]);

  useEffect(() => {
    if (informationsSignature.aSigner === null || !informationsSignature.codePin) {
      return;
    }

    if (informationsSignature.aSigner.length) {
      const listeDocumentsASigner = [...informationsSignature.aSigner];
      const documentASigner = listeDocumentsASigner.shift() as IDocumentASigner;
      Signature.signerDocumentDelivrance({
        parametres: {
          document: documentASigner,
          codePin: informationsSignature.codePin
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

    lancerTraitementEnregistrement({
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
      <Bouton
        type="button"
        title={titreBouton}
        onClick={() => setInformationsSignature(prec => ({ ...prec, modaleOuverte: true }))}
        styleBouton="principal"
        disabled={!informationsSignature.total || !aDroitSigner}
      >
        {titreBouton}
      </Bouton>
      {aDroitSigner && informationsSignature.modaleOuverte && Boolean(informationsSignature.total) && (
        <ConteneurModale>
          <div className="border-3 w-[28rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
            <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">{titreModale}</h2>

            {informationsSignature.statut === "attente-pin" && (
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
                    statut: "attente-pin"
                  }))
                }
                erreurPin={informationsSignature.erreurPin}
              />
            )}

            {informationsSignature.statut === "en-cours" && (
              <div>
                <div className="text-center">{`signature des documents : ${informationsSignature.signes.length}/${informationsSignature.total}`}</div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-solid border-gris">
                  <div
                    className="h-full bg-bleu"
                    style={{
                      width: `${(informationsSignature.signes.length * 100) / informationsSignature.total}%`,
                      transition: "width .4s ease"
                    }}
                  ></div>
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
                    <div className="text-rouge">{"Impossible d'effectuer la signature :"}</div>
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
                    apreSignature?.();
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
