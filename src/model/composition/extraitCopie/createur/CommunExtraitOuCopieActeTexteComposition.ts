import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
import { LieuxUtils } from "../../../../views/common/utilMetier/LieuxUtils";
import { FicheActe, IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ITitulaireActe } from "../../../etatcivil/acte/ITitulaireActe";
import { Sexe } from "../../../etatcivil/enum/Sexe";
import { CommunComposition } from "../../commun/ICommunComposition";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";

interface IActeCompositionEC {
  leouEnEvenement: string;
  dateEvenement: string;
  lieuEvenement: string;
}

interface ITitulaireCompositionEC {
  prenoms: string;
  nom: string;
  partiesNom: string;
  lieuNaissance: string;
  dateNaissanceOuAge: string;
}

export class CommunExtraitOuCopieActeTexteComposition {
  public static creerExtraitCopie(
    composition: IExtraitCopieComposition,
    acte: IFicheActe
  ) {
    const titulaire1 = acte.titulaires[0];
    const titulaire2 = acte.titulaires[1];

    const ecTitulaire1 = CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
      titulaire1
    );

    const ecTitulaire2 = CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
      titulaire2
    );

    CommunComposition.ajoutDateDujour(composition);
    composition.reference_acte = FicheActe.getReference(acte);
    composition.nom_titulaire1 = ecTitulaire1.nom;
    composition.prenoms_titulaire1 = ecTitulaire1.prenoms;
    composition.nom_titulaire2 = ecTitulaire2.nom;
    composition.prenoms_titulaire2 = ecTitulaire2.prenoms;

    return { ecTitulaire1, ecTitulaire2 };
  }

  public static creerDateNaissanceOuAgeDeTitulaire(titulaire: ITitulaireActe) {
    let dateNaissanceOuAgeDeTitulaire;
    const sexeTitulaire = Sexe.getEnumFromLibelle(titulaire.sexe);
    const neOuNeeTitulaire = EtatCivilUtil.formatNeOuNee(sexeTitulaire); //né(e) [accord selon genre du titulaire]
    if (titulaire.naissance?.annee) {
      const leOuEnDateNaissanceTitulaire = EtatCivilUtil.formatLeOuEn(
        titulaire.naissance?.jour
      ); // le (ou en) [selon présence ou non d’une date de naissance complète]
      const dateNaissanceTitulaire = EtatCivilUtil.formatDateEvenement(
        titulaire.naissance
      ); //<date de naissance titulaire)>
      dateNaissanceOuAgeDeTitulaire = `${neOuNeeTitulaire} ${leOuEnDateNaissanceTitulaire} ${dateNaissanceTitulaire}`;
    } else {
      const ageOuAgee = EtatCivilUtil.formatAgeOuAgee(sexeTitulaire); //âgé(e) [accord selon genre du titulaire]

      dateNaissanceOuAgeDeTitulaire = `${ageOuAgee} de ${getValeurOuVide(
        titulaire.age
      )} ${neOuNeeTitulaire} `; //(OU âgé(e) [accord selon genre du titulaire] de <âge titulaire au moment de l’événement> ans né(e) [accord selon genre du titulaire]
    }

    return dateNaissanceOuAgeDeTitulaire;
  }

  public static creerEvenementActeCompositionEC(
    acte: IFicheActe
  ): IActeCompositionEC {
    const leouEnEvenement = EtatCivilUtil.formatLeOuEn(acte.evenement?.jour);
    const dateEvenement = EtatCivilUtil.formatDateEvenement(acte.evenement); //[selon présence ou non d’une date d’événement complète] <date Evènement Acte>
    const lieuEvenement = acte.evenement?.lieuReprise
      ? acte.evenement.lieuReprise
      : LieuxUtils.getLieu(
          acte.evenement?.ville,
          acte.evenement?.region,
          acte.evenement?.pays
        ); //<Lieu Evénement Acte>

    return { leouEnEvenement, dateEvenement, lieuEvenement };
  }

  public static creerTitulaireCompositionEC(
    titulaire: ITitulaireActe
  ): ITitulaireCompositionEC {
    const prenoms = EtatCivilUtil.getPrenomsOuVide(titulaire.prenoms); //<Prénom(s) titulaire 1)>
    const nom = EtatCivilUtil.getNomOuVide(titulaire.nom); //<Nom titulaire 1>
    const partiesNom = EtatCivilUtil.formatPartiesNomOuVide(
      titulaire.nomPartie1,
      titulaire.nomPartie2
    ); //(1re partie : <Nom 1ère partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)

    const lieuNaissance = titulaire.naissance?.lieuReprise
      ? titulaire.naissance.lieuReprise
      : LieuxUtils.getLieu(
          titulaire.naissance?.ville,
          titulaire.naissance?.region,
          titulaire.naissance?.pays,
          titulaire.naissance?.arrondissement
        ); // <Lieu de naissance titulaire 1>

    const dateNaissanceOuAge = this.creerDateNaissanceOuAgeDeTitulaire(
      titulaire
    );

    return {
      prenoms,
      nom,
      partiesNom,
      lieuNaissance,
      dateNaissanceOuAge
    };
  }
}
