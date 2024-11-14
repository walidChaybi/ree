import PlayArrow from "@mui/icons-material/PlayArrow";
import React, { useState } from "react";
import Bouton, { TStyleBouton } from "./Bouton";

type TPointAncrageMenu = "gauche" | "droite";

interface BoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  titre: string;
  styleBouton?: TStyleBouton;
  garderStyleSiDisabled?: boolean;
  pointAncrageMenu?: TPointAncrageMenu;
}

const BoutonListeDeroulante = ({
  titre,
  styleBouton = "principal",
  garderStyleSiDisabled = false,
  pointAncrageMenu = "gauche",
  className,
  children,
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);

  const boutonMenuNonVide =
    React.Children.toArray(children).filter(Boolean).length > 0;

  return (
    <>
      {boutonMenuNonVide && (
        <div
          className="group relative"
          onMouseLeave={() => setMenuOuvert(false)}
        >
          <Bouton
            className={`${styleBouton === "secondaire" ? "group-hover:text-bleu" : "group-hover:text-blanc"}`}
            styleBouton={styleBouton}
            type="button"
            title={"Choix supplémentaires"}
            onClick={() => setMenuOuvert(!menuOuvert)}
            {...props}
          >
            <div className="flex items-center justify-center">
              {titre}
              <PlayArrow className="!transition-transform duration-1000 group-hover:-rotate-90" />
            </div>
          </Bouton>
          {menuOuvert && (
            <div
              className={`absolute bottom-full z-10 grid w-max animate-apparition gap-1 rounded-md rounded-tl-none bg-transparent py-2 ${pointAncrageMenu === "gauche" ? "left-0" : "right-0"}`}
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
