import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";

type TChampSignatureProps = {
  name: string;
  libelle?: string;
};

const ChampPhraseSignature: React.FC<TChampSignatureProps> = ({ name, libelle }) => {
  const [, meta] = useField(name);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div className="grid gap-2">
      {libelle && (
        <label
          className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
          htmlFor={name}
        >
          {libelle}
        </label>
      )}
      <p className="m-0 mb-2 ml-1 text-sm">
        {"Veuillez indiquer, le cas échéant, vos titres honorifiques, votre qualité et votre fonction."}
        <span className="rounded px-1 py-0.5 font-bold">
          {"Les informations prénom, nom, date et libellé du décret apparaîtront automatiquement lors de la signature de l'acte."}
        </span>
      </p>
      <ChampZoneTexte
        name="formuleFinale.phraseSignature"
        typeRedimensionnement="vertical"
        maxLength={3000}
      />
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampPhraseSignature;
