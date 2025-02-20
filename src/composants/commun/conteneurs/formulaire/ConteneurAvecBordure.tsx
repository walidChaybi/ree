import React from "react";

interface IConteneurAvecBordureProps {
  titreEnTete?: string;
  sansMargeHorizontale?: boolean;
  className?: string;
}

const ConteneurAvecBordure: React.FC<React.PropsWithChildren<IConteneurAvecBordureProps>> = ({
  children,
  titreEnTete,
  sansMargeHorizontale = false,
  className
}) => (
  <div {...(className ? { className: className } : {})}>
    <div
      className={`relative rounded-md border border-solid border-blue-200 bg-white px-5 pb-8 pt-4 shadow-md ${sansMargeHorizontale ? "" : "mx-4"}`.trimEnd()}
    >
      {titreEnTete && (
        <span className="absolute -top-4 left-8 bg-white px-2 text-start text-xl font-bold text-bleu-sombre">{titreEnTete}</span>
      )}
      {children}
    </div>
  </div>
);

export default ConteneurAvecBordure;
