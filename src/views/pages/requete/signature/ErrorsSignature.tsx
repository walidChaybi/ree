import React, { useCallback } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import "./sass/ErrorsSignature.scss";
import { getText } from "../../../common/widget/Text";

interface ErrorsSignatureProps {
  errors: SignatureErrors;
}

export interface SignatureErrors {
  numeroRequete: number;
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

    errors.erreurs.forEach((error) => {
      errorsToDisplay.push(
        <ListItem alignItems="flex-start" key={errors.numeroRequete}>
          <ListItemText
            className={"ErrorItem"}
            primary={`${getText("signature.titreErreur")}${
              errors.numeroRequete
            }`}
            secondary={
              <React.Fragment>
                {getText(`errors.pages.signature.${error.code}`)}
              </React.Fragment>
            }
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
