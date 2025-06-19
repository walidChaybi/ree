import { getServicesAsOptions, listeUtilisateursToOptionsBis } from "@composant/menuTransfert/MenuTransfertUtil";
import { RECEContextData } from "@core/contexts/RECEContext";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE,
  IFiltreServiceRequeteDelivranceFormValues
} from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Button from "@mui/material/Button";
import { getLibelle } from "@util/Utils";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import React, { useContext } from "react";
import "./scss/FiltreServiceRequeteDelivranceForm.scss";

// TOREFACTO à couvrir (ignoré le 28/11/24)
/* v8 ignore start */
interface IFiltreServiceRequeteDelivranceFormProps {
  onSubmit: (values: IFiltreServiceRequeteDelivranceFormValues) => void;
}

const FiltreServiceRequeteDelivranceFormDefaultValues: IFiltreServiceRequeteDelivranceFormValues = {
  sousType: "",
  provenance: "",
  attribueA: { cle: "", libelle: "" },
  attribueAuService: { cle: "", libelle: "" },
  statut: ""
};

export const FiltreServiceRequeteDelivranceForm: React.FC<IFiltreServiceRequeteDelivranceFormProps> = props => {
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);

  function onSubmitFiltresDelivrance(values: IFiltreServiceRequeteDelivranceFormValues) {
    if (values) {
      props.onSubmit(values);
    }
  }

  function onReset(reset: () => void) {
    reset();
  }

  return (
    <div className="FiltreServiceRequeteDelivranceForm">
      <Formik
        initialValues={FiltreServiceRequeteDelivranceFormDefaultValues}
        onSubmit={onSubmitFiltresDelivrance}
        validationSchema={undefined}
      >
        {({ values, handleReset }) => (
          <div className="container">
            <SelectField
              label={getLibelle("Sous-Type")}
              name="sousType"
              options={SousTypeDelivrance.getAllEnumsAsOptions()}
            />
            <SelectField
              name="provenance"
              label={getLibelle("Provenance")}
              options={Provenance.getAllEnumsAsOptions()}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAAgent"
              name="attribueA"
              label={getLibelle("Attribué à un agent")}
              options={listeUtilisateursToOptionsBis(
                TypeRequete.DELIVRANCE,
                SousTypeDelivrance.RDC,
                "",
                utilisateurConnecte,
                false,
                utilisateurs
              )}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAuService"
              name="attribueAuService"
              label={getLibelle("Attribué à un service")}
              options={getServicesAsOptions(utilisateurConnecte)}
            />
            <SelectField
              name="statut"
              label={getLibelle("Statut")}
              options={FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE}
            />
            <Button
              data-testid="loupeButton"
              type="submit"
              onClick={() => onSubmitFiltresDelivrance(values)}
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
/* v8 ignore start */
