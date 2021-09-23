import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../views/common/util/DateUtils";
import { getValeurOuVide } from "../../../views/common/util/Utils";
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
    )}, le ${dateEnregistrement}.\nDate d'effet de la déclaration du PACS à l'égard des tiers: ${dateInscription}`;
  },

  ajoutParagrapheModificationPACS(
    obj: ICertificatPACSComposition,
    autorite: IAutorite,
    modifications: IModification[]
  ) {
    const dateConvention = getDateFormatJasper(
      getDateFromTimestamp(modifications[0].date)
    );
    const dateModif = getDateFormatJasper(
      getDateFromTimestamp(modifications[0].dateEffet)
    );
    obj.paragraphe_modification = `Modifiée ${ParagrapheComposition.getAutoriteEtLocalisation(
      autorite
    )}, le ${dateConvention}.\nDate d'effet de la modification du PACS à l'égard des tiers: ${dateModif}.`;
  },

  ajoutParagrapheDissolutionPACS(
    obj: ICertificatPACSComposition,
    autorite: IAutorite,
    dissolution: IDissolution
  ) {
    const dateDissolution = getDateFormatJasper(
      getDateFromTimestamp(dissolution.date)
    );
    const dateEffet = getDateFormatJasper(
      getDateFromTimestamp(dissolution.dateEffet)
    );
    obj.paragraphe_dissolution = `Dissoute ${ParagrapheComposition.getAutoriteEtLocalisation(
      autorite
    )}, le ${dateDissolution}.\nDate d'effet de la modification du PACS à l'égard des tiers: ${dateEffet}.`;
  },

  ajoutParagrapheAnnulationPACS(
    obj: ICertificatPACSComposition,
    autorite: IAutorite,
    annulation: IAnnulation
  ) {
    const dateAnnulation = getDateFormatJasper(
      getDateFromTimestamp(annulation.date)
    );
    const dateEffet = getDateFormatJasper(
      getDateFromTimestamp(annulation.dateEffet)
    );

    obj.paragraphe_annulation = `Annulée ${ParagrapheComposition.getAutoriteEtLocalisation(
      autorite
    )}, le ${dateAnnulation}.\nDate d'effet de la dissolution du PACS à l'égard des tiers: ${dateEffet}.`;
  },
  getAutorite(autorite: IAutorite): string {
    switch (autorite.typeAutorite) {
      case TypeAutorite.COMMUNE:
        return "en la commune de";
      case TypeAutorite.JURIDICTION:
        return ParagrapheComposition.getLibelleJuridiction(
          getValeurOuVide(autorite?.typeJuridiction)
        );
      case TypeAutorite.NOTAIRE:
        return `par Maître ${autorite.prenomNotaire} ${autorite.nomNotaire}, notaire à`;
      case TypeAutorite.POSTE_ETRANGER:
        return `par ${autorite.typePoste} à`;
      default:
        return "";
    }
  },

  getLibelleJuridiction(typeJuridiction: string): string {
    switch (typeJuridiction as TypeJuridiction) {
      case TypeJuridiction.TRIBUNAL_JUDICIAIRE:
        return "par jugement du tribunal judicicaire de";
      case TypeJuridiction.COURS_APPEL:
        return "par arrêt de la cour d'appel de";
      default:
        return `au ${typeJuridiction} de`;
    }
  },
  getAutoriteEtLocalisation(autorite: IAutorite) {
    const autoriteTexte = ParagrapheComposition.getAutorite(autorite);
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
