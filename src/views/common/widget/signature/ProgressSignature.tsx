import React, { useCallback, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@material-ui/core";
import { Button } from "reakit/Button";
import { getText } from "../../../common/widget/Text";
import "./sass/PopinSignature.scss";
import { DocumentsByRequete } from "./hook/SignatureDocumentHook";

interface ProgressSignature {
  onClose: (isOpen: boolean) => void;
  documentsByRequete: DocumentsByRequete;
  idsRequetesToSign: string[];
  errors: boolean;
}

export const ProgressSignature: React.FC<ProgressSignature> = ({
  onClose,
  documentsByRequete,
  idsRequetesToSign,
  errors
}) => {
  const totalPercentageToComplete = 100;
  const minWidthForProgressBar = 35;

  const getSignatureProgress = useCallback((): number => {
    const numberOfRequetes = Object.keys(documentsByRequete).length;
    return numberOfRequetes > 0
      ? totalPercentageToComplete -
          (idsRequetesToSign.length * totalPercentageToComplete) /
            numberOfRequetes
      : totalPercentageToComplete;
  }, [idsRequetesToSign, documentsByRequete]);

  useEffect(() => {
    if (
      getSignatureProgress() === totalPercentageToComplete &&
      errors === false
    ) {
      // Fermture automatique de la fenêtre si tout à été signé sans erreur
      onClose(false);
    }
  }, [getSignatureProgress, errors, onClose]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={getSignatureProgress()}
          />
        </Box>
        <Box minWidth={minWidthForProgressBar}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            getSignatureProgress()
          )}%`}</Typography>
        </Box>
      </Box>
      <Button
        onClick={() => {
          onClose(false);
        }}
        disabled={
          getSignatureProgress() !== totalPercentageToComplete &&
          errors === false
        }
        className={"CloseButtonSignature"}
      >
        {getText("signature.fermer")}
      </Button>
    </>
  );
};
