import React from "react";
import { Text } from "../../../common/widget/Text";
import "./sass/ResumeRequeteContent.scss";
import { IDataTable } from "../MesRequetesPage";
import { TitulaireInformation } from "./TitulaireInformation";
import { QualiteRequerant } from "../../../../model/requete/QualiteRequerant";

export interface ResumeRequeteContentProps {
  requete: IDataTable;
}

export const ResumeRequeteContent: React.FC<ResumeRequeteContentProps> = props => {
  const dataRequerant = props.requete.requerant;
  let valueNomRequerant = "";
  let valuePrenomRequerant = "";

  if (dataRequerant.qualiteRequerant === QualiteRequerant.MandataireHabilite) {
    valueNomRequerant = `${dataRequerant.raisonSociale}`;
  } else if (
    dataRequerant.qualiteRequerant === QualiteRequerant.Institutionnel
  ) {
    valueNomRequerant = `${dataRequerant.nomInstitutionnel}`;
  } else if (dataRequerant.qualiteRequerant === QualiteRequerant.Particulier) {
    valueNomRequerant = `${dataRequerant.nomFamille}`;
    valuePrenomRequerant = `${dataRequerant.prenom}`;
  }

  let jourEvent =
    props.requete.jourEvenement < 10
      ? "0" + props.requete.jourEvenement
      : props.requete.jourEvenement;
  let moisEvent =
    props.requete.moisEvenement < 10
      ? "0" + props.requete.moisEvenement
      : props.requete.moisEvenement;

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
          <div className="personnal-info">
            {`${jourEvent}/${moisEvent}/${props.requete.anneeEvenement}`}
          </div>
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
            {props.requete.motifRequete && (
              <Text
                messageId={`referentiel.motifRequete.${props.requete.motifRequete}`}
              />
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
            <Text
              messageId={"pages.delivrance.apercu.resume.prenomRequerant"}
            />
          </div>
          <div className="capital personnal-info">{valueNomRequerant}</div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text messageId={"pages.delivrance.apercu.resume.nomRequerant"} />
          </div>
          <div className="capital personnal-info">{valuePrenomRequerant}</div>
        </div>
      </div>
    </>
  );
};
