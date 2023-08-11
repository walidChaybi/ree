import { TRequete } from "@model/requete/IRequete";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import {
  ICriteresRMCAutoRequete,
  IRMCRequestRequete
} from "@model/rmc/requete/IRMCRequestRequete";
import { getValeurOuUndefined } from "@util/Utils";

export function determinerCriteresRMCAuto(
  requete: TRequete
): ICriteresRMCAutoRequete {
  const criteresRMCAuto = {} as ICriteresRMCAutoRequete;
  criteresRMCAuto.criteres = criteresRMCAutoMapper(requete?.titulaires);
  return criteresRMCAuto;
}

function criteresRMCAutoMapper(titulaires?: any): IRMCRequestRequete[] {
  return titulaires?.map((t: any) => {
    return {
      nomTitulaire: getValeurOuUndefined(t?.nomNaissance),
      prenomTitulaire: getValeurOuUndefined(TitulaireRequete.getPrenom1(t)),
      jourNaissance: getValeurOuUndefined(t?.jourNaissance),
      moisNaissance: getValeurOuUndefined(t?.moisNaissance),
      anneeNaissance: getValeurOuUndefined(t?.anneeNaissance)
    } as IRMCRequestRequete;
  });
}
