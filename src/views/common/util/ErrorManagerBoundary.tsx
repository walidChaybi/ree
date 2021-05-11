/* istanbul ignore file */
import * as React from "react";
import { ErrorManager } from "./ErrorManager";

interface LocalProps {
  remoteLog: boolean;
  children: JSX.Element;
}

interface LocalState {
  hasError: boolean;
}

export class ErrorManagerBoundary extends ErrorManager {
  public render() {
    if (this.state.hasError) {
      return <div className={"error"}>Erreur inattendue!</div>;
    }
    return this.props.children;
  }
}
