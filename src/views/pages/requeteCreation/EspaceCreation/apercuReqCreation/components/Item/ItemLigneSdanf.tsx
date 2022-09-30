import { estRenseigne } from "@util/Utils";
import { InfoBulle } from "@widget/infoBulle/InfoBulle";
import React from "react";
import { presenceCorrectionSdanf } from "../Formatages";

interface ItemLigneSdanfProps {
  label?: string;
  texteTitulaire?: string;
  visible?: boolean;
  separateur?: string;
  infoBulleSdanfVisible?: boolean;
  texteSdanf?: any;
}

export const ItemLigneSdanf: React.FC<ItemLigneSdanfProps> = ({
  texteTitulaire,
  visible = estRenseigne(texteTitulaire),
  separateur = ";",
  texteSdanf,
  infoBulleSdanfVisible = presenceCorrectionSdanf(texteSdanf, texteTitulaire),
  ...props
}) => {
  return visible ? (
    <div className="ligne infoBulle">
      <div className={"texte"}>
        {props.label}
        <span className={infoBulleSdanfVisible ? "erreurSdanf" : ""}>
          {infoBulleSdanfVisible ? (
            <>
              <div className="icon" title={texteTitulaire}>
                {texteSdanf}
              </div>
            </>
          ) : (
            texteTitulaire
          )}
        </span>
        <InfoBulle visible={infoBulleSdanfVisible} texte={texteTitulaire} />
      </div>

      <span className="separateur">{separateur}</span>
    </div>
  ) : (
    <></>
  );
};
