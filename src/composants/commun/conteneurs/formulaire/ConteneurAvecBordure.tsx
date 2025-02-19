import React from "react";

interface IConteneurAvecBordureProps {
  titreEnTete?: string;
  sansMargeBasse?: boolean;
  sansMargeExterne?: boolean;
}

const ConteneurAvecBordure: React.FC<React.PropsWithChildren<IConteneurAvecBordureProps>> = ({
  children,
  titreEnTete,
  sansMargeBasse = false,
  sansMargeExterne = false
}) => (
  <div
    className={`rounded-md border border-solid border-blue-200 bg-white p-4 shadow-md ${sansMargeExterne ? "mb-4" : "m-4 my-7"} ${sansMargeBasse ? "" : "pb-8"}`.trimEnd()}
  >
    <div className={`relative flex border-bleu ${sansMargeBasse ? "" : "mb-5"}`.trimEnd()}>
      {titreEnTete && <span className="absolute -top-8 ml-8 bg-white px-2 text-xl font-bold text-bleu-sombre">{titreEnTete}</span>}
    </div>
    {children}
  </div>
);

export default ConteneurAvecBordure;
