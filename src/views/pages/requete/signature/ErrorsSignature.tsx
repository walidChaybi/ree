import React, { useCallback } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import "./sass/ErrorsSignature.scss";

interface ErrorsSignatureProps {
  errors: SignatureErrors[];
}

export interface SignatureErrors {
  code: string;
  libelle: string;
  detail: string;
}

export const ErrorsSignature: React.FC<ErrorsSignatureProps> = ({ errors }) => {
  const getErrorsDisplay = useCallback(() => {
    const errorsToDisplay: JSX.Element[] = [];

    errors.forEach((error) => {
      errorsToDisplay.push(
        <ListItem alignItems="flex-start" key={error.code}>
          <ListItemText
            className={"ErrorItem"}
            primary={error.libelle}
            secondary={<React.Fragment>{error.detail}</React.Fragment>}
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
