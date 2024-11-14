import React from "react";

interface IConteneurFormulaireProps {
  titreEnTete: string;
}

const ConteneurFormulaire: React.FC<
  React.PropsWithChildren<IConteneurFormulaireProps>
> = ({ children, titreEnTete }) => (
  <div className="w-full rounded-lg border border-solid border-bleu bg-gris-clair">
    <h1 className="m-0 rounded-t-md bg-bleu p-1.5 text-base font-bold text-white">
      {titreEnTete}
    </h1>
    <div className="h-[41rem] overflow-y-scroll rounded-lg">{children}</div>
  </div>
);

export default ConteneurFormulaire;
