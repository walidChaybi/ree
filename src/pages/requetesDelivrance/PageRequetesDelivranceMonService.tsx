import React from "react";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsActionRequetesDelivrance from "../../composants/pages/requetesDelivrance/BoutonsActionRequetesDelivrance";

const PageRequetesDelivranceMonService: React.FC = () => {
  return (
    <div>
      <OngletsLien
        liens={[
          { url: "/rece/rece-ui/mes-requetes", libelle: "Mes requêtes" },
          { libelle: "Les requêtes de mon service" }
        ]}
      />
      <BoutonsActionRequetesDelivrance />
    </div>
  );
};

export default PageRequetesDelivranceMonService;
