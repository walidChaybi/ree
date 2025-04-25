import { RECEContextData } from "@core/contexts/RECEContext";
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  URL_MES_REQUETES_CREATION,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import { getLibelle } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { useContext, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
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

const RETOUR_RECHERCHE_REQUETE = getLibelle("Retour recherche requête");
const RETOUR_MES_REQUETES_CREATION = getLibelle("Retour mes requêtes de création");
const RETOUR_REQUETES_SERVICE_CREATION = getLibelle("Retour requêtes de création de mon service");
const RETOUR_SUIVI_DOSSIER = getLibelle("Retour apercu suivi dossier");
const ERREUR_REGISTRE_NON_OUVERT = getLibelle("Le registre n'est pas ouvert. Vous ne pouvez pas signer l'acte.");
const ERREUR_DONNEES_MODIFIEES_FORMULAIRE = getLibelle(
  'Des données ont été modifiées. Veuillez cliquer sur le bouton "Actualiser et Visualiser".'
);

export const BoutonsApercuRequeteCreationEtablissement: React.FC<BoutonsApercuRequeteCreationEtablissementProps> = props => {
  const { idRequeteParam, idSuiviDossierParam } = useParams<TUuidSuiviDossierParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const estPresentBoutonPriseEnCharge = autorisePrendreEnChargeDepuisPageCreation(utilisateurConnecte, props.requete);

  const estProjetActeASigner = props.avancement && AvancementProjetActe.estActeASigner(props.avancement);

  const estBoutonSignatureDesactive = !props.estRegistreOuvert || props.estFormulaireModifie;

  const boutonRetour = useMemo(() => {
    const pathname = location.pathname;
    const bouton = {
      libelle: RETOUR_RECHERCHE_REQUETE,
      url: URL_RECHERCHE_REQUETE
    };
    if (pathname.includes(PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET)) {
      bouton.libelle = RETOUR_SUIVI_DOSSIER;
      bouton.url = `${getUrlPrecedente(location.pathname)}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/${props.requete.id}`;
    } else if (pathname.startsWith(URL_MES_REQUETES_CREATION)) {
      bouton.libelle = RETOUR_MES_REQUETES_CREATION;
      bouton.url = URL_MES_REQUETES_CREATION;
    } else if (pathname.startsWith(URL_REQUETES_CREATION_SERVICE)) {
      bouton.libelle = RETOUR_REQUETES_SERVICE_CREATION;
      bouton.url = URL_REQUETES_CREATION_SERVICE;
    }

    if (props.tousLesProjetsSontSignes) {
      bouton.libelle = RETOUR_MES_REQUETES_CREATION;
      bouton.url = URL_MES_REQUETES_CREATION;
    }

    return bouton;
  }, [location.pathname, props.requete.id, props.tousLesProjetsSontSignes]);

  function onClickBoutonRetour() {
    replaceUrl(navigate, boutonRetour.url);
  }

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
      <BoutonDoubleSubmit onClick={onClickBoutonRetour}>{boutonRetour.libelle}</BoutonDoubleSubmit>
      {estPresentBoutonPriseEnCharge && (
        <BoutonPrendreEnChargeCreation
          requete={props.requete}
          onClick={() =>
            // FIXME
            // navigate() ne doit pas être là, ce n'est pas cette fonction qui doit s'occuper de la redirection.
            // En retirant ce navigate() on observe une erreur de redirection de la part de useNavigationApercuCreationHook,
            // il faut corriger le problème à ce niveau !
            navigate(location.pathname.replace(PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE, PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER))
          }
        />
      )}

      {props.conditionAffichageBoutonsApercuActe && props.avancement && (
        <>
          <div>
            {AvancementProjetActe.estProjetCree(props.avancement) && (
              <BoutonDoubleSubmit
                title={getLibelle("Valider le projet d'acte")}
                onClick={() =>
                  props.validerProjetActe &&
                  idRequeteParam &&
                  idSuiviDossierParam &&
                  props.validerProjetActe(idRequeteParam, idSuiviDossierParam)
                }
              >
                {getLibelle("Valider le projet d'acte")}
              </BoutonDoubleSubmit>
            )}
            {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_SIGNER_ACTE_ETABLISSEMENT) &&
              AvancementProjetActe.estActeASigner(props.avancement) && (
                <BoutonDoubleSubmit
                  disabled={estBoutonSignatureDesactive}
                  title={getLibelle("SIGNER")}
                  onClick={ouvrePopinSignature}
                >
                  {getLibelle("SIGNER")}
                </BoutonDoubleSubmit>
              )}
          </div>
          {renderBlocInformatif()}
        </>
      )}
    </div>
  );
};
