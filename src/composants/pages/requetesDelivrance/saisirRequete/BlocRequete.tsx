import { useState } from "react";
import ConteneurSousFormulaire from "../../../commun/conteneurs/sousFormulaire/ConteneurSousFormulaire";

const BlocRequete = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aComplementMotif, setAComplementMotif] = useState<boolean>(false);

  return (
    <ConteneurSousFormulaire
      titreSousFormulaire="Requête"
      champsSousFormulaire={[
        {
          libelle: "Nature d'acte concerné",
          element: <input type="text" />
        },
        {
          libelle: "Document demandé",
          element: <input type="text" />
        },
        {
          libelle: "Nombre d'exemplaires",
          element: <input type="text" />
        },
        {
          libelle: "Motif",
          element: <input type="text" />
        },
        ...(aComplementMotif
          ? [
              {
                libelle: "Complément motif",
                element: <input type="text" />
              }
            ]
          : [])
      ]}
    />
  );
};

export default BlocRequete;
