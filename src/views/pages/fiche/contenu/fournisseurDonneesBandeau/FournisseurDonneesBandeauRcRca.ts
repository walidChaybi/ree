import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { Interesse } from "@model/etatcivil/rcrca/Interesse";
import { formatNom, formatPrenom } from "@util/Utils";
import IFournisseurDonneesBandeau from "./IFournisseurDonneesBandeau";

export class FournisseurDonneesBandeauRcRca implements IFournisseurDonneesBandeau {
  public get fiche(): FicheRcRca {
    return this._fiche;
  }

  constructor(private readonly _fiche: FicheRcRca) {}

  public readonly getRegistre = (): string | undefined => undefined;

  public readonly getSimplePersonnes = (): SimplePersonne[] =>
    this.fiche.interesses.map((p: Interesse) => new SimplePersonne(formatNom(p.nomFamille), formatPrenom(p.prenoms.split(",")[0])));

  public readonly getTypeAbrege = (): string => this.fiche.categorie ?? "";

  public readonly getType = (): string => this.fiche.categorie ?? "";

  public readonly getAnnee = (): string => this.fiche.annee ?? "";
}
