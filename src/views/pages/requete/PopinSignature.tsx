import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import {
  useUpdateDocumentApi,
  IQueryParameterUpdateDocument,
} from "./UpdateDocumentHook";
import { requestDocumentApi } from "./visualisation/document/DocumentRequeteHook";
import { GroupementDocument } from "../../../model/requete/GroupementDocument";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import { Button } from "reakit/Button";
import { ModeSignature } from "../../../model/requete/ModeSignature";

interface PopinSignatureProps {
  documentsToSign: DocumentToSign[];
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface DocumentToSign {
  infos: string;
  idDocumentDelivre: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
}

interface DocumentToSignOut {
  document: string;
  status: string;
  erreurs: string[];
}

export interface FormValues {
  pinCode?: number;
}

export const PopinSignature: React.FC<PopinSignatureProps> = ({
  documentsToSign,
  open,
  onClose,
}) => {
  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState,
  ] = React.useState<IQueryParameterUpdateDocument>();

  const [documentsToSignWating, setDocumentsToSignWating] = useState<
    DocumentToSign[]
  >(documentsToSign);

  const [pinCode, setPinCode] = React.useState<number>();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: FormValues) => {
      setPinCode(values.pinCode);
    },
  });

  useEffect(() => {
    if (documentsToSignWating.length > 0 && pinCode !== undefined) {
      requestDocumentApi(
        documentsToSignWating[0].idDocumentDelivre,
        GroupementDocument.DocumentDelivre,
        documentsToSignWating[0].mimeType
      ).then((result) => {
        const detail = {
          function: "SIGN",
          contenu: result.documentDelivre.contenu, // TODO supprimer
          direction: "to-webextension",
          conteneurSwift: result.documentDelivre.conteneurSwift, // TODO supprimer
          nom: result.documentDelivre.nom, // TODO supprimer
          document: result.documentDelivre.contenu,
          pin: pinCode,
          mode:
            process.env.NODE_ENV === "development"
              ? ModeSignature.Self
              : ModeSignature.Certigna,
          infos: documentsToSignWating[0].infos,
        };
        window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
      });
    }
  }, [documentsToSignWating, pinCode]);

  useEffect(() => {
    setDocumentsToSignWating(documentsToSign);
  }, [documentsToSign]);

  useEffect(() => {
    // Ajout du listener pour communiquer avec la webextension
    window.top.addEventListener(
      "signWebextResponse",
      handleBackFromWebExtension
    );

    return () => {
      window.top.removeEventListener(
        "signWebextResponse",
        handleBackFromWebExtension
      );
    };
  });

  useUpdateDocumentApi(updateDocumentQueryParamState);

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  const handleBackFromWebExtension = (event: Event): void => {
    const customEvent = event as CustomEvent;
    const result = customEvent.detail;

    if (result.direction && result.direction === "to-call-app") {
      if (result.hasTechnicalError || result.hasBusinessError) {
        // Do somthing
      } else {
        setUpdateDocumentQueryParamState({
          nom: result.nom,
          conteneurSwift: documentsToSignWating[0].conteneurSwift,
          contenu: result.contenu,
        });

        const newDocumentsToSign = [...documentsToSignWating];
        newDocumentsToSign.shift();
        setDocumentsToSignWating(newDocumentsToSign);
      }
    }
  };

  const getSignatureProgress = useCallback((): number => {
    return 100 - (documentsToSignWating.length * 100) / documentsToSign.length;
  }, [documentsToSignWating, documentsToSign]);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Signature des documents"}
        </DialogTitle>
        <DialogContent>
          {pinCode !== undefined ? (
            <>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={getSignatureProgress()}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${Math.round(getSignatureProgress())}%`}</Typography>
                </Box>
              </Box>
              <Button
                onClick={() => {
                  onClose(false);
                }}
                disabled={getSignatureProgress() !== 100}
              >
                Fermer
              </Button>
            </>
          ) : (
            <>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="pinCode"
                  name="pinCode"
                  label="Code pin"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  onChange={formik.handleChange}
                />
                <Button color="primary" type="submit" name={"validate"}>
                  Valider
                </Button>
                <Button onClick={() => onClose(false)}>Annuler</Button>
              </form>
            </>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
