import { IParents } from "./IParents";
import { ITitulaireRequeteCreation } from "./ITitulaireRequeteCreation";

export const ParentsRequeteConsulaire = {
  getParentsDepuisTitulaires(titulaires?: ITitulaireRequeteCreation[]): IParents | undefined {
    if (!titulaires) return;
    const parents = titulaires?.filter(
      titulaire => titulaire?.typeObjetTitulaire?.toUpperCase() === "FAMILLE" && titulaire?.qualite?.libelle?.toUpperCase() === "PARENT"
    );

    let mere = parents.find(parent => parent?.sexe?.toUpperCase() === "FEMININ");

    if (parents.length === 1 && mere) {
      return {
        parent1: {},
        parent2: mere
      };
    }
    return { parent1: parents[0], parent2: parents[1] };
  }
};
