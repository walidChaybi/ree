import { Droit } from "../Droit";
import { IDroit, IHabilitation, IProfil } from "../Habilitation";
import { IPerimetre } from "../IPerimetre";
import { IEntite } from "./IEntiteRattachement";
import { IOfficier } from "./IOfficier";

export interface IUtilisateur {
  actif?: boolean;
  dateDebut?: number;
  dateFin?: number;
  dateMaj?: number;
  entite?: IEntite;
  entitesFilles?: IEntite[];
  fonctionAgent?: {
    idFonctionAgent: string;
    libelleFonction: string;
    utilisateur: any;
  };
  habilitations: IHabilitation[];
  idArobas?: string;
  idUtilisateur: string;
  identifiantArobas?: string;
  listeTitre?: string;
  mail?: string;
  nom: string;
  origineMaj?: string;
  prenom: string;
  signatureManuscrite?: string;
  trigramme: string;
}

export function mapHabilitationsUtilisateur(
  habilitations: any[]
): IHabilitation[] {
  const habilitationsUtilisateur: IHabilitation[] = [];

  if (habilitations) {
    habilitations.forEach(h => {
      const habilitation: IHabilitation = {} as IHabilitation;
      habilitation.idHabilitation = h.idHabilitation;
      habilitation.profil = {} as IProfil;
      habilitation.profil.idProfil = h.profil.idProfil;
      habilitation.profil.nom = h.profil.nom;
      habilitation.profil.droits =
        habilitation.profil &&
        h.profil.profilDroit.map(
          (profilDroit: any) =>
            ({
              idDroit: profilDroit.droit.idDroit,
              nom: profilDroit.droit.nom
            } as IDroit)
        );
      if (h.perimetre != null) {
        habilitation.perimetre = {} as IPerimetre;
        habilitation.perimetre.idPerimetre = h.perimetre.id;
        habilitation.perimetre.nom = h.perimetre.nom;
        habilitation.perimetre.description = h.perimetre.description;
        habilitation.perimetre.estActif = h.perimetre.estActif;
        habilitation.perimetre.listePays = h.perimetre.listePays
          ?.toUpperCase()
          .split(" ET ");
        habilitation.perimetre.listeIdTypeRegistre =
          h.perimetre.listeIdTypeRegistre;
      }
      habilitationsUtilisateur.push(habilitation);
    });
  }

  return habilitationsUtilisateur;
}

export const utilisateurADroit = (
  droit: Droit,
  utilisateur: IUtilisateur | IOfficier
) => {
  let droitTrouve: IDroit | undefined;
  utilisateur.habilitations?.forEach(
    h =>
      (droitTrouve =
        droitTrouve || h.profil?.droits?.find(d => d.nom === droit))
  );
  return droitTrouve != null;
};

export const mappingUtilisateurs = (data: any) => {
  const utilisateurs: IUtilisateur[] = [];
  for (const utilisateur of data) {
    const creationUtilisateur: IUtilisateur = {
      habilitations: mapHabilitationsUtilisateur(utilisateur.habilitations),
      mail: utilisateur.mel,
      actif: utilisateur.actif,
      dateDebut: utilisateur.dateDebut,
      dateFin: utilisateur.dateFin,
      dateMaj: utilisateur.dateMaj,
      entite: utilisateur.entite,
      fonctionAgent: utilisateur.fonctionAgent
        ? {
            idFonctionAgent: utilisateur.fonctionAgent.idFonctionAgent,
            libelleFonction: utilisateur.fonctionAgent.libelleFonction,
            utilisateur: utilisateur.fonctionAgent.utilisateur
          }
        : {},
      idArobas: utilisateur.idArobas,
      idUtilisateur: utilisateur.idUtilisateur,
      identifiantArobas: utilisateur.identifiantArobas,
      listeTitre: utilisateur.listeTitre,
      nom: utilisateur.nom,
      origineMaj: utilisateur.origineMaj,
      prenom: utilisateur.prenom,
      signatureManuscrite: utilisateur.signatureManuscrite,
      trigramme: utilisateur.trigramme,
      entitesFilles: utilisateur.entitesFillesDirectes
    } as IUtilisateur;
    utilisateurs.push(creationUtilisateur);
  }
  return utilisateurs;
};
