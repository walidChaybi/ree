import PlayArrow from "@mui/icons-material/PlayArrow";
import React, { useMemo, useState } from "react";
import Bouton, { TStyleBouton } from "./Bouton";

type TPointAncrageMenu = "haut-gauche" | "haut-droite" | "bas-gauche" | "bas-droite";

interface IBoutonListeDeroulanteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  titre: string;
  styleBouton?: TStyleBouton;
  garderStyleSiDisabled?: boolean;
  pointAncrageMenu?: TPointAncrageMenu;
}

const BoutonListeDeroulante: React.FC<React.PropsWithChildren<IBoutonListeDeroulanteProps>> = ({
  titre,
  styleBouton = "principal",
  garderStyleSiDisabled = false,
  pointAncrageMenu = "bas-gauche",
  className,
  children,
  ...props
}) => {
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);
  const boutonMenuNonVide = useMemo(() => React.Children.toArray(children).filter(Boolean).length > 0, [children]);

  return (
    <>
      {boutonMenuNonVide && (
        <div
          className="group relative"
          onMouseLeave={() => setMenuOuvert(false)}
        >
          <Bouton
            className={`${styleBouton === "secondaire" ? "group-hover:text-bleu" : "group-hover:border-bleu group-hover:bg-bleu group-hover:text-blanc"}`}
            styleBouton={styleBouton}
            type="button"
            title={titre}
            onClick={() => setMenuOuvert(!menuOuvert)}
            onMouseEnter={() => setMenuOuvert(true)}
            {...props}
          >
            <div className="flex items-center justify-center gap-2">
              {titre}
              <PlayArrow
                className={`!transition-transform duration-1000 ${pointAncrageMenu.includes("haut") ? "group-hover:-rotate-90" : "group-hover:rotate-90"}`}
              />
            </div>
          </Bouton>
          {menuOuvert && (
            <div
              className={`absolute z-10 grid w-max animate-apparition gap-1 rounded-md rounded-tl-none bg-transparent py-2 ${pointAncrageMenu.includes("gauche") ? "left-0" : "right-0"} ${pointAncrageMenu.includes("haut") ? "bottom-full" : "top-full"}`}
            >
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BoutonListeDeroulante;
