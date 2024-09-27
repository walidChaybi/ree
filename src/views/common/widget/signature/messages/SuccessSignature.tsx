import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getLibelle } from "@util/Utils";
import React, { useCallback } from "react";
import "./scss/SuccessSignature.scss";

interface SuccessSignatureProps {
  successes: SuccessSignatureType[];
}

export interface SuccessSignatureType {
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
            primary={getLibelle(
              `Le(s) document(s) de la requête n°${success.numeroRequete} a (ont) été signé(s) le ${success.date}`
            )}
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
