import { Option } from "@util/Type";
import Texte from "../../utils/Texte";
import { Droit } from "./enum/Droit";

export const UTILISATEUR_SYSTEME = "Système RECE";

interface IServiceUtilisateurParentDto {
  serviceParent: IServiceUtilisateurDto;
}

interface IServiceUtilisateurDto {
  idService: string;
  libelleService: string;
  estDansScec: boolean;
  hierarchieService: IServiceUtilisateurParentDto[];
}

interface IHabilitationDto {
  profil: { profilDroit: { droit: { nom: Droit } }[] };
  perimetre: { nom: string; listeIdTypeRegistre: string[] };
}

export interface IUtilisateurDto {
  idUtilisateur: string;
  nom: string;
  prenom: string;
  service: IServiceUtilisateurDto;
  habilitations: IHabilitationDto[];
}

export interface IUtilisateurConnecteDto extends IUtilisateurDto {
  idArobas: string;
  servicesFilsDirects: IServiceUtilisateurDto[];
  fonctionAgent: {
    libelleFonction: string;
  };
}

type TEstHabilteParams =
  | ({
      leDroit: Droit;
      unDesDroits?: never;
      tousLesDroits?: never;
    } & (
      | {
          surLePerimetre?: string;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: never;
        }
      | {
          surLePerimetre?: never;
          surUnDesPerimetres?: string[];
          pourIdTypeRegistre?: never;
        }
      | {
          surLePerimetre?: never;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: string;
        }
    ))
  | ({
      leDroit?: never;
      unDesDroits: Droit[];
      tousLesDroits?: never;
    } & (
      | {
          surLePerimetre?: never;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: string;
        }
      | {
          surLePerimetre?: string;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: never;
        }
    ))
  | ({
      leDroit?: never;
      unDesDroits?: never;
      tousLesDroits: Droit[];
    } & (
      | {
          surLePerimetre?: never;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: string;
        }
      | {
          surLePerimetre?: string;
          surUnDesPerimetres?: never;
          pourIdTypeRegistre?: never;
        }
    ));

type THabilitationsUtilisateur = Partial<Record<Droit, { perimetre: string; idsTypeRegistre: string[] }[]>>;

export class Utilisateur {
  private static readonly champsObligatoires: (keyof IUtilisateurDto)[] = ["idUtilisateur"];

  protected constructor(
    public readonly id: string,
    public readonly prenomNom: string,
    public readonly idService: string,
    public readonly estDuSCEC: boolean,
    protected readonly habilitations: THabilitationsUtilisateur
  ) {}

  public static depuisDto(utilisateurDto: Partial<IUtilisateurDto>): Utilisateur | null {
    const clesChampsManquants = Utilisateur.champsObligatoires.filter(champs => utilisateurDto[champs] === undefined);
    if (clesChampsManquants.length) {
      console.error(`Erreur lors de la création d'un utilisateur connecté : ${clesChampsManquants.join(", ")} manquant(s)`);

      return null;
    }

    return new Utilisateur(
      utilisateurDto.idUtilisateur ?? "",
      Utilisateur.nomPrenomDepuisDto(utilisateurDto.prenom, utilisateurDto.nom),
      utilisateurDto.service?.idService ?? "",
      Boolean(utilisateurDto.service?.estDansScec),
      Utilisateur.habilitationDepuisDto(utilisateurDto.habilitations)
    );
  }

  protected static habilitationDepuisDto(habilitationDtos?: IHabilitationDto[]): THabilitationsUtilisateur {
    return (
      habilitationDtos?.reduce((habilitationsUtilisateur: THabilitationsUtilisateur, dto) => {
        dto.profil.profilDroit.forEach(droit => {
          habilitationsUtilisateur[droit.droit.nom] = (habilitationsUtilisateur[droit.droit.nom] ?? []).concat({
            perimetre: dto.perimetre.nom,
            idsTypeRegistre: dto.perimetre.listeIdTypeRegistre ?? []
          });
        });

        return habilitationsUtilisateur;
      }, {}) ?? {}
    );
  }

  protected static nomPrenomDepuisDto(prenom?: string, nom?: string): string {
    return `${Texte.nomPropre(prenom ?? "")} ${(nom ?? "").toLocaleUpperCase()}`.trim();
  }

  public estHabilitePour(params: TEstHabilteParams): boolean {
    if (params.leDroit) {
      const habilitations = this.habilitations[params.leDroit] ?? [];
      switch (true) {
        case Boolean(params.surLePerimetre):
          return habilitations.some(habilitation => habilitation.perimetre === params.surLePerimetre);
        case Boolean(params.surUnDesPerimetres):
          return (params.surUnDesPerimetres ?? []).some(unDesPerimetres =>
            habilitations.some(habilitation => habilitation.perimetre === unDesPerimetres)
          );
        case Boolean(params.pourIdTypeRegistre):
          return habilitations.some(habilitation => habilitation.idsTypeRegistre.includes(params.pourIdTypeRegistre ?? ""));
        default:
          return Boolean(habilitations.length);
      }
    }

    const estHabilite = (droit: Droit) => {
      const habilitations = this.habilitations[droit] ?? [];
      switch (true) {
        case Boolean(params.pourIdTypeRegistre):
          return habilitations.some(habilitation => habilitation.idsTypeRegistre.includes(params.pourIdTypeRegistre ?? ""));
        case Boolean(params.surLePerimetre):
          return habilitations.some(habilitation => habilitation.perimetre === params.surLePerimetre);
        default:
          return Boolean(habilitations.length);
      }
    };

    return params.unDesDroits ? params.unDesDroits.some(estHabilite) : params.tousLesDroits.every(estHabilite);
  }

  public estDansUnDesServices(idsService: string[]): boolean {
    return Boolean(idsService.length) && idsService.includes(this.idService);
  }

  public get nombreHabilitations(): number {
    return Object.keys(this.habilitations).length;
  }
}

export class UtilisateurConnecte extends Utilisateur {
  private static readonly champsObligatoiresUtilisateurConnecte: (keyof IUtilisateurConnecteDto)[] = ["idUtilisateur", "idArobas"];

  private constructor(
    public readonly idArobas: string,
    public readonly fonction: string,
    public readonly idServicesParent: string[],
    public readonly idServicesFils: string[],
    public readonly optionsServicesFils: Option[],
    ...donneesUtilisateur: [string, string, string, boolean, THabilitationsUtilisateur]
  ) {
    super(...donneesUtilisateur);
  }

  public static depuisDto(utilisateurConnecteDto: Partial<IUtilisateurConnecteDto>): UtilisateurConnecte | null {
    const clesChampsManquants = UtilisateurConnecte.champsObligatoiresUtilisateurConnecte.filter(
      champs => utilisateurConnecteDto[champs] === undefined
    );
    if (clesChampsManquants.length) {
      console.error(`Erreur lors de la création d'un utilisateur connecté : ${clesChampsManquants.join(", ")} manquant(s)`);

      return null;
    }

    const servicesFils = (utilisateurConnecteDto.servicesFilsDirects ?? []).reduce(
      (infosServicesFils, service) => ({
        ids: infosServicesFils.ids.concat(service.idService),
        options: infosServicesFils.options.concat({ cle: service.idService, libelle: service.libelleService })
      }),
      { ids: [], options: [] } as { ids: string[]; options: Option[] }
    );

    const idsServicesParents: string[] = [];
    const recupererIdsServicesParents = (service: IServiceUtilisateurDto) => {
      service.hierarchieService.forEach(hierarchie => {
        idsServicesParents.push(hierarchie.serviceParent.idService);
        hierarchie.serviceParent.hierarchieService && recupererIdsServicesParents(hierarchie.serviceParent);
      });
    };
    utilisateurConnecteDto.service && recupererIdsServicesParents(utilisateurConnecteDto.service);

    return new UtilisateurConnecte(
      utilisateurConnecteDto.idArobas ?? "",
      utilisateurConnecteDto.fonctionAgent?.libelleFonction ?? "",
      idsServicesParents,
      servicesFils.ids,
      [...servicesFils.options].sort((a, b) => a.libelle.localeCompare(b.libelle)),
      utilisateurConnecteDto.idUtilisateur ?? "",
      UtilisateurConnecte.nomPrenomDepuisDto(utilisateurConnecteDto.prenom, utilisateurConnecteDto.nom),
      utilisateurConnecteDto.service?.idService ?? "",
      Boolean(utilisateurConnecteDto.service?.estDansScec),
      UtilisateurConnecte.habilitationDepuisDto(utilisateurConnecteDto.habilitations)
    );
  }

  public static inconnu(): UtilisateurConnecte {
    return new UtilisateurConnecte("", "", [], [], [], "", "", "", false, {});
  }
}
