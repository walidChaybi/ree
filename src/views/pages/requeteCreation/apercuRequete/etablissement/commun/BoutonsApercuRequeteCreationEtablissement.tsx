import { RECEContext } from "@core/body/RECEContext";
import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_PRISE_EN_CHARGE,
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { useContext, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BlocInformatif } from "../../../../../common/composant/BlocInformatif/BlocInformatif";
import { BoutonPrendreEnChargeCreation } from "./BoutonPrendreEnChargeCreation";
import "./scss/OngletsApercuCreationEtablissement.scss";

interface BoutonsApercuCreationEtablissementProps {
  requete: IRequeteCreationEtablissement;
  conditionAffichageBoutonsApercuActe?: boolean;
  avancement?: AvancementProjetActe;
  estRegistreOuvert?: boolean;
  estFormulaireModifie?: boolean;
  setEstOuvertPopinSignature?: React.Dispatch<React.SetStateAction<boolean>>;
  validerProjetActe?: (idRequeteParam: string, idSuiviDossier: string) => void;
}

const RETOUR_RECHERCHE_REQUETE = getLibelle("Retour recherche requêtes");
const RETOUR_MES_REQUETE = getLibelle("Retour mes requêtes");
const RETOUR_REQUETE_SERVICE = getLibelle("Retour requêtes de service");
const RETOUR_PRISE_EN_CHARGE = getLibelle("Retour apercu prise en charge");
const ERREUR_REGISTRE_NON_OUVERT = getLibelle(
  "Le registre n'est pas ouvert. Vous ne pouvez pas signer l'acte."
);
const ERREUR_DONNEES_MODIFIEES_FORMULAIRE = getLibelle(
  'Des données ont été modifiées. Veuillez cliquer sur le bouton "Actualiser et Visualiser".'
);

export const BoutonsApercuCreationEtablissement: React.FC<
  BoutonsApercuCreationEtablissementProps
> = props => {
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<IUuidSuiviDossierParams>();
  const history = useHistory();
  const { rechargementPage } = useContext(RECEContext);

  const estPresentBoutonPriseEnCharge =
    autorisePrendreEnChargeDepuisPageCreation(props.requete);

  const estProjetActeASigner =
    props.avancement && AvancementProjetActe.estASigner(props.avancement);

  const estBoutonSignatureDesactive =
    !props.estRegistreOuvert || props.estFormulaireModifie;

  const boutonRetour = useMemo(() => {
    const pathname = history.location.pathname;
    const bouton = {
      libelle: RETOUR_RECHERCHE_REQUETE,
      url: URL_RECHERCHE_REQUETE
    };
    if (pathname.includes(PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET)) {
      bouton.libelle = RETOUR_PRISE_EN_CHARGE;
      bouton.url = `${getUrlPrecedente(
        history.location.pathname
      )}/${PATH_APERCU_REQ_ETABLISSEMENT_PRISE_EN_CHARGE}/${props.requete.id}`;
    } else if (pathname.startsWith(URL_MES_REQUETES_CREATION)) {
      bouton.libelle = RETOUR_MES_REQUETE;
      bouton.url = URL_MES_REQUETES_CREATION;
    } else if (pathname.startsWith(URL_REQUETES_CREATION_SERVICE)) {
      bouton.libelle = RETOUR_REQUETE_SERVICE;
      bouton.url = URL_REQUETES_CREATION_SERVICE;
    }
    return bouton;
  }, [history.location.pathname, props.requete.id]);

  function onClickBoutonRetour() {
    replaceUrl(history, boutonRetour.url);
  }

  function getMessageErreur(): string {
    if (!props.estRegistreOuvert) {
      return ERREUR_REGISTRE_NON_OUVERT;
    } else if (props.estFormulaireModifie) {
      return ERREUR_DONNEES_MODIFIEES_FORMULAIRE;
    }
    return "";
  }

  return (
    <div className="BoutonsApercu">
      <Bouton onClick={onClickBoutonRetour}>{boutonRetour.libelle}</Bouton>
      {estPresentBoutonPriseEnCharge && (
        <BoutonPrendreEnChargeCreation
          requete={props.requete}
          onClick={rechargementPage}
        />
      )}

      {props.conditionAffichageBoutonsApercuActe && props.avancement && (
        <>
          <div>
            {AvancementProjetActe.estProjetCree(props.avancement) && (
              <Bouton
                title={getLibelle("Valider le projet d'acte")}
                onClick={() =>
                  props.validerProjetActe &&
                  props.validerProjetActe(idRequeteParam, idSuiviDossierParam)
                }
              >
                {getLibelle("Valider le projet d'acte")}
              </Bouton>
            )}
            {gestionnaireFeatureFlag.estActif(
              FeatureFlag.FF_SIGNER_ACTE_ETABLISSEMENT
            ) &&
              AvancementProjetActe.estASigner(props.avancement) && (
                <Bouton
                  disabled={estBoutonSignatureDesactive}
                  title={getLibelle("SIGNER")}
                  onClick={() =>
                    props.setEstOuvertPopinSignature &&
                    props.setEstOuvertPopinSignature(true)
                  }
                >
                  {getLibelle("SIGNER")}
                </Bouton>
              )}
          </div>
          {estProjetActeASigner && estBoutonSignatureDesactive && (
            <BlocInformatif texte={getMessageErreur()}></BlocInformatif>
          )}
        </>
      )}
    </div>
  );
};
