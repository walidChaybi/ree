/* istanbul ignore file */
import * as React from "react";
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
  }

  getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
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
    return this.props.children;
  }
}
