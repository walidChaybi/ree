import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import React, { useCallback } from "react";
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

interface MessageErreur {
  code: string;
  message: string;
}

const messagesErreur = [
  { code: "UPDATE_DOC", message: "Impossible de mettre à jour les documents" },
  { code: "TECH_1", message: "Erreur technique inconnue" },
  { code: "TECH_2", message: "Problème en chargeant la lib PKCS#11" },
  { code: "TECH_3", message: "Erreur technique en scannant les slots" },
  { code: "FONC_1", message: "Aucune carte RECE détectée" },
  {
    code: "FONC_2",
    message:
      "Votre carte est bloquée dans RECE, veuillez contacter votre administrateur"
  },
  { code: "FONC_3", message: "Code PIN invalide" },
  { code: "FONC_4", message: "Document à signer vide ou null" },
  { code: "FONC_5", message: "Le document n'est pas au format PDF" },
  { code: "FONC_6", message: "Mode de signature inconnu" },
  { code: "FONC_7", message: "Mode de signature vide ou null" },
  {
    code: "FONC_8",
    message: "Carte bloquée après trois tentatives erronées du code PIN"
  },
  { code: "FONC_9", message: "Requête json invalide" },
  { code: "FONC_10", message: "Document à signer trop gros (> 600 Kio)" },
  {
    code: "FONC_11",
    message: "Récupération des documents à signer impossible actuellement"
  },
  { code: "FONC_12", message: "Code PIN incorrect, votre carte est bloquée" },
  {
    code: "WEB_EXT1",
    message:
      "La signature électronique est actuellement indisponible ou n'est pas installée."
  }
] as MessageErreur[];

export const ErrorsSignature: React.FC<ErrorsSignatureProps> = ({ errors }) => {
  const getErrorsDisplay = useCallback(() => {
    const errorsToDisplay: JSX.Element[] = [];

    errors.erreurs.forEach(error => {
      const errorText = getTextErreur(error.code)?.message;
      logError({ error: errorText });
      errorsToDisplay.push(
        <ListItem alignItems="flex-start" key={errors.numeroRequete}>
          <ListItemText
            className={"ErrorItem"}
            primary={getLibelle(`Requête n°${errors.numeroRequete}`)}
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

function getTextErreur(code: string) {
  return messagesErreur.find((msg: MessageErreur) => msg.code === code);
}
