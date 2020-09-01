import React, { useCallback } from "react";
import { LinearProgress, Box, Typography } from "@material-ui/core";
import { Button } from "reakit/Button";
import { getText } from "../../../common/widget/Text";
import { DocumentToSign } from "./PopinSignature";
import "./sass/PopinSignature.scss";

interface ProgressSignature {
  onClose: (isOpen: boolean) => void;
  documentsToSign: DocumentToSign[];
  documentsToSignWating: DocumentToSign[];
}

export const ProgressSignature: React.FC<ProgressSignature> = ({
  onClose,
  documentsToSign,
  documentsToSignWating,
}) => {
  const getSignatureProgress = useCallback((): number => {
    return 100 - (documentsToSignWating.length * 100) / documentsToSign.length;
  }, [documentsToSignWating, documentsToSign]);

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
          onClose(false);
        }}
        disabled={getSignatureProgress() !== 100}
        className={"CloseButtonSignature"}
      >
        {getText("signature.fermer")}
      </Button>
    </>
  );
};
