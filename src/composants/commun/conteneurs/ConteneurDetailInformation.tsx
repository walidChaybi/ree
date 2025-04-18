import React, { useMemo } from "react";
import IconeStatut from "./IconeStatus";
import Infobulle from "./Infobulle";

export interface PropsConteneurDetailInformation {
  libelle: string;
  valeur?: string;
  afficherCommeStatut?: boolean;
}

export const ConteneurDetailInformation: React.FC<PropsConteneurDetailInformation> = ({ libelle, valeur, afficherCommeStatut = false }) => {
  const valeurAffichee = useMemo<string>(() => valeur?.trim() ?? "", [valeur]);

  return valeurAffichee ? (
    <div className="mb-5 px-3 text-left">
      <div className="mb-1 text-left text-xs uppercase text-gray-500">{libelle}</div>
      <Infobulle contenu={valeur}>
        <div
          className={`line-clamp-3 ${afficherCommeStatut ? "flex rounded-r-full border border-solid border-bleu-sombre bg-blue-50 px-2 py-1 text-bleu-sombre" : ""}`}
        >
          {valeurAffichee}
          {afficherCommeStatut && <IconeStatut statut={valeur} />}
        </div>
      </Infobulle>
    </div>
  ) : (
    <></>
  );
};

export default ConteneurDetailInformation;
