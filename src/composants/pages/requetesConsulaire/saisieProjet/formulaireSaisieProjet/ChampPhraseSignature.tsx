import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useMemo } from "react";

type TChampSignatureProps = {
  name: string;
  libelle?: string;
  libelleDecret: string;
};

const ChampSignature: React.FC<TChampSignatureProps> = ({ name, libelle, libelleDecret }) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<IProjetActeTranscritForm>();
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  useEffect(() => {
    setFieldValue("formuleFinale.libelleDecret", libelleDecret, false);
    setFieldTouched("formuleFinale.libelleDecret", false, false);
  }, []);

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
        Veuillez indiquer, le cas échéant, vos titres honorifiques, votre qualité et votre fonction. Les informations prénom, nom, date et
        libellé du décret apparaîtront automatiquement lors de la signature de l'acte.
      </p>

      <div className="min-h-[80px] rounded border border-solid border-gris px-3 py-3">
        <div className="text-left leading-relaxed">
          <span className="select-none rounded bg-gris-transparent px-0.5">{"Prénom Nom, "}</span>

          <span
            contentEditable
            className="rounded px-0.5 outline-none transition-colors hover:bg-bleu-transparent focus-visible:bg-bleu-transparent"
            onBlur={e => helpers.setValue(e.target.innerText || "")}
            dangerouslySetInnerHTML={{ __html: field.value || "" }}
          />

          <span className="select-none rounded bg-gris-transparent px-0.5">
            {", Date, "}
            {libelleDecret}
          </span>
        </div>
      </div>

      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampSignature;
