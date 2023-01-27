import { chainesEgalesIgnoreCasse, estRenseigne } from "@util/Utils";
import { InfoBulle } from "@widget/infoBulle/InfoBulle";
import React from "react";
import { presenceCorrectionSdanf } from "../Formatages";

interface ItemLigneSdanfProps {
  label?: string;
  texteTitulaire?: string;
  visible?: boolean;
  separateur?: string;
  separateurVisible?: boolean;
  infoBulleSdanfVisible?: boolean;
  texteSdanf?: any;
}

export const ItemLigneSdanf: React.FC<ItemLigneSdanfProps> = ({
  texteTitulaire,
  texteSdanf,
  visible = estRenseigne(texteTitulaire) || estRenseigne(texteSdanf),
  separateur = ";",
  separateurVisible = true,
  infoBulleSdanfVisible = presenceCorrectionSdanf(texteSdanf, texteTitulaire),
  ...props
}) => {
  return visible ? (
    <div className="ligne infoBulle">
      <div className={"texte"}>
        {props.label}
        <span className="separateur">{separateurVisible && separateur}</span>
        <span
          className={
            infoBulleSdanfVisible && estRenseigne(texteTitulaire)
              ? "erreurSdanf"
              : ""
          }
        >
          {infoBulleSdanfVisible ? (
            <>
              <div className="icon" title={texteTitulaire}>
                {texteSdanf}
              </div>
            </>
          ) : chainesEgalesIgnoreCasse(texteTitulaire, texteSdanf) ? (
            texteSdanf
          ) : (
            texteTitulaire
          )}
        </span>
        <InfoBulle
          visible={infoBulleSdanfVisible && estRenseigne(texteTitulaire)}
          texte={texteTitulaire}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
