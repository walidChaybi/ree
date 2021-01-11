import React from "react";
import { ITitulaire } from "../../../common/types/RequeteType";
import { Text } from "../../../common/widget/Text";

interface LocalProps {
  titulaire: ITitulaire;
  position: number;
}
export const TitulaireInformation: React.FC<LocalProps> = ({
  titulaire,
  position
}) => {
  return (
    <div className="bloc-titulaire">
      <div className="bloc-info">
        <div className="label">
          <Text
            messageId={`pages.delivrance.apercu.resume.titulaire${position}`}
          />
        </div>
      </div>
      <div className="bloc-info">
        <div className="label sub-label">
          <Text messageId={"pages.delivrance.apercu.resume.nom"} />
        </div>
        <div className="capital personnal-info">{titulaire.nomNaissance}</div>
      </div>
      <div className="bloc-info">
        <div className="label sub-label">
          <Text messageId={"pages.delivrance.apercu.resume.prenom"} />
        </div>
        <div className="capital personnal-info">{titulaire.prenom1}</div>
      </div>
      <div className="bloc-info">
        <div className="label sub-label">
          <Text messageId={"pages.delivrance.apercu.resume.dateNaissance"} />
        </div>
        <div className="capital personnal-info">
          {getDate(
            titulaire.jourNaissance,
            titulaire.moisNaissance,
            titulaire.anneeNaissance
          )}
        </div>
      </div>
    </div>
  );
};

const getDate = (jour?: number, mois?: number, annee?: number): string => {
  let res = "";
  const limiteZeroPrecision = 10;
  if (jour) {
    const jourFormate =
      jour < limiteZeroPrecision ? `0${jour.toString()}` : jour.toString();
    res = `${jourFormate}/`;
  }
  if (mois) {
    const moisFormate =
      mois < limiteZeroPrecision ? `0${mois.toString()}` : mois.toString();
    res = res !== "" ? `${res}${moisFormate}/` : `${moisFormate}/`;
  }
  if (annee) {
    res = res !== "" ? `${res}${annee.toString()}` : annee.toString();
  }
  return res;
};
