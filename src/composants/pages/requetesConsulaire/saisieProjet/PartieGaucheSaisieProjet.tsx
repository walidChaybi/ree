import { RECEContextData } from "@core/contexts/RECEContext";
import { appartientAUtilisateurConnecte } from "@model/agent/IOfficier";
import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { EvenementUnion } from "@model/requete/IEvenementUnion";
import { IRequete, Requete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import Edit from "@mui/icons-material/Edit";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID } from "@router/ReceUrls";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { Fragment, useContext, useMemo, useState } from "react";
import Bouton from "../../../commun/bouton/Bouton";
import { ConteneurDetailInformation } from "../../../commun/conteneurs/ConteneurDetailInformation";
import ConteneurAccordeon from "../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";

enum ECleOngletPartieGauche {
  DESCRIPTION = "description",
  APERCU_PROJET = "apercu_projet"
}

interface IPartieGaucheSaisieProjetProps {
  requete: IRequeteCreationTranscription;
  estModeConsultation: boolean;
}
const formatAdresseRequerant = (adresseRequerant?: IAdresseRequerant): string | undefined => {
  if (!adresseRequerant) return undefined;

  const lignes = [adresseRequerant.ligne2, adresseRequerant.ligne3, adresseRequerant.ligne4, adresseRequerant.ligne5].filter(ligne =>
    ligne?.trim()
  );

  if (adresseRequerant.codePostal) {
    const villeFormatee = adresseRequerant.ville
      ? `${adresseRequerant.codePostal} ${adresseRequerant.ville}`
      : adresseRequerant.codePostal;
    lignes.push(villeFormatee);
  }

  if (LieuxUtils.estRenseigneEtPaysEtranger(adresseRequerant.pays)) {
    lignes.push(adresseRequerant.pays);
  }

  const resultat = lignes.join("\n");
  return resultat || undefined;
};

const PartieGaucheSaisieProjet: React.FC<IPartieGaucheSaisieProjetProps> = ({ requete, estModeConsultation }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [ongletActif, setOngletActif] = useState<ECleOngletPartieGauche>(ECleOngletPartieGauche.DESCRIPTION);

  const afficherBoutonModifierRequete = useMemo(
    () => SousTypeCreation.estRCTC(requete?.sousType) && appartientAUtilisateurConnecte(utilisateurConnecte, requete?.idUtilisateur),
    [requete, utilisateurConnecte]
  );

  const titulaires = useMemo(() => TitulaireRequeteCreation.getTitulairesTries(requete.titulaires), [requete.titulaires]);

  const parents = useMemo(() => TitulaireRequeteCreation.getParentsTries(requete.titulaires), [requete.titulaires]);

  

  return (
    <div className="flex w-1/2 flex-col">
      <OngletsBouton<ECleOngletPartieGauche>
        onglets={[
          {
            cle: ECleOngletPartieGauche.DESCRIPTION,
            libelle: "Description de la requête"
          },
          {
            cle: ECleOngletPartieGauche.APERCU_PROJET,
            libelle: "Aperçu du projet"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={setOngletActif}
      />

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.DESCRIPTION}
        estScrollable
      >
        <div className="pr-4">
          {/* Transcription  */}
          <ConteneurAccordeon
            titre={`"Transcription" ${requete.natureActeTranscrit ? NatureActeTranscription.getLibelle(requete.natureActeTranscrit) : ""}`}
            ouvertParDefaut={true}
          >
            <div className="grid gap-12 py-4">
              <ConteneurAvecBordure titreEnTete="Informations générales">
                <div className="grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
                  <ConteneurDetailInformation
                    libelle="Numéro de télédossier"
                    valeur={requete.provenanceServicePublic?.referenceDila}
                  />
                  <ConteneurDetailInformation
                    libelle="Type Requete"
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
                <div className="grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
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
              {parents && parents?.length > 0 && (
                <>
                  {parents.map(parent => (
                    <div key={`parent-${parent.id}`}>
                      <ConteneurAvecBordure titreEnTete={parent.sexe === "MASCULIN" ? "Père" : "Mère"}>
                        <div className="grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
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
              <ConteneurAvecBordure titreEnTete="Requerant">
                <div className="grid grid-cols-1 gap-y-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
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
                    valeur={formatAdresseRequerant(requete.requerant?.adresse)}
                  />
                </div>
              </ConteneurAvecBordure>
            </div>
          </ConteneurAccordeon>
        </div>

        <div className="mb-4 mt-4 w-full">
          {!estModeConsultation && (
            <div className="mt-2">
              <RMCRequetesAssocieesResultats requete={requete as IRequete} />
            </div>
          )}
        </div>
      </ConteneurVoletEdition>

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.APERCU_PROJET}
        estScrollable
      >
        <ApercuProjet />
      </ConteneurVoletEdition>

      {afficherBoutonModifierRequete && (
        <Bouton
          title="Modifier la requête"
          className="mt-5 flex w-fit"
          lienVers={`${URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID.replace(":idRequete", requete.id)}`}
        >
          <Edit className="mr-2" /> {"MODIFIER LA REQUÊTE"}
        </Bouton>
      )}
    </div>
  );
};

export default PartieGaucheSaisieProjet;
