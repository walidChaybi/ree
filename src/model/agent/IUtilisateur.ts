import { storeRece } from "@util/storeRece";
import { estTableauNonVide, ZERO } from "@util/Utils";
import { Droit } from "./enum/Droit";
import { Perimetre, PerimetreEnum } from "./enum/Perimetre";
import { IDroit, IHabilitation, IProfil } from "./Habilitation";
import { IOfficier } from "./IOfficier";
import { IPerimetre } from "./IPerimetre";
import { IService } from "./IService";
import { TModeAuthentification } from "./types";

export interface IUtilisateur {
  idUtilisateur: string;
  nom: string;
  prenom: string;
  trigramme: string;
  modeAuthentification: TModeAuthentification;
  habilitations: IHabilitation[];
  actif?: boolean;
  dateDebut?: number;
  dateActivation?: number;
  dateExpiration?: number;
  service?: IService;
  servicesFils?: IService[];
  fonctionAgent?: {
    idFonctionAgent: string;
    libelleFonction: string;
    utilisateur: any;
  };
  idArobas?: string;
  identifiantArobas?: string;
  listeTitre?: string;
  mail?: string;
  origineMaj?: string;
  signatureManuscrite?: string;
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
  utilisateur?: IUtilisateur | IOfficier
) => {
  let droitTrouve: IDroit | undefined;
  utilisateur?.habilitations?.forEach(
    h =>
      (droitTrouve =
        droitTrouve || h.profil?.droits?.find(d => d.nom === droit))
  );
  return droitTrouve != null;
};

export function utilisateurALeDroitSurUnDesPerimetres(
  droit: Droit,
  refPerimetres: Perimetre[],
  utilisateur: IUtilisateur | undefined
) {
  let res = false;

  if (estTableauNonVide(refPerimetres)) {
    utilisateur?.habilitations?.forEach(h => {
      if (
        h.perimetre &&
        h.profil.droits.find(d => d.nom === droit) &&
        refPerimetres.find(
          refPerimetre =>
            PerimetreEnum.getEnum(h.perimetre.nom) === refPerimetre
        )
      ) {
        res = true;
      }
    });
  } else {
    res = true;
  }

  return res;
}

export const mappingUtilisateurs = (data: any) => {
  const utilisateurs: IUtilisateur[] = [];
  for (const utilisateur of data) {
    if (!getServiceParUtilisateurId(utilisateur.idUtilisateur)) {
      const creationUtilisateur: IUtilisateur = {
        habilitations: mapHabilitationsUtilisateur(utilisateur.habilitations),
        mail: utilisateur.mel,
        actif: utilisateur.actif,
        dateActivation: utilisateur.dateActivation,
        dateExpiration: utilisateur.dateExpiration,
        dateMaj: utilisateur.dateMaj,
        service: utilisateur.service,
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
        servicesFils: utilisateur.servicesFilsDirects,
        modeAuthentification: "AROBAS_MDP"
      } as IUtilisateur;
      utilisateurs.push(creationUtilisateur);
    }
  }

  return utilisateurs;
};

export function getServiceParUtilisateurId(
  idUtilisateur: string
): IService | undefined {
  return storeRece.listeUtilisateurs.find(
    utilisateur => utilisateur.idUtilisateur === idUtilisateur
  )?.service;
}

export const getCodesHierarchieService = (
  service: IService,
  codesHierarchieService?: string[]
): string[] => {
  if (!codesHierarchieService) {
    codesHierarchieService = [];
  }
  codesHierarchieService.push(service.code);
  const hierarchieService = service.hierarchieService;
  return hierarchieService && hierarchieService.length > ZERO
    ? getCodesHierarchieService(
        hierarchieService[ZERO].serviceParent,
        codesHierarchieService
      )
    : codesHierarchieService.reverse();
};
