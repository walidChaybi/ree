import Autocomplete from "@mui/material/Autocomplete";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { OPTION_VIDE, Option } from "@util/Type";
import { IconeCroix } from "@widget/icones/IconeCroix";
import { useField } from "formik";
import "./ChampRecherche.scss";

export interface IChampRechercheProps {
  name: string;
  options: Option[];
  disabled?: boolean;
  onInput?: (value: string | null) => void;
  onChange?: (option?: Option) => void;
  filterOptions?: (options: Option[], state: FilterOptionsState<Option>) => Option[];
  optionsValidesNonAffichees?: Option[];
  noOptionsText?: string;
  seulementCle?: boolean;
}

const ChampRecherche: React.FC<IChampRechercheProps> = ({
  name,
  options,
  disabled,
  onInput,
  onChange,
  filterOptions,
  optionsValidesNonAffichees,
  noOptionsText,
  seulementCle,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Autocomplete
        id={name}
        data-testid={name}
        options={[OPTION_VIDE, ...options]}
        value={seulementCle ? options.find(option => option.cle === field.value) : field.value}
        renderInput={params => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              data-testid="inputChampRecherche"
              placeholder={"Recherche..."}
              {...params.inputProps}
            />
            {!disabled && (
              <IconeCroix
                onClick={() => helpers.setValue(OPTION_VIDE)}
                title={"Vider le champ"}
              />
            )}
          </div>
        )}
        renderOption={(renderProps, option: Option) =>
          option.cle.length ? (
            <li
              {...renderProps}
              key={option.cle}
            >
              {option.libelle}
            </li>
          ) : (
            <></>
          )
        }
        onChange={(_, newValue) => {
          onChange?.(newValue ?? undefined);
          const cle = newValue?.cle ?? "";
          helpers.setValue(seulementCle ? cle : newValue);
        }}
        onInputChange={(_, newInputValue) => {
          onInput?.(newInputValue || null);
        }}
        autoHighlight={true}
        disablePortal={false}
        disabled={disabled ?? false}
        className="Autocomplete"
        filterOptions={filterOptions}
        noOptionsText={noOptionsText ?? "Aucun résultat"}
        getOptionLabel={(option: Option) => option.libelle || ""}
        isOptionEqualToValue={(option: Option, value) => {
          const cle = seulementCle ? value : value.cle;

          return option.cle === cle || optionsValidesNonAffichees?.some(optionNonAffichee => optionNonAffichee.cle === cle) || false;
        }}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
export default ChampRecherche;
