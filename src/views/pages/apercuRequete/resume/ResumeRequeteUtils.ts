import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { TypeLienRequerant } from "../../../../model/requete/v2/enum/TypeLienRequerant";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { EvenementReqDelivrance } from "../../../../model/requete/v2/IEvenementReqDelivrance";
import { IRequerant, Requerant } from "../../../../model/requete/v2/IRequerant";
import { IRequete, TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "../../../../model/requete/v2/ITitulaireRequete";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import { triListeObjetsSurPropriete } from "../../../common/util/Utils";
import { SectionContentProps } from "../../../common/widget/section/SectionContent";
import { SectionPanelProps } from "../../../common/widget/section/SectionPanel";
import { SectionPartProps } from "../../../common/widget/section/SectionPart";
import {
  ajouterContentPartAuPartUneValeur,
  ajouterContentPartAuPartUneValeurVide,
  ajouterPanelAreasAuPanel
} from "../../../common/widget/section/SectionUtils";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/ResumeRequetePage.scss";

export function getPanelsResumeRequete(requete?: TRequete) {
  const panels: SectionPanelProps[] = [];
  if (requete) {
    panels[1] = getPanelTitulaireRequeteDelivrance(requete);
    if (requete.type === TypeRequete.DELIVRANCE) {
      panels[0] = getRequeteDelivranceSousType(requete as IRequeteDelivrance);
      panels[2] = getRequeteDelivranceInfos(requete as IRequeteDelivrance);
    } else {
      panels[2] = getRequeteAutreInfos(requete);
    }
    panels[3] = getPanelRequerantRequeteDelivrance(requete);
    panels[4] = getPanelPiecesJustificativesRequeteDelivrance(requete);
  }
  return panels;
}

function getPanelPiecesJustificativesRequeteDelivrance(
  requete: IRequete
): SectionPanelProps {
  const nbColonnes = 1;
  const noPJ: IPieceJustificative[] = [];

  const panel = {
    panelAreas: [],
    title: getLibelle("Resume requête PJ")
  } as SectionPanelProps;

  if (requete.piecesJustificatives) {
    ajouterPanelAreasAuPanel(
      panel,
      requete.piecesJustificatives,
      getPiecesJustificatives,
      nbColonnes
    );
  } else {
    ajouterPanelAreasAuPanel(panel, noPJ, getPiecesJustificatives, nbColonnes);
  }

  return panel;
}

function getPanelTitulaireRequeteDelivrance(
  requete: IRequete
): SectionPanelProps {
  if (requete.titulaires && requete.titulaires.length !== 0) {
    const panel = {
      panelAreas: [],
      title: getLibelle("Resume requête titulaire")
    } as SectionPanelProps;

    ajouterPanelAreasAuPanel(
      panel,
      requete.titulaires,
      getTitulaires,
      requete.titulaires.length
    );

    return panel;
  } else {
    return {
      panelAreas: [
        {
          parts: [
            {
              partContent: {
                contents: [
                  {
                    value: "Il n'y pas de titulaire"
                  }
                ]
              }
            }
          ]
        }
      ],
      title: ""
    };
  }
}

function getPanelRequerantRequeteDelivrance(
  detailRequete: IRequete
): SectionPanelProps {
  const deuxColonnes = 1;

  const panel = {
    panelAreas: [],
    title: getLibelle("Resume requête requerant")
  } as SectionPanelProps;

  ajouterPanelAreasAuPanel(
    panel,
    detailRequete.requerant,
    getRequerant,
    deuxColonnes
  );

  return panel;
}

function getTitulaires(titulaires: ITitulaireRequete[]): SectionPartProps[] {
  const sortedTitulaires = triListeObjetsSurPropriete(
    [...titulaires],
    "position"
  );

  return sortedTitulaires.map((titulaire, index) => {
    return {
      partContent: {
        title: `Info titulaire ${index + 1}`,
        contents: getTitulairesInfo(titulaire, index + 1)
      },
      classNameContent: "InfoTitulaire"
    };
  });
}

function getTitulairesInfo(
  titulaire: ITitulaireRequete,
  index: number
): SectionContentProps[] {
  const infosTitulaire = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Nom" : ""),
    TitulaireRequete.getNom(titulaire)
  );
  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Prénom" : ""),
    TitulaireRequete.getPrenom1(titulaire)
  );
  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Né(e) le" : ""),
    TitulaireRequete.getDateNaissance(titulaire)
  );

  return infosTitulaire;
}

function getRequerant(requerant: IRequerant): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getRequerantInfo1(requerant)
      }
    }
  ];
}

function getPiecesJustificatives(
  piecesJustificatives: IPieceJustificative[]
): SectionPartProps[] {
  const sectionParts: SectionPartProps[] = [];

  sectionParts.push({
    partContent: {
      contents: getPieceJustificativeLibelle()
    }
  });

  if (piecesJustificatives.length !== 0) {
    sectionParts.push({
      partContent: {
        contents: getPieceJustificativeInfo(piecesJustificatives)
      }
    });
  }

  return sectionParts;
}

function getPieceJustificativeLibelle(): SectionContentProps[] {
  const infosPJ = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    infosPJ,
    getLibelle("Pièces Justificatives")
  );

  return infosPJ;
}

function getPieceJustificativeInfo(
  piecesJustificatives: IPieceJustificative[]
): SectionContentProps[] {
  const infosPJ = [] as SectionContentProps[];

  piecesJustificatives.forEach(pj => {
    ajouterContentPartAuPartUneValeur(
      infosPJ,
      getLibelle(""),
      pj.typePieceJustificative.libelle
    );
  });
  return infosPJ;
}

function getRequerantInfo1(requerant: IRequerant): SectionContentProps[] {
  const infosRequerant = [] as SectionContentProps[];

  const lienTitulaire =
    requerant?.lienRequerant?.lien === TypeLienRequerant.AUTRE
      ? requerant?.lienRequerant?.natureLien
      : requerant?.lienRequerant?.lien.libelle;

  ajouterContentPartAuPartUneValeurVide(
    infosRequerant,
    getLibelle("Nom requérant"),
    getNomOuRaisonSociale(requerant)
  );

  if (requerant.qualiteRequerant.particulier) {
    ajouterContentPartAuPartUneValeurVide(
      infosRequerant,
      getLibelle("Prénom requérant"),
      Requerant.getPrenom(requerant)
    );
  }

  ajouterContentPartAuPartUneValeurVide(
    infosRequerant,
    getLibelle("Lien avec le titulaire"),
    lienTitulaire
  );

  return infosRequerant;
}

function getNomOuRaisonSociale(requerant: IRequerant) {
  let nom: string | undefined;
  switch (requerant?.qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      nom = requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale;
      break;
    case Qualite.INSTITUTIONNEL:
      nom = requerant?.qualiteRequerant.institutionnel?.nomInstitution;
      break;
    case Qualite.PARTICULIER:
      nom = requerant?.qualiteRequerant.particulier?.nomUsage;
      break;
    case Qualite.UTILISATEUR_RECE:
      nom = requerant?.nomFamille;
      break;
    default:
      nom = "";
      break;
  }
  return nom ? nom : "";
}

function getRequeteDelivranceSousType(
  requete: IRequeteDelivrance
): SectionPanelProps {
  return {
    panelAreas: [
      {
        parts: [
          {
            partContent: {
              contents: getRequeteSousType(requete)
            }
          }
        ]
      }
    ],
    title: ""
  };
}

function getRequeteDelivranceInfos(
  requete: IRequeteDelivrance
): SectionPanelProps {
  return {
    panelAreas: [
      {
        parts: [
          {
            partContent: {
              contents: getRequeteDelivranceInfo(requete)
            }
          }
        ]
      }
    ],
    title: ""
  };
}

function getRequeteAutreInfos(requete: IRequete): SectionPanelProps {
  return {
    panelAreas: [
      {
        parts: [
          {
            partContent: {
              contents: getRequeteAutreInfo(requete)
            }
          }
        ]
      }
    ],
    title: ""
  };
}

function getRequeteSousType(
  requete: IRequeteDelivrance
): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Sous-type"),
    requete.sousType.libelle
  );

  return infosRequete;
}

function affichageLieu(ville: string, pays: string): string {
  if (ville && pays) {
    return `${ville} / ${pays}`;
  } else if (!ville) {
    return pays;
  } else if (!pays) {
    return ville;
  }
  return "";
}

function getRequeteDelivranceInfo(
  requete: IRequeteDelivrance
): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("Nature"),
    requete.evenement?.natureActe.libelle
  );
  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("Date de l'évènement"),
    EvenementReqDelivrance.getDate(requete.evenement)
  );
  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("Lieu de l'évènement"),
    affichageLieu(
      EvenementReqDelivrance.getVille(requete.evenement),
      EvenementReqDelivrance.getPays(requete.evenement)
    )
  );
  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("Document"),
    requete.documentDemande.libelle
  );
  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("Motif"),
    requete.motif?.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Canal"),
    requete.canal.libelle
  );

  return infosRequete;
}

function getRequeteAutreInfo(requete: IRequete): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Canal"),
    requete.canal.libelle
  );

  return infosRequete;
}
