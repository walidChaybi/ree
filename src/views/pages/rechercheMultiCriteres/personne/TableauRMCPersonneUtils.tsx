import { Sexe } from "@model/etatcivil/enum/Sexe";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { HeaderTableauRMCPersonne } from "@model/rmc/headerTableau/HeaderTableauRMCPersonne";
import ReportIcon from "@mui/icons-material/Report";
import { getDateStringFromDateCompose } from "@util/DateUtils";
import {
  CINQ,
  enMajuscule,
  formatNoms,
  formatPrenoms,
  getValeurOuVide,
  TROIS
} from "@util/Utils";
import { ICelluleBoutonMenuProps } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/CelluleBoutonMenu";
import {
  getColonneBoutonMenu,
  IColonneBoutonMenuParams
} from "@widget/tableau/TableauRece/colonneElements/boutonMenu/ColonneBoutonMenu";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurHTMLButtonElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import {
  IActesOuInscriptionsRMCPersonne,
  IPersonneRMCPersonne,
  IRMCPersonneResultat
} from "../../../common/hook/rmcAuto/IRMCPersonneResultat";
import { IDataTableauRMCPersonne } from "../../requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauRMCPersonne";
import { commonHeadersTableauRMC } from "../acteInscription/resultats/RMCTableauCommun";

export function getColonnesTableauRMCAutoPersonne<TData, TIdentifiant>(
  colonneBoutonAjouterPersonneParams: IColonneBoutonMenuParams<
    TData,
    TIdentifiant
  >,
  conteneurBoutonAjouterPersonneProps: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TMouseEventSurHTMLButtonElement
  >,
  boutonMenuAjouterPersonneProps: ICelluleBoutonMenuProps
): TableauTypeColumn[] {
  colonneBoutonAjouterPersonneParams.style = {
    width: "3rem"
  };
  return [
    ...getColonnesTableauPersonnes().slice(0, -1),
    ...getColonnesTableauDocuments(),
    getColonneBoutonMenu(
      colonneBoutonAjouterPersonneParams,
      boutonMenuAjouterPersonneProps,
      conteneurBoutonAjouterPersonneProps
    )
  ];
}

export function getColonnesTableauPersonnes(): TableauTypeColumn[] {
  return [
    ...commonHeadersTableauRMC.slice(0, TROIS),
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.SEXE.nom],
      title: HeaderTableauRMCPersonne.SEXE.libelle,
      style: { width: "4rem" }
    }),
    commonHeadersTableauRMC[TROIS],
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.LIEU_NAISSANCE.nom],
      title: HeaderTableauRMCPersonne.LIEU_NAISSANCE.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.ROLE.nom],
      title: HeaderTableauRMCPersonne.ROLE.libelle
    })
  ];
}

export function getColonnesTableauDocuments(): TableauTypeColumn[] {
  return [
    commonHeadersTableauRMC[CINQ],
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.REFERENCE.nom],
      title: HeaderTableauRMCPersonne.REFERENCE.libelle,
      className: "ColOverflow"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.STATUT_OU_TYPE.nom],
      title: HeaderTableauRMCPersonne.STATUT_OU_TYPE.libelle,
      className: "ColOverflow"
    })
  ];
}

export function getLigneTableauVide(message: string): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>{message}</div>
    </>
  );
}

export function getLibelleMenuItemPersonne(
  titulaire: ITitulaireRequeteCreation,
  sousTypeRequete: SousTypeCreation
) {
  let libelle = "";

  // Qualite
  const qualite: string | undefined = getLibelleQualiteTitulaire(
    titulaire,
    sousTypeRequete
  );
  if (qualite) {
    libelle = qualite.concat(` - `);
  }

  // Nom
  libelle = libelle.concat(getNom(titulaire));

  // Sexe
  if (!Sexe.estIndetermineOuInconnu(titulaire.sexe)) {
    libelle = libelle.concat(` (${titulaire.sexe.charAt(0).toUpperCase()})`);
  }

  // Date de naissance
  if (titulaire.anneeNaissance) {
    libelle = libelle.concat(
      `, ${getDateStringFromDateCompose({
        jour: titulaire.jourNaissance?.toString(),
        mois: titulaire.moisNaissance?.toString(),
        annee: titulaire.anneeNaissance.toString()
      })}`
    );
  }

  return libelle;
}

function getLibelleQualiteTitulaire(
  titulaire: ITitulaireRequeteCreation,
  sousTypeRequete: SousTypeCreation
): string {
  let libelleQualiteTitulaire: string;

  switch (titulaire.typeObjetTitulaire) {
    case TypeObjetTitulaire.POSTULANT_NATIONALITE:
      libelleQualiteTitulaire = SousTypeCreation.estRCEXR(sousTypeRequete)
        ? "Postulant"
        : "Déclarant";
      break;
    case TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE:
      libelleQualiteTitulaire = `Titulaire ${titulaire.position}`;
      break;
    case TypeObjetTitulaire.FAMILLE:
    default:
      const libellePositionEnfantTitulaire =
        SousTypeCreation.estSousTypeTranscription(sousTypeRequete) &&
        titulaire.enfantTitulaireActeTranscritDresse
          ? `titulaire ${titulaire.enfantTitulaireActeTranscritDresse?.position} `
          : "";
      libelleQualiteTitulaire = QualiteFamille.estParent(titulaire.qualite)
        ? `Parent ${titulaire.position} ${libellePositionEnfantTitulaire}`
        : getValeurOuVide(titulaire.qualite?.libelle);
      break;
  }
  return libelleQualiteTitulaire;
}

function getNom(titulaire: ITitulaireRequeteCreation): string {
  const nom: string = enMajuscule(titulaire.nomNaissance);
  const prenom: string | undefined = TitulaireRequete.getPrenom1(titulaire);
  return `${nom} ${prenom}`;
}

export function mapDataTableauRMCPersonne(
  resultatRMCPersonne: IRMCPersonneResultat[]
): IDataTableauRMCPersonne[] {
  const data: IDataTableauRMCPersonne[] = [];
  resultatRMCPersonne.forEach(resultatPersonne => {
    data.push(mapPersonneDataTableauRMCPersonne(resultatPersonne.personne));
    data.push(
      ...mapActesOuInscriptionsLiesDataTableauRMCPersonne(
        resultatPersonne.actesOuInscriptionsLies
      )
    );
  });
  return data;
}

export function mapPersonneDataTableauRMCPersonne(
  personne: IPersonneRMCPersonne
): IDataTableauRMCPersonne {
  return {
    idPersonne: personne.idPersonne,
    nom: personne.nom,
    autresNoms: formatNoms(personne.autresNoms),
    prenoms: formatPrenoms(personne.prenoms.slice(0, TROIS)),
    dateNaissance: personne.dateNaissance,
    lieuNaissance: personne.lieuNaissance,
    sexe: personne.sexe.libelle.charAt(0),
    idActeOuInscription: "",
    nature: "",
    statut: "",
    reference: "",
    categorieRepertoire: "",
    statutOuType: ""
  };
}

export function mapActesOuInscriptionsLiesDataTableauRMCPersonne(
  actesOuInscriptionsLies: IActesOuInscriptionsRMCPersonne[]
): IDataTableauRMCPersonne[] {
  return actesOuInscriptionsLies.map(aoiLies => ({
    ...aoiLies,
    idPersonne: "",
    nom: "",
    autresNoms: "",
    prenoms: "",
    dateNaissance: "",
    lieuNaissance: "",
    sexe: "",
    role: ""
  }));
}
