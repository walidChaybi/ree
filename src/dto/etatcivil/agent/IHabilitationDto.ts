import IPerimetreDto from "./IPerimetreDto";
import IProfilDto from "./IProfilDto";
import IUtilisateurDto from "./IUtilisateurDto";

interface IHabilitationDto {
  idHabilitation?: string;
  villePosteConsulaire?: string;
  profil?: IProfilDto;
  utilisateurs?: IUtilisateurDto;
  perimetre?: IPerimetreDto;
}

export default IHabilitationDto;
