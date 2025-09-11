import React, { useMemo } from "react";
import Infobulle from "./Infobulle";

interface PropsConteneurDetailInformation {
  libelle: string;
  valeur?: string;
  afficherCommeStatut?: boolean;
}

const ConteneurDetailInformation: React.FC<PropsConteneurDetailInformation> = ({ libelle, valeur, afficherCommeStatut = false }) => {
  const valeurAffichee = useMemo<string>(() => valeur?.trim() ?? "", [valeur]);

  return valeurAffichee ? (
    <div className="mb-5 text-left">
      <div className="mb-1 text-left text-xs uppercase text-gray-500">{libelle}</div>
      <Infobulle contenu={valeur}>
        <div
          className={`line-clamp-3 max-w-72 text-ellipsis break-words ${
            afficherCommeStatut
              ? "inline-flex w-fit items-center rounded-md border border-solid border-bleu-sombre bg-blue-50 px-2 py-1 text-sm font-semibold text-bleu-sombre"
              : ""
          }`}
        >
          {valeurAffichee}
        </div>
      </Infobulle>
    </div>
  ) : (
    <></>
  );
};

export default ConteneurDetailInformation;
