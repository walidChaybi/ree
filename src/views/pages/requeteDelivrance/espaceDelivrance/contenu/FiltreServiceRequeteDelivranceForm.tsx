import {
  getEntiteAsOptions,
  listeUtilisateursToOptionsBis
} from "@composant/menuTransfert/MenuTransfertUtil";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE,
  IFiltreServiceRequeteDelivranceFormValues
} from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Button } from "@mui/material";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import React from "react";
import "./scss/FiltreServiceRequeteDelivranceForm.scss";

export interface IFiltreServiceRequeteDelivranceFormProps {
  onSubmit: (values: IFiltreServiceRequeteDelivranceFormValues) => void;
}

export const FiltreServiceRequeteDelivranceFormDefaultValues: IFiltreServiceRequeteDelivranceFormValues =
  {
    sousType: "",
    provenance: "",
    attribueA: { cle: "", libelle: "" },
    attribueAuService: { cle: "", libelle: "" },
    statut: ""
  };

export const FiltreServiceRequeteDelivranceForm: React.FC<
  IFiltreServiceRequeteDelivranceFormProps
> = props => {
  function onSubmitFiltresDelivrance(
    values: IFiltreServiceRequeteDelivranceFormValues
  ) {
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
                storeRece.utilisateurCourant?.idUtilisateur || "",
                false
              )}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAuService"
              name="attribueAuService"
              label={getLibelle("Attribué à un service")}
              options={getEntiteAsOptions()}
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
