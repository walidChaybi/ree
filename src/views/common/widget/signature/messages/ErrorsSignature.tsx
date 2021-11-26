import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useCallback } from "react";
import { logError } from "../../../util/LogManager";
import { getText } from "../../Text";
import "./scss/ErrorsSignature.scss";

interface ErrorsSignatureProps {
  errors: SignatureErrors;
}

export interface SignatureErrors {
  numeroRequete: string;
  erreurs: TypeErreur[];
}

export interface TypeErreur {
  code: string;
  libelle: string;
  detail: string;
}

export const ErrorsSignature: React.FC<ErrorsSignatureProps> = ({ errors }) => {
  const getErrorsDisplay = useCallback(() => {
    const errorsToDisplay: JSX.Element[] = [];

    errors.erreurs.forEach(error => {
      const errorText = getText(`errors.pages.signature.${error.code}`);
      logError({ error: errorText });
      errorsToDisplay.push(
        <ListItem alignItems="flex-start" key={errors.numeroRequete}>
          <ListItemText
            className={"ErrorItem"}
            primary={`${getText("signature.titreErreur")}${
              errors.numeroRequete
            }`}
            secondary={<React.Fragment>{errorText}</React.Fragment>}
          />
        </ListItem>
      );
      errorsToDisplay.push(
        <Divider component="li" key={`divider-${error.code}`} />
      );
    });
    return errorsToDisplay;
  }, [errors]);

  return <List>{getErrorsDisplay()}</List>;
};
