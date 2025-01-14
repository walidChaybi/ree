import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";

interface IConteneurAccordeonProps {
  titre: string | React.ReactNode;
  ouvertParDefaut?: boolean;
  nonControllable?: boolean;
}

const ConteneurAccordeon: React.FC<React.PropsWithChildren<IConteneurAccordeonProps>> = ({
  children,
  titre,
  ouvertParDefaut = false,
  nonControllable = false
}) => {
  const [estOuvert, setEstOuvert] = useState<boolean>(ouvertParDefaut || nonControllable);

  return (
    <div className="mb-3 overflow-hidden rounded-xl border-2 border-solid border-bleu shadow-xl">
      {nonControllable ? (
        <div className="text-blanc-rece font-family: noto-sans-ui relative m-0 rounded-none bg-bleu px-4 py-2 normal-case">{titre}</div>
      ) : (
        <button
          className="text-blanc-rece font-family: noto-sans-ui relative m-0 w-full rounded-none bg-bleu px-4 py-2 font-bold normal-case focus:border-2 focus:border-solid focus:border-bleu-sombre focus:bg-bleu-sombre"
          type="button"
          onClick={() => setEstOuvert(!estOuvert)}
        >
          {titre}
          <ExpandMore className={`absolute right-2 transition-transform duration-[0.2s] ease-[ease-in] ${estOuvert ? "rotate-180" : ""}`} />
        </button>
      )}

      <div
        className={`grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-[0.2s] ease-[ease-in] ${estOuvert ? "grid grid-rows-[1fr]" : ""}`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
};

export default ConteneurAccordeon;
