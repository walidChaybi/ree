import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { EvenementRequete } from "@model/requete/IEvenementRequete";
import { IMandant, Mandant } from "@model/requete/IMandant";
import { IParent, Parent } from "@model/requete/IParents";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { Requete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPartProps } from "@widget/section/SectionPart";
import { SectionPartContentProps } from "@widget/section/SectionPartContent";
import {
  ajouterContentPartAuPartMultiValeurs,
  ajouterContentPartAuPartUneValeur,
  ajouterPanelAreasAuPanel
} from "@widget/section/SectionUtils";

export const getPanelsDetailRequete = (detailRequete?: IRequeteDelivrance) => {
  const panels: SectionPanelProps[] = [];

  if (detailRequete?.type === TypeRequete.DELIVRANCE) {
    panels[0] = getPanelDetailRequeteDelivrance(detailRequete);
    panels[1] = getRequeteDelivrance(detailRequete);
  }

  return panels;
};

const getPanelDetailRequeteDelivrance = (detailRequete: IRequeteDelivrance): SectionPanelProps => {
  const deuxColonnes = 2;

  const panel = {
    panelAreas: [],
    title: "Detail requête délivrance"
  } as SectionPanelProps;

  ajouterPanelAreasAuPanel(panel, detailRequete.titulaires, getTitulaires, deuxColonnes, "Titulaires");

  if (parentsPresents(detailRequete.titulaires)) {
    ajouterPanelAreasAuPanel(panel, detailRequete.titulaires, getParentsDesTitulaires, deuxColonnes);
  }

  ajouterPanelAreasAuPanel(panel, detailRequete.requerant, getRequerant, deuxColonnes, "Requérant");

  ajouterPanelAreasAuPanel(panel, detailRequete.mandant, getMandant, deuxColonnes, "Mandant");

  return panel;
};

const getTitulaires = (titulaires: ITitulaireRequete[]): SectionPartProps[] => {
  const sortedTitulaires = triListeObjetsSurPropriete([...titulaires], "position");

  return sortedTitulaires.map((titulaire, index) => {
    return {
      partContent: {
        contents: getTitulairesInfo(titulaire, index + 1)
      }
    };
  });
};

const getTitulairesInfo = (titulaire: ITitulaireRequete, index: number): SectionContentProps[] => {
  const infosTitulaire = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(infosTitulaire, `Nom Titulaire ${index}`, TitulaireRequete.getNom(titulaire));
  ajouterContentPartAuPartUneValeur(infosTitulaire, "Prénom 1", TitulaireRequete.getPrenom1(titulaire));
  ajouterContentPartAuPartUneValeur(infosTitulaire, "Prénom 2", TitulaireRequete.getPrenom2(titulaire));
  ajouterContentPartAuPartUneValeur(infosTitulaire, "Prénom 3", TitulaireRequete.getPrenom3(titulaire));
  ajouterContentPartAuPartUneValeur(infosTitulaire, "Né(e) le", TitulaireRequete.getDateNaissance(titulaire));
  ajouterContentPartAuPartUneValeur(infosTitulaire, "Sexe", TitulaireRequete.getSexe(titulaire));
  ajouterContentPartAuPartMultiValeurs(infosTitulaire, "Lieu de naissance", [
    TitulaireRequete.getVille(titulaire),
    TitulaireRequete.getPays(titulaire)
  ]);

  return infosTitulaire;
};

const parentsPresents = (titulaires?: ITitulaireRequete[]) => {
  let parentsPresent = false;

  if (titulaires) {
    titulaires.forEach((titulaire: ITitulaireRequete) => {
      if (titulaire.parentsTitulaire && titulaire.parentsTitulaire.length > 0) {
        parentsPresent = true;
      }
    });
  }

  return parentsPresent;
};

const getParentsDesTitulaires = (titulaires: ITitulaireRequete[]): SectionPartProps[] => {
  const sortedTitulaires = triListeObjetsSurPropriete([...titulaires], "position");

  return sortedTitulaires.map((titulaire: ITitulaireRequete, index: number) => {
    let sectionParents = {} as SectionPartProps;
    if (titulaire.parentsTitulaire && titulaire.parentsTitulaire?.length > 0) {
      sectionParents = {
        partContent: getParentsDuTitulaire(titulaire.parentsTitulaire, index)
      };
    }
    return sectionParents;
  });
};

const getParentsDuTitulaire = (parents: IParent[], index: number): SectionPartContentProps => {
  const sortedParents = triListeObjetsSurPropriete([...parents], "position") as IParent[];

  return {
    contents: getParentsInfo(sortedParents),
    title: `Parent titulaire ${index + 1}`
  };
};

const getParentsInfo = (parents: IParent[]): SectionContentProps[] => {
  const infosParent = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(infosParent, "Nom parent 1", Parent.getNom(parents[0]));
  ajouterContentPartAuPartUneValeur(infosParent, "Prénom parent 1", Parent.getPrenoms(parents[0]));
  ajouterContentPartAuPartUneValeur(infosParent, "Nom parent 2", Parent.getNom(parents[1]));
  ajouterContentPartAuPartUneValeur(infosParent, "Prénom parent 2", Parent.getPrenoms(parents[1]));

  return infosParent;
};

const getRequerant = (requerant: IRequerant): SectionPartProps[] => {
  return [
    {
      partContent: {
        contents: getRequerantInfo1(requerant)
      }
    },
    {
      partContent: {
        contents: getRequerantInfo2(requerant)
      }
    },
    {
      partContent: {
        contents: getRequerantInfo3(requerant)
      }
    }
  ];
};

const getRequerantInfo1 = (requerant: IRequerant): SectionContentProps[] => {
  const infosRequerant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(infosRequerant, "Qualité", requerant.qualiteRequerant.qualite?.libelle);
  ajouterContentPartAuPartUneValeur(infosRequerant, "Nom (ou raison sociale)", getNomOuRaisonSociale(requerant));
  ajouterContentPartAuPartUneValeur(infosRequerant, "Nom d'usage", Requerant.getNomFamille(requerant));
  ajouterContentPartAuPartUneValeur(infosRequerant, "Prénom", Requerant.getPrenom(requerant));
  if (requerant.adresse != null) {
    ajouterContentPartAuPartMultiValeurs(infosRequerant, "Adresse", [
      requerant.adresse?.ligne2,
      requerant.adresse?.ligne3,
      requerant.adresse?.ligne4,
      requerant.adresse?.ligne5,
      `${requerant.adresse?.codePostal} ${requerant.adresse?.ville}`,
      requerant.adresse?.pays
    ]);
  }

  return infosRequerant;
};

const getNomOuRaisonSociale = (requerant: IRequerant) => {
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
  return nom ?? "";
};

const getRequerantInfo2 = (requerant: IRequerant): SectionContentProps[] => {
  const infosRequerant = [] as SectionContentProps[];

  const lienTitulaire =
    requerant?.lienRequerant?.lien === TypeLienRequerant.AUTRE
      ? requerant?.lienRequerant?.natureLien
      : requerant?.lienRequerant?.lien.libelle;

  ajouterContentPartAuPartUneValeur(infosRequerant, "Type (si Mandataire ou Institutionnel", getTypeRequerant(requerant));
  ajouterContentPartAuPartUneValeur(infosRequerant, "N° de téléphone", requerant.telephone);
  ajouterContentPartAuPartUneValeur(infosRequerant, "Lien avec le titulaire", lienTitulaire);

  return infosRequerant;
};

const getRequerantInfo3 = (requerant: IRequerant): SectionContentProps[] => {
  const infosRequerant = [] as SectionContentProps[];

  ajouterContentPartAuPartUneValeur(infosRequerant, "Adresse email", requerant.courriel);

  return infosRequerant;
};

const getTypeRequerant = (requerant: IRequerant) => {
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
  return type ?? "";
};

const getMandant = (mandant: IMandant): SectionPartProps[] => {
  return [
    {
      partContent: {
        contents: getMandantInfo1(mandant)
      }
    },
    {
      partContent: {
        contents: getMandantInfo2(mandant)
      }
    }
  ];
};

const getMandantInfo1 = (mandant: IMandant): SectionContentProps[] => {
  const infosMandant = [] as SectionContentProps[];

  const lienTitulaire = mandant?.typeLien === TypeLienMandant.AUTRE ? mandant?.natureLien : mandant?.typeLien?.libelle;

  ajouterContentPartAuPartUneValeur(infosMandant, "Type", mandant.type.libelle);
  ajouterContentPartAuPartUneValeur(infosMandant, "Lien avec titulaire", lienTitulaire);

  return infosMandant;
};

const getMandantInfo2 = (mandant: IMandant): SectionContentProps[] => {
  const infosMandant = [] as SectionContentProps[];
  ajouterContentPartAuPartUneValeur(infosMandant, "Nom", Mandant.getNom(mandant));
  ajouterContentPartAuPartUneValeur(infosMandant, "Prénom", Mandant.getPrenom(mandant));
  ajouterContentPartAuPartUneValeur(infosMandant, "Raison sociale", mandant.raisonSociale);

  return infosMandant;
};

const getRequeteDelivrance = (detailRequete: IRequeteDelivrance): SectionPanelProps => {
  return {
    panelAreas: [
      {
        parts: [
          {
            partContent: {
              contents: getRequeteDelivranceInfo(detailRequete)
            }
          }
        ],
        title: "Requête"
      }
    ],
    title: ""
  };
};

const getRequeteDelivranceInfo = (requete: IRequeteDelivrance): SectionContentProps[] => {
  const infosRequete = [] as SectionContentProps[];
  ajouterContentPartAuPartUneValeur(
    infosRequete,
    "N° télédossier",
    requete.provenanceRequete.provenanceServicePublic ? requete.provenanceRequete.provenanceServicePublic.referenceDila : ""
  );
  ajouterContentPartAuPartUneValeur(infosRequete, "Sous-type", requete.sousType.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Statut", requete.statutCourant.statut.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Nature", requete.evenement?.natureActe.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Date de l'évènement", EvenementRequete.getDate(requete.evenement));
  ajouterContentPartAuPartMultiValeurs(infosRequete, "Lieu de l'évènement", [
    EvenementRequete.getVille(requete.evenement),
    EvenementRequete.getPays(requete.evenement)
  ]);
  ajouterContentPartAuPartUneValeur(infosRequete, "Document", requete.documentDemande?.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Motif", requete.motif?.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Complément motif", requete.complementMotif);
  ajouterContentPartAuPartUneValeur(infosRequete, "Nb exemplaire", requete.nbExemplaireImpression?.toString());
  ajouterContentPartAuPartUneValeur(infosRequete, "Canal", requete.canal.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Provenance", requete.provenanceRequete.provenance.libelle);
  ajouterContentPartAuPartUneValeur(infosRequete, "Date de création de la requête", Requete.getDateCreation(requete));

  return infosRequete;
};
