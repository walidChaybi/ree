import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { Partenaire } from "@model/etatcivil/pacs/Partenaire";
import { formatNom, formatPrenom } from "@util/Utils";
import IFournisseurDonneesBandeau from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauPacs implements IFournisseurDonneesBandeau {
  public get fiche(): FichePacs {
    return this._fiche;
  }

  constructor(private readonly _fiche: FichePacs) {}

  public readonly getRegistre = (): string | undefined => undefined;

  public readonly getSimplePersonnes = (): SimplePersonne[] =>
    this.fiche.partenaires.map((p: Partenaire) => new SimplePersonne(formatNom(p.nomFamille), formatPrenom(p.prenoms.split(",")[0])));

  public readonly getTypeAbrege = (): string => "pacs";

  public readonly getType = (): string => "pacs";

  public readonly getAnnee = (): string => this.fiche.annee ?? "";
}
