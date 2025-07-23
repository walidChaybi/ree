import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PolicesEtStylesRECE from "../../../utils/PolicesEtStylesRECE";

export interface IFenetreExterneRef {
  ref: Window;
}

interface IFenetreExterneProps {
  setFenetreExterneRef?: (fentreExterneRef: IFenetreExterneRef) => void;
  apresFermeture?: () => void;
  largeur?: number;
  hauteur?: number;
  haut?: number;
  gauche?: number;
  titre?: string;
  ratioLargeur?: number;
  ratioHauteur?: number;
}

const FenetreExterne: React.FC<React.PropsWithChildren<IFenetreExterneProps>> = ({
  setFenetreExterneRef,
  apresFermeture,
  largeur,
  hauteur,
  haut,
  gauche,
  titre,
  ratioLargeur,
  ratioHauteur,
  children
}) => {
  const conteneurFenetreExterne: HTMLDivElement = useMemo(() => {
    const elementConteneur = document.createElement("div");
    elementConteneur.classList.add("App");

    return elementConteneur;
  }, []);
  const [cache, setCache] = useState<EmotionCache | null>(null);

  useLayoutEffect(() => {
    const fenetre = {
      largeur: (largeur ?? (window.innerWidth || document.documentElement.clientWidth || window.screen.width)) * (ratioLargeur ?? 0.5),
      hauteur: (hauteur ?? (window.innerHeight || document.documentElement.clientHeight || window.screen.height)) * (ratioHauteur ?? 0.94),
      haut: haut ?? 50,
      gauche: gauche ?? 50
    };

    const fenetreExterne = window.open(
      `${import.meta.env.BASE_URL}/fenetre-externe.html`,
      "_blank",
      `width=${fenetre.largeur},height=${fenetre.hauteur},left=${fenetre.gauche},top=${fenetre.haut}`
    );

    fenetreExterne?.addEventListener("load", () => {
      setFenetreExterneRef?.({ ref: fenetreExterne });
      apresFermeture && fenetreExterne.addEventListener("beforeunload", apresFermeture);
      titre && (fenetreExterne.document.title = titre);
      fenetreExterne.document.body.appendChild(conteneurFenetreExterne);

      PolicesEtStylesRECE.copieDansFenetreExterne(fenetreExterne);

      setCache(
        createCache({
          key: "external",
          container: fenetreExterne.document.head,
          speedy: false
        })
      );
    });

    return () => {
      apresFermeture && fenetreExterne?.removeEventListener("beforeunload", apresFermeture);
      apresFermeture?.();
      fenetreExterne?.close();
    };
  }, []);

  if (!cache) return <></>;

  return createPortal(<CacheProvider value={cache}>{children}</CacheProvider>, conteneurFenetreExterne);
};

export default FenetreExterne;
