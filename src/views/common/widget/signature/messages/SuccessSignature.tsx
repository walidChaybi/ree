import React, { useCallback } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import "./sass/SuccessSignature.scss";
import { getText } from "../../Text";

interface SuccessSignatureProps {
  successes: SuccessSignatureType[];
}

export interface SuccessSignatureType {
  messageId: string;
  date: string;
  numeroRequete: string;
}

export const SuccessSignature: React.FC<SuccessSignatureProps> = ({
  successes
}) => {
  const getErrorsDisplay = useCallback(() => {
    const successesToDisplay: JSX.Element[] = [];

    successes.forEach(success => {
      successesToDisplay.push(
        <ListItem alignItems="flex-start" key={success.numeroRequete}>
          <ListItemText
            className={"SuccessItem"}
            primary={getText(success.messageId, [
              `${success.numeroRequete}`,
              success.date
            ])}
          />
        </ListItem>
      );
      successesToDisplay.push(
        <Divider component="li" key={`divider-${success.numeroRequete}`} />
      );
    });
    return successesToDisplay;
  }, [successes]);

  return <List>{getErrorsDisplay()}</List>;
};
