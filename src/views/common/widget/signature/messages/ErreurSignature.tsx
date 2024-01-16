import { ITypeErreurSignature } from "@model/signature/ITypeErreurSignature";
import { Divider } from "@mui/material";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
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
          {getLibelle(erreur.complementInformationErreur)}
          <p>{texteErreur}</p>
        </span>
        <Divider key={`divider-${erreur.typeErreur.code}`} />
      </>
    );
  }, [erreur]);

  return getErrorsDisplay();
};
