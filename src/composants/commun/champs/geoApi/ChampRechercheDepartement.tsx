import { CONFIG_GET_DEPARTEMENT, IDepartementDto } from "@api/configurations/adresse/GetDepartementsConfigApi";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";
import { useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { useDelai } from "../../../../hooks/utilitaires/UseDelai";
import CacheDonneesApiGeo from "../../../../utils/CacheDonneesApiGeo";
import { InputChampRecherche } from "./InputChampRechercheGeo";

const empecherFiltreParDefaut = (options: IDepartementDto[]) => options;

type TChampRechercheDepartement = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  estObligatoire?: boolean;
};

const ChampRechercheDepartement: React.FC<TChampRechercheDepartement> = ({ name, libelle, className, estObligatoire }) => {
  const [departements, setDepartements] = useState<IDepartementDto[]>([]);
  const [field, meta, helpers] = useField(name as string);
  const [departementRecherche, setDepartementRecherche] = useDelai("", 300);

  const enErreur = useMemo(() => Boolean(meta.error) && meta.touched, [meta.error, meta.touched]);

  const { appelApi: appelGetDepartement, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_DEPARTEMENT);

  useEffect(() => {
    if (!departementRecherche) {
      setDepartements([]);
      return;
    }

    const departementsCache = CacheDonneesApiGeo.getDepartements(departementRecherche);
    if (Array.isArray(departementsCache)) {
      setDepartements(departementsCache);

      return;
    }

    appelGetDepartement({
      parametres: { query: { nom: departementRecherche } },
      apresSucces: departementDtos => {
        CacheDonneesApiGeo.setDepartements(departementRecherche, departementDtos);
        setDepartements(departementDtos);
      }
    });
  }, [departementRecherche]);

  return (
    <div className={`relative flex w-full flex-col text-start ${className ?? ""} ${enErreur ? "text-rouge" : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>

      <Autocomplete
        id={name as string}
        options={departements}
        value={null}
        inputValue={field.value}
        loading={enAttenteDeReponseApi}
        loadingText="Recherche en cours..."
        onBlur={() => helpers.setValue(field.value.trim())}
        clearOnBlur={false}
        noOptionsText={!field.value ? "Aucun résultat" : `Aucun département trouvé pour ${field.value}`}
        getOptionLabel={option => option.nom || ""}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        filterOptions={empecherFiltreParDefaut}
        onFocus={() => {
          setDepartementRecherche(field.value.trim().toLowerCase());
        }}
        onChange={(_, nouveauDepartement: IDepartementDto | null) => {
          if (nouveauDepartement) {
            helpers.setValue(nouveauDepartement.nom);
          }
        }}
        onInputChange={(_, valeurSaisie: string, raison: string) => {
          helpers.setValue(valeurSaisie ?? "");

          if (raison === "input") {
            setDepartementRecherche(valeurSaisie.trim().toLowerCase() ?? "");
          }
        }}
        disablePortal={true}
        slotProps={{
          popper: {
            sx: {
              "& .MuiAutocomplete-listbox": {
                padding: 0
              }
            },
            modifiers: [
              {
                name: "flip",
                enabled: false
              }
            ]
          }
        }}
        renderInput={params => (
          <InputChampRecherche
            enErreur={enErreur}
            error={meta.error}
            {...params}
          />
        )}
        renderOption={(renderProps, departement) => {
          const { className, ...props } = renderProps;
          return (
            <li
              {...props}
              key={departement.code}
              className="group flex cursor-pointer items-center justify-between border-b border-gray-100 px-2 py-1 last:border-b-0 hover:bg-bleu hover:text-blanc [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"
            >
              <span className="text-md font-semibold normal-case">{departement.nom}</span>
              <span className="text-sm font-semibold normal-case text-gray-500 group-hover:text-gray-200 group-[&.Mui-focused]:text-gray-200">
                {departement.code}
              </span>
            </li>
          );
        }}
      />
    </div>
  );
};

export default ChampRechercheDepartement;
