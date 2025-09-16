import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { ITypeRegistreDto, TypeRegistre } from "@model/etatcivil/acte/TypeRegistre";
import { EFamilleRegistre, FAMILLES_SANS_POCOPA } from "@model/etatcivil/enum/TypeFamille";
import Autocomplete from "@mui/material/Autocomplete";
import { getIn, useField, useFormikContext } from "formik";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import CacheOptionsTypeRegistre from "../../../utils/CacheOptionsTypeRegistre";
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
  const [typeRegistres, setTypeRegistres] = useState<ITypeRegistreDto[]>([]);
  const { values, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  const { appelApi: appelGetPocopasParFamilleRegistre, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE);

  const valeurFamilleRegistre: keyof typeof EFamilleRegistre = useMemo(
    () => getIn(values, name.split(".").slice(0, -1).concat("familleRegistre").join(".") ?? "") ?? optionsRecherchePocopa.familleRegistre,
    [values]
  );

  const estTypeFamilleMAR = valeurFamilleRegistre === TYPE_FAMILLE_MAR;
  const cheminIdTypeRegistre = useMemo(() => `${name.split(".").slice(0, -1).join(".")}.id`, [name]);

  const typeDeRegistre = useMemo(() => TypeRegistre.getTypeDeRegistre(typeRegistres), [typeRegistres]);

  useEffect(() => {
    if (!valeurFamilleRegistre || [...FAMILLES_SANS_POCOPA, TYPE_FAMILLE_MAR].includes(valeurFamilleRegistre)) {
      setTypeRegistres([]);
      return;
    }

    const typeRegistreEnCache = CacheOptionsTypeRegistre.getTypeRegistresParFamilleRegistre(valeurFamilleRegistre);

    if (Array.isArray(typeRegistreEnCache)) {
      setTypeRegistres(typeRegistreEnCache);
      return;
    }

    appelGetPocopasParFamilleRegistre({
      parametres: {
        path: { familleRegistre: valeurFamilleRegistre },
        query: {
          seulementPocopaOuvert: optionsRecherchePocopa.seulementPocopaOuvert ?? true
        }
      },
      apresSucces: typeRegistreDto => {
        CacheOptionsTypeRegistre.setTypeRegistresParFamilleRegistre(valeurFamilleRegistre, typeRegistreDto);
        setTypeRegistres(TypeRegistre.depuisDtos(typeRegistreDto));
      },
      apresErreur: erreur => {
        console.error("Erreur lors de la récupération des types registres", erreur);
      }
    });
  }, [valeurFamilleRegistre]);

  useLayoutEffect(() => {
    if (estTypeFamilleMAR) {
      helpers.setValue("TR-ACTES");
    }
  }, [typeRegistres]);

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
        options={typeRegistres}
        value={typeRegistres.find(typeRegistre => typeRegistre?.[typeDeRegistre] === field.value) || null}
        loading={enAttenteDeReponseApi}
        getOptionLabel={option => option[typeDeRegistre] ?? ""}
        loadingText="Recherche en cours..."
        onInputChange={(_, nouvelleValeur, raison) => {
          if (raison === "input") {
            helpers.setValue(nouvelleValeur);
          }
        }}
        filterOptions={(options, { inputValue }) => {
          if (!inputValue) return options;
          return options.filter(option => option[typeDeRegistre]?.toLowerCase().startsWith(inputValue.toLowerCase()));
        }}
        isOptionEqualToValue={(option, value) => option[typeDeRegistre] === value[typeDeRegistre]}
        noOptionsText={!field.value ? "Aucun résultat" : `Aucun ${typeDeRegistre} trouvé pour ${field.value}`}
        onChange={(_, valeurSelectionne: ITypeRegistreDto | null) => {
          helpers.setValue(valeurSelectionne?.[typeDeRegistre]);
          typeDeRegistre === "poste" && setFieldValue(cheminIdTypeRegistre, valeurSelectionne?.id ?? "");
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
        renderOption={(renderProps, typeRegistre) => {
          const { ...props } = renderProps;
          return (
            <li
              className="cursor-pointer items-center justify-between border-b border-gray-100 px-3 py-2 last:border-b-0 hover:bg-bleu hover:text-blanc [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"
              {...props}
              key={typeRegistre.id}
            >
              {typeRegistre[typeDeRegistre]}
            </li>
          );
        }}
      />
    </div>
  );
};

export default ChampRecherchePocopas;
