import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import AddCircle from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import { DEUX, QUINZE, UN } from "@util/Utils";
import { FormikValues, useFormikContext } from "formik";
import { useMemo } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

interface IChampsPrenomsProps {
  cheminPrenoms: string;
  prefixePrenom: string;
}

const MAX_PRENOMS = QUINZE;

const compterPrenoms = (valeurs: FormikValues, cheminPrenoms: string) => {
  const objetPrenoms = cheminPrenoms
    .split(".")
    .filter(partieChemin => partieChemin)
    .reduce((valeur: FormikValues, partieChemin: string) => valeur[partieChemin] ?? {}, valeurs);
  return Object.values(objetPrenoms).filter(prenom => typeof prenom === "string").length;
};

const ChampsPrenoms: React.FC<IChampsPrenomsProps> = ({ cheminPrenoms, prefixePrenom }) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const nombrePrenoms = useMemo(() => compterPrenoms(values, cheminPrenoms), [values, cheminPrenoms]);

  const ajouterChampsPrenom = () => {
    if (nombrePrenoms >= MAX_PRENOMS) return;
    setFieldValue(`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${nombrePrenoms + UN}`, "");
  };

  const getPrenom = (index: number) => {
    return ObjetFormulaire.recupererValeur({
      valeurs: values,
      cleAttribut: `${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${index}`
    });
  };

  const supprimerPrenom = (indexASupprimer: number) => {
    for (let i = indexASupprimer; i < nombrePrenoms; i++) {
      const prochainPrenom = getPrenom(i + 1);
      setFieldValue(`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${i}`, prochainPrenom);
    }
    setFieldValue(`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${nombrePrenoms}`, undefined);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-end gap-4">
        <ChampTexte
          name={`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}1`}
          libelle={`Prénom ${nombrePrenoms > UN ? "1" : ""}`.trim()}
          type="text"
          className="w-full"
        />
      </div>
      <div className="flex items-end">
        <BoutonIcon
          type="button"
          title="Ajouter un prénom"
          onClick={() => ajouterChampsPrenom()}
          disabled={nombrePrenoms >= MAX_PRENOMS}
          styleBouton="principal"
        >
          <div className="flex items-center gap-4 px-2">
            <AddCircle />
            <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un prénom"}</span>
          </div>
        </BoutonIcon>
      </div>
      {Array.from({ length: nombrePrenoms - UN }).map((_, index) => (
        <div
          key={`prenom${index}`}
          className="flex items-end gap-4"
        >
          <ChampTexte
            name={`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${index + DEUX}`}
            libelle={`Prénom ${index + DEUX}`}
            className="w-full"
            boutonChamp={{
              composant: (
                <BoutonIcon
                  className="group absolute right-0 h-full rounded-l-none bg-transparent"
                  type="button"
                  title="Supprimer ce prénom"
                  onClick={() => supprimerPrenom(index + DEUX)}
                  styleBouton="suppression"
                >
                  <Delete className="text-rouge group-hover:text-blanc" />
                </BoutonIcon>
              )
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChampsPrenoms;
