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
import { ETypeInscriptionRcRca } from "../enum/ETypeInscriptionRcRca";
import { IMandataire } from "../enum/MandataireRc";
import { INatureRc, NatureRc } from "../enum/NatureRc";
import { INatureRca, NatureRca } from "../enum/NatureRca";
import { FicheUtil, TypeFiche } from "../enum/TypeFiche";
import { DecisionRcRca, IDecisionRcRcaDTO } from "./DecisionRcRca";
import { DureeInscription, IDureeInscriptionDTO } from "./DureeInscription";
import { FicheInscription, IFicheInscriptionDto } from "./FicheInscription";
import { IInscriptionLiee } from "./IInscriptionLiee";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";
import { Interesse } from "./Interesse";

export interface IFicheRcDto extends IFicheInscriptionDto {
  categorie: "RC";
  typeInscription: keyof typeof ETypeInscriptionRcRca;
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
  typeInscription: keyof typeof ETypeInscriptionRcRca;
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

    public readonly categorie: TypeFiche,
    public readonly nature: INatureRc | INatureRca,
    public readonly decision: DecisionRcRca | null,

    public readonly mandataires: IMandataire[],
    public readonly inscriptionsImpactees: IInscriptionsImpactees[],
    public readonly inscriptionsLiees: IInscriptionLiee[],
    public readonly typeInscription?: ETypeInscriptionRcRca,
    public readonly duree?: DureeInscription | null
  ) {
    super(...(ficheInscription as FicheRcRca).attributs);
  }

  public static readonly RcDepuisDto = (ficheRc: IFicheRcDto): FicheRcRca | null => {
    switch (true) {
      case FicheRcRca.champsObligatoiresRc.some(cle => ficheRc[cle] === undefined):
        console.error(`Un champ obligatoire d'une FicheRc n'est pas défini.`);
        return null;
      case !Object.keys(ETypeInscriptionRcRca).includes(ficheRc.typeInscription):
        console.error(
          `Le typeInscription de la FicheRc a la valeur ${ficheRc.typeInscription} au lieu d'une des suivantes : ${Object.keys(ETypeInscriptionRcRca)}.`
        );
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
      ficheRc.decision ? DecisionRcRca.depuisDto(ficheRc.decision) : null,

      ficheRc.mandataires,
      ficheRc.inscriptionsImpactees,
      ficheRc.inscriptionsLiees,
      ETypeInscriptionRcRca[ficheRc.typeInscription],
      ficheRc.duree ? DureeInscription.depuisDto(ficheRc.duree) : null
    );
  };

  public static readonly RcaDepuisDto = (ficheRca: IFicheRcaDto): FicheRcRca | null => {
    switch (true) {
      case FicheRcRca.champsObligatoiresRca.some(cle => ficheRca[cle] === undefined):
        console.error(`Un champ obligatoire d'une FicheRca n'est pas défini.`);
        return null;
      case !Object.keys(ETypeInscriptionRcRca).includes(ficheRca.typeInscription):
        console.error(
          `Le typeInscription de la FicheRca a la valeur ${ficheRca.typeInscription} au lieu d'une des suivantes : ${Object.keys(ETypeInscriptionRcRca)}.`
        );
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
      DecisionRcRca.depuisDto(ficheRca.decision),

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
