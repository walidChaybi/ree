import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { TitulaireAnalyseMarginale } from "@model/etatcivil/acte/TitulaireAnalyseMarginale";
import { remplaceSNP, remplaceSPC } from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";

export const getTitulairesAM = (acte: FicheActe): SectionPartProps[] => {
  const titulaires = acte.getAnalyseMarginaleLaPlusRecente()?.titulaires ?? [];

  return titulaires.map((titulaire, index) => ({
    partContent: {
      contents: getTitulairesInfo(titulaire, index + 1)
    }
  }));
};

const getTitulairesInfo = (titulaire: TitulaireAnalyseMarginale, index: number): SectionContentProps[] => {
  return [
    {
      libelle: `Nom Titulaire ${index}`,
      value: <span>{remplaceSNP(titulaire.nom ?? "")}</span>
    },
    {
      libelle: `Prénom 1`,
      value: <span>{remplaceSPC(titulaire.prenoms[0] ?? "")}</span>
    },
    {
      libelle: `Prénom 2`,
      value: <span>{titulaire.prenoms[1] ?? ""}</span>
    },
    {
      libelle: `Prénom 3`,
      value: <span>{titulaire.prenoms[2] ?? ""}</span>
    },
    {
      libelle: "Né(e) le",
      value: <span>{""}</span>
    },
    {
      libelle: "Sexe",
      value: <span>{"Non renseigné"}</span>
    },
    {
      libelle: "Lieu de naissance",
      value: <span>{""}</span>
    }
  ];
};
