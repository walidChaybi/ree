import {
  getEntiteAsOptions,
  listeUtilisateursToOptionsBis
} from "@composant/menuTransfert/MenuTransfertUtil";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiltreEtRechercheFormValues } from "@hook/requete/creation/RequeteCreationApiHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TagPriorisation } from "@model/requete/enum/TagPriorisation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Button } from "@mui/material";
import { storeRece } from "@util/storeRece";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import React from "react";
import "./FiltreEtRechercheForm.scss";

export interface FiltreEtRechercheProps {
  onSubmit: (values: FiltreEtRechercheFormValues) => void;
}

export const FiltreEtRechercheDefaultValues: FiltreEtRechercheFormValues = {
  numeroRequete: "",
  sousType: "",
  priorisation: "",
  attribueA: { cle: "", libelle: "" },
  attribueAuService: { cle: "", libelle: "" },
  statut: ""
};

export const FiltreEtRechercheForm: React.FC<
  FiltreEtRechercheProps
> = props => {
  const idUtilisateur = storeRece.utilisateurCourant?.idUtilisateur;
  const optionsUtilisateurs = listeUtilisateursToOptionsBis(
    TypeRequete.CREATION,
    SousTypeCreation.RCEDXC,
    idUtilisateur || "",
    false
  );

  const filtreSousTypeCreation: Options =
    SousTypeCreation.getAllEnumsAsOptions();
  const filtrePriorisation: Options = TagPriorisation.getAllEnumsAsOptions();

  const filtreStatutRequete: Options =
    StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION);

  function onSubmitFiltresEtRecherche(values: FiltreEtRechercheFormValues) {
    if (values) {
      props.onSubmit(values);
    }
  }

  function onReset(reset: () => void) {
    reset();
    onSubmitFiltresEtRecherche(FiltreEtRechercheDefaultValues);
  }

  return (
    <div className="FiltreEtRechercheForm">
      <Formik
        initialValues={FiltreEtRechercheDefaultValues}
        onSubmit={values => onSubmitFiltresEtRecherche(values)}
        validationSchema={undefined}
      >
        {({ values, handleReset, handleSubmit }) => (
          <div className="container">
            <form onSubmit={handleSubmit}>
              <InputField
                data-testid="inputRechercheReqNatali"
                className="inputField"
                name="numeroRequete"
                label={getLibelle("Rechercher un dossier Natali")}
              />
            </form>
            <SelectField
              label={getLibelle("Sous-Type")}
              name="sousType"
              options={filtreSousTypeCreation}
              disabled={Boolean(values.numeroRequete)}
            />
            <SelectField
              name="priorisation"
              label={getLibelle("Priorisation")}
              options={filtrePriorisation}
              disabled={Boolean(values.numeroRequete)}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAAgent"
              name="attribueA"
              label={getLibelle("Attribué à un agent")}
              options={optionsUtilisateurs}
              disabled={Boolean(values.numeroRequete)}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAuService"
              name="attribueAuService"
              label={getLibelle("Attribué à un service")}
              options={getEntiteAsOptions()}
              disabled={Boolean(values.numeroRequete)}
            />
            <SelectField
              name="statut"
              label={getLibelle("Statut")}
              options={filtreStatutRequete}
              disabled={Boolean(values.numeroRequete)}
            />
            <Button
              data-testid="loupeButton"
              type="submit"
              onClick={() => onSubmitFiltresEtRecherche(values)}
              aria-label="submitButton"
            >
              <FontAwesomeIcon className="actionButton" icon={faSearch} />
            </Button>
            <Button
              data-testid="resetButton"
              onClick={() => onReset(handleReset)}
              aria-label="resetButton"
            >
              <FontAwesomeIcon className="actionButton" icon={faCircleXmark} />
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};
