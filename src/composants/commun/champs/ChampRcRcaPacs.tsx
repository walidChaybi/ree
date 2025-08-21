import { memo } from "react";
import ChampsAnneeEtNumero, { IChampsAnneeEtNumeroProps } from "./ChampsAnneeEtNumero";

type TChampRcRcaPacsProps = Omit<IChampsAnneeEtNumeroProps, "caractereSeparateur" | "tailleMaxNumero" | "texteDevantChamps">;

const ChampRcRcaPacs: React.FC<TChampRcRcaPacsProps> = props => {
  return (
    <ChampsAnneeEtNumero
      tailleMaxNumero={5}
      caractereSeparateur="-"
      {...props}
    />
  );
};

export default memo(ChampRcRcaPacs);
