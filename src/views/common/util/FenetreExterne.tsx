import React from "react";
import ReactDOM from "react-dom";
import messageManager from "./messageManager";

const ratioWidth = 0.5;
const ratioHeight = 0.94;
const minRandom = 50;
const maxRandom = 100;
interface FenetreExterneProps {
  setFenetreExterneUtil?: (fentreExterne?: FenetreExterneUtil) => void;
  onCloseHandler?: () => void;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  titre?: string;
  ratioWidth?: number;
  ratioHeight?: number;
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
    this.htmlDivElement.classList.add("App"); // Ajout de la classe CSS de l'application principale
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

    return width * (this.props.ratioWidth ? this.props.ratioWidth : ratioWidth);
  };

  getHeight = () => {
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;
    return (
      height * (this.props.ratioHeight ? this.props.ratioHeight : ratioHeight)
    );
  };

  private openWindow() {
    const {
      width = this.getWidth(),
      height = this.getHeight(),
      left = nombreAleatoire(minRandom, maxRandom),
      top = nombreAleatoire(minRandom, maxRandom),
      titre
    } = this.props;

    const bodyPadding =
      document.getElementsByClassName("AppBody").length > 0
        ? parseInt(
            window
              .getComputedStyle(
                document.getElementsByClassName("AppBody")[0],
                null
              )
              .getPropertyValue("padding-left"),
            10
          )
        : 0;

    const resumeRequeteWidth =
      document.getElementsByClassName("ResumeRequete").length > 0
        ? parseInt(
            window.getComputedStyle(
              document.getElementsByClassName("ResumeRequete")[0],
              null
            ).width,
            10
          )
        : 0;

    const windowFeatures = `width=${width},height=${height},left=${
      left + bodyPadding + resumeRequeteWidth
    },top=${top}`;
    this.fenetreExterne = window.open("", "", windowFeatures);

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

  // Copie des fonts dans la nouvelle fenêtre
  if (sourceDoc.fonts && targetDoc.fonts) {
    sourceDoc.fonts.forEach(fontFace => {
      targetDoc.fonts.add(fontFace);
    });
  }

  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    try {
      // pour sonar: as any as CSSStyleSheet
      const cSSStyleSheet = styleSheet as any as CSSStyleSheet;
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
  const styles = targetDoc.getElementsByTagName("style");
  for (const index in styles) {
    const style = styles[index];
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }
}
