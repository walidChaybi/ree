import { useRecherchePocopa } from "@hook/pocopa/RecherchePocopaApiHook";
import { Autocomplete } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import { useDelai } from "../../../hooks/utilitaires/UseDelai";

interface IChampRecherchePocopasProps {
  name: string;
  libelle: string;
  optionsRecherchePocopa: IRecherchePocopa;
  delai?: number;
}

interface IRecherchePocopa {
  familleRegistre: string;
  nombreResultatsMax: number;
  estOuvert?: boolean;
}

const ChampRecherchePocopas: React.FC<IChampRecherchePocopasProps> = ({ name, libelle, optionsRecherchePocopa, delai, ...props }) => {
  const [valeurChampAutocomplete, setValeurChampAutocomplete] = useDelai("", delai);

  const [field, meta, helpers] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  const pocopas = useRecherchePocopa(
    valeurChampAutocomplete,
    optionsRecherchePocopa.familleRegistre,
    optionsRecherchePocopa.nombreResultatsMax,
    optionsRecherchePocopa.estOuvert
  );

  const pocopaSelectionnee = useMemo(() => pocopas?.find(pocopa => pocopa === field.value.libelle), [field.value]);

  return (
    <>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
      </label>
      <Autocomplete
        id={name}
        options={pocopas ?? []}
        value={pocopaSelectionnee}
        onChange={(_, valeurSelectionne) => {
          helpers.setValue(valeurSelectionne ?? "");
        }}
        onBlur={e => field.onBlur(e)}
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
        getOptionLabel={(option: string) => option || ""}
        isOptionEqualToValue={pocopa => pocopa === field.value}
      />
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default ChampRecherchePocopas;
