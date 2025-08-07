import { CONFIG_GET_ADRESSES, IAdresseDto } from "@api/configurations/adresse/GetAdressesConfigApi";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import Autocomplete from "@mui/material/Autocomplete";
import { useField, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { useDelai } from "../../../../hooks/utilitaires/UseDelai";
import CacheDonneesApiGeo from "../../../../utils/CacheDonneesApiGeo";
import { InputChampRecherche } from "./InputChampRechercheGeo";

type TChampRechercheAdresse = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  libelle: string;
  estObligatoire?: boolean;
  cheminChampVille?: string;
  cheminChampDepartement?: string;
};

const ChampRechercheAdresse: React.FC<TChampRechercheAdresse> = ({
  name,
  libelle,
  className,
  estObligatoire,
  cheminChampVille = "",
  cheminChampDepartement = ""
}) => {
  const { setFieldValue } = useFormikContext<IProjetActeTranscritForm>();
  const [adresses, setAdresses] = useState<IAdresseDto[]>([]);
  const [field, meta, helpers] = useField(name);
  const [adresseRecherchee, setAdresseRecherchee] = useDelai("");

  const { appelApi: appelGetAdresses, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_ADRESSES);

  const enErreur = useMemo(() => Boolean(meta.error) && meta.touched, [meta.error, meta.touched]);

  useEffect(() => {
    if (!adresseRecherchee || adresseRecherchee.length < 3) {
      setAdresses([]);
      return;
    }

    const adressesCache = CacheDonneesApiGeo.getAdresses?.(adresseRecherchee);

    if (Array.isArray(adressesCache)) {
      setAdresses(adressesCache);
      return;
    }

    appelGetAdresses({
      parametres: {
        query: {
          q: adresseRecherchee,
          limit: 10
        }
      },
      apresSucces: ({ features: adresses }) => {
        CacheDonneesApiGeo.setAdresses?.(
          adresseRecherchee,
          adresses.filter(adresse => adresse.properties.type !== "municipality")
        );
        setAdresses(adresses.filter(adresse => adresse.properties.type !== "municipality"));
      },
      apresErreur: () => {
        setAdresses([]);
      }
    });
  }, [adresseRecherchee]);

  return (
    <div className={`relative flex w-full flex-col text-start ${className} ${enErreur ? "text-rouge" : ""}`}>
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
        options={adresses}
        value={null}
        inputValue={field.value}
        loading={enAttenteDeReponseApi}
        loadingText="Recherche en cours..."
        filterOptions={options => options}
        isOptionEqualToValue={(option, value) => option.properties.id === value.properties.id}
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
        noOptionsText={field.value.length < 3 ? "Saisissez au moins 3 caractères" : `Aucune adresse trouvée pour ${field.value}`}
        getOptionLabel={option => option.properties?.label ?? ""}
        onFocus={() => field.value.length >= 3 && setAdresseRecherchee(field.value.trim())}
        onChange={(_, nouvelleAdresse) => {
          if (!nouvelleAdresse) return;
          const { properties } = nouvelleAdresse;
          helpers.setValue(properties.name || properties.label);
          cheminChampVille && setFieldValue(cheminChampVille, properties.city);
          cheminChampDepartement && setFieldValue(cheminChampDepartement, properties.context.split(",")[1]?.trim() || "");
        }}
        onInputChange={(_, valeurSaisie: string, raison: string) => {
          helpers.setValue(valeurSaisie ?? "");

          if (raison === "input") {
            setAdresseRecherchee(valeurSaisie.trim().toLowerCase() ?? "");
          }
        }}
        renderInput={params => (
          <InputChampRecherche
            enErreur={enErreur}
            error={meta.error}
            {...params}
          />
        )}
        renderOption={(renderProps, adresse) => (
          <li
            {...renderProps}
            key={adresse.properties.id}
            className="group flex cursor-pointer flex-col px-3 py-2 last:border-b-0 hover:bg-bleu hover:text-blanc [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc"
          >
            <span className="text-md font-semibold normal-case">{adresse.properties.label}</span>
          </li>
        )}
      />
    </div>
  );
};

export default ChampRechercheAdresse;
