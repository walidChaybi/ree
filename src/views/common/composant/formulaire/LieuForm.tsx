import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useMemo, useState } from "react";

export interface ILieuProps {
  lieu: JSX.Element;
  ville: JSX.Element;
  arrondissement: JSX.Element;
  departement: JSX.Element;
  region: JSX.Element;
  pays: JSX.Element;
}

interface ILieuFormProps {
  elements: ILieuProps;
  afficherArrondissement: boolean;
  afficherDepartement: boolean;
}
type LieuFormProps = ILieuFormProps & FormikComponentProps;

const LieuForm: React.FC<LieuFormProps> = props => {
  const valeurLieu = getValeur(props.elements.lieu);
  const valeurVille = getValeur(props.elements.ville);

  const [lieu, setLieu] = useState<EtrangerFrance>();

  useEffect(() => {
    setLieu(EtrangerFrance.getEnumFor(valeurLieu));
  }, [valeurLieu]);

  useEffect(() => {
    switch (lieu) {
      case EtrangerFrance.ETRANGER:
        viderChampPourEtranger();
        break;
      case EtrangerFrance.FRANCE:
        viderChampPourFrance();
        break;
      case EtrangerFrance.INCONNU:
        viderChampPourInconnu();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lieu, valeurVille]);

  const rendreComposantEnFonctionDuLieu = useMemo(() => {
    let formulaireLieu: JSX.Element = <></>;
    switch (lieu) {
      case EtrangerFrance.ETRANGER:
        formulaireLieu = getFormulaireLieuEtranger();
        break;
      case EtrangerFrance.FRANCE:
        formulaireLieu = getFormulaireLieuFrance();
        break;
      default:
        break;
    }

    return formulaireLieu;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lieu, props.afficherArrondissement, props.afficherDepartement]);

  function getFormulaireLieuEtranger(): JSX.Element {
    return (
      <>
        {props.elements.ville}
        {props.elements.region}
        {props.elements.pays}
      </>
    );
  }

  function getFormulaireLieuFrance(): JSX.Element {
    return (
      <>
        {props.elements.ville}
        {props.afficherArrondissement && props.elements.arrondissement}
        {props.afficherDepartement && props.elements.departement}
      </>
    );
  }

  function viderChampPourEtranger() {
    viderChamp(props.elements.arrondissement);
    viderChamp(props.elements.departement);
  }

  function viderChampPourFrance() {
    if (!props.afficherArrondissement) {
      viderChamp(props.elements.arrondissement);
    }
    if (!props.afficherDepartement) {
      viderChamp(props.elements.departement);
    }
    viderChamp(props.elements.region);
    viderChamp(props.elements.pays);
  }

  function viderChampPourInconnu() {
    viderChamp(props.elements.ville);
    viderChamp(props.elements.arrondissement);
    viderChamp(props.elements.departement);
    viderChamp(props.elements.region);
    viderChamp(props.elements.pays);
  }

  function viderChamp(champ: JSX.Element) {
    props.formik.setFieldValue(champ.props.name, "");
  }

  function getValeur(champ: JSX.Element): string {
    return props.formik.getFieldProps(champ.props.name).value;
  }

  return (
    <div className="LieuForm">
      {props.elements.lieu}
      {rendreComposantEnFonctionDuLieu}
    </div>
  );
};

export default connect<ILieuFormProps>(LieuForm);
