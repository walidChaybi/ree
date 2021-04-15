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
import {
  ajouterContentPartAuPartUneValeur,
  ajouterContentPartAuPartMultiValeurs,
  ajouterPanelAreasAuPanel
} from "../../../common/widget/section/SectionUtils";
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
  const deuxColonnes = 2;

  const panel = {
    panelAreas: [],
    title: getLibelle("Detail requête délivrance")
  } as SectionPanelProps;

  ajouterPanelAreasAuPanel(
    panel,
    detailRequete.titulaires,
    getTitulaires,
    deuxColonnes,
    getLibelle("Titulaires")
  );

  if (parentsPresents(detailRequete.titulaires)) {
    ajouterPanelAreasAuPanel(
      panel,
      detailRequete.titulaires,
      getParentsDesTitulaires,
      deuxColonnes
    );
  }

  ajouterPanelAreasAuPanel(
    panel,
    detailRequete.requerant,
    getRequerant,
    deuxColonnes,
    getLibelle("Requérant")
  );

  ajouterPanelAreasAuPanel(
    panel,
    detailRequete.mandant,
    getMandant,
    deuxColonnes,
    getLibelle("Mandant")
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
      contentsPart: {
        contents: getTitulairesInfo(titulaire, index + 1)
      }
    };
  });
}

function getTitulairesInfo(
  titulaire: ITitulaireRequete,
  index: number
): SectionContentProps[] {
  const infosTitulaire = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle(`Nom Titulaire ${index}`),
    TitulaireRequete.getNom(titulaire)
  );
  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle("Prénom 1"),
    TitulaireRequete.getPrenom1(titulaire)
  );
  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle("Prénom 2"),
    TitulaireRequete.getPrenom2(titulaire)
  );
  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle("Prénom 3"),
    TitulaireRequete.getPrenom3(titulaire)
  );
  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle("Né(e) le"),
    TitulaireRequete.getDateNaissance(titulaire)
  );
  ajouterContentPartAuPartUneValeur(
    infosTitulaire,
    getLibelle("Sexe"),
    TitulaireRequete.getSexe(titulaire)
  );
  ajouterContentPartAuPartMultiValeurs(
    infosTitulaire,
    getLibelle("Lieu de naissance"),
    [TitulaireRequete.getVille(titulaire), TitulaireRequete.getPays(titulaire)]
  );

  return infosTitulaire;
}

function parentsPresents(titulaires?: ITitulaireRequete[]) {
  let parentsPresent = false;

  if (titulaires) {
    titulaires.forEach((titulaire: ITitulaireRequete) => {
      if (titulaire.parentsTitulaire && titulaire.parentsTitulaire.length > 0) {
        parentsPresent = true;
      }
    });
  }

  return parentsPresent;
}

function getParentsDesTitulaires(
  titulaires: ITitulaireRequete[]
): SectionPartProps[] {
  const sortedTitulaires = triListeObjetsSurPropriete(
    [...titulaires],
    "position"
  );

  return sortedTitulaires.map((titulaire: ITitulaireRequete, index: number) => {
    let sectionParents = {} as SectionPartProps;
    if (titulaire.parentsTitulaire && titulaire.parentsTitulaire?.length > 0) {
      sectionParents = {
        contentsPart: getParentsDuTitulaire(titulaire.parentsTitulaire, index)
      };
    }
    return sectionParents;
  });
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
  const infosParent = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosParent,
    getLibelle("Nom parent 1"),
    Parent.getNom(parents[0])
  );
  ajouterContentPartAuPartUneValeur(
    infosParent,
    getLibelle("Prénom parent 1"),
    Parent.getPrenoms(parents[0])
  );
  ajouterContentPartAuPartUneValeur(
    infosParent,
    getLibelle("Nom parent 2"),
    Parent.getNom(parents[1])
  );
  ajouterContentPartAuPartUneValeur(
    infosParent,
    getLibelle("Prénom parent 2"),
    Parent.getPrenoms(parents[1])
  );

  return infosParent;
}

function getRequerant(requerant: IRequerant): SectionPartProps[] {
  return [
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

function getRequerantInfo1(requerant: IRequerant): SectionContentProps[] {
  const infosRequerant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Qualité"),
    requerant.qualiteRequerant.qualite?.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Nom (ou raison sociale)"),
    getNomOuRaisonSociale(requerant)
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Nom d'usage"),
    Requerant.getNomFamille(requerant)
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Prénom"),
    Requerant.getPrenom(requerant)
  );
  if (requerant.adresse != null) {
    ajouterContentPartAuPartMultiValeurs(
      infosRequerant,
      getLibelle("Adresse"),
      [
        requerant.adresse?.ligne2,
        requerant.adresse?.ligne3,
        requerant.adresse?.ligne4,
        requerant.adresse?.ligne5,
        `${requerant.adresse?.codePostal} ${requerant.adresse?.ville}`,
        requerant.adresse?.pays
      ]
    );
  }

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
    case Qualite.PARTICULIER || Qualite.UTILISATEUR_RECE:
      nom = Requerant.getNomFamille(requerant);
      break;
    default:
      nom = "";
      break;
  }
  return nom ? nom : "";
}

function getRequerantInfo2(requerant: IRequerant): SectionContentProps[] {
  const infosRequerant = [] as SectionContentProps[];

  const lienTitulaire =
    requerant?.lienRequerant?.lien === TypeLienRequerant.AUTRE
      ? requerant?.lienRequerant?.natureLien
      : requerant?.lienRequerant?.lien.libelle;

  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Type (si Mandatire ou Institutionnel"),
    getTypeRequerant(requerant)
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Adresse email"),
    requerant.courriel
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("N° de téléphone"),
    requerant.telephone
  );
  ajouterContentPartAuPartUneValeur(
    infosRequerant,
    getLibelle("Lien avec le titulaire"),
    lienTitulaire
  );

  return infosRequerant;
}

function getTypeRequerant(requerant: IRequerant) {
  let type: string | undefined;
  const qualiteRequerant = requerant.qualiteRequerant;

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
  return type ? type : "";
}

function getMandant(mandant: IMandant): SectionPartProps[] {
  return [
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

function getMandantInfo1(mandant: IMandant): SectionContentProps[] {
  const infosMandant = [] as SectionContentProps[];

  const lienTitulaire =
    mandant?.typeLien === TypeLienMandant.AUTRE
      ? mandant?.natureLien
      : mandant?.typeLien?.libelle;

  ajouterContentPartAuPartUneValeur(
    infosMandant,
    getLibelle("Type"),
    mandant.type.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosMandant,
    getLibelle("Lien avec titulaire"),
    lienTitulaire
  );

  return infosMandant;
}

function getMandantInfo2(mandant: IMandant): SectionContentProps[] {
  const infosMandant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosMandant,
    getLibelle("Nom"),
    Mandant.getNom(mandant)
  );
  ajouterContentPartAuPartUneValeur(
    infosMandant,
    getLibelle("Prénom"),
    Mandant.getPrenom(mandant)
  );
  ajouterContentPartAuPartUneValeur(
    infosMandant,
    getLibelle("Raison sociale"),
    mandant.raisonSociale
  );

  return infosMandant;
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
  const infosRequete = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Sous-type"),
    requete.sousType.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Statut"),
    requete.statutCourant.statut.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Nature"),
    requete.evenement?.natureActe.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Date de l'évènement"),
    EvenementReqDelivrance.getDate(requete.evenement)
  );
  ajouterContentPartAuPartMultiValeurs(
    infosRequete,
    getLibelle("Lieu de l'évènement"),
    [
      EvenementReqDelivrance.getVille(requete.evenement),
      EvenementReqDelivrance.getPays(requete.evenement)
    ]
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Document"),
    requete.documentDemande.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Motif"),
    requete.motif?.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Complément motif"),
    requete.complementMotif
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Nb exemplaire"),
    requete.nbExemplaireImpression?.toString()
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Canal"),
    requete.canal.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Provenance"),
    requete.provenanceRequete.provenance.libelle
  );
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    getLibelle("Date de création de la requête"),
    Requete.getDateCreation(requete)
  );

  return infosRequete;
}
