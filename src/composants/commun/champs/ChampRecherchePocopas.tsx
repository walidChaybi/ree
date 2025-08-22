import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";
import { EFamilleRegistre, FAMILLES_SANS_POCOPA } from "@model/etatcivil/enum/TypeFamille";
import Autocomplete from "@mui/material/Autocomplete";
import { getIn, useField, useFormikContext } from "formik";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import CacheOptionsPocopa from "../../../utils/CacheOptionsPocopa";
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

const TYPE_FAMILLE_MAR: keyof typeof EFamilleRegistre = "MAR";

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

  const valeurFamilleRegistre: keyof typeof EFamilleRegistre = useMemo(
    () => getIn(values, name.split(".").slice(0, -1).concat("familleRegistre").join(".") ?? "") ?? optionsRecherchePocopa.familleRegistre,
    [values]
  );

  const estTypeFamilleMAR = useMemo(() => valeurFamilleRegistre === TYPE_FAMILLE_MAR, [valeurFamilleRegistre]);

  useEffect(() => {
    if (!valeurFamilleRegistre || [...FAMILLES_SANS_POCOPA, TYPE_FAMILLE_MAR].includes(valeurFamilleRegistre)) {
      setPocopas([]);
      return;
    }

    const pocopasCache = CacheOptionsPocopa.getPocopasFamilleRegistre(valeurFamilleRegistre);

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
        CacheOptionsPocopa.setPocopasFamilleRegistre(valeurFamilleRegistre, pocopaDtos);

        setPocopas(pocopaDtos);
      },
      apresErreur: erreur => {
        console.error("Une erreur est survenue lors de la récupération des pocopas", erreur);
      }
    });
  }, [valeurFamilleRegistre]);

  useLayoutEffect(() => {
    if (estTypeFamilleMAR) {
      helpers.setValue("TR-ACTES");
    }
  }, [pocopas]);

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
        loading={enAttenteDeReponseApi}
        getOptionLabel={option => option.pocopa ?? ""}
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
        readOnly={estTypeFamilleMAR}
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
