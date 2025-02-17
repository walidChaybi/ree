import React from "react";

interface ISeparateurSectionProps {
  titre?: string;
  sansMargeBasse?: boolean;
  sansMargeHaute?: boolean;
  libellePour?: string;
}

const SeparateurSection: React.FC<ISeparateurSectionProps> = ({ titre, sansMargeBasse = false, sansMargeHaute = false, libellePour }) => (
  <div
    className={`${sansMargeBasse ? "" : "mb-8"} ${sansMargeHaute ? "" : "mt-8"} flex w-full border-0 border-b-2 border-solid border-bleu text-start`.trim()}
  >
    {titre && (
      <label
        {...(libellePour ? { htmlFor: libellePour } : {})}
        className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre"
      >
        {titre}
      </label>
    )}
  </div>
);
export default SeparateurSection;
