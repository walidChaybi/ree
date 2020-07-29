import React from "react";
import { Text } from "../../../common/widget/Text";
import "./sass/ResumeRequeteContent.scss";
import { IDataTable } from "../MesRequetesPage";
import { TitulaireInformation } from "./TitulaireInformation";

interface ResumeRequeteContentProps {
  requete: IDataTable;
}

export const ResumeRequeteContent: React.FC<ResumeRequeteContentProps> = props => {
  return (
    <>
      <div className="resume-requete-content">
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.sousType"} />
          </div>
          <div className="capital personnal-info">
            <Text
              messageId={`referentiel.sousTypeRequete.long.${props.requete.sousTypeRequete}`}
            />
          </div>
        </div>
        {props.requete.titulaires.map((titulaire, index) => {
          return (
            <TitulaireInformation
              key={`titulaire${index + 1}Information`}
              titulaire={titulaire}
              position={index + 1}
            />
          );
        })}
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.nature"} />
          </div>
          <div className="capital personnal-info">
            <Text
              messageId={`referentiel.natureActe.${props.requete.natureActe}`}
            />
          </div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.dateEvent"} />
          </div>
          <div className="personnal-info">{props.requete.dateCreation}</div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.lieuEvent"} />
          </div>
          <div className="capital personnal-info no-justify-info">{`${props.requete.villeEvenement}, ${props.requete.paysEvenement}`}</div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.motif"} />
          </div>
          <div className="personnal-info no-justify-info">
            {props.requete.motif && (
              <Text messageId={`referentiel.motif.${props.requete.motif}`} />
            )}
          </div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.canal"} />
          </div>
          <div className="capital personnal-info">
            <Text messageId={`referentiel.canal.${props.requete.canal}`} />
          </div>
        </div>
      </div>
      <div className="resume-requete-content">
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.nomRequerant"} />
          </div>
          <div className="capital personnal-info">
            {props.requete.requerant.nomFamille}
          </div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text
              messageId={"pages.delivrance.apercu.resume.prenomRequerant"}
            />
          </div>
          <div className="capital personnal-info">
            {props.requete.requerant.prenom}
          </div>
        </div>
      </div>
    </>
  );
};
