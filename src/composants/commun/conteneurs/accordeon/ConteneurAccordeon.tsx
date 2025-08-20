import React, { useMemo, useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface IConteneurAccordeonProps {
  titre: string | React.ReactNode;
  ouvertParDefaut?: boolean;
  estControlable?: boolean;
  nombreMaxColonne?: number;
}

const ConteneurAccordeon: React.FC<React.PropsWithChildren<IConteneurAccordeonProps>> = ({
  children,
  titre,
  ouvertParDefaut = false,
  estControlable = true,
  nombreMaxColonne = 1
}) => {
  const [estOuvert, setEstOuvert] = useState<boolean>(ouvertParDefaut || !estControlable);

  const gridColonneClasses = useMemo(() => {
    switch (nombreMaxColonne) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
      default:
        return "";
    }
  }, [nombreMaxColonne]);

  return (
    <div className="mb-3 overflow-hidden rounded-xl border-[1px] border-solid border-bleu shadow-xl">
      {estControlable ? (
        <button
          className="text-blanc-rece font-marianne relative m-0 w-full rounded-none bg-bleu px-4 py-2 font-bold normal-case focus-visible:bg-bleu-sombre"
          type="button"
          title="Étendre la section"
          aria-label="Étendre la section"
          onClick={() => setEstOuvert(!estOuvert)}
        >
          <span className="truncate">{titre}</span>
          <MdExpandMore
            className={`absolute right-2 text-2xl transition-transform duration-200 ease-in ${estOuvert ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      ) : (
        <div className="font-marianne-bold relative m-0 truncate bg-bleu px-4 py-1 text-lg text-blanc">{titre}</div>
      )}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-in ${estOuvert ? "grid grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <div className={`grid gap-y-4 p-4 ${gridColonneClasses}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ConteneurAccordeon;
