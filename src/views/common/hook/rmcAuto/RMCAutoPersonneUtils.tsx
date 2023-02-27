import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { IRMCAutoPersonneRequest } from "@model/rmc/personne/IRMCAutoPersonneRequest";
import { getValeurOuUndefined, getValeurOuVide, UN } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { IRMCAutoPersonneParams } from "./RMCAutoPersonneApiHook";

export function mapTitulaireVersRMCAutoPersonneParams(
  titulaire: ITitulaireRequeteCreation
): IRMCAutoPersonneParams {
  return {
    valeurs: {
      nomTitulaire: getValeurOuUndefined(titulaire?.nomNaissance),
      prenomTitulaire: getValeurOuUndefined(
        titulaire?.prenoms?.filter(prenom => prenom.numeroOrdre === UN).pop()
          ?.prenom
      ),
      jourNaissance: getValeurOuUndefined(titulaire?.jourNaissance),
      moisNaissance: getValeurOuUndefined(titulaire?.moisNaissance),
      anneeNaissance: getValeurOuUndefined(titulaire?.anneeNaissance)
    },
    range: `0-${NB_LIGNES_PAR_APPEL_PERSONNE}`
  };
}

export function concatValeursRMCAutoPersonneRequest(
  request?: IRMCAutoPersonneRequest
): string {
  return `${getValeurOuVide(request?.nomTitulaire)}-
  ${getValeurOuVide(request?.prenomTitulaire)}-
  ${getValeurOuVide(request?.jourNaissance)}-
  ${getValeurOuVide(request?.moisNaissance)}-
  ${getValeurOuVide(request?.anneeNaissance)}`;
}
