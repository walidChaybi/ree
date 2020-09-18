import React, { useEffect, useCallback } from "react";
import { getText, Text } from "./Text";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Button } from "reakit/Button";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ValidationPopinProps {
  buttonMessageId: string;
  messageId: string;
  errorMessageId: string;
  onValid: () => void;
  canValidate: boolean;
}

export const ValidationPopin: React.FC<ValidationPopinProps> = ({
  buttonMessageId,
  messageId,
  errorMessageId,
  onValid,
  canValidate
}) => {
  const openDialogAferMs = 75;
  const dialog = useDialogState();
  const validerButtonRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    if (validerButtonRef.current) {
      validerButtonRef.current.focus();
    }
  }, [validerButtonRef]);

  const validPopin = useCallback(() => {
    dialog.hide();

    setTimeout(() => {
      onValid();
    }, openDialogAferMs);
  }, [dialog, onValid]);

  return (
    <>
      <DialogDisclosure {...dialog} as={Button} disabled={!canValidate}>
        {getText(buttonMessageId)}
      </DialogDisclosure>
      {!canValidate ? (
        <Dialog
          {...dialog}
          tabIndex={0}
          aria-label={getText("errors.dialogLabel")}
          className="toast error"
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            title={getText("errors.icon")}
            aria-label={getText("errors.icon")}
          />
          <Text messageId={errorMessageId} />
        </Dialog>
      ) : (
        <Dialog
          {...dialog}
          tabIndex={0}
          aria-label={getText("errors.dialogLabel")}
          className="toast"
        >
          <Text messageId={messageId} />
          <Button ref={validerButtonRef} onClick={validPopin}>
            Valider
          </Button>
          <Button onClick={() => dialog.hide()}>Annuler</Button>
        </Dialog>
      )}
    </>
  );
};
