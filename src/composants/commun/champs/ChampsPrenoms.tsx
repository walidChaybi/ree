import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { DEUX, QUINZE, UN } from "@util/Utils";
import { FormikValues, useFormikContext } from "formik";
import { useMemo } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import "./ChampsPrenoms.scss";
import ChampsTexte from "./ChampsTexte";

interface IChampsPrenomsProps {
  cheminPrenoms: string;
  prefixePrenom: string;
}

const MAX_PRENOMS = QUINZE;

const compterPrenoms = (valeurs: FormikValues, cheminPrenoms: string) => {
  const objetPrenoms = cheminPrenoms
    .split(".")
    .filter(partieChemin => partieChemin)
    .reduce(
      (valeur: FormikValues, partieChemin: string) =>
        valeur[partieChemin] ?? {},
      valeurs
    );

  return Object.values(objetPrenoms).filter(
    prenom => typeof prenom === "string"
  ).length;
};

const ChampsPrenoms: React.FC<IChampsPrenomsProps> = ({
  cheminPrenoms,
  prefixePrenom
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const nombrePrenoms = useMemo(
    () => compterPrenoms(values, cheminPrenoms),
    [values, cheminPrenoms]
  );

  const ajouterChampsPrenom = () => {
    if (nombrePrenoms >= MAX_PRENOMS) {
      return;
    }

    setFieldValue(
      `${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${
        nombrePrenoms + UN
      }`,
      ""
    );
  };

  const supprimerChampsPrenom = () => {
    if (nombrePrenoms <= UN) {
      return;
    }

    setFieldValue(
      `${
        cheminPrenoms ? `${cheminPrenoms}.` : ""
      }${prefixePrenom}${nombrePrenoms}`,
      undefined
    );
  };

  return (
    <div className="conteneur-champs-prenoms">
      <div className="champs-prenom">
        <ChampsTexte
          name={`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}1`}
          libelle={`Prénom ${nombrePrenoms > UN ? "1" : ""}`.trim()}
          type="text"
        />

        {nombrePrenoms < DEUX && (
          <BoutonIcon
            className="bouton-prenom"
            type="button"
            title="Ajouter un prénom"
            onClick={() => ajouterChampsPrenom()}
          >
            <Add />
          </BoutonIcon>
        )}
      </div>

      {Array.from({ length: nombrePrenoms - UN }).map((_, index) => (
        <div
          key={`prenom${index}`} /** NOSONAR index non important pour le lifecycle */
          className="champs-prenom"
        >
          <ChampsTexte
            name={`${cheminPrenoms ? `${cheminPrenoms}.` : ""}${prefixePrenom}${
              index + DEUX
            }`}
            libelle={`Prénom ${index + DEUX}`}
          />

          {index === nombrePrenoms - DEUX && (
            <>
              {nombrePrenoms < MAX_PRENOMS && (
                <BoutonIcon
                  className="bouton-prenom"
                  type="button"
                  title="Ajouter un prénom"
                  onClick={() => ajouterChampsPrenom()}
                >
                  <Add />
                </BoutonIcon>
              )}

              <BoutonIcon
                className="bouton-prenom"
                type="button"
                title="Annuler la saisie"
                onClick={() => supprimerChampsPrenom()}
                danger
              >
                <Delete />
              </BoutonIcon>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChampsPrenoms;
