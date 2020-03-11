import React from "react";
import { Text } from "../../../common/widget/Text";
import "./sass/ResumeRequeteContent.scss";
import { IDataTable } from "../RequeteTableauHeaderCell";

interface ResumeRequeteContentProps {
  requete: IDataTable;
}

export const ResumeRequeteContent: React.FC<ResumeRequeteContentProps> = props => {
  return (
    <div className="resume-requete-content">
      <div className="bloc-info">
        <div className="label">
          <Text messageId={"pages.requetes.apercu.resume.raisSoc"} />
        </div>
        <div className="capital personnal-info">{`${props.requete.requerant.nomOuRaisonSociale} ${props.requete.requerant.prenomUsage}`}</div>
      </div>
      <div className="bloc-info">
        <div className="label">
          <Text messageId={"pages.requetes.apercu.resume.dateEvent"} />
        </div>
        <div className="personnal-info">{props.requete.dateCreation}</div>
      </div>
      <div className="bloc-info">
        <div className="label">
          <Text messageId={"pages.requetes.apercu.resume.lieuEvent"} />
        </div>
        <div className="capital personnal-info">{`${props.requete.villeEvenement}, ${props.requete.paysEvenement}`}</div>
      </div>
      {props.requete.titulaires.map(titulaire => {
        return (
          <React.Fragment
            key={`${titulaire.nomUsage}-${titulaire.moisNaissance}-${titulaire.paysNaissance}`}
          >
            <div className="bloc-info">
              <div className="label">
                <Text messageId={"pages.requetes.apercu.resume.titulaire"} />
                {` ${titulaire.position} `}
              </div>
              <div className="capital personnal-info">{`${titulaire.nomNaissance} ${titulaire.prenom1}`}</div>
            </div>
          </React.Fragment>
        );
      })}
      <div className="bloc-info">
        <div className="label">
          <Text messageId={"pages.requetes.apercu.resume.lienTitulaire"} />
        </div>
        <div className="personnal-info">
          <Text
            messageId={`referentiel.sousQualiteRequerant.${props.requete.requerant.typeRequerant}`}
          />
        </div>
      </div>
    </div>
  );
};
