import { IAccordionReceSection } from "@pages/fiche/FicheUtils";
import { getInscriptionRepertoireCivil } from "@pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { Mariage } from "@pages/fiche/hook/constructionComposants/interesses/Mariage";
import { getFichesPersonne } from "@pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { getAutorite } from "@pages/fiche/hook/constructionComposants/rcrca/AutoriteUtils";
import { getDecision } from "@pages/fiche/hook/constructionComposants/rcrca/DecisionUtils";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPartProps } from "@widget/section/SectionPart";
import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "../../commun/dtoUtils";
import { ETypeFiche } from "../enum/ETypeFiche";
import { ETypeInscriptionRc } from "../enum/ETypeInscriptionRc";
import { ETypeInscriptionRca } from "../enum/ETypeInscriptionRca";
import { IMandataire } from "../enum/MandataireRc";
import { INatureRc, NatureRc } from "../enum/NatureRc";
import { INatureRca, NatureRca } from "../enum/NatureRca";
import { DecisionRcRca, IDecisionRcRcaDTO } from "./DecisionRcRca";
import { DureeInscription, IDureeInscriptionDTO } from "./DureeInscription";
import { FicheInscription, IFicheInscriptionDto } from "./FicheInscription";
import { IInscriptionLiee } from "./IInscriptionLiee";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";
import { Interesse } from "./Interesse";

export interface IFicheRcDto extends IFicheInscriptionDto {
  categorie: "RC";
  typeInscription: keyof typeof ETypeInscriptionRc;
  nature: INatureRc;
  decision?: IDecisionRcRcaDTO;
  mandataires: IMandataire[];
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLiee[];
  duree?: IDureeInscriptionDTO;
  complementNature?: string;
}

export interface IFicheRcaDto extends IFicheInscriptionDto {
  categorie: "RCA";
  typeInscription: keyof typeof ETypeInscriptionRca;
  nature: INatureRca;
  decision: IDecisionRcRcaDTO;
  referenceActe?: string;
}

export class FicheRcRca extends FicheInscription {
  private static readonly champsObligatoiresRc: (keyof IFicheRcDto)[] = [
    "typeInscription",
    "mandataires",
    "inscriptionsImpactees",
    "inscriptionsLiees",
    "nature"
  ];

  private static readonly champsObligatoiresRca: (keyof IFicheRcaDto)[] = ["nature", "typeInscription", "decision"];

  private constructor(
    ficheInscription: FicheInscription,

    public readonly categorie: Extract<keyof typeof ETypeFiche, "RC" | "RCA">,
    public readonly nature: INatureRc | INatureRca,
    public readonly decision: DecisionRcRca | null,

    public readonly mandataires: IMandataire[],
    public readonly inscriptionsImpactees: IInscriptionsImpactees[],
    public readonly inscriptionsLiees: IInscriptionLiee[],
    public readonly typeInscription?: ETypeInscriptionRc | ETypeInscriptionRca,
    public readonly duree?: DureeInscription | null
  ) {
    super(...(ficheInscription as FicheRcRca).attributs);
  }

  public static readonly RcDepuisDto = (ficheRc: IFicheRcDto): FicheRcRca | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("FicheRc", ficheRc, this.champsObligatoiresRc):
      case valeurDtoAbsenteDansEnum("FicheRc", ficheRc, "typeInscription", ETypeInscriptionRc):
        return null;
    }

    const ficheInscription = FicheRcRca.inscriptionDepuisDto(ficheRc);
    if (ficheInscription === null) {
      console.error("La fiche RC récupérée est incomplète, donc invalide.");
      return null;
    }

    return new FicheRcRca(
      ficheInscription,

      ficheRc.categorie,
      NatureRc.depuisId(ficheRc.nature.id) as INatureRc,
      ficheRc.decision ? DecisionRcRca.depuisDto(ficheRc.decision) : null,

      ficheRc.mandataires,
      ficheRc.inscriptionsImpactees,
      ficheRc.inscriptionsLiees,
      ETypeInscriptionRc[ficheRc.typeInscription],
      ficheRc.duree ? DureeInscription.depuisDto(ficheRc.duree) : null
    );
  };

  public static readonly RcaDepuisDto = (ficheRca: IFicheRcaDto): FicheRcRca | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("FicheRca", ficheRca, this.champsObligatoiresRca):
      case valeurDtoAbsenteDansEnum("FicheRca", ficheRca, "typeInscription", ETypeInscriptionRca):
        return null;
    }

    const ficheInscription = FicheRcRca.inscriptionDepuisDto(ficheRca);
    if (ficheInscription === null) {
      console.error("La fiche RCA récupérée est incomplète, donc invalide.");
      return null;
    }

    return new FicheRcRca(
      ficheInscription,

      ficheRca.categorie,
      NatureRca.depuisId(ficheRca.nature.id) as INatureRca,
      DecisionRcRca.depuisDto(ficheRca.decision),

      [],
      [],
      [],
      ETypeInscriptionRc[ficheRca.typeInscription],
      undefined
    );
  };

  // Méthodes de Panel

  get interessesCommeSectionPartProps(): SectionPartProps[] {
    const sortedInteresses = triListeObjetsSurPropriete([...this.interesses], "numeroOrdreSaisi");

    const interessePart: SectionPartProps[] = sortedInteresses.map((interesse: Interesse) => {
      return {
        partContent: {
          contents: this.categorie === "RCA" ? interesse.commeSectionContentPropsPourRca() : interesse.commeSectionContentProps(),
          title: `Intéressé ${interesse.numeroOrdreSaisi}`
        }
      };
    });

    if (this.mariageInteresses) {
      interessePart.push({
        partContent: {
          contents: [
            {
              libelle: "",
              value: <Mariage {...this.mariageInteresses} />
            }
          ]
        },
        classNameContent: "mariageContainer"
      });
    }

    return interessePart;
  }

  get commePanelAccordionReceSection(): IAccordionReceSection {
    const fichesPersonne: SectionPanelProps[] = getFichesPersonne(this.personnes);
    return {
      panels: [
        {
          panelAreas: [
            { parts: [getInscriptionRepertoireCivil(this)], nbColonne: 1 },
            {
              parts: this.interessesCommeSectionPartProps,
              nbColonne: 2
            },
            { parts: getDecision(this), nbColonne: 2 },
            {
              parts: getAutorite(this),
              title: "Autorité",
              nbColonne: 2
            },
            {
              parts: getStatuts(this.statutsFiche),
              title: "Historique des statuts de la fiche"
            }
          ],
          title: `Visualisation du ${this.categorie}`
        },
        ...fichesPersonne
      ]
    };
  }
}
