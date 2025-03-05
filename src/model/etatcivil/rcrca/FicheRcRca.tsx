import { IAccordionReceSection } from "@pages/fiche/FicheUtils";
import { getInscriptionRepertoireCivil } from "@pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { Mariage } from "@pages/fiche/hook/constructionComposants/interesses/Mariage";
import { getFichesPersonne } from "@pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { getAutorite } from "@pages/fiche/hook/constructionComposants/rcrca/AutoriteUtils";
import { getDecision } from "@pages/fiche/hook/constructionComposants/rcrca/DecisionUtils";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";
import { TDateArrayDTO } from "@util/DateUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPartProps } from "@widget/section/SectionPart";
import { IPersonneDTO } from "../commun/Personne";
import { ETypeInscriptionRcRca } from "../enum/ETypeInscriptionRcRca";
import { IMandataire } from "../enum/MandataireRc";
import { INatureRc, NatureRc } from "../enum/NatureRc";
import { INatureRca, NatureRca } from "../enum/NatureRca";
import { FicheUtil, TypeFiche } from "../enum/TypeFiche";
import { IAlerte } from "../fiche/IAlerte";
import { IStatutFicheDTO } from "../fiche/StatutFiche";
import { IDecisionRcRcaDTO } from "./DecisionRcRca";
import { DureeInscription, IDureeInscriptionDTO } from "./DureeInscription";
import { FicheInscription } from "./FicheInscription";
import { IInscriptionLiee } from "./IInscriptionLiee";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";
import { IMariageInteresse } from "./IMariageInteresse";
import { IInteresseDTO, Interesse } from "./Interesse";

export interface IFicheInscriptionDto {
  id: string;
  annee: string;
  numero: string;
  dateInscription: TDateArrayDTO | null;
  dateDerniereDelivrance: number | null;
  dateDerniereMaj?: number;
  alertes: IAlerte[];
  decision: IDecisionRcRcaDTO;
  interesses: IInteresseDTO[];
  statutsFiche: IStatutFicheDTO[];
  personnes: IPersonneDTO[];
  mariageInteresses?: IMariageInteresse;
}

export interface IFicheRcDto extends IFicheInscriptionDto {
  categorie: "RC";
  nature: INatureRc;
  mandataires: IMandataire[];
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLiee[];
  typeInscription: keyof typeof ETypeInscriptionRcRca;
  duree: IDureeInscriptionDTO;
  complementNature?: string;
}

export interface IFicheRcaDto extends IFicheInscriptionDto {
  categorie: "RCA";
  typeInscription: keyof typeof ETypeInscriptionRcRca;
  referenceActe?: string;
  nature: INatureRca;
}

export class FicheRcRca extends FicheInscription {
  private static readonly champsObligatoiresRc: (keyof IFicheRcDto)[] = [
    "typeInscription",
    "mandataires",
    "inscriptionsImpactees",
    "inscriptionsLiees",
    "duree",
    "nature"
  ];

  private static readonly champsObligatoiresRca: (keyof IFicheRcaDto)[] = ["nature", "typeInscription"];

  private constructor(
    ficheInscription: FicheInscription,

    public readonly categorie: TypeFiche,
    public readonly nature: INatureRc | INatureRca,

    public readonly mandataires: IMandataire[],
    public readonly inscriptionsImpactees: IInscriptionsImpactees[],
    public readonly inscriptionsLiees: IInscriptionLiee[],
    public readonly typeInscription?: ETypeInscriptionRcRca,
    public readonly duree?: DureeInscription
  ) {
    super(...(ficheInscription as FicheRcRca).attributs);
  }

  public static readonly RcDepuisDto = (ficheRc: IFicheRcDto): FicheRcRca | null => {
    switch (true) {
      case FicheRcRca.champsObligatoiresRc.some(cle => ficheRc[cle] === undefined):
        console.error(`Un champ obligatoire d'un ${typeof ficheRc} n'est pas défini.`);
        return null;
      case !Object(ETypeInscriptionRcRca).hasOwnProperty(ficheRc.typeInscription):
        console.error(`Le typeInscription de ${typeof ficheRc} a une valeur interdite : ${ficheRc.typeInscription}.`);
        return null;
    }

    const ficheInscription = FicheRcRca.inscriptionDepuisDto(ficheRc);
    if (ficheInscription === null) {
      console.error("La fiche RC récupérée est incomplète, donc invalide.");
      return null;
    }

    return new FicheRcRca(
      ficheInscription,

      FicheUtil.getTypeFicheFromString(ficheRc.categorie),
      NatureRc.depuisId(ficheRc.nature.id) as INatureRc,

      ficheRc.mandataires,
      ficheRc.inscriptionsImpactees,
      ficheRc.inscriptionsLiees,
      ETypeInscriptionRcRca[ficheRc.typeInscription],
      DureeInscription.depuisDto(ficheRc.duree)
    );
  };

  public static readonly RcaDepuisDto = (ficheRca: IFicheRcaDto): FicheRcRca | null => {
    switch (true) {
      case FicheRcRca.champsObligatoiresRca.some(cle => ficheRca[cle] === undefined):
        console.error(`Un champ obligatoire d'un ${typeof ficheRca} n'est pas défini.`);
        return null;
      case !Object(ETypeInscriptionRcRca).hasOwnProperty(ficheRca.typeInscription):
        console.error(`Le typeInscription de ${typeof ficheRca} a une valeur interdite : ${ficheRca.typeInscription}.`);
        return null;
    }

    const ficheInscription = FicheRcRca.inscriptionDepuisDto(ficheRca);
    if (ficheInscription === null) {
      console.error("La fiche RCA récupérée est incomplète, donc invalide.");
      return null;
    }

    return new FicheRcRca(
      ficheInscription,

      FicheUtil.getTypeFicheFromString(ficheRca.categorie),
      NatureRca.depuisId(ficheRca.nature.id) as INatureRca,

      [],
      [],
      [],
      ETypeInscriptionRcRca[ficheRca.typeInscription],
      undefined
    );
  };

  // Méthodes de Panel

  get interessesCommeSectionPartProps(): SectionPartProps[] {
    const sortedInteresses = triListeObjetsSurPropriete([...this.interesses], "numeroOrdreSaisi");

    const interessePart: SectionPartProps[] = sortedInteresses.map((interesse: Interesse) => {
      return {
        partContent: {
          contents: FicheUtil.isFicheRca(this.categorie)
            ? interesse.commeSectionContentPropsPourRca()
            : interesse.commeSectionContentProps(),
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
