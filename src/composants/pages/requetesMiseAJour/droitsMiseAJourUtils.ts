import { Droit } from "@model/agent/enum/Droit";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";

interface IDroitsMiseAJourActe {
  autorise: boolean;
  peutMettreAJourMentions: boolean;
  peutMettreAJourAnalyseMarginale: boolean;
}

export const estActeEligibleDoubleNumerique = ({ origine, numeroActeElectronique, type }: FicheActe): boolean => {
  const estOrigineScecDocs = origine === "SCEC_DOCS";
  const estTypeTexte = type === ETypeActe.TEXTE;

  return estOrigineScecDocs && estTypeTexte && !numeroActeElectronique;
};

export const verifierDroitsMiseAJourActe = (ficheActe: FicheActe, utilisateurConnecte: UtilisateurConnecte): IDroitsMiseAJourActe => {
  const droitMentions = utilisateurConnecte.estHabilitePour({ leDroit: Droit.METTRE_A_JOUR_ACTE });
  const droitAnalyseMarginale = utilisateurConnecte.estHabilitePour({ leDroit: Droit.MODIFIER_ANALYSE_MARGINALE });
  const droitDoubleNumerique = utilisateurConnecte.estHabilitePour({ leDroit: Droit.MISE_A_JOUR_CREER_DOUBLE_NUMERIQUE });

  const aDroitMettreAJour = droitMentions || droitAnalyseMarginale;
  const estOrigineValide = ficheActe.origine === "RECE" || ficheActe.origine === "SCEC_DOCS";
  const estEligibleDoubleNumerique = estActeEligibleDoubleNumerique(ficheActe);
  const statutValide = ficheActe.statut !== "BROUILLON";

  const autorise = aDroitMettreAJour && estOrigineValide && statutValide && (!estEligibleDoubleNumerique || droitDoubleNumerique);

  return {
    autorise,
    peutMettreAJourMentions: droitMentions,
    peutMettreAJourAnalyseMarginale: droitAnalyseMarginale
  };
};
