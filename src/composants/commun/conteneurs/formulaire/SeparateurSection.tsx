import React from "react";

interface ISeparateurSectionProps {
  titre?: string;
  sansMargeBasse?: boolean;
}

const SeparateurSection: React.FC<ISeparateurSectionProps> = ({ titre, sansMargeBasse = false }) => (
  <div className={`${sansMargeBasse ? "" : "mb-8"} flex w-full border-0 border-b-2 border-solid border-bleu text-start`.trim()}>
    {titre && <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{titre}</h3>}
  </div>
);
export default SeparateurSection;
