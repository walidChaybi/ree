import React from "react";

interface IConteneurAvecBordureProps {
  titreEnTete?: string;
  sansMargeBasse?: boolean;
}

const ConteneurAvecBordure: React.FC<React.PropsWithChildren<IConteneurAvecBordureProps>> = ({
  children,
  titreEnTete,
  sansMargeBasse = false
}) => (
  <div className="m-4 mb-10 mt-8 rounded-md border border-solid border-blue-200 bg-white p-4 pb-8 shadow-md">
    <div className={`relative ${sansMargeBasse ? "" : "mb-5"} flex border-bleu`}>
      {titreEnTete && <h2 className="absolute -top-[3.4rem] ml-8 bg-white px-2 text-bleu-sombre">{titreEnTete}</h2>}
    </div>
    {children}
  </div>
);

export default ConteneurAvecBordure;
