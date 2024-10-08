import IHabilitationDto from "./IHabilitationDto";
import INomenclatureDto from "./INomenclatureDto";
import IProfilDroitDto from "./IProfilDroitDto";

interface IProfilDto {
  idProfil?: string;
  nom?: INomenclatureDto;
  habilitation?: IHabilitationDto[];
  profilDroit?: IProfilDroitDto[];
}

export default IProfilDto;
