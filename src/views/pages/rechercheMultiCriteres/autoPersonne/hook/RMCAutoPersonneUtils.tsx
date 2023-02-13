import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { Requete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { getValeurOuUndefined, UN } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { IRMCAutoPersonneParams } from "./RMCAutoPersonneApiHook";

export function mapRequeteVersRMCAutoPersonneParams(
  requete?: IRequeteCreationTranscription
): IRMCAutoPersonneParams {
  return {
    valeurs: mapRequeteVersValeursIRMCAutoPersonneRequest(requete),
    range: `0-${NB_LIGNES_PAR_APPEL_PERSONNE}`
  };
}

function mapRequeteVersValeursIRMCAutoPersonneRequest(
  requete?: IRequeteCreationTranscription
): IRMCAutoPersonneRequest {
  if (!requete) {
    return {};
  }

  let titulaire: ITitulaireRequete | undefined;
  if (
    SousTypeCreation.estSousTypeTranscription(requete.sousType) ||
    SousTypeCreation.estRCADC(requete.sousType)
  ) {
    titulaire = Requete.getTitulaireAvecTypeObjetEnPosition(
      requete,
      TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
      UN
    );
  } else if (SousTypeCreation.estRCEXROuRCEDXROuRCEDXC(requete.sousType)) {
    titulaire = Requete.getTitulaireAvecTypeObjet(
      requete,
      TypeObjetTitulaire.POSTULANT_NATIONALITE
    );
  }

  if (titulaire) {
    return {
      nomTitulaire: getValeurOuUndefined(titulaire.nomNaissance),
      prenomTitulaire: getValeurOuUndefined(
        titulaire.prenoms?.filter(prenom => prenom.numeroOrdre === UN).pop()
          ?.prenom
      ),
      jourNaissance: getValeurOuUndefined(titulaire.jourNaissance),
      moisNaissance: getValeurOuUndefined(titulaire.moisNaissance),
      anneeNaissance: getValeurOuUndefined(titulaire.anneeNaissance)
    };
  }

  return {};
}
