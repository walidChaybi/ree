import React from "react";
import { getLibelle } from "../../../common/widget/Text";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { MesRequetesInformationPage } from "./MesRequetesInformation";

const EspaceInformationPage: React.FC = () => {
  return (
    <>
      <title>{getLibelle("Espace information")}</title>
      <div>
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <MesRequetesInformationPage />
              )}
            </>
          )}
        </OfficierContext.Consumer>
      </div>
    </>
  );
};

export default EspaceInformationPage;
