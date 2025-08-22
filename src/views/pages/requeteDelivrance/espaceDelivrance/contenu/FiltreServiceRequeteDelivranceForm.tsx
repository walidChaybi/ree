import { listeUtilisateursToOptionsBis } from "@composant/menuTransfert/MenuTransfertUtil";
import {
  FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE,
  IFiltreServiceRequeteDelivranceFormValues
} from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Button from "@mui/material/Button";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { Formik } from "formik";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
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
              label={"Sous-Type"}
              name="sousType"
              options={SousTypeDelivrance.getAllEnumsAsOptions()}
            />
            <SelectField
              name="provenance"
              label={"Provenance"}
              options={Provenance.getAllEnumsAsOptions()}
            />
            <ChampRechercheField
              componentName="filtreAttribuerAAgent"
              name="attribueA"
              label={"Attribué à un agent"}
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
              label={"Attribué à un service"}
              options={utilisateurConnecte.optionsServicesFils}
            />
            <SelectField
              name="statut"
              label={"Statut"}
              options={FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE}
            />
            <Button
              data-testid="loupeButton"
              type="submit"
              onClick={() => onSubmitFiltresDelivrance(values)}
              aria-label="Rechercher"
            >
              <FaSearch
                className="actionButton"
                aria-hidden
              />
            </Button>
            <Button
              data-testid="resetButton"
              onClick={() => onReset(handleReset)}
              aria-label="Réinitialiser"
            >
              <FaCircleXmark
                className="actionButton"
                aria-hidden
              />
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};
/* v8 ignore start */
