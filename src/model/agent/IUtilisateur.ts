import { estTableauNonVide, getTableauOuVide, getValeurOuVide, ZERO } from "@util/Utils";
import IHabilitationDto from "../../dto/etatcivil/agent/IHabilitationDto";
import IUtilisateurDto from "../../dto/etatcivil/agent/IUtilisateurDto";
import { Droit } from "./enum/Droit";
import { Perimetre, PerimetreEnum } from "./enum/Perimetre";
import { IDroit, IHabilitation, IProfil } from "./Habilitation";
import { INomenclatureAgentApi } from "./INomenclatureAgentApi";
import { IOfficier } from "./IOfficier";
import { IPerimetre } from "./IPerimetre";
import { IService, Service } from "./IService";
import { TModeAuthentification } from "./types";

export interface IUtilisateur {
  idUtilisateur: string;
  idArobas?: string;
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
  identifiantArobas?: string;
  listeTitre?: string;
  mail?: string;
  origineMaj?: string;
  signatureManuscrite?: string;
}

export const Utilisateur = {
  depuiDto: (utilisateurDto: IUtilisateurDto): IUtilisateur =>
    ({
      idUtilisateur: utilisateurDto.idUtilisateur ?? "",
      idArobas: utilisateurDto.idArobas,
      nom: utilisateurDto.nom,
      prenom: utilisateurDto.prenom,
      trigramme: utilisateurDto.trigramme,
      modeAuthentification: "AROBAS_MDP",
      habilitations: mapHabilitationsUtilisateur(getTableauOuVide(utilisateurDto.habilitations)),
      mail: utilisateurDto.mel,
      actif: utilisateurDto.actif,
      dateActivation: utilisateurDto.dateActivation,
      dateExpiration: utilisateurDto.dateExpiration,
      dateMaj: utilisateurDto.dateMaj,
      service: utilisateurDto.service ? Service.depuisDto(utilisateurDto.service) : undefined,
      servicesFils: utilisateurDto.servicesFilsDirects
        ? utilisateurDto.servicesFilsDirects.map(serviceFils => Service.depuisDto(serviceFils))
        : undefined,
      fonctionAgent: utilisateurDto.fonctionAgent
        ? {
            idFonctionAgent: utilisateurDto.fonctionAgent.idFonctionAgent,
            libelleFonction: utilisateurDto.fonctionAgent.libelleFonction,
            utilisateur: utilisateurDto.fonctionAgent.utilisateur
          }
        : {},

      identifiantArobas: utilisateurDto.identifiantArobas,
      listeTitre: utilisateurDto.listeTitre,
      origineMaj: utilisateurDto.origineMaj,
      signatureManuscrite: utilisateurDto.signatureManuscrite
    } as IUtilisateur)
} as const;

export const mapHabilitationsUtilisateur = (habilitations: IHabilitationDto[]): IHabilitation[] => {
  const habilitationsUtilisateur: IHabilitation[] = [];

  if (habilitations) {
    habilitations.forEach(h => {
      const habilitation: IHabilitation = {} as IHabilitation;
      habilitation.idHabilitation = getValeurOuVide(h.idHabilitation);
      habilitation.profil = {} as IProfil;
      habilitation.profil.idProfil = getValeurOuVide(h.profil?.idProfil);
      habilitation.profil.nom = h.profil?.nom as INomenclatureAgentApi;
      habilitation.profil.droits =
        (habilitation.profil &&
          h.profil?.profilDroit?.map(
            (profilDroit: any) =>
              ({
                idDroit: profilDroit.droit.idDroit,
                nom: profilDroit.droit.nom
              } as IDroit)
          )) ??
        [];
      if (h.perimetre != null) {
        habilitation.perimetre = {} as IPerimetre;
        habilitation.perimetre.idPerimetre = getValeurOuVide(h.perimetre.id);
        habilitation.perimetre.nom = getValeurOuVide(h.perimetre.nom);
        habilitation.perimetre.description = getValeurOuVide(h.perimetre.description);
        habilitation.perimetre.estActif = !!h.perimetre.estActif;
        habilitation.perimetre.listePays = getTableauOuVide(h.perimetre.listePays?.toUpperCase().split(" ET "));
        habilitation.perimetre.listeIdTypeRegistre = getTableauOuVide(h.perimetre.listeIdTypeRegistre);
      }
      habilitationsUtilisateur.push(habilitation);
    });
  }

  return habilitationsUtilisateur;
};

export const utilisateurADroit = (droit: Droit, utilisateur?: IUtilisateur | IOfficier) => {
  let droitTrouve: IDroit | undefined;
  utilisateur?.habilitations?.forEach(h => (droitTrouve = droitTrouve || h.profil?.droits?.find(d => d.nom === droit)));
  return droitTrouve != null;
};

export const utilisateurALeDroitSurUnDesPerimetres = (droit: Droit, refPerimetres: Perimetre[], utilisateur: IUtilisateur | undefined) => {
  let res = false;

  if (estTableauNonVide(refPerimetres)) {
    utilisateur?.habilitations?.forEach(h => {
      if (
        h.perimetre &&
        h.profil.droits.find(d => d.nom === droit) &&
        refPerimetres.find(refPerimetre => PerimetreEnum.getEnum(h.perimetre.nom) === refPerimetre)
      ) {
        res = true;
      }
    });
  } else {
    res = true;
  }

  return res;
};

export const getServiceParUtilisateurId = (idUtilisateur: string, utilisateurs: IUtilisateur[]): IService | undefined => {
  return utilisateurs.find(utilisateur => utilisateur.idUtilisateur === idUtilisateur)?.service;
};

export const getCodesHierarchieService = (service: IService, codesHierarchieService?: string[]): string[] => {
  if (!codesHierarchieService) {
    codesHierarchieService = [];
  }
  codesHierarchieService.push(service.code);
  const hierarchieService = service.hierarchieService;
  return hierarchieService && hierarchieService.length > ZERO
    ? getCodesHierarchieService(hierarchieService[ZERO].serviceParent, codesHierarchieService)
    : codesHierarchieService.reverse();
};

/** UTILITAIRES */
export const getNomPrenomUtilisateurAPartirId = (id: string, utilisateurs: IUtilisateur[]) => {
  const utilisateur = utilisateurs.find(utilisateur => utilisateur.idUtilisateur === id);

  return `${utilisateur?.nom ?? ""} ${utilisateur?.prenom ?? ""}`.trim();
};

export const getPrenomUtilisateurAPartirID = (id: string, utilisateurs: IUtilisateur[]) => {
  return utilisateurs.find(utilisateur => utilisateur.idUtilisateur === id)?.prenom;
};
export const getNomUtilisateurAPartirID = (id: string, utilisateurs: IUtilisateur[]) => {
  return utilisateurs.find(utilisateur => utilisateur.idUtilisateur === id)?.nom;
};
