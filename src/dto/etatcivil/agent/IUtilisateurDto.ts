import { IUtilisateur } from "@model/agent/IUtilisateur";
import { ZERO } from "@util/Utils";
import IFonctionAgentDto from "./IFonctionAgentDto";
import IHabilitationDto from "./IHabilitationDto";
import IMemoCourrierDto from "./IMemoCourrierDto";
import IServiceDto from "./IServiceDto";
import ISignatureManuscriteDto from "./ISignatureManuscriteDto";
import ITitreHonorifiqueDto from "./ITitreHonorifiqueDto";

interface IUtilisateurDto {
  idUtilisateur?: string;
  idArobas?: string;
  identifiantArobas?: string;
  nom?: string;
  prenom?: string;
  mel?: string;
  trigramme?: string;
  origineMaj?: string;
  dateActivation?: number;
  dateExpiration?: number;
  dateMaj?: number;
  dateDerniereConnexionRece?: number;
  service?: IServiceDto;
  servicesFilsDirects?: IServiceDto[];
  habilitations?: IHabilitationDto[];
  fonctionAgent?: IFonctionAgentDto;
  actif?: boolean;
  dansRece?: boolean;
  signatureManuscrite?: ISignatureManuscriteDto;
  memoCourrier?: IMemoCourrierDto[];
  titreHonorifique?: ITitreHonorifiqueDto;
  listeTitre?: string;
}

export const UtilisateurDto = {
  estDejaPresent: (
    utilisateurDto: IUtilisateurDto,
    utilisateurs: IUtilisateur[]
  ) =>
    utilisateurDto.idUtilisateur
      ? (utilisateurs.findIndex(
          utilisateur =>
            utilisateur.idUtilisateur === utilisateurDto.idUtilisateur
        ) ?? ZERO) >= ZERO
      : false
} as const;

export default IUtilisateurDto;
