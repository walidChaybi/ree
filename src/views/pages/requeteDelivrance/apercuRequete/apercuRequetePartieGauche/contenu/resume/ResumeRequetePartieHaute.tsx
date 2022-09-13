import { Qualite } from "@model/requete/enum/Qualite";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { EvenementReqDelivrance } from "@model/requete/IEvenementReqDelivrance";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import {
  formatPrenom,
  getLibelle,
  triListeObjetsSurPropriete
} from "@util/Utils";
import React, { Fragment } from "react";
import { ItemLibelle } from "./item/ItemLibelle";
import "./scss/ResumeRequetePartieHaute.scss";

interface ResumeRequetePartieHauteProps {
  requete: IRequeteDelivrance;
}

export const ResumeRequetePartieHaute: React.FC<
  ResumeRequetePartieHauteProps
> = props => {
  const sortedTitulaires = props.requete.titulaires
    ? triListeObjetsSurPropriete([...props.requete.titulaires], "position")
    : [];

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

  function getReferenceDila() {
    return props.requete.provenanceRequete.provenanceServicePublic
      ? props.requete.provenanceRequete.provenanceServicePublic?.referenceDila
      : "";
  }

  function getPremierPrenom(titulaire: ITitulaireRequete) {
    return titulaire.prenoms && titulaire.prenoms.length
      ? formatPrenom(
          triListeObjetsSurPropriete([...titulaire.prenoms], "numeroOrdre")[0]
            .prenom
        )
      : "";
  }

  return (
    <div className="ResumeRequetePartieHaute">
      <ItemLibelle libelle={"N° télédossier"} data={getReferenceDila()} />

      <ItemLibelle
        libelle={"Sous-type"}
        data={props.requete.sousType.libelle}
      />

      {!sortedTitulaires.length ? (
        <span>{getLibelle("Il n'y a pas de titulaire")}</span>
      ) : (
        sortedTitulaires.map((titulaire: ITitulaireRequete, idx: number) => (
          <Fragment key={idx}>
            <div className="titleTitulaire">
              <span>{`${getLibelle("Info titulaire")} ${idx + 1}`}</span>
            </div>

            <ItemLibelle
              libelle={"Nom"}
              data={TitulaireRequete.getNom(titulaire)}
            />

            <ItemLibelle
              libelle={"Prénom"}
              data={getPremierPrenom(titulaire)}
            />

            <ItemLibelle
              libelle={"Né(e) le"}
              data={TitulaireRequete.getDateNaissance(titulaire)}
            />
          </Fragment>
        ))
      )}

      <ItemLibelle
        libelle={"Nature"}
        data={props.requete.evenement?.natureActe.libelle}
      />

      <ItemLibelle
        libelle={"Date de l'évènement"}
        data={EvenementReqDelivrance.getDate(props.requete.evenement)}
      />

      <ItemLibelle
        libelle={"Lieu de l'évènement"}
        data={affichageLieu(
          EvenementReqDelivrance.getVille(props.requete.evenement),
          EvenementReqDelivrance.getPays(props.requete.evenement)
        )}
      />

      <ItemLibelle
        libelle={"Document"}
        data={props.requete.documentDemande.libelle}
      />

      <ItemLibelle libelle={"Motif"} data={props.requete.motif?.libelle} />

      <ItemLibelle libelle={"Canal"} data={props.requete.canal.libelle} />

      <hr className={"separation"} />

      <div className="sectionPanel">
        <ItemLibelle
          libelle={"Nom requérant"}
          data={getNomOuRaisonSociale(props.requete.requerant)}
        />

        <ItemLibelle
          libelle={"Prénom requérant"}
          data={Requerant.getPrenom(props.requete.requerant)}
        />

        <ItemLibelle
          libelle={"Lien avec le titulaire"}
          data={getLienRequerant(props.requete)}
        />
      </div>
    </div>
  );
};
