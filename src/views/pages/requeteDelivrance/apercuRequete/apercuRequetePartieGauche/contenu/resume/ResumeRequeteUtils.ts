import { Qualite } from "../../../../../../../model/requete/enum/Qualite";
import { TypeLienMandant } from "../../../../../../../model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "../../../../../../../model/requete/enum/TypeLienRequerant";
import { TypeRequete } from "../../../../../../../model/requete/enum/TypeRequete";
import { EvenementReqDelivrance } from "../../../../../../../model/requete/IEvenementReqDelivrance";
import {
  IRequerant,
  Requerant
} from "../../../../../../../model/requete/IRequerant";
import { IRequete } from "../../../../../../../model/requete/IRequete";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "../../../../../../../model/requete/ITitulaireRequete";
import {
  DEUX,
  formatPrenom,
  getLibelle,
  triListeObjetsSurPropriete,
  TROIS
} from "../../../../../../common/util/Utils";
import { SectionContentProps } from "../../../../../../common/widget/section/SectionContent";
import { SectionPanelProps } from "../../../../../../common/widget/section/SectionPanel";
import { SectionPartProps } from "../../../../../../common/widget/section/SectionPart";
import {
  ajouterContentPartAuPartUneValeur,
  ajouterContentPartAuPartUneValeurVide,
  ajouterPanelAreasAuPanel
} from "../../../../../../common/widget/section/SectionUtils";
import "./scss/ResumeRequete.scss";

export function getPanelsResumeRequete(requete?: IRequeteDelivrance) {
  const panels: SectionPanelProps[] = [];
  if (requete) {
    panels[1] = getPanelTitulaireRequeteDelivrance(requete);
    if (requete.type === TypeRequete.DELIVRANCE) {
      panels[0] = getRequeteDelivranceSousType(requete);
      panels[DEUX] = getRequeteDelivranceInfos(requete);
    } else {
      panels[0] = getRequeteSansSousType();
      panels[DEUX] = getRequeteAutreInfos(requete);
    }
    panels[TROIS] = getPanelRequerantRequeteDelivrance(requete);
  }
  return panels;
}

function getPanelTitulaireRequeteDelivrance(
  requete: IRequeteDelivrance
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
                    value: "Il n'y a pas de titulaire"
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

  ajouterPanelAreasAuPanel(panel, detailRequete, getRequerant, deuxColonnes);

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

  const prenom =
    titulaire.prenoms && titulaire.prenoms?.length !== 0
      ? formatPrenom(
          triListeObjetsSurPropriete([...titulaire.prenoms], "numeroOrdre")[0]
            .prenom
        )
      : "";

  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Nom" : ""),
    TitulaireRequete.getNom(titulaire)
  );
  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Prénom" : ""),
    prenom
  );
  ajouterContentPartAuPartUneValeurVide(
    infosTitulaire,
    getLibelle(index === 1 ? "Né(e) le" : ""),
    TitulaireRequete.getDateNaissance(titulaire)
  );

  return infosTitulaire;
}

function getRequerant(requete: IRequeteDelivrance): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: getRequerantInfo1(requete)
      }
    }
  ];
}

function getLienRequerant(requete: IRequeteDelivrance): string {
  if (
    requete.mandant !== null &&
    requete.mandant !== undefined &&
    requete.mandant.typeLien
  ) {
    return requete.mandant.natureLien &&
      requete.mandant.typeLien === TypeLienMandant.AUTRE
      ? requete.mandant.natureLien
      : requete.mandant.typeLien.libelle;
  } else if (
    requete.requerant.lienRequerant !== null &&
    requete.requerant.lienRequerant !== undefined
  ) {
    return requete.requerant.lienRequerant.lien === TypeLienRequerant.AUTRE &&
      requete.requerant.lienRequerant.natureLien
      ? requete.requerant.lienRequerant.natureLien
      : requete.requerant.lienRequerant.lien.libelle;
  }

  return "";
}

function getRequerantInfo1(requete: IRequeteDelivrance): SectionContentProps[] {
  const infosRequerant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    infosRequerant,
    getLibelle("Nom requérant"),
    getNomOuRaisonSociale(requete.requerant)
  );

  if (requete.requerant.qualiteRequerant.qualite === Qualite.PARTICULIER) {
    ajouterContentPartAuPartUneValeurVide(
      infosRequerant,
      getLibelle("Prénom requérant"),
      Requerant.getPrenom(requete.requerant)
    );
  }

  ajouterContentPartAuPartUneValeurVide(
    infosRequerant,
    getLibelle("Lien avec le titulaire"),
    getLienRequerant(requete)
  );

  return infosRequerant;
}

function getNomOuRaisonSociale(requerant: IRequerant) {
  let nom: string | undefined;
  switch (requerant?.qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      if (requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale) {
        nom = requerant.qualiteRequerant.mandataireHabilite.raisonSociale;
      } else if (requerant?.nomFamille) {
        nom = `${requerant.nomFamille} ${requerant.prenom}`;
      }
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      nom = requerant?.qualiteRequerant.autreProfessionnel?.raisonSociale;
      break;
    case Qualite.INSTITUTIONNEL:
      nom = requerant?.qualiteRequerant.institutionnel?.nomInstitution;
      break;
    case Qualite.PARTICULIER:
      nom = Requerant.getNomFamille(requerant);
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
              contents: getRequeteNumeroTeledossierEtSousType(requete)
            }
          }
        ]
      }
    ],
    title: ""
  };
}

function getRequeteSansSousType(): SectionPanelProps {
  return {
    panelAreas: [
      {
        parts: []
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

function getRequeteAutreInfos(requete: IRequeteDelivrance): SectionPanelProps {
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

function getRequeteNumeroTeledossierEtSousType(
  requete: IRequeteDelivrance
): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeurVide(
    infosRequete,
    getLibelle("N° télédossier"),
    requete.provenanceRequete.provenanceServicePublic
      ? requete.provenanceRequete.provenanceServicePublic.referenceDila
      : ""
  );
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

function getRequeteAutreInfo(
  requete: IRequeteDelivrance
): SectionContentProps[] {
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Canal"),
    requete.canal.libelle
  );

  return infosRequete;
}
