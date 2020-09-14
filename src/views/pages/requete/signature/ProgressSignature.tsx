import React, { useCallback } from "react";
import { LinearProgress, Box, Typography } from "@material-ui/core";
import { Button } from "reakit/Button";
import { getText } from "../../../common/widget/Text";
import "./sass/PopinSignature.scss";
import { DocumentsByRequete } from "./SignatureDocumentHook";

interface ProgressSignature {
  onClose: (isOpen: boolean, changePage: boolean) => void;
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

  const getSignatureProgress = useCallback((): number => {
    const numberOfRequetes = Object.keys(documentsByRequete).length;
    return numberOfRequetes > 0
      ? totalPercentageToComplete -
          (idsRequetesToSign.length * totalPercentageToComplete) /
            numberOfRequetes
      : totalPercentageToComplete;
  }, [idsRequetesToSign, documentsByRequete]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={getSignatureProgress()}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            getSignatureProgress()
          )}%`}</Typography>
        </Box>
      </Box>
      <Button
        onClick={() => {
          onClose(false, true);
        }}
        disabled={
          getSignatureProgress() !== totalPercentageToComplete ||
          errors === true
        }
        className={"CloseButtonSignature"}
      >
        {getText("signature.fermer")}
      </Button>
    </>
  );
};
