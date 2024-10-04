import ConteneurSousFormulaire from "../../../commun/conteneurs/sousFormulaire/ConteneurSousFormulaire";

const BlocsRequerant = () => {
  return (
    <>
      <ConteneurSousFormulaire
        titreSousFormulaire="Identité du requérant"
        champsSousFormulaire={[
          {
            libelle: "Requérant",
            element: <input />
          }
        ]}
      />

      <ConteneurSousFormulaire titreSousFormulaire="Lien avec le titulaire" />

      <ConteneurSousFormulaire
        titreSousFormulaire="Adresse du requérant"
        champsSousFormulaire={[
          {
            libelle: "Complément d’identification du destinataire",
            element: <input />
          },
          {
            libelle: "Complément d’identification du point géographique",
            element: <input />
          },
          {
            libelle: "Numéro, type et nom de la voie",
            element: <input />
          },
          {
            libelle: "Lieu-dit, boite postale ou état/province (à l'étranger)",
            element: <input />
          },
          {
            libelle: "Code postal",
            element: <input />
          },
          {
            libelle: "Commune",
            element: <input />
          },
          {
            libelle: "Pays",
            element: <input />
          },
          {
            libelle: "Adresse courriel du requérant",
            element: <input />
          },
          {
            libelle: "Numéro téléphone du requérant",
            element: <input />
          }
        ]}
      />
    </>
  );
};

export default BlocsRequerant;
