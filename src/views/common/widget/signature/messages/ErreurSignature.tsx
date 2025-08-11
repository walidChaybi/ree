import { ITypeErreurSignature } from "@model/signature/ITypeErreurSignature";
import Divider from "@mui/material/Divider";
import React, { useCallback } from "react";
import AfficherMessage from "../../../../../utils/AfficherMessage";
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
    AfficherMessage.erreur(texteErreur);
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
