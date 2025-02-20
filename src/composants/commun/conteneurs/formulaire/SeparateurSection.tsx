import React from "react";

interface ISeparateurSectionProps {
  titre?: string;
  libellePour?: string;
  className?: string;
}

const SeparateurSection: React.FC<ISeparateurSectionProps> = ({ titre, libellePour, className }) => (
  <div className={className ?? "pb-4 pt-8"}>
    <div className="relative my-2.5 border-0 border-b-2 border-solid border-bleu text-start">
      {titre && (
        <label
          {...(libellePour ? { htmlFor: libellePour } : {})}
          className="absolute -bottom-2.5 left-8 bg-blanc px-1.5 text-bleu-sombre"
        >
          {titre}
        </label>
      )}
    </div>
  </div>
);
export default SeparateurSection;
