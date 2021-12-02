import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../views/common/util/DateUtils";
import { IAutorite } from "../../etatcivil/commun/IAutorite";
import { TypeAutorite } from "../../etatcivil/enum/TypeAutorite";
import { TypeJuridiction } from "../../etatcivil/enum/TypeJuridiction";
import { IAnnulation } from "../../etatcivil/pacs/IAnnulation";
import { IDissolution } from "../../etatcivil/pacs/IDissolution";
import { IFichePacs } from "../../etatcivil/pacs/IFichePacs";
import { IModification } from "../../etatcivil/pacs/IModification";
import { LieuxUtils } from "../../LieuxUtils";
import { ICertificatPACSComposition } from "./ICertificatPACSComposition";

export const ParagrapheComposition = {
  ajoutParagrapheEnregistrementPACS(
    obj: ICertificatPACSComposition,
    fiche: IFichePacs
  ) {
    const dateEnregistrement = getDateFormatJasper(
      fiche.dateEnregistrementParAutorite
    );
    const dateInscription = getDateFormatJasper(fiche.dateInscription);

    obj.paragraphe_enregistrement = `Enregistrée ${ParagrapheComposition.getAutoriteEtLocalisation(
      fiche.autorite
    )}, le ${dateEnregistrement}.\nDate d'effet de la déclaration du PACS à l'égard des tiers : ${dateInscription}`;
  },

  ajoutParagrapheModificationPACS(
    obj: ICertificatPACSComposition,
    modifications: IModification[]
  ) {
    const dateConvention = getDateFormatJasper(
      getDateFromTimestamp(modifications[0].date)
    );
    const dateModif = getDateFormatJasper(
      getDateFromTimestamp(modifications[0].dateEffet)
    );
    obj.paragraphe_modification = `Modifiée ${ParagrapheComposition.getAutoriteEtLocalisation(
      modifications[0].autorite
    )}, le ${dateConvention}.\nDate d'effet de la modification du PACS à l'égard des tiers : ${dateModif}.`;
  },

  ajoutParagrapheDissolutionPACS(
    obj: ICertificatPACSComposition,
    dissolution: IDissolution
  ) {
    const dateDissolution = getDateFormatJasper(
      getDateFromTimestamp(dissolution.date)
    );
    const dateEffet = getDateFormatJasper(
      getDateFromTimestamp(dissolution.dateEffet)
    );
    obj.paragraphe_dissolution = `Dissoute ${ParagrapheComposition.getAutoriteEtLocalisation(
      dissolution.autorite
    )}, le ${dateDissolution}.\nDate d'effet de la dissolution du PACS à l'égard des tiers : ${dateEffet}.`;
  },

  ajoutParagrapheAnnulationPACS(
    obj: ICertificatPACSComposition,
    annulation: IAnnulation
  ) {
    const dateAnnulation = getDateFormatJasper(
      getDateFromTimestamp(annulation.date)
    );
    const dateEffet = getDateFormatJasper(
      getDateFromTimestamp(annulation.dateEffet)
    );

    obj.paragraphe_annulation = `Annulée ${ParagrapheComposition.getAutoriteEtLocalisation(
      annulation.autorite,
      true
    )}, le ${dateAnnulation}.\nDate d'effet d'annulation du PACS à l'égard des tiers : ${dateEffet}.`;
  },

  getAutorite(autorite: IAutorite): string {
    switch (autorite.typeAutorite) {
      case TypeAutorite.COMMUNE:
        return "en la commune de";
      case TypeAutorite.JURIDICTION:
        return `au ${autorite?.typeJuridiction?.toLocaleLowerCase()} de`;
      case TypeAutorite.NOTAIRE:
        return `par Maître ${autorite.prenomNotaire} ${autorite.nomNotaire}, notaire à`;
      case TypeAutorite.POSTE_ETRANGER:
        return `par ${autorite.typePoste} à`;
      default:
        return "";
    }
  },

  getLibelleJuridiction(typeJuridiction?: TypeJuridiction): string {
    if (typeJuridiction === TypeJuridiction.COURS_APPEL) {
      return "par arrêt de la cour d'appel de";
    } else {
      return "par jugement du tribunal judiciaire de";
    }
  },

  getAutoriteEtLocalisation(autorite: IAutorite, annulation = false) {
    let autoriteTexte = "";
    if (annulation) {
      autoriteTexte = ParagrapheComposition.getLibelleJuridiction(
        autorite?.typeJuridiction as TypeJuridiction
      );
    } else {
      autoriteTexte = ParagrapheComposition.getAutorite(autorite);
    }
    let localisation = LieuxUtils.getLocalisationAutorite(
      autorite.ville,
      autorite.libelleDepartement,
      autorite.region,
      autorite.pays,
      autorite.arrondissement
    );
    if (autorite.typeAutorite === TypeAutorite.NOTAIRE) {
      localisation += `, office notarial n°${autorite.numeroCrpcen}`;
    }
    return `${autoriteTexte} ${localisation}`;
  }
};
