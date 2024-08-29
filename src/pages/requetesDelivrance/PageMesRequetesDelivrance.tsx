import React from "react";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsActionRequetesDelivrance from "../../composants/pages/requetesDelivrance/BoutonsActionRequetesDelivrance";
import TableauMesRequetesDelivrance from "../../composants/pages/requetesDelivrance/mesRequetes/TableauMesRequetesDelivrance";

const PageMesRequetesDelivrance: React.FC = () => {
  return (
    <div>
      <OngletsLien
        liens={[
          { libelle: "Mes requêtes" },
          {
            url: "/rece/rece-ui/requetes-service",
            libelle: "Les requêtes de mon service"
          }
        ]}
      />
      <BoutonsActionRequetesDelivrance />

      <TableauMesRequetesDelivrance />
    </div>
  );
};

export default PageMesRequetesDelivrance;
