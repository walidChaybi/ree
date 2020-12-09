import React from "react";
import ReactDOM from "react-dom";
import messageManager from "./messageManager";

interface FenetreExterneProps {
  setFenetreExterneUtil?: (fentreExterne?: FenetreExterneUtil) => void;
  onCloseHandler?: () => void;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  titre?: string;
}

export interface FenetreExterneUtil {
  ref: Window;
}

export class FenetreExterne extends React.PureComponent<FenetreExterneProps> {
  fenetreExterne: Window | null = null;
  htmlDivElement: HTMLDivElement;

  state = {
    mounted: false
  };

  constructor(props: FenetreExterneProps) {
    super(props);
    this.state = {
      mounted: false
    };
    this.htmlDivElement = document.createElement("div");
    this.eventCopyStyles = this.eventCopyStyles.bind(this);

    window.top.addEventListener("refreshStyles", this.eventCopyStyles);
  }
  componentDidMount() {
    this.openWindow();
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    if (this.fenetreExterne) {
      this.fenetreExterne.close();
    }

    window.top.removeEventListener("refreshStyles", this.eventCopyStyles);
  }

  eventCopyStyles() {
    if (this.fenetreExterne != null) {
      copyStyles(document, this.fenetreExterne.document);
    }
  }

  render() {
    if (!this.state.mounted) {
      return null;
    }
    return ReactDOM.createPortal(this.props.children, this.htmlDivElement);
  }

  handleBackBeforUnload = () => {
    if (this.fenetreExterne) {
      this.fenetreExterne.removeEventListener(
        "beforeunload",
        this.handleBackBeforUnload
      );
    }
    if (this.props.onCloseHandler) {
      this.props.onCloseHandler();
    }
  };

  getWidth = () => {
    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;

    return width * 0.5;
  };

  getHeight = () => {
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;
    return height * 0.94;
  };

  private openWindow() {
    const {
      width = this.getWidth(),
      height = this.getHeight(),
      left = nombreAleatoire(50, 100),
      top = nombreAleatoire(50, 100),
      titre
    } = this.props;

    const windowFetures = `width=${width},height=${height},left=${left},top=${top}`;
    this.fenetreExterne = window.open("", "", windowFetures);

    if (this.fenetreExterne && this.props.setFenetreExterneUtil) {
      this.props.setFenetreExterneUtil({ ref: this.fenetreExterne });
    }

    if (this.fenetreExterne) {
      // Recopie des styles du parent dans l'enfant
      copyStyles(document, this.fenetreExterne.document);
      this.fenetreExterne.addEventListener(
        "beforeunload",
        this.handleBackBeforUnload
      );
      this.fenetreExterne.document.body.appendChild(this.htmlDivElement);
      this.fenetreExterne.document.title = titre || "";
    }
  }
}

/** Nombre aléatoire entre min et max inclus */
function nombreAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Recopie des syles css d'un document à un autre */
function copyStyles(sourceDoc: Document, targetDoc: Document) {
  removeStyles(targetDoc);
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    try {
      const cSSStyleSheet = styleSheet as CSSStyleSheet;
      if (cSSStyleSheet.cssRules) {
        const newStyleEl = sourceDoc.createElement("style");

        Array.from(cSSStyleSheet.cssRules).forEach(cssRule => {
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });

        targetDoc.head.appendChild(newStyleEl);
      } else {
        const newLinkEl = sourceDoc.createElement("link");
        newLinkEl.rel = "stylesheet";
        if (cSSStyleSheet.href) {
          newLinkEl.href = cSSStyleSheet.href;
          targetDoc.head.appendChild(newLinkEl);
        }
      }
    } catch (e) {
      messageManager.showError(
        "Une erreur est survenue lors de la recopie des syles"
      );
    }
  });
}

function removeStyles(targetDoc: Document) {
  const st = targetDoc.getElementsByTagName("style");
  for (let i = 0; i < st.length; i++) {
    if (st != null && st[i] != null && st[i].parentNode != null) {
      st![i]!.parentNode!.removeChild(st[i]);
    }
  }
}
