import React from "react";
import { Qualite } from "../../../../../model/requete/enum/Qualite";
import { Requerant } from "../../../../../model/requete/IRequerant";
import { Requete } from "../../../../../model/requete/IRequete";
import { IRequeteInformation } from "../../../../../model/requete/IRequeteInformation";
import { TitulaireRequete } from "../../../../../model/requete/ITitulaireRequete";
import { getLibelle, getValeurOuVide } from "../../../../common/util/Utils";
import { SectionContentProps } from "../../../../common/widget/section/SectionContent";
import {
  SectionPanel,
  SectionPanelProps
} from "../../../../common/widget/section/SectionPanel";
import { SectionPartProps } from "../../../../common/widget/section/SectionPart";
import {
  ajouterContentPartAuPartUneValeur,
  ajouterContentPartAuPartUneValeurVide,
  ajouterPanelAreasAuPanel
} from "../../../../common/widget/section/SectionUtils";
import { FenetreApercuRequeteLiee } from "./FenetreApercuRequeteLiee";
import "./scss/ResumeReqInfo.scss";

export interface RequeteInfoProps {
  requete: IRequeteInformation;
  disabled?: boolean;
}

export const ResumeReqInfo: React.FC<RequeteInfoProps> = ({ requete }) => {
  const panels = getPanelResumeRequete(requete);

  return (
    <div className="ResumeRequete Fieldset ResumeReqInfo">
      <div className="ResumeRequeteTitle">
        <div>{`Résumé de la requête d'information`}</div>

        <div>{`N°${requete.numero}`}</div>
      </div>
      <div className="PanelsResumeRequete">
        <SectionPanel {...panels} />
      </div>
    </div>
  );
};

function getPanelResumeRequete(
  detailRequete: IRequeteInformation
): SectionPanelProps {
  const panel = {
    panelAreas: [],
    title: "requeteInformation"
  } as SectionPanelProps;

  ajouterPanelAreasAuPanel(panel, detailRequete, getRequete, 1);
  ajouterPanelAreasAuPanel(panel, detailRequete, getRequerant, 1);
  if (detailRequete.titulaires && detailRequete.titulaires.length > 0) {
    ajouterPanelAreasAuPanel(panel, detailRequete, getTitulaire, 1);
  }
  ajouterPanelAreasAuPanel(panel, detailRequete, getCommentaireReq, 1);

  return panel;
}

function getRequete(detailRequete: IRequeteInformation): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getRequeteInfo(detailRequete)
      }
    }
  ];
}

function getRequeteInfo(
  detailRequete: IRequeteInformation
): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle(`Sous-type`),
    detailRequete.sousType.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle(`Objet`),
    detailRequete.objet.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle(`Complément d'objet`),
    detailRequete.complementObjet.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle(`Date de création`),
    Requete.getDateCreation(detailRequete)
  );

  let requeteLiee: string | JSX.Element = "";

  if (
    detailRequete.numeroRequeteLiee &&
    detailRequete.idRequeteLiee &&
    detailRequete.typeRequeteLiee
  ) {
    requeteLiee = (
      <FenetreApercuRequeteLiee
        idRequeteLiee={detailRequete.idRequeteLiee}
        numeroRequeteLiee={detailRequete.numeroRequeteLiee}
        typeRequeteLiee={detailRequete.typeRequeteLiee}
      />
    );
  } else if (detailRequete.numeroRequeteLiee) {
    requeteLiee = detailRequete.numeroRequeteLiee;
  }

  infosRequete.push({
    libelle: getLibelle(`N° de la requête liée`),
    value: requeteLiee
  });

  return infosRequete;
}

function getRequerant(detailRequete: IRequeteInformation): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getRequerantInfo(detailRequete)
      }
    }
  ];
}

function getRequerantInfo(
  detailRequete: IRequeteInformation
): SectionContentProps[] {
  const infosRequerant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle(`Type requérant`),
    detailRequete.requerant.qualiteRequerant.qualite.libelle
  );

  let identiteRequerant = "";
  if (
    detailRequete.requerant.qualiteRequerant.qualite === Qualite.INSTITUTIONNEL
  ) {
    identiteRequerant = getValeurOuVide(
      detailRequete.requerant.qualiteRequerant.institutionnel?.nomInstitution
    );
  } else {
    identiteRequerant = `${Requerant.getNomFamille(
      detailRequete.requerant
    )} ${Requerant.getPrenom(detailRequete.requerant)}`;
  }

  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle(`Identité du requérant`),
    identiteRequerant
  );

  return infosRequerant;
}

function getTitulaire(detailRequete: IRequeteInformation): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getTitulaireInfo(detailRequete)
      }
    }
  ];
}

function getTitulaireInfo(
  detailRequete: IRequeteInformation
): SectionContentProps[] {
  const infosTitulaire = [] as SectionContentProps[];

  if (detailRequete.titulaires && detailRequete.titulaires.length > 0) {
    const titulaire = detailRequete.titulaires[0];
    ajouterContentPartAuPartUneValeur(
      infosTitulaire,
      getLibelle(`Identité du titulaire`),
      `${TitulaireRequete.getNom(titulaire)} ${TitulaireRequete.getPrenom1(
        titulaire
      )}`
    );
    ajouterContentPartAuPartUneValeur(
      infosTitulaire,
      getLibelle(`Date de naissance du titulaire`),
      TitulaireRequete.getDateNaissance(titulaire)
    );
    ajouterContentPartAuPartUneValeur(
      infosTitulaire,
      getLibelle(`Lieu de naissance du titulaire`),
      TitulaireRequete.getLieuNaissance(titulaire)
    );
  }

  return infosTitulaire;
}

function getCommentaireReq(
  detailRequete: IRequeteInformation
): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getCommentaire(detailRequete)
      }
    }
  ];
}

function getCommentaire(
  detailRequete: IRequeteInformation
): SectionContentProps[] {
  const commentaire = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    commentaire,
    getLibelle(`Commentaire libre de l'usager`),
    detailRequete.commentaire
  );

  return commentaire;
}
