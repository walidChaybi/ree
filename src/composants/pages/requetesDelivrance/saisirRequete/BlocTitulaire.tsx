import { DEUX, SEPT, UN } from "@util/Utils";
import React, { useState } from "react";
import ConteneurSousFormulaire from "../../../commun/conteneurs/sousFormulaire/ConteneurSousFormulaire";
import SousBlocParent from "./SousBlocParent";

interface IBlocTitulaireProps {
  suffixe: string;
}

const BlocTitulaire: React.FC<IBlocTitulaireProps> = ({ suffixe }) => {
  const [nombrePrenoms, setNombrePrenoms] = useState<number>(UN);
  const [avecNomUsage, setAvecNomUsage] = useState<boolean>(false);
  const [avecFiliation, setAvecFiliation] = useState<boolean>(false);

  return (
    <ConteneurSousFormulaire
      titreSousFormulaire={`Titulaire ${suffixe ?? ""}`.trim()}
      champsSousFormulaire={[
        {
          libelle: "Nom de naissance",
          element: <input type="text" />,
          boutons: (
            <>
              {!avecNomUsage && (
                <button type="button" onClick={() => setAvecNomUsage(true)}>
                  {"Ajouter un nom d'usage"}
                </button>
              )}
            </>
          )
        },
        ...(avecNomUsage
          ? [
              {
                libelle: "Nom d'usage",
                element: <input />,
                boutons: (
                  <button type="button" onClick={() => setAvecNomUsage(false)}>
                    {"Supprimer le nom d'usage"}
                  </button>
                )
              }
            ]
          : []),
        {
          libelle: `Prénom${nombrePrenoms > UN ? ` ${UN}` : ""}`,
          element: <input type="text" />,
          ...(nombrePrenoms < DEUX
            ? {
                boutons: (
                  <button type="button" onClick={() => setNombrePrenoms(DEUX)}>
                    {"Ajouter prénom"}
                  </button>
                )
              }
            : {})
        },
        ...Array.from({ length: nombrePrenoms - UN }).map(
          (_, index: number) => ({
            libelle: `Prénom ${index + DEUX}`,
            element: <input type="text" />,
            ...(index === nombrePrenoms - DEUX
              ? {
                  boutons: (
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
                  )
                }
              : {})
          })
        ),
        {
          libelle: "Sexe",
          element: <input type="text" />
        },
        {
          libelle: "Date et lieu de naissance",
          element: <input type="text" />
        },
        {
          libelle: "Pays de naissance",
          element: <input type="text" />
        },
        {
          libelle: "Nationalité",
          element: <input type="text" />
        }
      ]}
    >
      <button type="button" onClick={() => setAvecFiliation(!avecFiliation)}>
        {avecFiliation ? "Supprimer la filition" : "Ajouter une filiation"}
      </button>
      {avecFiliation && (
        <>
          <SousBlocParent suffixe="1" />
          <SousBlocParent suffixe="2" />
        </>
      )}
    </ConteneurSousFormulaire>
  );
};

export default BlocTitulaire;
