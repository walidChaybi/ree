import { IParents } from "./IParents";
import { ITitulaireRequeteCreation } from "./ITitulaireRequeteCreation";

export const ParentsRequeteConsulaire = {
  getParentsDepuisTitulaires(titulaires?: ITitulaireRequeteCreation[]): IParents | undefined {
    if (!titulaires) return;
    const parents = titulaires?.filter(
      titulaire => titulaire?.typeObjetTitulaire?.toUpperCase() === "FAMILLE" && titulaire?.qualite?.libelle?.toUpperCase() === "PARENT"
    );
    let pere = parents.find(parent => parent?.sexe?.toUpperCase() === "MASCULIN");
    let mere = parents.find(parent => parent?.sexe?.toUpperCase() === "FEMININ");
    let parentsSansSexe = parents?.filter(parent => !parent?.sexe || parent?.sexe?.toUpperCase() === "INCONNU");

    if (parentsSansSexe.length === 2) {
      return { parent1: parentsSansSexe[0], parent2: parentsSansSexe[1] };
    }

    if (pere && mere) {
      return { parent1: pere, parent2: mere };
    }
    if (pere && parentsSansSexe[0]) {
      return { parent1: pere, parent2: parentsSansSexe[0] };
    }
    if (mere && parentsSansSexe[0]) {
      return { parent1: parentsSansSexe[0], parent2: mere };
    }
    return { parent1: parents[0], parent2: parents[1] };
  }
};
