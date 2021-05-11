import messageManager from "./messageManager";
import moment from "moment";
import { gestionnaireFeatureFlag } from "./featureFlag/gestionnaireFeatureFlag";
import { FeatureFlag } from "./featureFlag/FeatureFlag";
import {
  postLog,
  IQueryParameterPostLog
} from "../../../api/appels/outiltechApi";
import { ID_CORRELATION_HEADER_NAME } from "../../../api/ApiManager";

const TIME_OUT_MS = 2000;

let listLog = [] as Array<IQueryParameterPostLog>;

let isWaiting = false;
export interface LogErrorMsg {
  messageUtilisateur?: string;
  error?: any;
  errorInfo?: React.ErrorInfo | string;
}

export function logError(logErrorMgs: LogErrorMsg) {
  if (gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)) {
    logErrorOnServer(logErrorMgs);
  }
  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    logErrorOnConsole(logErrorMgs);
  }
  if (logErrorMgs.messageUtilisateur) {
    logErrorOnScreen(logErrorMgs.messageUtilisateur);
  }
}

function logErrorOnScreen(errorMessage: string) {
  messageManager.showErrorAndClose(errorMessage);
}

/* istanbul ignore next */
function logErrorOnConsole(logErrorMgs: LogErrorMsg) {
  if (logErrorMgs) {
    console.error(`Erreur inattendue: ${JSON.stringify(logErrorMgs.error)}`);
    if (logErrorMgs.errorInfo) {
      console.error(`Info erreur: ${logErrorMgs.errorInfo}`);
    }
  } else {
    console.error("Une erreur s'est produite");
  }
}

function logErrorOnServer(logErrorMgs: LogErrorMsg) {
  listLog.push({
    date: moment().unix(),
    idCorrelation:
      logErrorMgs.error.response?.req?.header?.[ID_CORRELATION_HEADER_NAME],
    message:
      logErrorMgs.error.response?.error?.message ??
      logErrorMgs.error?.message ??
      logErrorMgs.messageUtilisateur
  });

  // Attente de quelques secondes afin de regrouper les logs
  if (!isWaiting) {
    isWaiting = true;
    setTimeout(sendToServer, TIME_OUT_MS);
  }
}

function sendToServer() {
  isWaiting = false;

  postLog(listLog)
    .then(result => {})
    .catch(error => {});

  listLog = [];
}
