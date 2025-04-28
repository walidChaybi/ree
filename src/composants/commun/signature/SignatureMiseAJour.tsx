import { CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES } from "@api/configurations/etatCivil/acte/PatchComposerDocumentMentionsUlterieuresConfigApi";
import { CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER } from "@api/configurations/etatCivil/acte/PatchIntegrerDocumentMentionSigneConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjourConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { utilisateurADroit } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import Signature, { CODE_PIN_INVALIDE, IInformationsCarte } from "../../../utils/Signature";
import Bouton from "../bouton/Bouton";
import ConteneurModale from "../conteneurs/modale/ConteneurModale";
import CodePinForm from "./CodePinForm";
import InformationsDeveloppeur from "./InformationsDeveloppeur";

type TStatutSignature =
  | "attente-pin"
  | "recuperation-informations"
  | "composition-document"
  | "signature-document"
  | "enregistrement-document"
  | "termine";

interface IDonneesSignature {
  modaleOuverte: boolean;
  statut: TStatutSignature;
  codePin: string | null;
  erreurPin: boolean;
  erreur: string | null;
  informationsCarte: IInformationsCarte | null;
  documentASigner: string | null;
  documentSigne: string | null;
}

interface ISignatureMiseAJourProps {
  idActe: string;
  idRequete: string;
  peutSigner: boolean;
  apresSignature: () => void;
}

const DONNEES_SIGNATURE_DEFAUT: IDonneesSignature = {
  modaleOuverte: false,
  statut: "attente-pin",
  codePin: null,
  erreurPin: false,
  erreur: null,
  informationsCarte: null,
  documentASigner: null,
  documentSigne: null
};

const AVANCEMENT: { [cle: string]: { niveau: number; message: string } } = {
  "recuperation-informations": { niveau: 0, message: "Récupération des informations de signature..." },
  "composition-document": { niveau: 33, message: "Génération du document à signer..." },
  "signature-document": { niveau: 66, message: "Signature du document..." },
  "enregistrement-document": { niveau: 100, message: "Enregistrement du document signé..." }
};

/* NOSONAR */ const SignatureMiseAJour: React.FC<ISignatureMiseAJourProps> = ({ idActe, idRequete, peutSigner, apresSignature }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const aDroitSigner = useMemo(() => utilisateurADroit(Droit.SIGNER_MENTION, utilisateurConnecte), [utilisateurConnecte]);
  const messageInformation = useMemo(() => TypePopinSignature.getTextePopinSignatureMentions() ?? "", []);
  const { appelApi: appelComposerDocument } = useFetchApi(CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES);
  const { appelApi: appelIntegrerDocument } = useFetchApi(CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER);
  const { appelApi: appelModifierStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR, true);
  const [donneesSignature, setDonneesSignature] = useState<IDonneesSignature>({ ...DONNEES_SIGNATURE_DEFAUT });

  useEffect(() => {
    switch (donneesSignature.statut) {
      case "recuperation-informations":
        console.info("[SIGNATURE] Récupération des informations de la carte ...");
        donneesSignature.codePin &&
          Signature.recupererInformationsCarte({
            parametres: {
              idActe: idActe,
              codePin: donneesSignature.codePin,
              agent: { nom: utilisateurConnecte.nom, prenom: utilisateurConnecte.prenom }
            },
            apresSucces: informations => {
              console.info("[SIGNATURE] Récupération des informations de la carte éffectué");
              setDonneesSignature(prec => ({
                ...prec,
                informationsCarte: informations,
                statut: "composition-document"
              }));
            },
            apresErreur: erreur => {
              console.error(
                `[SIGNATURE] Erreur récupération des informations de la carte : ${erreur.code} - ${erreur.libelle} - ${erreur?.detail ?? "AUCUN DETAIL"}`
              );
              setDonneesSignature(prec => ({
                ...prec,
                erreur: erreur.libelle,
                erreurPin: erreur.code === CODE_PIN_INVALIDE,
                statut: erreur.code === CODE_PIN_INVALIDE ? "attente-pin" : "termine"
              }));
            }
          });
        break;

      case "composition-document":
        console.info("[SIGNATURE] Composition du document à signer ...");
        donneesSignature.informationsCarte &&
          appelComposerDocument({
            parametres: {
              path: { idActe: idActe },
              body: {
                infosSignature: donneesSignature.informationsCarte
              }
            },
            apresSucces: documentASigner => {
              console.info("[SIGNATURE] Composition du document à signer éffectué");
              setDonneesSignature(prec => ({
                ...prec,
                documentASigner: documentASigner,
                statut: "signature-document"
              }));
            },
            apresErreur: erreurs => {
              const messageErreurServeur = ["FCT_16108", "TECH_16021"].includes(erreurs[0]?.code) ? erreurs[0]?.message : null;
              const messageErreurDefaut = "Erreur lors de la composition du document à signer";
              console.error(
                `[SIGNATURE] ${messageErreurDefaut} : ${erreurs[0]?.code ?? "CODE_INCONNU"} - ${erreurs[0]?.message ?? "Erreur inconne"}`
              );

              setDonneesSignature(prec => ({
                ...prec,
                erreur: messageErreurServeur ?? messageErreurDefaut,
                statut: "termine"
              }));
            }
          });
        break;

      case "signature-document":
        console.info("[SIGNATURE] Signature des mentions ...");
        donneesSignature.codePin &&
          donneesSignature.documentASigner &&
          Signature.signerDocumentMiseAJour({
            parametres: {
              idActe: idActe,
              document: donneesSignature.documentASigner,
              codePin: donneesSignature.codePin
            },
            apresReponse: reponse => {
              const erreur = reponse.erreur?.libelle ?? null;
              const documentSigne = reponse.document ?? null;
              const informationsCarte = reponse.infosSignature ?? null;
              const messageErreur = !erreur && !documentSigne ? "Erreur inattendue" : erreur;
              messageErreur
                ? console.error(
                    `[SIGNATURE] Erreur lors de la signature des mentions : ${reponse.erreur?.code ?? "CODE_INCONNU"} - ${messageErreur} - ${reponse.erreur?.detail ?? "AUCUN DETAIL"}`
                  )
                : console.info("[SIGNATURE] Signature des mentions éffectuée");

              setDonneesSignature(prec => ({
                ...prec,
                documentASigner: null,
                documentSigne: documentSigne,
                erreur: messageErreur,
                informationsCarte: informationsCarte,
                statut: documentSigne ? "enregistrement-document" : "termine"
              }));
            }
          });
        break;

      case "enregistrement-document":
        console.info("[SIGNATURE] Enregistrement des mentions signés ...");
        donneesSignature.documentSigne &&
          donneesSignature.informationsCarte &&
          appelIntegrerDocument({
            parametres: {
              path: { idActe: idActe },
              body: {
                documentPadesBase64: donneesSignature.documentSigne,
                signature: { infosSignature: donneesSignature.informationsCarte },
                modeAuthentification: utilisateurConnecte.modeAuthentification
              }
            },
            apresSucces: () => {
              console.info("[SIGNATURE] Enregistrement des mentions signés éffectué");
              console.info("[SIGNATURE] Modification du statut de la requête ...");
              appelModifierStatutRequete({
                parametres: { path: { idRequete: idRequete, statut: StatutRequete.TRAITEE_MIS_A_JOUR.nom } },
                apresSucces: () => console.info("[SIGNATURE] Modification du statut de la requête éffectué"),
                apresErreur: erreurs =>
                  console.info(
                    `[SIGNATURE] Erreur lors de la modification du statut de la requête : ${erreurs[0]?.code ?? "CODE_INCONNU"} - ${erreurs[0]?.message ?? "Erreur inconnue"}`
                  ),
                finalement: () =>
                  setDonneesSignature(prec => ({
                    ...prec,
                    statut: "termine"
                  }))
              });
            },
            apresErreur: erreurs => {
              const messageErreurServeur = ["FCT_16108", "TECH_16021"].includes(erreurs[0]?.code) ? erreurs[0]?.message : null;
              const messageErreurDefaut = "Erreur lors de l'enregistrement des mentions signés";
              console.error(
                `[SIGNATURE] ${messageErreurDefaut} : ${erreurs[0]?.code ?? "CODE_INCONNU"} - ${erreurs[0]?.message ?? "Erreur inconne"}`
              );

              setDonneesSignature(prec => ({
                ...prec,
                erreur: messageErreurServeur ?? messageErreurDefaut,
                statut: "termine"
              }));
            }
          });
        break;
      default:
        break;
    }
  }, [donneesSignature.statut]);

  return aDroitSigner ? (
    <>
      <Bouton
        type="button"
        title="Terminer et signer"
        onClick={() => setDonneesSignature(prec => ({ ...prec, modaleOuverte: true }))}
        disabled={!peutSigner}
      >
        {"Terminer et signer"}
      </Bouton>

      {donneesSignature.modaleOuverte &&
        document.getElementById("conteneur-modale-signature") &&
        createPortal(
          <ConteneurModale>
            <div className="border-3 w-[34rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
              <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">{"Signature des mentions"}</h2>

              {(() => {
                switch (donneesSignature.statut) {
                  case "attente-pin":
                    return (
                      <>
                        {messageInformation && <div className="mb-4 text-start">{messageInformation}</div>}

                        <InformationsDeveloppeur />

                        <CodePinForm
                          onSubmit={codePin =>
                            setDonneesSignature(prec => ({
                              ...prec,
                              codePin: codePin,
                              erreurPin: false,
                              statut: "recuperation-informations"
                            }))
                          }
                          fermerModale={() => setDonneesSignature({ ...DONNEES_SIGNATURE_DEFAUT })}
                          erreurPin={donneesSignature.erreurPin}
                        />
                      </>
                    );

                  case "recuperation-informations":
                  case "composition-document":
                  case "signature-document":
                  case "enregistrement-document":
                    return (
                      <div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-solid border-gris">
                          <div
                            className="h-full bg-bleu"
                            style={{
                              width: `${AVANCEMENT[donneesSignature.statut].niveau}%`,
                              transition: "width .4s ease"
                            }}
                          ></div>
                        </div>

                        <div className="text-center">{AVANCEMENT[donneesSignature.statut].message}</div>

                        <div className="pt-4 text-center">
                          <CircularProgress size={30} />
                        </div>
                      </div>
                    );

                  case "termine":
                    return (
                      <div className="text-center">
                        {donneesSignature.erreur ? (
                          <>
                            <div className="font-bold text-rouge">{"⚠ Impossible d'effectuer la signature :"}</div>
                            <div className="text-rouge">{donneesSignature.erreur}</div>
                          </>
                        ) : (
                          <div>{"Signature des mentions effectuée."}</div>
                        )}
                        <Bouton
                          className="mt-6"
                          title="Fermer"
                          type="button"
                          styleBouton="principal"
                          onClick={() => {
                            setDonneesSignature({ ...DONNEES_SIGNATURE_DEFAUT });
                            !donneesSignature.erreur && apresSignature();
                          }}
                        >
                          {"Fermer"}
                        </Bouton>
                      </div>
                    );
                  default:
                    return <></>;
                }
              })()}
            </div>
          </ConteneurModale>,
          document.getElementById("conteneur-modale-signature") as HTMLElement
        )}
    </>
  ) : (
    <></>
  );
};

export default SignatureMiseAJour;
