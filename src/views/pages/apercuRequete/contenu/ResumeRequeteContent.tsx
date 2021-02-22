import React from "react";
import { Text } from "../../../common/widget/Text";
import "./sass/ResumeRequeteContent.scss";
import { TitulaireInformation } from "./TitulaireInformation";
import { QualiteRequerant } from "../../../../model/requete/QualiteRequerant";
import { IDataTable } from "../../espaceDelivrance/MesRequetesPage";
import {
  getDateStringFromDateCompose,
  IDateCompose
} from "../../../common/util/DateUtils";

export interface ResumeRequeteContentProps {
  requete: IDataTable;
}

export const ResumeRequeteContent: React.FC<ResumeRequeteContentProps> = props => {
  const dataRequerant = props.requete.requerant;
  let valueNomRequerant = "";
  let valuePrenomRequerant = "";

  if (dataRequerant.qualiteRequerant === QualiteRequerant.MandataireHabilite) {
    if (dataRequerant.raisonSociale) {
      valueNomRequerant = `${dataRequerant.raisonSociale}`;
    } else {
      valueNomRequerant = `${dataRequerant.nomFamille}`;
      valuePrenomRequerant = `${dataRequerant.prenom}`;
    }
  } else if (
    dataRequerant.qualiteRequerant === QualiteRequerant.Institutionnel
  ) {
    valueNomRequerant = `${dataRequerant.nomInstitutionnel}`;
  } else if (dataRequerant.qualiteRequerant === QualiteRequerant.Particulier) {
    valueNomRequerant = `${dataRequerant.nomFamille}`;
    valuePrenomRequerant = dataRequerant.prenom
      ? `${dataRequerant.prenom}`
      : "";
  }

  const dateCompose: IDateCompose = {
    jour: props.requete.jourEvenement
      ? `${props.requete.jourEvenement}`
      : undefined,
    mois: props.requete.moisEvenement
      ? `${props.requete.moisEvenement}`
      : undefined,
    annee: `${props.requete.anneeEvenement}`
  };

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
            {`${getDateStringFromDateCompose(dateCompose)}`}
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
            <Text messageId={"pages.delivrance.apercu.resume.nomRequerant"} />
          </div>
          <div className="capital personnal-info">{valueNomRequerant}</div>
        </div>
        <div className="bloc-info">
          <div className="label">
            <Text
              messageId={"pages.delivrance.apercu.resume.prenomRequerant"}
            />
          </div>
          <div className="capital personnal-info">{valuePrenomRequerant}</div>
        </div>
      </div>
    </>
  );
};
