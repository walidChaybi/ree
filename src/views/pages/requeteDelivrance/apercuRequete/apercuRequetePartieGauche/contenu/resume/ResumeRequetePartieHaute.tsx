import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { EvenementRequete, IEvenementRequete } from "@model/requete/IEvenementRequete";
import { ILienRequerant } from "@model/requete/ILienRequerant";
import { IMandant } from "@model/requete/IMandant";
import { IParent } from "@model/requete/IParent";
import { IQualiteRequerant, QualiteRequerant } from "@model/requete/IQualiteRequerant";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import { formatLigne, getLibelle, getValeurOuUndefined, getValeurOuVide, triListeObjetsSurPropriete } from "@util/Utils";
import React from "react";
import { formatLigneLieu, formatLigneNomPrenoms, formatLigneQualiteType, formatPrenoms } from "./Formatages";
import { ItemLibelle } from "./item/ItemLibelle";
import { ItemMultiLignes } from "./item/ItemMultiLignes";
import "./scss/ResumeRequetePartieHaute.scss";

interface ResumeRequetePartieHauteProps {
  requete: IRequeteDelivrance;
}

export const ResumeRequetePartieHaute: React.FC<ResumeRequetePartieHauteProps> = props => {
  const sortedTitulaires = props.requete.titulaires ? triListeObjetsSurPropriete([...props.requete.titulaires], "position") : [];

  return (
    <div className="ResumeRequetePartieHaute">
      <ItemLibelle
        label={"Acte"}
        texte={props.requete.evenement?.natureActe.libelle}
        visible={!SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType)}
      />
      <ItemLibelle
        label={"Document demandé"}
        texte={props.requete.documentDemande?.libelle}
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
              <ItemMultiLignes
                key={`titulaire-${idx}`}
                modeColumn={true}
              >
                <ItemLibelle texte={getIdentiteTitulaire(titulaire)} />
                <ItemLibelle texte={TitulaireRequete.getDateNaissance(titulaire)} />
                <ItemLibelle texte={getLieuNaissanceTitulaire(titulaire)} />
              </ItemMultiLignes>

              <ItemMultiLignes
                key={`filiation-${idx}`}
                modeColumn={true}
                label={"Filiation"}
              >
                {TitulaireRequete.getParentsTries(titulaire.parentsTitulaire)?.map(parent => (
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
          !SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType) &&
          !NatureActeRequete.estNaissance(props.requete.evenement.natureActe)
        }
      >
        <ItemLibelle texte={EvenementRequete.getDate(props.requete.evenement)} />
        <ItemLibelle texte={getLieuEvenement(props.requete.evenement)} />
      </ItemMultiLignes>

      <hr className={"separation"} />

      <div className="sectionPanel">
        <ItemLibelle
          label={"Requérant"}
          texte={getQualiteTypeRequerant(props.requete.requerant.qualiteRequerant)}
        />
        <ItemLibelle
          label={"Mandant"}
          texte={
            getIdentiteMandant(props.requete.requerant.qualiteRequerant.qualite, props.requete?.mandant) ??
            getRaisonSocialeMandant(props.requete.requerant.qualiteRequerant.qualite, props.requete?.mandant)
          }
        />
        <ItemLibelle
          label={"Lien avec le titulaire"}
          texte={getLienRequerant(props.requete.requerant.lienRequerant, props.requete.mandant)}
        />

        <ItemMultiLignes
          label={"Coordonnées"}
          visible={props.requete.requerant != null}
        >
          <ItemLibelle texte={getRaisonSocialeRequerant(props.requete.requerant.qualiteRequerant)} />
          <ItemLibelle texte={getIdentiteRequerant(props.requete.requerant)} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne2} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne3} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne4} />
          <ItemLibelle texte={props.requete.requerant.adresse?.ligne5} />
          <ItemLibelle texte={getCodePostalVilleRequerant(props.requete.requerant.adresse)} />
          <ItemLibelle texte={getPaysRequerant(props.requete.requerant.adresse)} />
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

const getIdentiteTitulaire = (titulaire: ITitulaireRequete): string | undefined => {
  const identiteTitulaire: IdentiteType = {
    noms: {
      naissance: titulaire.nomNaissance
    },
    prenoms: {
      naissance: formatPrenoms(titulaire.prenoms)
    }
  };

  return formatLigneNomPrenoms(identiteTitulaire);
};

const getIdentiteParent = (parent: IParent): string | undefined => {
  const identiteParent: IdentiteType = {
    noms: {
      naissance: parent.nomNaissance
    },
    prenoms: {
      naissance: formatPrenoms(parent.prenoms)
    }
  };

  return formatLigneNomPrenoms(identiteParent);
};

const getIdentiteRequerant = (requerant: IRequerant): string | undefined => {
  let resultat: string | undefined = undefined;

  if (requerant.nomFamille) {
    const identiteRequerant: IdentiteType = {
      noms: {
        naissance: requerant.nomFamille,
        usage: getValeurOuUndefined(requerant.nomUsage)
      },
      prenoms: {
        naissance: requerant.prenom ? [requerant.prenom] : []
      }
    };
    resultat = formatLigneNomPrenoms(identiteRequerant);
  }

  return resultat;
};

const getLienRequerant = (lienRequerant?: ILienRequerant, mandant?: IMandant): string | undefined => {
  let resultat: string | undefined = undefined;

  if (mandant?.typeLien) {
    resultat = TypeLienMandant.estAutre(mandant?.typeLien) && mandant.natureLien ? mandant.natureLien : mandant.typeLien.libelle;
  } else if (lienRequerant) {
    resultat =
      TypeLienRequerant.estAutre(lienRequerant.lien) && lienRequerant.natureLien ? lienRequerant.natureLien : lienRequerant.lien.libelle;
  }

  return resultat;
};

const getRaisonSocialeRequerant = (qualiteRequerant: IQualiteRequerant) => {
  switch (qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      return qualiteRequerant.mandataireHabilite?.raisonSociale;
    case Qualite.AUTRE_PROFESSIONNEL:
      return qualiteRequerant.autreProfessionnel?.raisonSociale;
    case Qualite.INSTITUTIONNEL:
      return qualiteRequerant.institutionnel?.nomInstitution;
    default:
      return undefined;
  }
};

const getIdentiteMandant = (qualite: Qualite, mandant?: IMandant): string | undefined => {
  let resultat: string | undefined = undefined;

  if (Qualite.estMandataireHabilite(qualite) && TypeMandant.estPhysique(mandant?.type)) {
    const identiteMandant: IdentiteType = {
      noms: {
        naissance: mandant?.nom ?? ""
      },
      prenoms: {
        naissance: mandant?.prenom ? [mandant.prenom] : []
      }
    };
    resultat = formatLigneNomPrenoms(identiteMandant);
  }

  return resultat;
};

const getRaisonSocialeMandant = (qualite: Qualite, mandant?: IMandant): string | undefined => {
  let resultat: string | undefined = undefined;

  if (Qualite.estMandataireHabilite(qualite) && TypeMandant.estMorale(mandant?.type)) {
    resultat = mandant?.raisonSociale;
  }

  return resultat;
};

const getLieuNaissanceTitulaire = (titulaire: ITitulaireRequete): string | undefined =>
  formatLigneLieu(titulaire.villeNaissance, TitulaireRequete.getPays(titulaire));

const getLieuEvenement = (evenement?: IEvenementRequete): string | undefined =>
  formatLigneLieu(EvenementRequete.getVille(evenement), EvenementRequete.getPays(evenement));

const getQualiteTypeRequerant = (qualiteRequerant: IQualiteRequerant): string | undefined =>
  formatLigneQualiteType(qualiteRequerant.qualite.libelle, QualiteRequerant.getType(qualiteRequerant));

const getCodePostalVilleRequerant = (adresse?: IAdresseRequerant): string | undefined =>
  formatLigne([adresse?.codePostal, adresse?.ville], " ");

const getPaysRequerant = (adresse?: IAdresseRequerant): string | undefined => {
  const pays = getValeurOuVide(adresse?.pays);

  return formatLigne([pays !== "France" && pays]);
};
