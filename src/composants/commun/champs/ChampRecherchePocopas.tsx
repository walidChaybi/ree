import { useRecherchePocopa } from "@hook/pocopa/RecherchePocopaApiHook";
import { Autocomplete } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import { useDelai } from "../../../hooks/utilitaires/UseDelai";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

interface IChampRecherchePocopasProps {
  name: string;
  libelle: string;
  optionsRecherchePocopa: IRecherchePocopa;
  delai?: number;
  disabled?: boolean;
  estObligatoire?: boolean;
}

interface IRecherchePocopa {
  familleRegistre: string;
  nombreResultatsMax: number;
  estOuvert?: boolean;
}

const ChampRecherchePocopas: React.FC<IChampRecherchePocopasProps> = ({
  name,
  libelle,
  optionsRecherchePocopa,
  delai,
  disabled,
  estObligatoire
}) => {
  const [valeurChampAutocomplete, setValeurChampAutocomplete] = useDelai("", delai);
  const [field, meta, helpers] = useField(name);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);
  const pocopas = useRecherchePocopa(
    valeurChampAutocomplete,
    optionsRecherchePocopa.familleRegistre,
    optionsRecherchePocopa.nombreResultatsMax,
    optionsRecherchePocopa.estOuvert
  );
  const optionsPocopas = useMemo(
    () => [...(field.value && !pocopas?.includes(field.value) ? [field.value] : []), ...(pocopas ?? [])],
    [pocopas]
  );
  const pocopaSelectionnee = useMemo(() => optionsPocopas?.find(pocopa => pocopa === field.value) ?? null, [field.value]);

  return (
    <div {...(enErreur ? { className: CHAMP_EN_ERREUR } : {})}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>
      <Autocomplete
        id={name}
        options={optionsPocopas}
        value={pocopaSelectionnee}
        onChange={(_, valeurSelectionne) => {
          helpers.setValue(valeurSelectionne ?? "");
        }}
        onBlur={e => {
          if (pocopas?.length === 0) helpers.setValue("");
          field.onBlur(e);
        }}
        onInputChange={(_, valeurSaisie) => {
          setValeurChampAutocomplete(valeurSaisie ?? "");
        }}
        renderInput={params => {
          const { className, ...props } = params.inputProps;

          return (
            <div
              ref={params.InputProps.ref}
              className={"flex w-full"}
            >
              <input
                type="text"
                data-testid="inputChampRecherche"
                placeholder={"Recherche..."}
                className={`border-1 flex w-auto flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${
                  enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"
                }`}
                {...props}
              />
            </div>
          );
        }}
        renderOption={(renderProps, pocopa: string) => {
          const { className, ...props } = renderProps;
          return (
            <li
              className={"mx-1 cursor-pointer rounded p-1 pl-2 [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"}
              {...props}
              key={pocopa}
            >
              {pocopa}
            </li>
          );
        }}
        noOptionsText={<span className="italic">{"Aucun résultat"}</span>}
        disabled={disabled}
      />
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampRecherchePocopas;
