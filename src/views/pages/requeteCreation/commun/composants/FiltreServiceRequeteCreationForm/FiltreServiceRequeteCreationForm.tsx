import { listeUtilisateursToOptionsBis } from "@composant/menuTransfert/MenuTransfertUtil";
import { RECEContextData } from "@core/contexts/RECEContext";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFiltreServiceRequeteCreationFormValues } from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TagPriorisation } from "@model/requete/enum/TagPriorisation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Button from "@mui/material/Button";
import { Options } from "@util/Type";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import React, { useContext } from "react";
import "./FiltreServiceRequeteCreationForm.scss";

interface FiltreServiceRequeteCreationFormProps {
  onSubmit: (values: IFiltreServiceRequeteCreationFormValues) => void;
}

const FiltreServiceRequeteCreationFormDefaultValues: IFiltreServiceRequeteCreationFormValues = {
  numeroRequete: "",
  sousType: "",
  priorisation: "",
  attribueA: { cle: "", libelle: "" },
  attribueAuService: { cle: "", libelle: "" },
  statut: "",
  numeroDossierNational: ""
};

export const FiltreServiceRequeteCreationForm: React.FC<FiltreServiceRequeteCreationFormProps> = props => {
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);
  const optionsUtilisateurs = listeUtilisateursToOptionsBis(
    TypeRequete.CREATION,
    SousTypeCreation.RCEDXC,
    "",
    utilisateurConnecte,
    false,
    utilisateurs
  );

  const filtreSousTypeCreation: Options = SousTypeCreation.getAllEnumsAsOptions();
  const filtrePriorisation: Options = TagPriorisation.getAllEnumsAsOptions();

  const filtreStatutRequete: Options = StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION);

  function onSubmitFiltresEtRecherche(values: IFiltreServiceRequeteCreationFormValues) {
    if (values) {
      props.onSubmit(values);
    }
  }

  function onReset(reset: () => void) {
    reset();
  }

  return (
    <div className="FiltreServiceRequeteCreationForm">
      <Formik
        initialValues={FiltreServiceRequeteCreationFormDefaultValues}
        onSubmit={onSubmitFiltresEtRecherche}
        validationSchema={undefined}
      >
        {({ values, handleReset, handleSubmit }) => (
          <div className="container">
            <form onSubmit={handleSubmit}>
              <InputField
                data-testid="inputRechercheReqNatali"
                className="inputField"
                name="numeroDossierNational"
                label={"Rechercher un dossier Natali"}
              />
            </form>
            <SelectField
              label={"Sous-Type"}
              name="sousType"
              options={filtreSousTypeCreation}
              disabled={Boolean(values.numeroDossierNational)}
            />
            <SelectField
              name="priorisation"
              label={"Priorisation"}
              options={filtrePriorisation}
              disabled={Boolean(values.numeroDossierNational)}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAAgent"
              name="attribueA"
              label={"Attribué à un agent"}
              options={optionsUtilisateurs}
              disabled={Boolean(values.numeroDossierNational)}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAuService"
              name="attribueAuService"
              label={"Attribué à un service"}
              options={utilisateurConnecte.optionsServicesFils}
              disabled={Boolean(values.numeroDossierNational)}
            />
            <SelectField
              name="statut"
              label={"Statut"}
              options={filtreStatutRequete}
              disabled={Boolean(values.numeroDossierNational)}
            />
            <Button
              data-testid="loupeButton"
              type="submit"
              onClick={() => onSubmitFiltresEtRecherche(values)}
              aria-label="submitButton"
            >
              <FontAwesomeIcon
                className="actionButton"
                icon={faSearch}
              />
            </Button>
            <Button
              data-testid="resetButton"
              onClick={() => onReset(handleReset)}
              aria-label="resetButton"
            >
              <FontAwesomeIcon
                className="actionButton"
                icon={faCircleXmark}
              />
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};
