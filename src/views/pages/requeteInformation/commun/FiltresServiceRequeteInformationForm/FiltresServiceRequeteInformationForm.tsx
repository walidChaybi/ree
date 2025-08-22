import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { ObjetRequeteInfo, objetsRequeteInfoCommeOptions } from "@model/requete/enum/ObjetRequeteInfo";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequerantInformation } from "@model/requete/enum/TypeRequerantInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Button from "@mui/material/Button";
import { Options } from "@util/Type";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import { useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
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
    const listeServicesEtServicesFils = [utilisateurConnecte.idService].concat(utilisateurConnecte.idServicesFils);

    return utilisateurs
      .filter(utilisateur => listeServicesEtServicesFils.indexOf(utilisateur.idService) >= 0)
      .map(utilisateur => ({
        cle: utilisateur.id,
        libelle: utilisateur.prenomNom
      }))
      .sort((a, b) => a.libelle.localeCompare(b.libelle));
  }, []);

  const listeServices = useMemo(() => utilisateurConnecte.optionsServicesFils, []);

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
            aria-label="Réinitialiser"
          >
            <FaRegCircleXmark
              className="actionButton text-sm"
              aria-hidden
            />
          </Button>
          <Button
            type="submit"
            data-testid="loupeBouton"
            aria-label="Rechercher"
          >
            <FaSearch
              className="actionButton text-sm"
              aria-hidden
            />
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default FiltresServiceRequeteInformationForm;
