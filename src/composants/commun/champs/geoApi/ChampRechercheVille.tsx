import { CONFIG_GET_COMMUNES, ICommuneDto } from "@api/configurations/adresse/GetCommunesConfigApi";
import { ISaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import Autocomplete from "@mui/material/Autocomplete";
import { useField, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { useDelai } from "../../../../hooks/utilitaires/UseDelai";
import CacheDonneesApiGeo from "../../../../utils/CacheDonneesApiGeo";
import { InputChampRecherche } from "./InputChampRechercheGeo";

const empecherFiltreParDefaut = (options: ICommuneDto[]) => options;

type TChampRechercheVille = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  libelle: string;
  estObligatoire?: boolean;
  cheminChampDepartement?: string;
};

const ChampRechercheVille: React.FC<TChampRechercheVille> = ({
  name,
  libelle,
  className,
  estObligatoire,
  cheminChampDepartement: champARemplir = ""
}) => {
  const { setFieldValue } = useFormikContext<ISaisieRequeteRCTCForm>();
  const [communes, setCommunes] = useState<ICommuneDto[]>([]);
  const [field, meta, helpers] = useField(name);
  const [communeRecherchee, setCommuneRecherchee] = useDelai("", 300);

  const { appelApi: appelGetCommunes, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_COMMUNES);

  const enErreur = useMemo(() => Boolean(meta.error) && meta.touched, [meta.error, meta.touched]);

  useEffect(() => {
    if (!communeRecherchee) {
      setCommunes([]);
      return;
    }

    const communesCache = CacheDonneesApiGeo.getCommunes(communeRecherchee);

    if (Array.isArray(communesCache)) {
      setCommunes(communesCache);

      return;
    }

    appelGetCommunes({
      parametres: { query: { nom: communeRecherchee } },
      apresSucces: communeDtos => {
        CacheDonneesApiGeo.setCommunes(communeRecherchee, communeDtos);
        setCommunes(communeDtos);
      }
    });
  }, [communeRecherchee]);

  return (
    <div className={`relative flex w-full flex-col text-start ${className ?? ""} ${enErreur ? "text-rouge" : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name}
        aria-label={`aria-label-${name}`}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>

      <Autocomplete
        id={name}
        options={communes}
        value={null}
        inputValue={field.value}
        loading={enAttenteDeReponseApi}
        onFocus={() => {
          setCommuneRecherchee(field.value.trim().toLowerCase());
        }}
        loadingText="Recherche en cours..."
        filterOptions={empecherFiltreParDefaut}
        isOptionEqualToValue={(option, value) => option.code === value.code}
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
        onBlur={() => helpers.setValue(field.value.trim())}
        clearOnBlur={false}
        noOptionsText={!field.value ? "Aucun résultat" : `Aucune ville trouvée pour ${field.value}`}
        getOptionLabel={option => option.nom || ""}
        onChange={(_, nouvelleVille: ICommuneDto | null) => {
          if (nouvelleVille) {
            helpers.setValue(nouvelleVille.nom);
            champARemplir && setFieldValue(champARemplir, nouvelleVille.departement.nom);
          }
        }}
        onInputChange={(_, valeurSaisie: string, raison: string) => {
          helpers.setValue(valeurSaisie ?? "");

          if (raison === "input") {
            setCommuneRecherchee(valeurSaisie.trim().toLowerCase() ?? "");
          }
        }}
        renderInput={params => (
          <InputChampRecherche
            enErreur={enErreur}
            error={meta.error}
            {...params}
          />
        )}
        renderOption={(renderProps, commune) => {
          const { ...props } = renderProps;

          return (
            <li
              {...props}
              key={commune.code}
              className="group flex cursor-pointer items-center justify-between border-b border-gray-100 px-3 py-2 last:border-b-0 hover:bg-bleu hover:text-blanc [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"
            >
              <span className="text-md font-semibold normal-case">{commune.nom}</span>
              <span className="text-sm font-semibold normal-case text-gray-500 group-hover:text-gray-200 group-[&.Mui-focused]:text-gray-200">
                {commune.departement.nom} {commune.departement.code && `(${commune.departement.code})`}
              </span>
            </li>
          );
        }}
      />
    </div>
  );
};

export default ChampRechercheVille;
