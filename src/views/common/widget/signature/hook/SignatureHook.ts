import { useEffect, useState } from "react";
import { SignatureErreur } from "../messages/ErreurSignature";
import {
  handleBackFromWebExtension,
  sendToSignature
} from "./SignatureHookUtil";

export function useSignatureHook(pinCode?: string) {
  const [erreur, setErreur] = useState<SignatureErreur>();
  const [succes, setSucces] = useState<boolean>(false);

  const handleBackFromWebExtensionCallback = (event: Event): void => {
    handleBackFromWebExtension(
      (event as CustomEvent).detail,
      setErreur,
      setSucces
    );
  };

  useEffect(() => {
    setSucces(false);
    sendToSignature(handleBackFromWebExtensionCallback, pinCode);
  }, [pinCode]);

  useEffect(() => {
    window.top &&
      window.top.addEventListener(
        "signWebextResponse",
        handleBackFromWebExtensionCallback
      );
    return () => {
      window.top &&
        window.top.removeEventListener(
          "signWebextResponse",
          handleBackFromWebExtensionCallback
        );
    };
  }, []);

  return {
    succes,
    erreur
  };
}
