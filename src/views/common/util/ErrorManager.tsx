/* istanbul ignore file */
import * as React from "react";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import { getLibelle } from "../util/Utils";
import { logError } from "./LogManager";

interface LocalProps {
  remoteLog: boolean;
  children: JSX.Element;
}

interface LocalState {
  hasError: boolean;
}

const erreurMsgUtilisateur = "Une erreur inattendue est survenue";
export class ErrorManager extends React.Component<LocalProps, LocalState> {
  constructor(props: LocalProps) {
    super(props);
    this.addOnErrorManager();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true
      //error
    };
  }

  public static defaultProps = {
    debug: false,
    remoteLog: false
  };

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError({
      error,
      errorInfo,
      messageUtilisateur: erreurMsgUtilisateur
    });
  }

  private addOnErrorManager() {
    if (!window.onerror) {
      window.onerror = (message, src) => {
        logError({
          error: src,
          messageUtilisateur: erreurMsgUtilisateur
        });
      };
      window.addEventListener("unhandledrejection", event => {
        logError({
          error: event.promise,
          errorInfo: event.reason,
          messageUtilisateur: erreurMsgUtilisateur
        });

        event.preventDefault();
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      // Cas d'erreur ou la page n'a pas pu s'afficher à cause d'une erreur
      alert(
        getLibelle(
          "Une erreur inatendue est survenue (veuillez contacter un administrateur), vous allez être redirigé vers la page d'accueil"
        )
      );
      window.location.replace(URL_ACCUEIL);
    }
    return this.props.children;
  }
}
