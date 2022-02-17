import { getLibelle } from "../../../../views/common/util/Utils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteNaissanceComposition {
  public static creerExtraitCopieActeTexteNaissance(
    acte: IFicheActe,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    validation: Validation,
    avecFiliation = false,
    copie = false,
    archive = false
  ) {
    const natureActe = NatureActe.getKey(NatureActe.NAISSANCE);
    const getCorpsTexte =
      Validation.E !== validation
        ? ExtraitCopieActeTexteNaissanceComposition.getCorpsTexte(
            acte,
            avecFiliation
          )
        : undefined;
    const erreur =
      Validation.E === validation
        ? getLibelle(
            "L'absence d'informations ne permet pas de générer l'extrait."
          )
        : undefined;

    const creerExtraitCopieActeTexteParams = {
      acte,
      natureActe,
      choixDelivrance,
      sousTypeRequete,
      validation,
      avecFiliation,
      copie,
      archive,
      getCorpsTexte,
      erreur
    };

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte(
      creerExtraitCopieActeTexteParams
    );
  }

  private static getCorpsTexte(
    acteNaissance: IFicheActe,
    avecFiliation: boolean
  ) {
    const { ecTitulaire1 } =
      CommunExtraitOuCopieActeTexteComposition.getTitulaireCorpsText(
        acteNaissance
      );

    if (avecFiliation) {
      //TODO
    }

    // Création de l'événement pour le corps
    const evtActe =
      CommunExtraitOuCopieActeTexteComposition.getEvenementActeCompositionEC(
        acteNaissance
      );

    const duOuDeSexe = EtatCivilUtil.formatGenreDetermineOuNon(
      ecTitulaire1.sexe
    );

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement} ${evtActe.heureEvenement}
est ${ecTitulaire1.dateNaissanceOuAge} à ${evtActe.lieuEvenement}
  ${ecTitulaire1.prenoms}
  ${ecTitulaire1.nom}
${ecTitulaire1.partiesNom}
${duOuDeSexe} sexe ${ecTitulaire1.sexe.libelle}`;
  }
}
