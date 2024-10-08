import { Droit } from "@model/agent/enum/Droit";
import IProfilDroitDto from "./IProfilDroitDto";

interface IDroitDto {
  idDroit?: string;
  nom?: Droit;
  profilDroit?: IProfilDroitDto[];
}

export default IDroitDto;
