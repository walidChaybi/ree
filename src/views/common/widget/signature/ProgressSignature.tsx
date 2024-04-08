import { Box, LinearProgress, Typography } from "@mui/material";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useCallback, useEffect } from "react";
import { DocumentsByRequete } from "./hook/SignatureDocumentHookUtilDelivrance";
import "./scss/PopinSignatureDelivrance.scss";

interface ProgressSignatureProps {
  onClose: (isOpen: boolean, hasErrors: boolean) => void;
  documentsByRequete: DocumentsByRequete;
  idsRequetesToSign: string[];
  error: boolean;
}

export const ProgressSignature: React.FC<ProgressSignatureProps> = ({
  onClose,
  documentsByRequete,
  idsRequetesToSign,
  error
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
      error === false &&
      getSignatureProgress() === totalPercentageToComplete
    ) {
      onClose(false, true);
    }
  }, [getSignatureProgress, onClose, error]);

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
      <Bouton
        onClick={() => {
          onClose(false, error !== true);
        }}
        disabled={
          getSignatureProgress() !== totalPercentageToComplete &&
          error === false
        }
        className={"CloseButtonSignature"}
      >
        {getLibelle("Fermer")}
      </Bouton>
    </>
  );
};
