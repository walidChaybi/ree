import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import {
  EvenementReqDelivrance,
  IEvenementReqDelivrance
} from "@model/requete/IEvenementReqDelivrance";
import { IMandant } from "@model/requete/IMandant";
import { IParent } from "@model/requete/IParents";
import { IQualiteRequerant } from "@model/requete/IQualiteRequerant";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { formatagePrenoms } from "@pages/requeteCreation/EspaceCreation/apercuReqCreation/mappingIRequeteCreationVersResumeRequeteCreationProps";
import {
  formatLigne,
  formatNom,
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  triListeObjetsSurPropriete
} from "@util/Utils";
import React from "react";
import { formatLigneLieu, formatLigneNomPrenoms } from "./Formatages";
import { ItemLibelle } from "./item/ItemLibelle";
import { ItemMultiLignes } from "./item/ItemMultiLignes";
import "./scss/ResumeRequetePartieHaute.scss";
import { IdentiteType } from "./Types";

interface ResumeRequetePartieHauteProps {
  requete: IRequeteDelivrance;
}

export const ResumeRequetePartieHaute: React.FC<
  ResumeRequetePartieHauteProps
> = props => {
  const sortedTitulaires = props.requete.titulaires
    ? triListeObjetsSurPropriete([...props.requete.titulaires], "position")
    : [];

  return (
    <div className="ResumeRequetePartieHaute">
      <ItemLibelle
        label={"Acte"}
        texte={props.requete.evenement?.natureActe.libelle}
        visible={!SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType)}
      />
      <ItemLibelle
        label={"Document demandé"}
        texte={props.requete.documentDemande.libelle}
      />
      <ItemLibelle
        label={"Motif"}
        texte={props.requete.motif?.libelle}
        visible={!SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType)}
      />

      <hr className={"separation"} />

      <div className="inline">
        {!sortedTitulaires.length ? (
          <span>{getLibelle("Il n'y a pas de titulaire")}</span>
        ) : (
          sortedTitulaires.map((titulaire: ITitulaireRequete, idx: number) => (
            <div
              key={idx}
              className={sortedTitulaires.length === 1 ? "inline" : ""}
            >
              <ItemMultiLignes key={`titulaire-${idx}`} modeColumn={true}>
                <ItemLibelle texte={getIdentiteTitulaire(titulaire)} />
                <ItemLibelle
                  texte={TitulaireRequete.getDateNaissance(titulaire)}
                />
                <ItemLibelle texte={getLieuNaissanceTitulaire(titulaire)} />
              </ItemMultiLignes>

              <ItemMultiLignes
                key={`filiation-${idx}`}
                modeColumn={true}
                label={"Filiation"}
              >
                {TitulaireRequete.getParentsTries(
                  titulaire.parentsTitulaire
                )?.map(parent => (
                  <ItemLibelle
                    key={`filiation-${parent.id}-${idx}`}
                    texte={getIdentiteParent(parent)}
                  />
                ))}
              </ItemMultiLignes>
            </div>
          ))
        )}
      </div>

      <ItemMultiLignes
        label={props.requete.evenement?.natureActe.libelle}
        visible={
          props.requete.evenement != null &&
          !SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType)
        }
      >
        <ItemLibelle
          texte={EvenementReqDelivrance.getDate(props.requete.evenement)}
        />
        <ItemLibelle texte={getLieuEvenement(props.requete.evenement)} />
      </ItemMultiLignes>

      <hr className={"separation"} />

      <div className="sectionPanel">
        <ItemLibelle
          label={"Requérant"}
          texte={props.requete.requerant.qualiteRequerant.qualite.libelle}
        />
        <ItemLibelle
          label={"Mandant"}
          texte={getIdentiteMandataire(
            props.requete.requerant.qualiteRequerant.qualite,
            props.requete?.mandant
          )}
        />
        <ItemLibelle
          label={"Lien avec le titulaire"}
          texte={getLienRequerant(props.requete)}
        />

        <ItemMultiLignes
          label={"Coordonnées"}
          visible={props.requete.requerant != null}
        >
          <ItemLibelle
            texte={
              getRaisonSociale(props.requete.requerant.qualiteRequerant) ??
              getIdentiteRequerant(props.requete.requerant)
            }
          />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne2} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne3} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne4} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne5} />
          <ItemLibelle
            texte={getCodePostalVilleRequerant(props.requete.requerant.adresse)}
          />
          <ItemLibelle
            texte={getPaysRequerant(props.requete.requerant.adresse)}
          />
          <div className="inline">
            <ItemLibelle texte={props.requete.requerant.courriel} />
            <ItemLibelle
              label={"tel"}
              texte={props.requete.requerant.telephone}
              classNameLabel={"no-space-between"}
            />
          </div>
        </ItemMultiLignes>
      </div>
    </div>
  );
};

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

const getRaisonSociale = (qualiteRequerant: IQualiteRequerant) => {
  let resultat = undefined;

  switch (qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      resultat = qualiteRequerant.mandataireHabilite?.raisonSociale;
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      resultat = qualiteRequerant.autreProfessionnel?.raisonSociale;
      break;
    case Qualite.INSTITUTIONNEL:
      resultat = qualiteRequerant.institutionnel?.nomInstitution;
      break;
    default:
      break;
  }

  return resultat;
};

const getIdentiteTitulaire = (
  titulaire: ITitulaireRequete
): string | undefined => {
  const identiteTitulaire: IdentiteType = {
    noms: {
      naissance: formatNom(titulaire.nomNaissance)
    },
    prenoms: {
      naissance: formatagePrenoms(titulaire.prenoms)
    }
  };

  return formatLigneNomPrenoms(identiteTitulaire);
};

const getIdentiteParent = (parent: IParent): string | undefined => {
  const identiteParent: IdentiteType = {
    noms: {
      naissance: formatNom(parent.nomNaissance)
    },
    prenoms: {
      naissance: formatagePrenoms(parent.prenoms)
    }
  };

  return formatLigneNomPrenoms(identiteParent);
};

const getIdentiteRequerant = (requerant: IRequerant): string | undefined => {
  let resultat: string | undefined = undefined;

  if (requerant.nomFamille) {
    const identiteRequerant: IdentiteType = {
      noms: {
        naissance: formatNom(requerant.nomFamille)
      },
      prenoms: {
        naissance: requerant.prenom ? [requerant.prenom] : []
      }
    };
    resultat = formatLigneNomPrenoms(identiteRequerant);
  }

  return resultat;
};

const getIdentiteMandataire = (
  qualite: Qualite,
  mandant?: IMandant
): string | undefined => {
  let resultat: string | undefined = undefined;

  if (mandant?.nom && Qualite.estMandataire(qualite)) {
    const identiteMandataire: IdentiteType = {
      noms: {
        naissance: formatNom(mandant.nom)
      },
      prenoms: {
        naissance: mandant.prenom ? [mandant.prenom] : []
      }
    };
    resultat = formatLigneNomPrenoms(identiteMandataire);
  }

  return resultat;
};

const getLieuNaissanceTitulaire = (
  titulaire: ITitulaireRequete
): string | undefined =>
  formatLigneLieu(
    titulaire.villeNaissance,
    TitulaireRequete.getPays(titulaire)
  );

const getLieuEvenement = (
  evenement?: IEvenementReqDelivrance
): string | undefined =>
  formatLigneLieu(
    EvenementReqDelivrance.getVille(evenement),
    EvenementReqDelivrance.getPays(evenement)
  );

const getCodePostalVilleRequerant = (
  adresse?: IAdresseRequerant
): string | undefined => formatLigne([adresse?.codePostal, adresse?.ville]);

const getPaysRequerant = (adresse?: IAdresseRequerant): string | undefined => {
  const pays = premiereLettreEnMajusculeLeResteEnMinuscule(adresse?.pays);

  return formatLigne([pays !== "France" && pays]);
};
