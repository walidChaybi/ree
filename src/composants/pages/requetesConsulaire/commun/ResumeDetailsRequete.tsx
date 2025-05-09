import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { EvenementUnion } from "@model/requete/IEvenementUnion";
import { Requete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import React, { Fragment, useMemo } from "react";
import ConteneurDetailInformation from "../../../commun/conteneurs/ConteneurDetailInformation";
import ConteneurAccordeon from "../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

interface IPartieGaucheSaisieProjetProps {
  requete: IRequeteCreationTranscription;
  nombreColonnes?: 2 | 3;
}

const formaterAdresseRequerant = (adresseRequerant?: IAdresseRequerant): string | undefined => {
  if (!adresseRequerant) return undefined;

  const lignes = [adresseRequerant.ligne2, adresseRequerant.ligne3, adresseRequerant.ligne4, adresseRequerant.ligne5].filter(ligne =>
    ligne?.trim()
  );

  if (adresseRequerant.codePostal) {
    const villeFormatee = adresseRequerant.ville ? `${adresseRequerant.codePostal} ${adresseRequerant.ville}` : adresseRequerant.codePostal;
    lignes.push(villeFormatee);
  }

  if (LieuxUtils.estRenseigneEtPaysEtranger(adresseRequerant.pays)) {
    lignes.push(adresseRequerant.pays);
  }

  const resultat = lignes.join("\n");
  return resultat || undefined;
};

const ResumeDetailsRequete: React.FC<IPartieGaucheSaisieProjetProps> = ({ requete, nombreColonnes = 3 }) => {
  const titulaires = useMemo(() => TitulaireRequeteCreation.getTitulairesTries(requete.titulaires), [requete.titulaires]);

  const parents = useMemo(() => TitulaireRequeteCreation.getParentsTries(requete.titulaires), [requete.titulaires]);

  return (
    <div className="pr-4">
      {/* Transcription  */}
      <ConteneurAccordeon
        titre={`"Transcription" ${requete.natureActeTranscrit ? NatureActeTranscription.getLibelle(requete.natureActeTranscrit) : ""}`}
        ouvertParDefaut={true}
      >
        <div className="grid gap-12 py-4">
          <ConteneurAvecBordure titreEnTete="Informations générales">
            <div className={`grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 ${nombreColonnes === 3 ? "xl:grid-cols-3" : ""}`}>
              <ConteneurDetailInformation
                libelle="Numéro de télédossier"
                valeur={requete.provenanceServicePublic?.referenceDila}
              />
              <ConteneurDetailInformation
                libelle="Type Requête"
                valeur={requete.sousType?.libelle}
              />
              <ConteneurDetailInformation
                libelle="Statut"
                valeur={requete.statutCourant?.statut.libelle}
                afficherCommeStatut={true}
              />
              <ConteneurDetailInformation
                key="transcription-"
                libelle="Provenance"
                valeur={requete.provenance?.libelle}
              />
              <ConteneurDetailInformation
                libelle="Date création"
                valeur={requete.dateCreation ? Requete.getDateCreation(requete) : undefined}
              />
              <ConteneurDetailInformation
                libelle="Numéro fonctionnel"
                valeur={requete.numeroFonctionnel}
              />
            </div>
          </ConteneurAvecBordure>

          {/* Titulaires */}
          <ConteneurAvecBordure titreEnTete="Titulaire">
            <div className={`grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 ${nombreColonnes === 3 ? "xl:grid-cols-3" : ""}`}>
              {titulaires?.map(titulaire => {
                const evenementReconnaissance = TitulaireRequeteCreation.getEvenementUnionTypeReconnaissance(titulaire);
                const dateLieuReconnaissance = EvenementUnion.getDateEtLieuFormate(evenementReconnaissance);

                return (
                  <Fragment key={`titulaire-${titulaire.id}`}>
                    <ConteneurDetailInformation
                      libelle="Nom"
                      valeur={`${TitulaireRequeteCreation.getNomNaissanceOuSNP(titulaire)} ${titulaire?.nomSouhaite ? "(souhaité : " + titulaire?.nomSouhaite + ")" : ""} `}
                    />
                    <ConteneurDetailInformation
                      libelle="Prénoms"
                      valeur={TitulaireRequeteCreation.getPrenomsOuSPC(titulaire)}
                    />
                    <ConteneurDetailInformation
                      libelle="Sexe"
                      valeur={TitulaireRequeteCreation.getSexe(titulaire)}
                    />
                    <ConteneurDetailInformation
                      libelle="Date de naissance"
                      valeur={titulaire.dateNaissanceFormatee}
                    />
                    <ConteneurDetailInformation
                      libelle="Lieu de naissance"
                      valeur={titulaire.lieuNaissanceFormate}
                    />
                    <ConteneurDetailInformation
                      libelle="Reconnaissance"
                      valeur={dateLieuReconnaissance}
                    />
                  </Fragment>
                );
              })}
            </div>
          </ConteneurAvecBordure>

          {/* Parents */}
          {parents && parents.length > 0 && (
            <>
              {parents.map(parent => (
                <div key={`parent-${parent.id}`}>
                  <ConteneurAvecBordure titreEnTete={parent.sexe === "MASCULIN" ? "Père" : "Mère"}>
                    <div className={`grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 ${nombreColonnes === 3 ? "xl:grid-cols-3" : ""}`}>
                      <ConteneurDetailInformation
                        libelle="Nom"
                        valeur={TitulaireRequeteCreation.getNomNaissanceOuSNP(parent)}
                      />
                      <ConteneurDetailInformation
                        libelle="Prénoms"
                        valeur={TitulaireRequeteCreation.getPrenomsOuSPC(parent)}
                      />
                      <ConteneurDetailInformation
                        libelle="Sexe"
                        valeur={TitulaireRequeteCreation.getSexe(parent)}
                      />
                      <ConteneurDetailInformation
                        libelle="Date de naissance"
                        valeur={parent.dateNaissanceFormatee}
                      />
                      <ConteneurDetailInformation
                        libelle="Lieu de naissance"
                        valeur={parent.lieuNaissanceFormate}
                      />
                      <ConteneurDetailInformation
                        libelle="Nationalité"
                        valeur={TitulaireRequeteCreation.getTableauDeNationalites(parent).join(", ")}
                      />
                      <ConteneurDetailInformation
                        libelle="Pays statut réfugié"
                        valeur={parent.paysStatutRefugie}
                      />
                      <ConteneurDetailInformation
                        libelle="Pays d'origine"
                        valeur={parent.paysOrigine}
                      />
                    </div>
                  </ConteneurAvecBordure>
                </div>
              ))}

              {parents.length > 0 && (
                <ConteneurDetailInformation
                  key="mariage"
                  libelle="Mariage"
                  valeur={EvenementUnion.getDateEtLieuFormate(TitulaireRequeteCreation.getEvenementUnionTypeMariage(parents[0]))}
                />
              )}
            </>
          )}

          {/* Requerant */}
          <ConteneurAvecBordure titreEnTete="Requérant">
            <div className={`grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 ${nombreColonnes === 3 ? "xl:grid-cols-3" : ""}`}>
              <ConteneurDetailInformation
                key="requerant-lien"
                libelle="Requérant"
                valeur={requete.requerant?.lienRequerant?.lien?.libelle}
              />
              <ConteneurDetailInformation
                libelle="Courriel"
                valeur={requete.requerant?.courriel}
              />
              <ConteneurDetailInformation
                libelle="Téléphone"
                valeur={requete.requerant?.telephone}
              />

              <ConteneurDetailInformation
                libelle="Autre courriel"
                valeur={requete.requerant?.courrielAutreContact}
              />

              <ConteneurDetailInformation
                libelle="Autre téléphone"
                valeur={requete.requerant?.telephoneAutreContact}
              />

              <ConteneurDetailInformation
                libelle="Coordonnées"
                valeur={formaterAdresseRequerant(requete.requerant?.adresse)}
              />
            </div>
          </ConteneurAvecBordure>
        </div>
      </ConteneurAccordeon>
    </div>
  );
};

export default ResumeDetailsRequete;
