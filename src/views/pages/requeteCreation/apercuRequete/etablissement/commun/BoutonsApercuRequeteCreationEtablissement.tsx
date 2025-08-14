import { RECEContextData } from "@core/contexts/RECEContext";
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { BoutonChangerStatutRequete } from "../../../../../../composants/pages/requetesEtablissement/BoutonChangerStatutRequete";
import LiensRECE from "../../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER } from "../../../../../../router/infoPages/InfoPagesEspaceEtablissement";
import { BlocInformatif } from "../../../../../common/composant/BlocInformatif/BlocInformatif";
import { BoutonPrendreEnChargeCreation } from "./BoutonPrendreEnChargeCreation";
import "./scss/OngletsApercuCreationEtablissement.scss";

interface BoutonsApercuRequeteCreationEtablissementProps {
  requete: IRequeteCreationEtablissement;
  conditionAffichageBoutonsApercuActe?: boolean;
  avancement?: AvancementProjetActe;
  estRegistreOuvert?: boolean;
  estFormulaireModifie?: boolean;
  setEstOuvertPopinSignature?: React.Dispatch<React.SetStateAction<boolean>>;
  validerProjetActe?: (idRequeteParam: string, idSuiviDossier: string) => void;
  tousLesProjetsSontSignes?: boolean;
}

const ERREUR_REGISTRE_NON_OUVERT = "Le registre n'est pas ouvert. Vous ne pouvez pas signer l'acte.";
const ERREUR_DONNEES_MODIFIEES_FORMULAIRE = 'Des données ont été modifiées. Veuillez cliquer sur le bouton "Actualiser et Visualiser".';

export const BoutonsApercuRequeteCreationEtablissement: React.FC<BoutonsApercuRequeteCreationEtablissementProps> = props => {
  const { idRequeteParam, idSuiviDossierParam } = useParams<TUuidSuiviDossierParams>();
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const estPresentBoutonPriseEnCharge = autorisePrendreEnChargeDepuisPageCreation(utilisateurConnecte, props.requete);

  const estProjetActeASigner = props.avancement && AvancementProjetActe.estActeASigner(props.avancement);

  const estBoutonSignatureDesactive = !props.estRegistreOuvert || props.estFormulaireModifie;

  function ouvrePopinSignature() {
    if (props.setEstOuvertPopinSignature) {
      props.setEstOuvertPopinSignature(true);
    }
  }

  function getMessageErreur(): string {
    if (!props.estRegistreOuvert) {
      return ERREUR_REGISTRE_NON_OUVERT;
    } else if (props.estFormulaireModifie) {
      return ERREUR_DONNEES_MODIFIEES_FORMULAIRE;
    }
    return "";
  }

  function renderBlocInformatif() {
    if (estProjetActeASigner && estBoutonSignatureDesactive) {
      return <BlocInformatif texte={getMessageErreur()}></BlocInformatif>;
    }
    return undefined;
  }

  return (
    <div className="BoutonsApercu">
      <BoutonDoubleSubmit onClick={() => navigate(LiensRECE.retourArriere(), { replace: true })}>{"Retour"}</BoutonDoubleSubmit>
      {estPresentBoutonPriseEnCharge && (
        <BoutonPrendreEnChargeCreation
          requete={props.requete}
          onClick={() =>
            // FIXME
            // navigate() ne doit pas être là, ce n'est pas cette fonction qui doit s'occuper de la redirection.
            // En retirant ce navigate() on observe une erreur de redirection de la part de useNavigationApercuCreationHook,
            // il faut corriger le problème à ce niveau !
            navigate(
              LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.url, { idRequeteParam: idRequeteParam ?? "" })
            )
          }
        />
      )}

      <BoutonChangerStatutRequete idRequete={props.requete.id} />

      {props.conditionAffichageBoutonsApercuActe && props.avancement && (
        <>
          <div>
            {AvancementProjetActe.estProjetCree(props.avancement) && (
              <BoutonDoubleSubmit
                title="Valider le projet d'acte"
                onClick={() =>
                  props.validerProjetActe &&
                  idRequeteParam &&
                  idSuiviDossierParam &&
                  props.validerProjetActe(idRequeteParam, idSuiviDossierParam)
                }
              >
                {"Valider le projet d'acte"}
              </BoutonDoubleSubmit>
            )}
            {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_SIGNER_ACTE_ETABLISSEMENT) &&
              AvancementProjetActe.estActeASigner(props.avancement) && (
                <BoutonDoubleSubmit
                  disabled={estBoutonSignatureDesactive}
                  title="SIGNER"
                  onClick={ouvrePopinSignature}
                >
                  {"SIGNER"}
                </BoutonDoubleSubmit>
              )}
          </div>
          {renderBlocInformatif()}
        </>
      )}
    </div>
  );
};
