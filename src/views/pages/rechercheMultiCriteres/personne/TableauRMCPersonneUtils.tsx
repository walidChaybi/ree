import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { HeaderTableauRMCPersonne } from "@model/rmc/headerTableau/HeaderTableauRMCPersonne";
import ReportIcon from "@mui/icons-material/Report";
import { getDateStringFromDateCompose } from "@util/DateUtils";
import { Options } from "@util/Type";
import {
  CINQ,
  TROIS,
  enMajuscule,
  formatNoms,
  formatPrenoms,
  getValeurOuVide
} from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurHTMLButtonElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  IColonneBoutonMenuParams,
  getColonneBoutonMenu
} from "@widget/tableau/TableauRece/colonneElements/boutonMenu/ColonneBoutonMenu";
import {
  IActeInscriptionRMCPersonne,
  IPersonneRMCPersonne,
  IRMCPersonneResultat
} from "../../../common/hook/rmcAuto/IRMCPersonneResultat";
import { commonHeadersTableauRMC } from "../acteInscription/resultats/RMCTableauCommun";
import { IDataTableauRMCPersonne } from "./IDataTableauRMCPersonne";

export function getColonnesTableauRMCAutoPersonne<TData, TIdentifiant>(
  colonneBoutonAjouterPersonneOuActeInscriptionParams: IColonneBoutonMenuParams<
    TData,
    TIdentifiant
  >,
  conteneurBoutonAjouterPersonneOuActeInscriptionProps: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TMouseEventSurHTMLButtonElement
  >
): TableauTypeColumn[] {
  return [
    ...getColonnesTableauPersonnes().slice(0, -1),
    ...getColonnesTableauDocuments().slice(0, -1),
    getColonneBoutonMenu(
      colonneBoutonAjouterPersonneOuActeInscriptionParams,
      undefined,
      conteneurBoutonAjouterPersonneOuActeInscriptionProps
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
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRMCPersonne.TYPE_PJ.nom],
      title: HeaderTableauRMCPersonne.TYPE_PJ.libelle,
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
    libelle = libelle.concat(` (${titulaire.sexe.libelle.charAt(0)})`);
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
      ...mapActesInscriptionsDataTableauRMCPersonne(
        resultatPersonne.actesInscriptions
      )
    );
  });
  return data;
}

export function mapPersonneDataTableauRMCPersonne(
  personne: IPersonneRMCPersonne
): IDataTableauRMCPersonne {
  return {
    idPersonneOuActeInscription: personne.idPersonne,
    estDataPersonne: true,
    nom: personne.nom,
    dateNaissance: personne.dateNaissance,
    lieuNaissance: personne.lieuNaissance,
    ...formatDataTableauPersonne(personne),
    nature: "",
    statut: "",
    reference: "",
    statutOuType: ""
  };
}

export function formatDataTableauPersonne(personne: IPersonneRMCPersonne) {
  return {
    autresNoms: formatNoms(personne.autresNoms),
    prenoms: formatPrenoms(personne.prenoms.slice(0, TROIS)),
    sexe: personne.sexe.libelle.charAt(0)
  };
}

export function mapActesInscriptionsDataTableauRMCPersonne(
  actesInscriptions: IActeInscriptionRMCPersonne[]
): IDataTableauRMCPersonne[] {
  return actesInscriptions.map(acteInscription => ({
    idPersonneOuActeInscription: acteInscription.idActeInscription,
    estDataPersonne: false,
    nature: acteInscription.nature,
    statut: acteInscription.statut,
    reference: acteInscription.reference,
    typeFiche: acteInscription.typeFiche,
    statutOuType: acteInscription.statutOuType,
    nom: "",
    autresNoms: "",
    prenoms: "",
    dateNaissance: "",
    lieuNaissance: "",
    sexe: "",
    role: ""
  }));
}

export function getIdentifiantPersonneOuActeInscription(
  data: IDataTableauRMCPersonne
): string {
  return data.idPersonneOuActeInscription;
}

export function getRolesPersonneAsOptionsEnFonctionNatureActeRequete(
  natureActeRequete: NatureActeRequete
): Options {
  return RolePersonneSauvegardee.filtreRolesPersonnesSauvegardeesEnFonctionNatureActeRequete(
    natureActeRequete
  ).map(role => RolePersonneSauvegardee.getLibelleAsOption(role.libelle));
}
