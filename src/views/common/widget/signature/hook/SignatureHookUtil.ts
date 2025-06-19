import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { DetailSignature, DetailSignatureToCallApp } from "@model/signature/DetailSignature";
import { IDetailInfos } from "@model/signature/IDetailInfos";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import parametres from "../../../../../ressources/parametres.json";

const DIRECTION_TO_CALL_APP = "to-call-app";
const CODE_ERREUR_NON_DISPO = "WEB_EXT1";
const LIBELLE_ERREUR_NON_DISPO = "La signature électronique est actuellement indisponible ou n'est pas installée.";
const TIMER_SIGNATURE = "TimerContactWebExt";
const SIGNATURE_TIMEOUT = parametres.signature.time_out_ms;

const EVENT_NON_DISPO = {
  detail: {
    direction: DIRECTION_TO_CALL_APP,
    erreur: {
      code: CODE_ERREUR_NON_DISPO,
      libelle: LIBELLE_ERREUR_NON_DISPO,
      detail: ""
    }
  }
};

export function signerDocument(
  document: string,
  handleBackFromWebExtensionCallback: (event: CustomEvent) => void,
  infos: IDetailInfos[] = [],
  codePin?: string
) {
  if (codePin !== undefined) {
    const modeSignature: ModeSignature = ModeSignatureUtil.estValide(gestionnaireSignatureFlag.getModeSignature())
      ? gestionnaireSignatureFlag.getModeSignature()
      : ModeSignature.PKCS11_SIGNED;

    const detail: DetailSignature = {
      function: "SIGN",
      direction: "to-webextension",
      document,
      pin: codePin,
      mode: modeSignature,
      infos,
      erreurSimulee: null,
      erreursSimulees: null
    };

    gestionnaireTimer.declencherTimer(TIMER_SIGNATURE, SIGNATURE_TIMEOUT, true, handleBackFromWebExtensionCallback, EVENT_NON_DISPO);
    if (window.top) {
      window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
    }
  }
}

export function handleBackFromWebExtension(
  detail: DetailSignature,
  setResultatWebext: React.Dispatch<React.SetStateAction<DetailSignatureToCallApp | undefined>>
): void {
  gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);
  if (detail.direction === DIRECTION_TO_CALL_APP) {
    setResultatWebext(detail);
  }
}
