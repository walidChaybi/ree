import { ArrowBack } from "@mui/icons-material";
import { Autocomplete } from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import { IMentionForm, ITypeMentionDisponible } from "../MentionForm";

/* v8 ignore start */
interface IChampTypeMentionProps {
  name: string;
  typesMentionDisponibles: ITypeMentionDisponible[];
  setIdTypeMentionChoisi: (id: string) => void;
}

const CLASSES_OPTION_SELECTIONNABLE = "cursor-pointer [&.Mui-focused]:bg-bleu [&.Mui-focused]:text-blanc rounded";

const getClassesOption = (typeMention: ITypeMentionDisponible, estActive: boolean, listeOuverte: string) => {
  let classesOption = "py-1 mx-1 text-start";

  switch (true) {
    case typeMention.avecEnfants && !typeMention.parents.parent1:
      classesOption = `${classesOption} pl-1 font-bold  ${CLASSES_OPTION_SELECTIONNABLE}`;
      break;
    case typeMention.avecEnfants && !!typeMention.parents.parent1:
      classesOption = `${classesOption} pl-10 font-bold`;
      break;
    case !typeMention.avecEnfants && !!typeMention.parents.parent2:
      classesOption = `${classesOption} pl-16 ${CLASSES_OPTION_SELECTIONNABLE}`;
      break;
    case !typeMention.avecEnfants && !!typeMention.parents.parent1:
      classesOption = `${classesOption} pl-10 ${CLASSES_OPTION_SELECTIONNABLE}`;
      break;
    default:
      classesOption = `${classesOption} pl-1 ${CLASSES_OPTION_SELECTIONNABLE}`;
  }

  if (
    (typeMention.parents.parent1 && listeOuverte !== typeMention.parents.parent1) ||
    (listeOuverte && !typeMention.parents.parent1 && typeMention.id !== listeOuverte)
  ) {
    classesOption = `${classesOption} hidden`;
  }

  return `${classesOption} ${estActive ? "bg-bleu-transparent" : ""}`.trim();
};

const formaterMentionSelectionne = (typeMention: ITypeMentionDisponible) => {
  let numeroMention = /^[ab\d-]{1,8}\s/.exec(typeMention.libelle)?.[0] ?? "";
  if (!numeroMention) {
    numeroMention = /^[\d-]{1,8}\s/.exec(typeMention.libellesParents[0] ?? "")?.[0] ?? "";
  }

  const libelleParents = typeMention.libellesParents.map(libelle => libelle.replace(/^[\d\-&\sà]{1,15}\s/, "")).join(" - ");

  return `${numeroMention.trim()} ${libelleParents}${libelleParents ? " - " : ""}${typeMention.libelle.replace(/^[ab\d-]{1,8}\s/, "")}`.trim();
};

const ChampTypeMention: React.FC<IChampTypeMentionProps> = ({ name, typesMentionDisponibles, setIdTypeMentionChoisi }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<IMentionForm>();
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);
  const [listeOuverte, setListeOuverte] = useState<string>("");

  useEffect(() => {
    const valeurChamp = field.value;
    switch (true) {
      case !valeurChamp && Boolean(listeOuverte):
        setListeOuverte("");
        break;
      case Boolean(valeurChamp) && !listeOuverte:
        setListeOuverte(typesMentionDisponibles.find(typeMention => typeMention.id === field.value)?.parents.parent1 ?? "");
        break;
      default:
        break;
    }

    setIdTypeMentionChoisi(valeurChamp);
  }, [field.value]);

  return (
    <div className="mx-auto w-[94%]">
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name}
      >
        {"Type mention"}
      </label>

      <Autocomplete
        options={typesMentionDisponibles}
        value={typesMentionDisponibles.find(typeMention => typeMention.id === field.value) ?? null}
        disablePortal
        getOptionLabel={(typeMention: ITypeMentionDisponible) => typeMention.libelle}
        renderInput={params => {
          let { value: valeur, className, ...props } = params.inputProps;
          if (valeur) {
            const typeMentionSelectionne = typesMentionDisponibles.find(typeMention => typeMention.libelle === valeur);
            typeMentionSelectionne && (valeur = formaterMentionSelectionne(typeMentionSelectionne));
          }

          return (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                id={name}
                placeholder={"Recherche..."}
                value={valeur}
                className={`border-1 flex w-[98%] flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
                {...props}
                onKeyDown={event => {
                  if (event.key === "ArrowLeft" && listeOuverte) {
                    setListeOuverte("");

                    return;
                  }

                  if (event.key !== "Enter") {
                    return;
                  }

                  const idTapee = event.currentTarget.getAttribute("aria-activedescendant");
                  if (!idTapee) {
                    return;
                  }
                  const idType = document.getElementById(idTapee)?.getAttribute("data-idtype");
                  if (!idType) {
                    return;
                  }

                  setListeOuverte(prec => (prec === idType ? "" : idType));
                }}
              />
            </div>
          );
        }}
        renderOption={(renderProps, option: ITypeMentionDisponible) => {
          const { className, onClick, ...autresProps } = renderProps;
          const gestionClick = option.avecEnfants ? () => setListeOuverte(prec => (prec === option.id ? "" : option.id)) : onClick;
          const propsOption =
            (option.parents.parent1 && option.avecEnfants) || (listeOuverte && !option.parents.parent1 && listeOuverte !== option.id)
              ? {}
              : { ...autresProps, onClick: gestionClick };

          return !(option.parents.parent1 && listeOuverte !== option.parents.parent1) ? (
            <li
              key={option.id}
              className={getClassesOption(option, Boolean(autresProps["aria-selected"]), listeOuverte)}
              data-idtype={option.avecEnfants ? option.id : ""}
              {...propsOption}
            >
              <div className="flex items-center gap-1">
                {Boolean(listeOuverte) && !option.parents.parent1 && <ArrowBack fontSize="small" />}
                {option.libelle}
              </div>
            </li>
          ) : (
            <></>
          );
        }}
        filterOptions={(options, state) => {
          const valeurSaisie = state.inputValue.trim().toLowerCase();
          const estRechercheLibre = !/^[\d-]+$/.exec(valeurSaisie)?.length;

          const comparerValeurs = (valeur: string) =>
            estRechercheLibre ? valeur.toLowerCase().includes(valeurSaisie) : valeur.toLowerCase().startsWith(valeurSaisie);

          return options.filter(
            option =>
              comparerValeurs(option.libelle) ||
              option.libellesEnfants.some(libelleEnfant => comparerValeurs(libelleEnfant)) ||
              option.libellesParents.some(libelleParent => comparerValeurs(libelleParent))
          );
        }}
        getOptionDisabled={option => !option.parents.parent1 && option.avecEnfants}
        disabledItemsFocusable
        onChange={(_, valeur) => setFieldValue(name, valeur?.avecEnfants ? "" : (valeur?.id ?? ""))}
      />

      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampTypeMention;
/* v8 ignore end */
