import {
  getServicesAsOptions,
  listeUtilisateursToOptionsBis
} from "@composant/menuTransfert/MenuTransfertUtil";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { objetsRequeteInfoCommeOptions } from "@model/requete/enum/ObjetRequeteInfo";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequerantInformation } from "@model/requete/enum/TypeRequerantInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Button } from "@mui/material";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { storeRece } from "@util/storeRece";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import {
  OptionVide,
  SelectField
} from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import { useMemo } from "react";
import "../scss/FiltresServiceRequeteInformationForm.scss";

interface IFiltresServiceRequeteInformationFormProps {
  onSubmit: (values: IFiltresServiceRequeteInformationFormValues) => void;
}

export const VALEUR_FILTRE_INFORMATION_DEFAUT: IFiltresServiceRequeteInformationFormValues =
  {
    sousType: "",
    objet: "",
    agent: { cle: "", libelle: "" },
    service: { cle: "", libelle: "" },
    typeRequerant: "",
    statut: ""
  };

const FiltresServiceRequeteInformationForm: React.FC<
  IFiltresServiceRequeteInformationFormProps
> = ({ onSubmit }) => {
  const onSubmitFiltres = (
    values: IFiltresServiceRequeteInformationFormValues
  ) => {
    if (values) {
      onSubmit(values);
    }
  };

  const idUtilisateur = useMemo(
    () => storeRece.utilisateurCourant?.idUtilisateur,
    []
  );

  const sousTypeInformationOptions: Options = useMemo(
    () => SousTypeInformation.getAllEnumsAsOptions(),
    []
  );

  const statutRequeteOptions: Options = useMemo(
    () =>
      StatutRequete.getOptionsAPartirTypeRequete(
        TypeRequete.INFORMATION
      ).filter(
        statutRequete =>
          ![
            StatutRequete.TRAITEE_AUTO.nom,
            StatutRequete.TRAITE_REPONDU.nom
          ].includes(statutRequete.cle)
      ),
    []
  );

  const objetRequeteOptions: Options = useMemo(
    () => objetsRequeteInfoCommeOptions(),
    []
  );

  const typeRequerantOptions: Options = useMemo(
    () => TypeRequerantInformation.getAllEnumsAsOptions(),
    []
  );

  return (
    <Formik
      initialValues={VALEUR_FILTRE_INFORMATION_DEFAUT}
      onSubmit={onSubmitFiltres}
    >
      {({ values, handleReset, handleSubmit }) => (
        <div className="filtre-service-information">
          <SelectField
            name="sousType"
            label={getLibelle("Sous-Type")}
            options={sousTypeInformationOptions}
            optionVide={OptionVide.NON_SELECTIONNABLE}
          />
          <SelectField
            name="objet"
            label={getLibelle("Objet")}
            options={objetRequeteOptions}
            optionVide={OptionVide.NON_SELECTIONNABLE}
          />
          <ChampRechercheField
            componentName="filtreAttribuerAAgent"
            name="agent"
            label={getLibelle("Attribué à un agent")}
            options={listeUtilisateursToOptionsBis(
              TypeRequete.INFORMATION,
              SousTypeInformation.getEnumFor(values.sousType),
              idUtilisateur ?? "",
              false
            )}
          />
          <ChampRechercheField
            componentName="filtreAttribuerAuService"
            name="service"
            label={getLibelle("Attribué à un service")}
            options={getServicesAsOptions()}
          />
          <SelectField
            name="statut"
            optionVide={OptionVide.NON_SELECTIONNABLE}
            label={getLibelle("Statut")}
            options={statutRequeteOptions}
          />
          <SelectField
            name="typeRequerant"
            label={getLibelle("Type requérant")}
            options={typeRequerantOptions}
          />
          <Button
            type="submit"
            onClick={() => handleReset()}
            data-testid="resetBouton"
          >
            <FontAwesomeIcon
              size="sm"
              className="actionButton"
              icon={faCircleXmark}
            />
          </Button>
          <Button onClick={() => handleSubmit()} data-testid="loupeBouton">
            <FontAwesomeIcon
              size="sm"
              className="actionButton"
              icon={faSearch}
            />
          </Button>
        </div>
      )}
    </Formik>
  );
};

export default FiltresServiceRequeteInformationForm;