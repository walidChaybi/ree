import { memo } from "react";
import ChampsAnneeEtNumero, { IChampsAnneeEtNumeroProps } from "./ChampsAnneeEtNumero";

type TChampReferenceRECEProps = Omit<IChampsAnneeEtNumeroProps, "caractereSeparateur" | "tailleMaxNumero" | "texteDevantChamps">;

const ChampReferenceRECE: React.FC<TChampReferenceRECEProps> = props => {
  return (
    <ChampsAnneeEtNumero
      caractereSeparateur="."
      tailleMaxNumero={7}
      texteDevantChamps="RECE&nbsp;."
      {...props}
    />
  );
};

export default memo(ChampReferenceRECE);
