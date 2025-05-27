import { CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES } from "@api/configurations/etatCivil/acte/PatchComposerDocumentMentionsUlterieuresConfigApi";
import { CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER } from "@api/configurations/etatCivil/acte/PatchIntegrerDocumentMentionSigneConfigApi";
import { CONFIG_PATCH_COMPOSER_DOCUMENT_FINAL_PROJET_ACTE } from "@api/configurations/etatCivil/projetActe/PatchComposerDocumentFinalProjetActeConfigApi";
import { CONFIG_PATCH_INTEGRER_DOCUMENT_FINAL_PROJET_ACTE } from "@api/configurations/etatCivil/projetActe/PatchIntegrerDocumentFinalProjetActeConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION_APRES_SIGNATURE } from "@api/configurations/requete/creation/PatchStatutRequeteCreationApresSignatureConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjourConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TErreurApi } from "@model/api/Api";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useContext, useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import Signature, { CODE_PIN_INVALIDE, IInformationsCarte } from "../../../utils/Signature";
import Bouton from "../bouton/Bouton";
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
  statut: TStatutSignature;
  codePin: string | null;
  erreurPin: boolean;
  erreur: string | null;
  informationsCarte: IInformationsCarte | null;
  documentASigner: string | null;
  documentSigne: string | null;
}

interface ISignatureCommunProps {
  idActe: string;
  idRequete: string;
  apresSignature: (succes: boolean) => void;
}

interface ISignatureMiseAJourProps extends ISignatureCommunProps {
  typeSignature: "MISE_A_JOUR";
  idSuivi?: never;
}

interface ISignatureCreationProps extends ISignatureCommunProps {
  typeSignature: "CREATION";
  idSuivi: string;
}

const DONNEES_SIGNATURE_DEFAUT: IDonneesSignature = {
  statut: "attente-pin",
  codePin: null,
  erreurPin: false,
  erreur: null,
  informationsCarte: null,
  documentASigner: null,
  documentSigne: null
};

const AVANCEMENT: { [EtatAvancement in Exclude<TStatutSignature, "attente-pin" | "termine">]: { niveau: number; message: string } } = {
  "recuperation-informations": { niveau: 0, message: "Récupération des informations de signature..." },
  "composition-document": { niveau: 33, message: "Génération du document à signer..." },
  "signature-document": { niveau: 66, message: "Signature du document..." },
  "enregistrement-document": { niveau: 100, message: "Enregistrement du document signé..." }
};

/* NOSONAR */ const SignatureDocument: React.FC<ISignatureMiseAJourProps | ISignatureCreationProps> = ({
  idActe,
  idRequete,
  apresSignature,
  typeSignature,
  idSuivi = null
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  const signature = useMemo(
    () => ({
      estMiseAJour: typeSignature === "MISE_A_JOUR",
      messageInformation: (() => {
        switch (typeSignature) {
          case "MISE_A_JOUR":
            return TypePopinSignature.getTextePopinSignatureMentions() ?? "";
          case "CREATION":
            return TypePopinSignature.getTextePopinSignatureActe() ?? "";
          default:
            return "";
        }
      })()
    }),
    [typeSignature]
  );

  const { appelApi: appelComposerMentions } = useFetchApi(CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES);
  const { appelApi: appelIntegrerMentions } = useFetchApi(CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER);
  const { appelApi: appelComposerProjetActe } = useFetchApi(CONFIG_PATCH_COMPOSER_DOCUMENT_FINAL_PROJET_ACTE);
  const { appelApi: appelIntegrerProjetActe } = useFetchApi(CONFIG_PATCH_INTEGRER_DOCUMENT_FINAL_PROJET_ACTE);
  const { appelApi: appelModifierStatutRequeteMiseAJour } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR, true);
  const { appelApi: appelModifierStatutRequeteCreation } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION_APRES_SIGNATURE);

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
              agent: { nom: utilisateurConnecte.nom, prenom: utilisateurConnecte.prenom },
              estMiseAJour: signature.estMiseAJour
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
          (signature.estMiseAJour ? appelComposerMentions : appelComposerProjetActe)({
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
        console.info(`[SIGNATURE] Signature du document ...`);
        donneesSignature.codePin &&
          donneesSignature.documentASigner &&
          Signature.signerDocument({
            parametres: {
              idActe: idActe,
              document: donneesSignature.documentASigner,
              codePin: donneesSignature.codePin,
              estMiseAJour: signature.estMiseAJour
            },
            apresReponse: reponse => {
              const erreur = reponse.erreur?.libelle ?? null;
              const documentSigne = reponse.document ?? null;
              const messageErreur = !erreur && !documentSigne ? "Erreur inattendue" : erreur;
              messageErreur
                ? console.error(
                    `[SIGNATURE] Erreur lors de la signature du document : ${reponse.erreur?.code ?? "CODE_INCONNU"} - ${messageErreur} - ${reponse.erreur?.detail ?? "AUCUN DETAIL"}`
                  )
                : console.info(`[SIGNATURE] Signature du document éffectuée`);

              setDonneesSignature(prec => ({
                ...prec,
                documentASigner: null,
                documentSigne: documentSigne,
                erreur: messageErreur,
                informationsCarte: reponse.infosSignature ?? null,
                statut: documentSigne ? "enregistrement-document" : "termine"
              }));
            }
          });
        break;

      case "enregistrement-document":
        console.info("[SIGNATURE] Enregistrement du document signé ...");
        donneesSignature.documentSigne &&
          donneesSignature.informationsCarte &&
          (signature.estMiseAJour ? appelIntegrerMentions : appelIntegrerProjetActe)({
            parametres: {
              path: { idActe: idActe },
              body: {
                documentPadesBase64: donneesSignature.documentSigne,
                signature: { infosSignature: donneesSignature.informationsCarte },
                modeAuthentification: utilisateurConnecte.modeAuthentification
              }
            },
            apresSucces: () => {
              console.info("[SIGNATURE] Enregistrement du document signé éffectué");
              console.info("[SIGNATURE] Modification du statut de la requête ...");

              const apresModificationStatut = {
                apresSucces: () => console.info("[SIGNATURE] Modification du statut de la requête éffectué"),
                apresErreur: (erreurs: TErreurApi[]) =>
                  console.error(
                    `[SIGNATURE] Erreur lors de la modification du statut de la requête : ${erreurs[0]?.code ?? "CODE_INCONNU"} - ${erreurs[0]?.message ?? "Erreur inconnue"}`
                  ),
                finalement: () =>
                  setDonneesSignature(prec => ({
                    ...prec,
                    statut: "termine"
                  }))
              };

              switch (true) {
                case signature.estMiseAJour:
                  appelModifierStatutRequeteMiseAJour({
                    parametres: { path: { idRequete: idRequete, statut: StatutRequete.TRAITEE_MIS_A_JOUR.nom } },
                    ...apresModificationStatut
                  });

                  return;

                case Boolean(idSuivi?.length):
                  appelModifierStatutRequeteCreation({
                    parametres: { path: { idRequete: idRequete, idSuiviDossier: idSuivi ?? "" } },
                    ...apresModificationStatut
                  });

                  return;

                default:
                  console.error("[SIGNATURE] Erreur lors de la modification du statut de la requête : ID Suivi inconnu");
                  setDonneesSignature(prec => ({
                    ...prec,
                    statut: "termine"
                  }));

                  return;
              }
            },
            apresErreur: erreurs => {
              const messageErreurServeur = ["FCT_16108", "TECH_16021"].includes(erreurs[0]?.code) ? erreurs[0]?.message : null;
              const messageErreurDefaut = `Erreur lors de l'enregistrement ${signature.estMiseAJour ? "des mentions signées" : "de l'acte signé"} `;
              console.error(
                `[SIGNATURE] ${messageErreurDefaut} : ${erreurs[0]?.code ?? "CODE_INCONNU"} - ${erreurs[0]?.message ?? "Erreur inconnue"}`
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

  switch (donneesSignature.statut) {
    case "attente-pin":
      return (
        <>
          {signature.messageInformation && <div className="mb-4 text-start">{signature.messageInformation}</div>}

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
            fermerModale={() => {
              setDonneesSignature({ ...DONNEES_SIGNATURE_DEFAUT });
              apresSignature(false);
            }}
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
            styleBouton="principal"
            onClick={() => {
              setDonneesSignature({ ...DONNEES_SIGNATURE_DEFAUT });
              apresSignature(!donneesSignature.erreur);
            }}
          >
            {"Fermer"}
          </Bouton>
        </div>
      );
    default:
      return <></>;
  }
};

export default SignatureDocument;
