import React from "react";
import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { TypeInstitutionnel } from "../../../../model/requete/v2/enum/TypeInstitutionnel";
import { TypeLienMandant } from "../../../../model/requete/v2/enum/TypeLienMandant";
import { TypeLienRequerant } from "../../../../model/requete/v2/enum/TypeLienRequerant";
import { TypeMandataireReq } from "../../../../model/requete/v2/enum/TypeMandataireReq";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { EvenementReqDelivrance } from "../../../../model/requete/v2/IEvenementReqDelivrance";
import { IMandant, Mandant } from "../../../../model/requete/v2/IMandant";
import { IParent, Parent } from "../../../../model/requete/v2/IParents";
import { IRequerant, Requerant } from "../../../../model/requete/v2/IRequerant";
import { Requete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "../../../../model/requete/v2/ITitulaireRequete";
import { triListeObjetsSurPropriete } from "../../../common/util/Utils";
import { SectionContentProps } from "../../../common/widget/section/SectionContent";
import { SectionPanelProps } from "../../../common/widget/section/SectionPanel";
import { SectionPartProps } from "../../../common/widget/section/SectionPart";
import { SectionContentPartProps } from "../../../common/widget/section/SectionPartContent";
import { getLibelle } from "../../../common/widget/Text";
import { IDataDetailRequeteApi } from "./DetailRequeteHook";

export function getPanelsDetailRequete(detailRequete: IDataDetailRequeteApi) {
  const panels: SectionPanelProps[] = [];
  if (
    detailRequete &&
    detailRequete.data &&
    detailRequete.data.type === TypeRequete.DELIVRANCE
  ) {
    panels[0] = getPanelDetailRequeteDelivrance(detailRequete.data);
    panels[1] = getRequeteDelivrance(detailRequete.data);
  }
  return panels;
}

function getPanelDetailRequeteDelivrance(
  detailRequete: IRequeteDelivrance
): SectionPanelProps {
  const panels = {
    panelAreas: [
      {
        parts: getTitulaires(detailRequete.titulaires),
        title: getLibelle("Titulaires"),
        nbColonne: 2
      },
      {
        parts: getParentsDesTitulaires(detailRequete.titulaires),
        nbColonne: 2
      },
      {
        parts: getRequerant(detailRequete.requerant),
        title: getLibelle("Requérant"),
        nbColonne: 2
      }
    ],
    title: "Detail requête délivrance"
  };

  if (detailRequete.mandant) {
    panels.panelAreas.push({
      parts: getMandant(detailRequete.mandant),
      title: getLibelle("Mandant"),
      nbColonne: 2
    });
  }

  return panels;
}

function getTitulaires(titulaires?: ITitulaireRequete[]): SectionPartProps[] {
  let sections = {} as SectionPartProps[];
  if (titulaires) {
    const sortedTitulaires = triListeObjetsSurPropriete(
      [...titulaires],
      "position"
    );

    sections = sortedTitulaires.map((titulaire, index) => {
      return {
        contentsPart: {
          contents: getTitulairesInfo(titulaire, index + 1)
        }
      };
    });
  }
  return sections;
}

function getTitulairesInfo(
  titulaire: ITitulaireRequete,
  index: number
): SectionContentProps[] {
  return [
    {
      libelle: getLibelle(`Nom Titulaire ${index}`),
      value: <span>{TitulaireRequete.getNom(titulaire)}</span>
    },
    {
      libelle: getLibelle("Prénom 1"),
      value: <span>{TitulaireRequete.getPrenom1(titulaire)}</span>
    },
    {
      libelle: getLibelle("Prénom 2"),
      value: <span>{TitulaireRequete.getPrenom2(titulaire)}</span>
    },
    {
      libelle: getLibelle("Prénom 3"),
      value: <span>{TitulaireRequete.getPrenom3(titulaire)}</span>
    },
    {
      libelle: getLibelle("Né(e) le"),
      value: <span>{TitulaireRequete.getDateNaissance(titulaire)}</span>
    },
    {
      libelle: getLibelle("Sexe"),
      value: <span>{TitulaireRequete.getSexe(titulaire)}</span>
    },
    {
      libelle: getLibelle("Lieu de naissance"),
      value: (
        <>
          <div>{TitulaireRequete.getVille(titulaire)}</div>
          <div>{TitulaireRequete.getPays(titulaire)}</div>
        </>
      )
    }
  ];
}

function getParentsDesTitulaires(
  titulaires?: ITitulaireRequete[]
): SectionPartProps[] {
  let sections = {} as SectionPartProps[];
  if (titulaires) {
    const sortedTitulaires = triListeObjetsSurPropriete(
      [...titulaires],
      "position"
    );

    sections = sortedTitulaires.map(
      (titulaire: ITitulaireRequete, index: number) => {
        let sectionParents = {} as SectionPartProps;
        if (titulaire.parentsTitulaire) {
          sectionParents = {
            contentsPart: getParentsDuTitulaire(
              titulaire.parentsTitulaire,
              index
            )
          };
        }
        return sectionParents;
      }
    );
  }
  return sections;
}

function getParentsDuTitulaire(
  parents: IParent[],
  index: number
): SectionContentPartProps {
  const sortedParents = triListeObjetsSurPropriete(
    [...parents],
    "position"
  ) as IParent[];

  return {
    contents: getParentsInfo(sortedParents),
    title: getLibelle(`Parent titulaire ${index + 1}`)
  };
}

function getParentsInfo(parents: IParent[]): SectionContentProps[] {
  return [
    {
      libelle: getLibelle("Nom parent 1"),
      value: <span>{Parent.getNom(parents[0])}</span>
    },
    {
      libelle: getLibelle("Prénom parent 1"),
      value: <span>{Parent.getPrenoms(parents[0])}</span>
    },
    {
      libelle: getLibelle("Nom parent 2"),
      value: <span>{Parent.getNom(parents[1])}</span>
    },
    {
      libelle: getLibelle("Prénom parent 2"),
      value: <span>{Parent.getPrenoms(parents[1])}</span>
    }
  ];
}

function getRequeteDelivrance(
  detailRequete: IRequeteDelivrance
): SectionPanelProps {
  return {
    panelAreas: [
      {
        parts: [
          {
            contentsPart: {
              contents: getRequeteDelivranceInfo(detailRequete)
            }
          }
        ],
        title: getLibelle("Requête")
      }
    ],
    title: ""
  };
}

function getRequeteDelivranceInfo(
  requete: IRequeteDelivrance
): SectionContentProps[] {
  return [
    {
      libelle: getLibelle("Sous-type"),
      value: <span>{requete.sousType.libelle}</span>
    },
    {
      libelle: getLibelle("Statut"),
      value: <span>{requete.statutCourant.statut.libelle}</span>
    },
    {
      libelle: getLibelle("Nature"),
      value: <span>{requete.evenement?.natureActe.libelle}</span>
    },
    {
      libelle: getLibelle("Date de l'évènement"),
      value: <span>{EvenementReqDelivrance.getDate(requete.evenement)}</span>
    },
    {
      libelle: getLibelle("Lieu de l'évènement"),
      value: (
        <>
          <div>{EvenementReqDelivrance.getVille(requete.evenement)}</div>
          <div>{EvenementReqDelivrance.getPays(requete.evenement)}</div>
        </>
      )
    },
    {
      libelle: getLibelle("Document"),
      value: <span>{requete.documentDemande}</span>
    },
    {
      libelle: getLibelle("Motif"),
      value: <span>{requete?.motif?.libelle}</span>
    },
    {
      libelle: getLibelle("Complément motif"),
      value: <span>{requete.complementMotif}</span>
    },
    {
      libelle: getLibelle("Nb exemplaire"),
      value: <span>{requete.nbExemplaireImpression}</span>
    },
    {
      libelle: getLibelle("Canal"),
      value: <span>{requete.canal.libelle}</span>
    },
    {
      libelle: getLibelle("Provenance"),
      value: <span>{requete.provenanceRequete.provenance.libelle}</span>
    },
    {
      libelle: getLibelle("Date de création de la requête"),
      value: <span>{Requete.getDateCreation(requete)}</span>
    }
  ];
}

function getRequerant(requerant?: IRequerant): SectionPartProps[] {
  let sections = [] as SectionPartProps[];
  if (requerant) {
    sections = [
      {
        contentsPart: {
          contents: getRequerantInfo1(requerant)
        }
      },
      {
        contentsPart: {
          contents: getRequerantInfo2(requerant)
        }
      }
    ];
  }

  return sections;
}

function getRequerantInfo1(requerant?: IRequerant): SectionContentProps[] {
  let nom = undefined;

  switch (requerant?.qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      nom = requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale;
      break;
    case Qualite.INSTITUTIONNEL:
      nom = requerant?.qualiteRequerant.institutionnel?.nomInstitution;
      break;
    case Qualite.PARTICULIER || Qualite.UTILISATEUR_RECE:
      nom = Requerant.getNomFamille(requerant);
      break;
    default:
      nom = "";
      break;
  }

  return [
    {
      libelle: getLibelle("Qualité"),
      value: <span>{requerant?.qualiteRequerant.qualite?.libelle}</span>
    },
    {
      libelle: getLibelle("Nom (ou raison sociale)"),
      value: <span>{nom}</span>
    },
    {
      libelle: getLibelle("Nom d'usage"),
      value: <span>{Requerant.getNomFamille(requerant)}</span>
    },
    {
      libelle: getLibelle("Prénom"),
      value: <span>{Requerant.getPrenom(requerant)}</span>
    },
    {
      libelle: getLibelle("Adresse"),
      value: (
        <>
          <div>{requerant?.adresse?.ligne2}</div>
          <div>{requerant?.adresse?.ligne3}</div>
          <div>{requerant?.adresse?.ligne4}</div>
          <div>{requerant?.adresse?.ligne5}</div>
          <div>{`${requerant?.adresse?.codePostal} ${requerant?.adresse?.ville}`}</div>
          <div>{requerant?.adresse?.pays}</div>
        </>
      )
    }
  ];
}

function getRequerantInfo2(requerant?: IRequerant): SectionContentProps[] {
  let type = undefined;
  const qualiteRequerant = requerant?.qualiteRequerant;

  if (qualiteRequerant?.qualite === Qualite.MANDATAIRE_HABILITE) {
    type =
      qualiteRequerant.mandataireHabilite?.type === TypeMandataireReq.AUTRE
        ? qualiteRequerant.mandataireHabilite?.nature
        : qualiteRequerant.mandataireHabilite?.type.libelle;
  } else if (qualiteRequerant?.qualite === Qualite.INSTITUTIONNEL) {
    type =
      qualiteRequerant.institutionnel?.type === TypeInstitutionnel.AUTRE
        ? qualiteRequerant.institutionnel?.nature
        : qualiteRequerant.institutionnel?.type.libelle;
  }

  const lienTitulaire =
    requerant?.lienRequerant?.lien === TypeLienRequerant.AUTRE
      ? requerant?.lienRequerant?.natureLien
      : requerant?.lienRequerant?.lien.libelle;

  return [
    {
      libelle: getLibelle("Type (si Mandatire ou Institutionnel"),
      value: <span>{type}</span>
    },
    {
      libelle: getLibelle("Adresse email"),
      value: <span>{requerant?.courriel}</span>
    },
    {
      libelle: getLibelle("N° de téléphone"),
      value: <span>{requerant?.telephone}</span>
    },
    {
      libelle: getLibelle("Lien avec le titulaire"),
      value: <span>{lienTitulaire}</span>
    }
  ];
}

function getMandant(mandant?: IMandant): SectionPartProps[] {
  let sections = [] as SectionPartProps[];
  if (mandant) {
    sections = [
      {
        contentsPart: {
          contents: getMandantInfo1(mandant)
        }
      },
      {
        contentsPart: {
          contents: getMandantInfo2(mandant)
        }
      }
    ];
  }

  return sections;
}

function getMandantInfo1(mandant?: IMandant): SectionContentProps[] {
  const lienTitulaire =
    mandant?.typeLien === TypeLienMandant.AUTRE
      ? mandant?.natureLien
      : mandant?.typeLien?.libelle;
  return [
    {
      libelle: getLibelle("Type"),
      value: <span>{mandant?.type.libelle}</span>
    },
    {
      libelle: getLibelle("Lien avec titulaire"),
      value: <span>{lienTitulaire}</span>
    }
  ];
}

function getMandantInfo2(mandant?: IMandant): SectionContentProps[] {
  return [
    {
      libelle: getLibelle("Nom"),
      value: <span>{Mandant.getNom(mandant)}</span>
    },
    {
      libelle: getLibelle("Prénom"),
      value: <span>{Mandant.getPrenom(mandant)}</span>
    },
    {
      libelle: getLibelle("Raison sociale"),
      value: <span>{mandant?.raisonSociale}</span>
    }
  ];
}
