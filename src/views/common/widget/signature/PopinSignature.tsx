import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getLibelle } from "@util/Utils";
import React, { useEffect } from "react";
import { CodePinForm } from "./CodePinForm";
import { useSignatureHook } from "./hook/SignatureHook";
import { ErreurSignature } from "./messages/ErreurSignature";
import "./scss/PopinSignature.scss";

export interface PopinSignatureProps {
  titre: string;
  estOuvert: boolean;
  setEstOuvert: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccesSignature: (document: string) => void;
  texte?: string;
}

export const PopinSignature: React.FC<PopinSignatureProps> = props => {
  const [codePin, setCodePin] = React.useState<string | undefined>();
  const { succes, erreur } = useSignatureHook(codePin);

  useEffect(() => {
    if (succes || erreur?.typeErreur.code === "FONC_3") {
      setCodePin(undefined);
    }
  }, [erreur, succes]);

  useEffect(() => {
    if (succes) {
      props.onSuccesSignature("test"); // TODO: RECE-1318
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succes]);

  return (
    <>
      <Dialog
        open={props.estOuvert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="popin-signature"
      >
        <DialogTitle id="alert-dialog-title">
          {getLibelle(props.titre)}
        </DialogTitle>
        <DialogContent>
          {erreur && <ErreurSignature erreur={erreur} />}
          <div className="texte-popin-signature">{getLibelle(props.texte)}</div>
          <CodePinForm
            onClose={() => props.setEstOuvert(false)}
            setCodePin={setCodePin}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};