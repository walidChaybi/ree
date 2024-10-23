import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
import { IDureeInscription } from "@model/etatcivil/rcrca/IDureeInscription";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import DateUtils from "@util/DateUtils";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import { LienFiche } from "../../../LienFiche";
import { InscriptionsLiees } from "./InscriptionsLiees";

export function getInscriptionRepertoireCivil(rcrca: IFicheRcRca): SectionPartProps {
  return {
    partContent: {
      contents: FicheUtil.isFicheRca(rcrca.categorie) ? getInteresseRca(rcrca) : getInteresseRc(rcrca),
      title: FicheUtil.isFicheRca(rcrca.categorie) ? "Inscription au répertoire civil annexe" : "Inscription au répertoire civil"
    }
  };
}

function getInteresseRc(rcrca: IFicheRcRca): SectionContentProps[] {
  return [
    {
      libelle: "Nature",
      value: rcrca.nature ? premiereLettreEnMajusculeLeResteEnMinuscule(rcrca.nature.libelle) : ""
    },
    {
      libelle: "Mandataire(s)",
      value: rcrca.mandataires
        ? rcrca.mandataires.map(mandataire => premiereLettreEnMajusculeLeResteEnMinuscule(mandataire.libelle)).join(" / ")
        : ""
    },
    {
      libelle: "Type inscription",
      value: getTypeInscription(rcrca)
    },
    {
      libelle: "Inscription(s) liée(s)",
      value: rcrca.inscriptionsLiees ? <InscriptionsLiees inscriptionsLiees={rcrca.inscriptionsLiees} /> : ""
    },
    {
      libelle: "Date d'inscription",
      value: rcrca.dateInscription ? DateUtils.getDateString(rcrca.dateInscription) : ""
    },
    {
      libelle: "Durée inscription",
      value: getUniteDuree(rcrca.duree)
    },
    {
      libelle: "Date fin de mesure",
      value: rcrca.duree?.dateFinDeMesure ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(rcrca.duree.dateFinDeMesure)) : ""
    }
  ];
}

function getInteresseRca(rcrca: IFicheRcRca): SectionContentProps[] {
  return [
    {
      libelle: "Nature",
      value: rcrca.nature ? premiereLettreEnMajusculeLeResteEnMinuscule(rcrca.nature.libelle) : ""
    },
    {
      libelle: "Type inscription",
      value: getTypeInscription(rcrca)
    },

    {
      libelle: "Date d'inscription",
      value: rcrca.dateInscription ? DateUtils.getDateString(rcrca.dateInscription) : ""
    }
  ];
}

function getTypeInscription(rcrca: IFicheRcRca): JSX.Element {
  return (
    <span>
      {InscriptionRcUtil.getLibelle(rcrca.typeInscription)}
      {rcrca.inscriptionsImpactees?.map((inscription, index) => (
        <span key={`link-fiche-rc-${inscription.id || ""}`}>
          {index === 0 ? " (" : ""}
          {`RC n°`}
          <LienFiche identifiant={inscription.id} categorie={TypeFiche.RC} numero={`${inscription.annee} - ${inscription.numero}`} />

          {rcrca.inscriptionsImpactees.length - 1 === index ? ")" : ", "}
        </span>
      ))}
    </span>
  );
}

function getUniteDuree(duree?: IDureeInscription) {
  if (duree?.uniteDuree) {
    return `${duree.nombreDuree} ${duree.uniteDuree}`;
  }
  return "";
}
