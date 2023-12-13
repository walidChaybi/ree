import { useEffect, useState } from "react";
import { DetailSignatureToCallApp } from "../types";
import { IDetailInfos } from "./../types";
import {
  handleBackFromWebExtension,
  signerDocument
} from "./SignatureHookUtil";

export function useSignatureHook(
  document: string,
  pinCode?: string,
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
    signerDocument(
      document,
      handleBackFromWebExtensionCallback,
      informations,
      pinCode
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return resultatWebext;
}
