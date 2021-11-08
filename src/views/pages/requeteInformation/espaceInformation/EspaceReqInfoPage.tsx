import React from "react";
import { getLibelle } from "../../../common/widget/Text";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { MesRequetesInformationPage } from "./MesRequetesInformation";
import "./scss/EspaceInformationPage.scss";

const EspaceInformationPage: React.FC = () => {
  return (
    <>
      <title>{getLibelle("Espace information")}</title>
      <div>
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <div className="EspaceInformationPage">
                  <h2 className="Titre">
                    {getLibelle("Espace requêtes d'information")}
                  </h2>
                  <MesRequetesInformationPage />
                </div>
              )}
            </>
          )}
        </OfficierContext.Consumer>
      </div>
    </>
  );
};

export default EspaceInformationPage;
