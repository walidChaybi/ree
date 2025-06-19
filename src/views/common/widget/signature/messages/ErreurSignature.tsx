import { ITypeErreurSignature } from "@model/signature/ITypeErreurSignature";
import Divider from "@mui/material/Divider";
import { logError } from "@util/LogManager";
import React, { useCallback } from "react";
import "./scss/ErrorsSignature.scss";

interface ErreurSignatureProps {
  erreur: SignatureErreur;
}

export interface SignatureErreur {
  typeErreur: ITypeErreurSignature;
  numeroRequete?: string;
  complementInformationErreur?: string;
}

export const ErreurSignature: React.FC<ErreurSignatureProps> = ({ erreur }) => {
  const getErrorsDisplay = useCallback(() => {
    const texteErreur = erreur.typeErreur.libelle;
    logError({ error: texteErreur });
    return (
      <>
        <span className={"error-message"}>
          {erreur.complementInformationErreur}
          <p>{texteErreur}</p>
        </span>
        <Divider key={`divider-${erreur.typeErreur.code}`} />
      </>
    );
  }, [erreur]);

  return getErrorsDisplay();
};
