import IUtilisateurDto from "./IUtilisateurDto";

interface IFonctionAgentDto {
  idFonctionAgent?: string;
  libelleFonction?: string;
  utilisateur?: IUtilisateurDto;
}

export default IFonctionAgentDto;
