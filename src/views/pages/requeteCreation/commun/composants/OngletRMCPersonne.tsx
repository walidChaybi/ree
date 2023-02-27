import { IRMCAutoPersonneResultat } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { TableauRMCAutoPersonne } from "@pages/rechercheMultiCriteres/autoPersonne/TableauRMCAutoPersonne";
import { getDateStringFromDateCompose } from "@util/DateUtils";
import {
  enMajuscule,
  getLibelle,
  getPremierElemOuVide,
  getValeurOuVide,
  SNP
} from "@util/Utils";
import { BoutonMenu, IBoutonMenuItem } from "@widget/boutonMenu/BoutonMenu";
import React from "react";

interface OngletRMCPersonneProps {
  rmcAutoPersonneResultat: IRMCAutoPersonneResultat[];
  sousTypeRequete: SousTypeCreation;
  handleClickMenuItem: (idTitulaire: string) => void;
  listeTitulaires?: ITitulaireRequeteCreation[];
}

export const OngletRMCPersonne: React.FC<OngletRMCPersonneProps> = props => {
  function getListeItemsPersonnes(): IBoutonMenuItem[] {
    return props.listeTitulaires
      ? props.listeTitulaires.map(titulaire => ({
          key: titulaire.id,
          libelle: getLibelleMenuItemPersonne(titulaire, props.sousTypeRequete)
        }))
      : [];
  }

  return (
    <>
      <TableauRMCAutoPersonne data={props.rmcAutoPersonneResultat} />
      <BoutonMenu
        boutonLibelle={getLibelle("Lancer RMC sur une nouvelle personne")}
        listeItems={getListeItemsPersonnes()}
        onClickMenuItem={e => props.handleClickMenuItem(e)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </>
  );
};

function getLibelleMenuItemPersonne(
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
): string | undefined {
  const libellePositionEnfantTitulaire =
    SousTypeCreation.estSousTypeTranscription(sousTypeRequete) &&
    titulaire.enfantTitulaireActeTranscritDresse
      ? `titulaire ${titulaire.enfantTitulaireActeTranscritDresse?.position} `
      : "";

  switch (titulaire.typeObjetTitulaire) {
    case TypeObjetTitulaire.POSTULANT_NATIONALITE:
      return SousTypeCreation.estRCEXR(sousTypeRequete)
        ? "Postulant"
        : "Déclarant";
    case TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE:
      return `Titulaire ${titulaire.position}`;
    case TypeObjetTitulaire.FAMILLE:
      return QualiteFamille.estParent(titulaire.qualite)
        ? `Parent ${titulaire.position} ${libellePositionEnfantTitulaire}`
        : getValeurOuVide(titulaire.qualite?.libelle);
  }
}

function getNom(titulaire: ITitulaireRequeteCreation): string {
  const nom: string = enMajuscule(
    titulaire.typeObjetTitulaire !==
      TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE
      ? titulaire.nomNaissance
      : titulaire.nomNaissance === SNP
      ? titulaire.nomDemandeFrancisation
      : titulaire.nomNaissance
  );
  const prenom: string = getPremierElemOuVide(
    titulaire.prenoms?.map(prenomOrdonne => prenomOrdonne.prenom)
  );
  return prenom !== "" ? `${nom} ${prenom}` : nom;
}
