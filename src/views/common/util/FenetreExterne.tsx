import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/utils";
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

export class FenetreExterne extends React.PureComponent<
  React.PropsWithChildren<FenetreExterneProps>
> {
  fenetreExterne: Window | null = null;
  htmlDivElement: HTMLDivElement;
  cache: EmotionCache;

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

    this.cache = createCache({
      key: "external",
      container: document.head,
      speedy: false
    });
  }
  componentDidMount() {
    this.openWindow();
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    if (this.fenetreExterne) {
      this.fenetreExterne.close();
    }
  }

  render() {
    if (!this.state.mounted) {
      return null;
    }
    return ReactDOM.createPortal(
      <CacheProvider value={this.cache}>{this.props.children}</CacheProvider>,
      this.htmlDivElement
    );
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
    this.fenetreExterne = window.open("", "_blank", windowFeatures);

    if (this.fenetreExterne && this.props.setFenetreExterneUtil) {
      this.props.setFenetreExterneUtil({ ref: this.fenetreExterne });
    }

    if (this.fenetreExterne) {
      this.fenetreExterne.addEventListener(
        "beforeunload",
        this.handleBackBeforUnload
      );
      this.fenetreExterne.document.body.appendChild(this.htmlDivElement);
      this.fenetreExterne.document.title = titre || "";

      Array.from(document.styleSheets).forEach(styleSheet => {
        try {
          // pour sonar: as any as CSSStyleSheet
          const cSSStyleSheet = styleSheet as any as CSSStyleSheet;
          if (cSSStyleSheet.cssRules) {
            const newStyleEl = document.createElement("style");

            Array.from(cSSStyleSheet.cssRules).forEach(cssRule => {
              newStyleEl.appendChild(document.createTextNode(cssRule.cssText));
            });

            this.fenetreExterne?.document.head.appendChild(newStyleEl);
          } else {
            const newLinkEl = document.createElement("link");
            newLinkEl.rel = "stylesheet";
            if (cSSStyleSheet.href) {
              newLinkEl.href = cSSStyleSheet.href;
              this.fenetreExterne?.document.head.appendChild(newLinkEl);
            }
          }
        } catch (e) {
          messageManager.showError(
            "Une erreur est survenue lors de la recopie des styles"
          );
        }
      });
      // this.fenetreExterne.document.head.innerHTML = document.head.innerHTML;
      document.fonts?.forEach(fontFace => {
        this.fenetreExterne?.document.fonts.add(fontFace);
      });
      this.cache = createCache({
        key: "external",
        container: this.fenetreExterne.document.head,
        speedy: false
      });
    }
  }
}

/** Nombre aléatoire entre min et max inclus */
function nombreAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
