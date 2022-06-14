import { connect, FormikProps, FormikValues } from "formik";
import React from "react";
import { TRequete } from "../../../../../../model/requete/IRequete";
import { getLibelle } from "../../../../../common/util/Utils";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { limitesTitulaires } from "../../SaisirRDCSCPage";
import IdentiteForm, { IdentiteSubFormProps } from "./IdentiteForm";
import "./scss/IdentiteForm.scss";

interface IdentitesFormProps {
  requete?: TRequete;
  titulaires: IdentiteSubFormProps[];
  maxTitulaires: number;
  onAjoutTitulaire: (formik: FormikProps<FormikValues>) => void;
  onRetraitTitulaire: (formik: FormikProps<FormikValues>) => void;
}

type BoutonTitulaireProps = {
  label: string;
  visible?: boolean;
  onClick: () => void;
} & JSX.IntrinsicElements["button"];

const BoutonTitulaire = ({
  label,
  visible = true,
  className,
  onClick
}: BoutonTitulaireProps) => (
  <>
    {visible && (
      <button
        aria-label={getLibelle(label)}
        type="button"
        className={className}
        onClick={onClick}
      >
        {getLibelle(label)}
      </button>
    )}
  </>
);

const IdentitesForm: React.FC<
  IdentitesFormProps & FormikComponentProps
> = props => {
  enum Labels {
    AJOUTER = `Ajouter un titulaire`,
    RETIRER = `Supprimer un titulaire`
  }

  return (
    <>
      {props.titulaires.map(titulaire => (
        <IdentiteForm
          key={titulaire.nom}
          requete={props.requete}
          {...titulaire}
        />
      ))}
      <BoutonTitulaire
        label={Labels.AJOUTER}
        visible={
          props.maxTitulaires > limitesTitulaires.MIN &&
          props.titulaires.length < props.maxTitulaires
        }
        onClick={() => props.onAjoutTitulaire(props.formik)}
      />
      <BoutonTitulaire
        label={Labels.RETIRER}
        className="BoutonDanger"
        visible={props.titulaires.length > limitesTitulaires.MIN}
        onClick={() => props.onRetraitTitulaire(props.formik)}
      />
    </>
  );
};

export default connect<IdentitesFormProps>(IdentitesForm);
