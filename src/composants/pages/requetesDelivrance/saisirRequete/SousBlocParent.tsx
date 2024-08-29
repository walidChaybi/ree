import { DEUX, SEPT, UN } from "@util/Utils";
import { useState } from "react";

interface IChampsParentProps {
  libelle: string;
  element: JSX.Element;
  boutons?: JSX.Element;
}

const ChampsParent: React.FC<IChampsParentProps> = ({
  libelle,
  element,
  boutons
}) => (
  <div className="affichage-ligne-tableau">
    <span className="affichage-cellule-tableau tableau-libelle">{libelle}</span>
    <div className="affichage-cellule-tableau tableau-champs">{element}</div>
    {boutons && <div className="affichage-cellule-tableau">{boutons}</div>}
  </div>
);

interface ISousBlocParentProps {
  suffixe: string;
}

const SousBlocParent: React.FC<ISousBlocParentProps> = ({ suffixe }) => {
  const [nombrePrenoms, setNombrePrenoms] = useState<number>(UN);

  return (
    <>
      <h3>{`Parent ${suffixe}`}</h3>
      <div className="affichage-tableau">
        <ChampsParent
          libelle="Nom de naissance"
          element={<input type="text" />}
        />
        <ChampsParent
          libelle="Prénom"
          element={<input type="text" />}
          boutons={
            nombrePrenoms < DEUX ? (
              <button type="button" onClick={() => setNombrePrenoms(DEUX)}>
                {"Ajouter prénom"}
              </button>
            ) : undefined
          }
        />
        {nombrePrenoms > UN &&
          Array.from({ length: nombrePrenoms - UN }).map((_, index: number) => (
            <ChampsParent
              key={`prenom-parent-${suffixe}-${index}`}
              libelle={`Prénom ${index + DEUX}`}
              element={<input />}
              boutons={
                index === nombrePrenoms - DEUX ? (
                  <>
                    {nombrePrenoms < SEPT && (
                      <button
                        type="button"
                        onClick={() => setNombrePrenoms(nombrePrenoms + UN)}
                      >
                        {"Ajouter prénom"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setNombrePrenoms(nombrePrenoms - UN)}
                    >
                      {"Annuler la saisie"}
                    </button>
                  </>
                ) : undefined
              }
            />
          ))}
      </div>
    </>
  );
};

export default SousBlocParent;
