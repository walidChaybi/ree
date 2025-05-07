import { ErrorMessage, useField } from "formik";
import { useCallback, useMemo } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

type TChampNumeroInscriptionRcRcaProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  libelle: string;
  estObligatoire?: string;
};

const ChampNumeroInscriptionRcRca: React.FC<TChampNumeroInscriptionRcRcaProps> = ({
  name,
  libelle,
  className,
  estObligatoire,
  children,
  ...props
}) => {
  const [field, meta] = useField(name);

  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let valeur = event.target.value.replace(/\D/g, "");

      if (valeur.length <= 4) {
        valeur = valeur.slice(0, 4);
      } else {
        valeur = valeur.slice(0, 4) + "-" + valeur.slice(4, 9);
      }
      event.target.value = valeur;
      field.onChange(event);
    },
    [field]
  );

  const { onChange, ...fieldProps } = field;

  return (
    <div className={`flex w-full flex-col text-start ${className ?? ""} ${enErreur ? CHAMP_EN_ERREUR : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name}
        aria-label={`aria-label-${name}`}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>
      <div className="relative flex rounded-md shadow-sm">
        <input
          {...props}
          {...fieldProps}
          id={name}
          className={`border-1 flex flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          onChange={handleChange}
        />
        {children}
      </div>
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampNumeroInscriptionRcRca;
