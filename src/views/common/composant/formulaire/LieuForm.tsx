import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useMemo, useState } from "react";

export interface ILieuProps {
  lieu: JSX.Element;
  ville: JSX.Element;
  arrondissement: JSX.Element;
  departement: JSX.Element;
  region?: JSX.Element;
  pays: JSX.Element;
}

interface ILieuFormProps {
  elements: ILieuProps;
  afficherArrondissement: boolean;
  afficherDepartement: boolean;
}
type LieuFormProps = ILieuFormProps & FormikComponentProps;

const LieuForm: React.FC<LieuFormProps> = props => {
  const getFormulaireLieuEtranger = (): JSX.Element => {
    return (
      <>
        {props.elements.ville}
        {props.elements.region}
        {props.elements.pays}
      </>
    );
  };

  const getFormulaireLieuFrance = (): JSX.Element => {
    return (
      <>
        {props.elements.ville}
        {props.afficherArrondissement && props.elements.arrondissement}
        {props.afficherDepartement && props.elements.departement}
      </>
    );
  };

  const getValeur = (champ: JSX.Element): string => {
    return props.formik.getFieldProps(champ?.props.name).value;
  };

  const reinitialiserErreurs = () => {
    for (const champ of Object.values(props.elements)) {
      props.formik.setFieldError(champ.props.name, undefined);
    }
  };
  const valeurLieu = getValeur(props.elements.lieu);

  const [lieu, setLieu] = useState<EtrangerFrance>();

  useEffect(() => {
    reinitialiserErreurs();
    setLieu(EtrangerFrance.getEnumFor(valeurLieu));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valeurLieu]);

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

  return (
    <div className="LieuForm">
      {props.elements.lieu}
      {rendreComposantEnFonctionDuLieu}
    </div>
  );
};

export default connect<ILieuFormProps>(LieuForm);
