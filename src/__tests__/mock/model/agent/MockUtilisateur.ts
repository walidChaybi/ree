import { IUtilisateurConnecteDto, IUtilisateurDto, Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";

type TAvecDroitParams = { perimetres?: string[]; surIdsTypeRegistre?: never } | { perimetres?: never; surIdsTypeRegistre?: string[] };

type TAvecAttributs<TMock extends Utilisateur | UtilisateurConnecte> = Partial<
  Omit<TMock, "estDansUnDesServices" | "estHabilitePour" | "idArobas" | "prenomNom"> & { prenom: string; nom: string }
>;

type TAutresValeurUtilisateurConnecte = Pick<UtilisateurConnecte, "idServicesFils" | "idServicesParent" | "optionsServicesFils">;

class MockUtilisateurBuilder<TMock extends Utilisateur | UtilisateurConnecte> {
  private autresValeursUtilisateurConnecte: Partial<TAutresValeurUtilisateurConnecte> = {};

  constructor(private utilisateurDto: Partial<IUtilisateurDto | IUtilisateurConnecteDto>) {}

  public static utilisateur(params: Pick<IUtilisateurDto, "idUtilisateur" | "prenom" | "nom">): MockUtilisateurBuilder<Utilisateur> {
    return new MockUtilisateurBuilder({ ...params, habilitations: [] });
  }

  public static utilisateurConnecte(): MockUtilisateurBuilder<UtilisateurConnecte> {
    return new MockUtilisateurBuilder({
      idArobas: "idArobas",
      idUtilisateur: "idUtilisateur",
      nom: "NOM",
      prenom: "Prénom",
      service: {
        idService: "idService",
        libelleService: "Libelle service",
        estDansScec: true,
        hierarchieService: []
      },
      servicesFilsDirects: [],
      fonctionAgent: {
        libelleFonction: "fonction"
      },
      habilitations: []
    });
  }

  public avecDroits(droits: Droit[], params?: TAvecDroitParams): this {
    if (!droits.length) return this;

    (params?.perimetres ?? [Perimetre.TOUS_REGISTRES]).forEach(perimetre => {
      this.utilisateurDto.habilitations?.push({
        profil: { profilDroit: droits.map(droit => ({ droit: { nom: droit } })) },
        perimetre: {
          nom: perimetre,
          listeIdTypeRegistre: params?.surIdsTypeRegistre?.length ? params.surIdsTypeRegistre : []
        }
      });
    });

    return this;
  }

  public avecDroit(droit: Droit, params?: TAvecDroitParams): this {
    return this.avecDroits([droit], params);
  }

  public avecAttributs(attributs: TAvecAttributs<TMock>): this {
    const attributsUtilisateur = { ...attributs } as TAvecAttributs<UtilisateurConnecte>;

    this.utilisateurDto = {
      ...this.utilisateurDto,
      ...(attributsUtilisateur.id ? { idUtilisateur: attributsUtilisateur.id } : {}),
      ...(attributsUtilisateur.nom ? { nom: attributsUtilisateur.nom } : {}),
      ...(attributsUtilisateur.prenom ? { prenom: attributsUtilisateur.prenom } : {}),
      ...(attributsUtilisateur.idService || attributsUtilisateur.estDuSCEC
        ? {
            service: {
              idService: attributsUtilisateur.idService ?? "",
              libelleService: "",
              estDansScec: Boolean(attributsUtilisateur.estDuSCEC),
              hierarchieService: []
            }
          }
        : {})
    };

    this.autresValeursUtilisateurConnecte = {
      ...this.autresValeursUtilisateurConnecte,
      ...(attributsUtilisateur.idServicesFils?.length ? { idServicesFils: attributsUtilisateur.idServicesFils } : {}),
      ...(attributsUtilisateur.idServicesParent?.length ? { idServicesParent: attributsUtilisateur.idServicesParent } : {}),
      ...(attributsUtilisateur.optionsServicesFils?.length ? { optionsServicesFils: attributsUtilisateur.optionsServicesFils } : {})
    };

    return this;
  }

  public generer(): TMock {
    const estUtilisateurConnecte = (dto: Partial<IUtilisateurDto | IUtilisateurConnecteDto>): dto is IUtilisateurConnecteDto =>
      "idArobas" in dto;

    if (estUtilisateurConnecte(this.utilisateurDto)) {
      const mock = UtilisateurConnecte.depuisDto(this.utilisateurDto) as UtilisateurConnecte;
      this.autresValeursUtilisateurConnecte.idServicesFils &&
        mock.idServicesFils.push(...this.autresValeursUtilisateurConnecte.idServicesFils);
      this.autresValeursUtilisateurConnecte.idServicesParent &&
        mock.idServicesParent.push(...this.autresValeursUtilisateurConnecte.idServicesParent);
      this.autresValeursUtilisateurConnecte.optionsServicesFils &&
        mock.optionsServicesFils.push(...this.autresValeursUtilisateurConnecte.optionsServicesFils);

      return mock as TMock;
    }

    return Utilisateur.depuisDto(this.utilisateurDto) as TMock;
  }
}

export default MockUtilisateurBuilder;
