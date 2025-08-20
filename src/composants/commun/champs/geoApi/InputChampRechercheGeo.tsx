import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import { MdSearch } from "react-icons/md";

export const InputChampRecherche: React.FC<AutocompleteRenderInputParams & { enErreur: boolean; error?: string }> = ({
  inputProps,
  InputProps,
  enErreur,
  error
}) => {
  const { className, ...props } = inputProps;

  return (
    <>
      <div
        ref={InputProps.ref}
        className={`flex items-center rounded-md border border-solid px-2 py-1 transition-colors focus-within:ring-2 focus-within:ring-opacity-70 ${
          enErreur ? "border-rouge focus-within:ring-rouge" : "border-gris focus-within:ring-bleu"
        }`}
      >
        <MdSearch
          className="text-xl text-gris"
          aria-hidden
        />
        <input
          className="flex-grow border-none bg-transparent p-0 pl-1 read-only:bg-gris-clair focus:border-none focus:outline-none focus:ring-0"
          type="text"
          placeholder="Recherche..."
          {...props}
        />
      </div>
      {enErreur && (
        <div
          className="mt-1 text-sm text-rouge"
          role="alert"
        >
          {error}
        </div>
      )}
    </>
  );
};
