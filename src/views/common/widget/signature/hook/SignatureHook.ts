import { DetailSignatureToCallApp } from "@model/signature/DetailSignature";
import { IDetailInfos } from "@model/signature/IDetailInfos";
import { useEffect, useState } from "react";
import {
  handleBackFromWebExtension,
  signerDocument
} from "./SignatureHookUtil";

export function useSignatureHook(
  document: string,
  codePin?: string,
  informations?: IDetailInfos[]
): DetailSignatureToCallApp | undefined {
  const [resultatWebext, setResultatWebext] =
    useState<DetailSignatureToCallApp>();

  const handleBackFromWebExtensionCallback = (event: Event): void => {
    handleBackFromWebExtension(
      (event as CustomEvent).detail,
      setResultatWebext
    );
  };

  useEffect(() => {
    if (codePin && document) {
      signerDocument(
        document,
        handleBackFromWebExtensionCallback,
        informations,
        codePin
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codePin, document]);

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

  return resultatWebext;
}
