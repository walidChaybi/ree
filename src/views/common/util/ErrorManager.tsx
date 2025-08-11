/* istanbul ignore file */
import { URL_ACCUEIL } from "@router/ReceUrls";
import * as React from "react";
import AfficherMessage from "../../../utils/AfficherMessage";

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
    AfficherMessage.erreur(erreurMsgUtilisateur);
    console.error(error);
    console.info(errorInfo);
  }

  private addOnErrorManager() {
    if (!window.onerror) {
      window.onerror = (message, src) => {
        AfficherMessage.erreur(erreurMsgUtilisateur);
        console.error(src);
      };
      window.addEventListener("unhandledrejection", event => {
        event.preventDefault();

        AfficherMessage.erreur(erreurMsgUtilisateur);
        console.error(event.promise);
        console.info(event.reason);
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      // Cas d'erreur ou la page n'a pas pu s'afficher à cause d'une erreur
      alert("Une erreur inattendue est survenue (veuillez contacter un administrateur), vous allez être redirigé vers la page d'accueil");
      window.location.replace(URL_ACCUEIL);
    }
    return this.props.children;
  }
}
