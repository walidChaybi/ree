import { DetailSignatureToCallApp } from "@model/signature/DetailSignature";
import { IDetailInfos } from "@model/signature/IDetailInfos";
import { useEffect, useState } from "react";
import INFORMATIONS_CARTE_SIGNATURE from "../../../../../ressources/InformationsCarteSignature.json";
import {
  handleBackFromWebExtension,
  signerDocument
} from "./SignatureHookUtil";

interface SignatureHookResultat {
  data?: DetailSignatureToCallApp;
  reinitialiser: () => void;
}

export function useSignatureHook(
  document: string,
  codePin?: string,
  informations?: IDetailInfos[]
): SignatureHookResultat {
  const [resultatWebext, setResultatWebext] =
    useState<DetailSignatureToCallApp>();

  const reinitialiserResultatWebext = (): void => {
    setResultatWebext(undefined);
  };

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
        ajouteInformationsCarteSignatureFictive(informations),
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

  return { data: resultatWebext, reinitialiser: reinitialiserResultatWebext };
}

const ajouteInformationsCarteSignatureFictive = (
  informations: IDetailInfos[] = []
): IDetailInfos[] => {
  if (process.env.NODE_ENV === "development") {
    informations.push(...INFORMATIONS_CARTE_SIGNATURE);
  }
  return informations;
};
