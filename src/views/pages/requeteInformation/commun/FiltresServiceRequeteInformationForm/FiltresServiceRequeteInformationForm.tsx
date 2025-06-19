import { getServicesAsOptions } from "@composant/menuTransfert/MenuTransfertUtil";
import { RECEContextData } from "@core/contexts/RECEContext";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { ObjetRequeteInfo, objetsRequeteInfoCommeOptions } from "@model/requete/enum/ObjetRequeteInfo";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequerantInformation } from "@model/requete/enum/TypeRequerantInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Button from "@mui/material/Button";
import { Options } from "@util/Type";
import { getValeurOuUndefined } from "@util/Utils";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import { useContext, useMemo } from "react";
import "../scss/FiltresServiceRequeteInformationForm.scss";

interface IFiltresServiceRequeteInformationFormProps {
  onSubmit: (values: IFiltresServiceRequeteInformationFormValues) => void;
}

export const VALEUR_FILTRE_INFORMATION_DEFAUT: IFiltresServiceRequeteInformationFormValues = {
  sousType: "",
  objet: "",
  agent: { cle: "", libelle: "" },
  service: { cle: "", libelle: "" },
  typeRequerant: "",
  statut: ""
};

const FiltresServiceRequeteInformationForm: React.FC<IFiltresServiceRequeteInformationFormProps> = ({ onSubmit }) => {
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);
  const sousTypeInformationOptions: Options = useMemo(() => SousTypeInformation.getAllEnumsAsOptions(), []);

  const statutRequeteOptions: Options = useMemo(
    () =>
      StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.INFORMATION).filter(
        statutRequete => ![StatutRequete.TRAITEE_AUTO.nom, StatutRequete.TRAITE_REPONDU.nom].includes(statutRequete.cle)
      ),
    []
  );

  const objetRequeteOptions: Options = useMemo(() => objetsRequeteInfoCommeOptions([ObjetRequeteInfo.COMPLETION_REQUETE_EN_COURS]), []);

  const typeRequerantOptions: Options = useMemo(() => TypeRequerantInformation.getAllEnumsAsOptions(), []);

  const listeAgents: Options = useMemo(() => {
    const listeServicesEtServicesFils = [utilisateurConnecte?.service]
      .concat(utilisateurConnecte?.servicesFils)
      .map(service => getValeurOuUndefined(service?.idService));
    return utilisateurs
      .filter(utilisateur => listeServicesEtServicesFils.indexOf(getValeurOuUndefined(utilisateur.service?.idService)) >= 0)
      .map(utilisateur => ({
        cle: utilisateur.idUtilisateur,
        libelle: `${utilisateur.nom} ${utilisateur.prenom}`
      }))
      .sort((a, b) => a.libelle.localeCompare(b.libelle));
  }, []);

  const listeServices = useMemo(() => getServicesAsOptions(utilisateurConnecte).sort((a, b) => a.libelle.localeCompare(b.libelle)), []);

  return (
    <Formik
      initialValues={VALEUR_FILTRE_INFORMATION_DEFAUT}
      onSubmit={onSubmit}
    >
      {({ handleReset, handleSubmit }) => (
        <form
          className="filtre-service-information"
          onSubmit={handleSubmit}
        >
          <SelectField
            name="sousType"
            label={"Sous-Type"}
            options={sousTypeInformationOptions}
            optionVide={OptionVide.NON_SELECTIONNABLE}
          />
          <SelectField
            name="objet"
            label={"Objet"}
            options={objetRequeteOptions}
            optionVide={OptionVide.NON_SELECTIONNABLE}
          />
          <ChampRechercheField
            componentName="filtreAttribuerAAgent"
            name="agent"
            label={"Attribué à un agent"}
            options={listeAgents}
          />
          <ChampRechercheField
            componentName="filtreAttribuerAuService"
            name="service"
            label={"Attribué à un service"}
            options={listeServices}
          />
          <SelectField
            name="statut"
            optionVide={OptionVide.NON_SELECTIONNABLE}
            label={"Statut"}
            options={statutRequeteOptions}
          />
          <SelectField
            name="typeRequerant"
            label={"Type requérant"}
            options={typeRequerantOptions}
          />
          <Button
            onClick={() => handleReset()}
            data-testid="resetBouton"
          >
            <FontAwesomeIcon
              size="sm"
              className="actionButton"
              icon={faCircleXmark}
            />
          </Button>
          <Button
            type="submit"
            data-testid="loupeBouton"
          >
            <FontAwesomeIcon
              size="sm"
              className="actionButton"
              icon={faSearch}
            />
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default FiltresServiceRequeteInformationForm;
