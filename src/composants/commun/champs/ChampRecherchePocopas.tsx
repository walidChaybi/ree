import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { ITypeRegistreDto } from "@model/etatcivil/acte/ITypeRegistre";
import Autocomplete from "@mui/material/Autocomplete";
import { getIn, useField, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import CacheDonneesPocopa from "../../../utils/CacheDonneesPocopa";
import { InputChampRecherche } from "./geoApi/InputChampRechercheGeo";

type TChampRecherchePocopasProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  libelle: string;
  optionsRecherchePocopa: IRecherchePocopa;
  disabled?: boolean;
  estObligatoire?: boolean;
};

interface IRecherchePocopa {
  familleRegistre: string;
  seulementPocopaOuvert: boolean;
}

const ChampRecherchePocopas: React.FC<TChampRecherchePocopasProps> = ({
  name,
  libelle,
  optionsRecherchePocopa,
  className,
  disabled,
  estObligatoire
}) => {
  const [pocopas, setPocopas] = useState<ITypeRegistreDto[]>([]);
  const { values } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  const { appelApi: appelGetPocopasParFamilleRegistre, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE);

  const valeurFamilleRegistre = useMemo(
    () => getIn(values, name.split(".").slice(0, -1).concat("familleRegistre").join(".") ?? "") ?? optionsRecherchePocopa.familleRegistre,
    [values]
  );

  useEffect(() => {
    if (!valeurFamilleRegistre) return;
    const pocopasCache = CacheDonneesPocopa.getPocopasFamilleRegistre(valeurFamilleRegistre);

    if (Array.isArray(pocopasCache)) {
      setPocopas(pocopasCache);

      return;
    }

    appelGetPocopasParFamilleRegistre({
      parametres: {
        path: {
          familleRegistre: valeurFamilleRegistre
        },
        query: {
          seulementPocopaOuvert: optionsRecherchePocopa.seulementPocopaOuvert ?? true
        }
      },
      apresSucces: pocopaDtos => {
        CacheDonneesPocopa.setPocopasFamilleRegistre(valeurFamilleRegistre, pocopaDtos);

        setPocopas(pocopaDtos);
      },
      apresErreur: erreur => {
        console.error("Une erreur est survenue lors de la récupération des pocopas", erreur);
      }
    });
  }, [valeurFamilleRegistre]);

  return (
    <div className={`relative flex w-full flex-col text-start ${className ?? ""} ${enErreur ? "text-rouge" : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>

      <Autocomplete
        id={name}
        options={pocopas}
        value={pocopas.find(p => p.pocopa === field.value) || null}
        inputValue={field.value}
        loading={enAttenteDeReponseApi}
        getOptionLabel={option => option.pocopa || ""}
        loadingText="Recherche en cours..."
        onInputChange={(_, nouvelleValeur, raison) => {
          if (raison === "input") {
            helpers.setValue(nouvelleValeur);
          }
        }}
        filterOptions={(options, { inputValue }) => {
          if (!inputValue) return options;
          return options.filter(option => option.pocopa.toLowerCase().startsWith(inputValue.toLowerCase()));
        }}
        isOptionEqualToValue={(option, value) => option.pocopa === value.pocopa}
        noOptionsText={!field.value ? "Aucun résultat" : `Aucun pocopa trouvé pour ${field.value}`}
        onChange={(_, valeurSelectionne: ITypeRegistreDto | null) => {
          helpers.setValue(valeurSelectionne?.pocopa);
        }}
        disabled={disabled}
        componentsProps={{
          popper: {
            sx: {
              "& .MuiAutocomplete-listbox": {
                padding: 0
              }
            }
          }
        }}
        renderInput={params => (
          <InputChampRecherche
            enErreur={enErreur}
            error={meta.error}
            {...params}
          />
        )}
        renderOption={(renderProps, pocopa) => {
          const { ...props } = renderProps;

          return (
            <li
              className="cursor-pointer items-center justify-between border-b border-gray-100 px-3 py-2 last:border-b-0 hover:bg-bleu hover:text-blanc [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"
              {...props}
              key={pocopa.id}
            >
              {pocopa.pocopa}
            </li>
          );
        }}
      />
    </div>
  );
};

export default ChampRecherchePocopas;
