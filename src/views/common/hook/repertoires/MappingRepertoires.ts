import { IAnalyseMarginale } from "@model/etatcivil/acte/IAnalyseMarginale";
import { ICorpsExtraitRectification } from "@model/etatcivil/acte/ICorpsExtraitRectification";
import { IDetailMariage } from "@model/etatcivil/acte/IDetailMariage";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { ITypeRegistre } from "@model/etatcivil/acte/ITypeRegistre";
import { IAutresNoms } from "@model/etatcivil/commun/IAutresNoms";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { ILieuEvenement } from "@model/etatcivil/commun/ILieuEvenement";
import { IPersonne } from "@model/etatcivil/commun/IPersonne";
import { AutresNoms } from "@model/etatcivil/enum/AutresNoms";
import { ExistenceContratMariage } from "@model/etatcivil/enum/ExistenceContratMariage";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { StatutFiche } from "@model/etatcivil/enum/StatutFiche";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { IFichePacs } from "@model/etatcivil/pacs/IFichePacs";
import { IPartenaire } from "@model/etatcivil/pacs/IPartenaire";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { IInteresse, Interesse } from "@model/etatcivil/rcrca/IInteresse";
import { getDateFromTimestamp, IDateCompose } from "@util/DateUtils";
import { formatNom, formatPrenom } from "@util/Utils";
import { mappingMentions } from "../acte/mentions/MentionsApiHook";

export type TFiche = IFicheRcRca | IFichePacs | IFicheActe;

export function mapRcRca(data: any): IFicheRcRca {
  const dataRcRca: IFicheRcRca = { ...data };
  if (dataRcRca.interesses !== undefined) {
    dataRcRca.interesses.forEach(interesse => {
      harmoniserNomPrenomsInteresse(interesse);
      harmoniserSexeEtNationalite(interesse);
    });
  }
  dataRcRca.dateDerniereDelivrance = data.dateDerniereDelivrance
    ? getDateFromTimestamp(data.dateDerniereDelivrance)
    : undefined;
  dataRcRca.dateDerniereMaj = data.dateDerniereMaj
    ? getDateFromTimestamp(data.dateDerniereMaj)
    : undefined;
  dataRcRca.dateInscription = getDateFromTimestamp(data.dateInscription);

  dataRcRca.personnes = mapPersonnes(data.personnes, data.numero);

  dataRcRca.nature =
    data.categorie === "rc"
      ? NatureRc.getEnumFor(data.nature)
      : NatureRca.getEnumFor(data.nature);

  dataRcRca.statutsFiche = mapStatutFiche(data);

  return dataRcRca;
}

export function mapPacs(data: any): IFichePacs {
  const dataPacs: IFichePacs = { ...data };
  dataPacs.statutsFiche = [];
  if (data.partenaires) {
    data.partenaires.forEach((p: any) => {
      (p as IPartenaire).nationalite = Nationalite.getEnumFor(p.nationalite);
      (p as IPartenaire).sexe = Sexe.getEnumFor(p.sexe);
    });
  }
  dataPacs.dateDerniereDelivrance = data.dateDerniereDelivrance
    ? getDateFromTimestamp(data.dateDerniereDelivrance)
    : undefined;
  dataPacs.dateDerniereMaj = data.dateDerniereMaj
    ? getDateFromTimestamp(data.dateDerniereMaj)
    : undefined;
  dataPacs.dateEnregistrementParAutorite = getDateFromTimestamp(
    data.dateEnregistrementParAutorite
  );
  dataPacs.dateInscription = getDateFromTimestamp(data.dateInscription);

  dataPacs.personnes = mapPersonnes(data.personnes, data.numero);

  dataPacs.statutsFiche = mapStatutFiche(data);

  return dataPacs;
}

function mapStatutFiche(data: any) {
  return data.statutsFiche.map((sf: any) => ({
    ...sf,
    statut: StatutFiche.getEnumFor(sf.statut).libelle
  }));
}

export function mapActe(data: any): IFicheActe {
  const dataActe: IFicheActe = { ...data };
  dataActe.nature = NatureActe.getEnumFor(data.nature);
  dataActe.registre = mapRegistre(data.registre);
  dataActe.dateDerniereDelivrance = data.dateDerniereDelivrance
    ? getDateFromTimestamp(data.dateDerniereDelivrance)
    : undefined;
  dataActe.dateDerniereMaj = data.dateDerniereMaj
    ? getDateFromTimestamp(data.dateDerniereMaj)
    : undefined;

  dataActe.personnes = mapPersonnes(data.personnes, data.numero);
  dataActe.mentions = mappingMentions(data.mentions);

  dataActe.visibiliteArchiviste = TypeVisibiliteArchiviste.getEnumFor(
    data.visibiliteArchiviste
  );

  dataActe.detailMariage = mapDetailMariage(data.detailMariage);

  dataActe.type = TypeActe.getEnumFor(data.type);

  dataActe.corpsExtraitRectifications = mapCorpsRectifications(
    data.corpsExtraitRectifications
  );

  dataActe.analyseMarginales = mapAnalysesMarginales(data.analyseMarginales);
  dataActe.titulaires = mapTitulaires(data.titulaires);

  return dataActe;
}

function mapAnalysesMarginales(
  ams: IAnalyseMarginale[]
): IAnalyseMarginale[] | undefined {
  return ams?.map((am: any) => ({
    ...am,
    dateDebut: am.dateDebut ? getDateFromTimestamp(am.dateDebut) : undefined,
    dateFin: am.dateFin ? getDateFromTimestamp(am.dateFin) : undefined,
    titulaires: mapTitulaires(am.titulaires)
  }));
}

export function mapTitulaires(titulaires: any[]): ITitulaireActe[] {
  return titulaires
    .map(titulaire => ({
      ...titulaire,
      sexe: titulaire.sexe ? Sexe.getEnumFor(titulaire.sexe) : Sexe.INCONNU,
      typeDeclarationConjointe: titulaire.typeDeclarationConjointe
        ? TypeDeclarationConjointe.getEnumFor(
            titulaire.typeDeclarationConjointe
          )
        : TypeDeclarationConjointe.ABSENCE_DECLARATION,
      dateDeclarationConjointe: titulaire.dateDeclarationConjointe
        ? getDateFromTimestamp(titulaire.dateDeclarationConjointe)
        : undefined,
      filiations: mapFiliation(titulaire.filiations)
    }))
    .sort((a, b) => a.ordre - b.ordre);
}

function mapFiliation(filiations?: any[]) {
  return filiations
    ? filiations.map(filiation => ({
        ...filiation,
        sexe: Sexe.getEnumFor(filiation.sexe)
      }))
    : [];
}

function mapDetailMariage(dm: any): IDetailMariage | undefined {
  let detailMariage: IDetailMariage | undefined;
  if (dm) {
    detailMariage = { ...dm };
    //@ts-ignore (dataActe.detailMariage ne peut pas être nul du fait du test ci-dessus)
    detailMariage.existenceContrat = ExistenceContratMariage.getEnumFor(
      dm.existenceContrat
    );
  }
  return detailMariage;
}

function mapCorpsRectifications(cers: any[]): ICorpsExtraitRectification[] {
  let corpsExtraitRectifications: ICorpsExtraitRectification[] = [];
  if (cers) {
    corpsExtraitRectifications = cers.map((cer: any) => {
      const cerMape = { ...cer };
      cerMape.type = TypeExtrait.getEnumFor(cer.type);
      return cerMape;
    });
  }

  return corpsExtraitRectifications;
}

function mapPersonnes(personnes: any, numero: any): IPersonne[] {
  return personnes.map((personne: any) => {
    return {
      ...personne,
      autresNoms: mapAutresNoms(personne.autresNoms),
      lieuNaissance: mapLieuPersonne(personne.naissance),
      dateNaissance: mapDatePersonne(personne.naissance),
      nationalite: Nationalite.getEnumFor(personne.nationalite),
      lieuDeces: personne.deces && mapLieuPersonne(personne.deces),
      dateDeces: personne.deces && mapDatePersonne(personne.deces),
      sexe: personne.sexe && Sexe.getEnumFor(personne.sexe),
      actes:
        personne.actes &&
        personne.actes
          .filter((acte: any) => acte.numero !== numero)
          .map((acte: any) => {
            return {
              ...acte,
              nature: NatureActe.getEnumFor(acte.nature)
            };
          }),
      pacss:
        personne.pacss &&
        personne.pacss.filter((pacs: IFicheLien) => pacs.numero !== numero),
      rcas:
        personne.rcas &&
        personne.rcas.filter((rca: IFicheLien) => rca.numero !== numero),
      rcs:
        personne.rcs &&
        personne.rcs.filter((rc: IFicheLien) => rc.numero !== numero)
    };
  });
}

function mapAutresNoms(autresNoms: any[]): IAutresNoms[] {
  return (
    autresNoms &&
    autresNoms.map(autreNom => {
      return {
        ...autreNom,
        type: AutresNoms.getEnumFor(autreNom.type)
      };
    })
  );
}

function mapLieuPersonne(lieu: any): ILieuEvenement {
  return lieu
    ? {
        arrondissement: lieu.arrondissement,
        pays: lieu.pays,
        region: lieu.region,
        ville: lieu.ville
      }
    : ({} as ILieuEvenement);
}

function mapDatePersonne(date: any): IDateCompose {
  return date
    ? {
        jour: date.jour,
        mois: date.mois,
        annee: date.annee
      }
    : ({} as IDateCompose);
}

export function mapRegistre(data: any) {
  let registre = {} as IRegistre;
  if (data) {
    registre = data as IRegistre;
    registre.type = data.type as ITypeRegistre;
  }
  return registre;
}

function harmoniserNomPrenomsInteresse(interesse: IInteresse) {
  interesse.nomFamille = interesse.nomFamille
    ? formatNom(interesse.nomFamille)
    : interesse.nomFamille;
  if (interesse.autreNoms !== undefined) {
    interesse.autreNoms.forEach(autreNom => formatNom(autreNom));
  }
  if (interesse.autrePrenoms !== undefined) {
    interesse.autrePrenoms.forEach(autrePrenom => formatPrenom(autrePrenom));
  }
  if (interesse.prenoms !== undefined) {
    interesse.prenoms.forEach(prenom => {
      prenom.valeur = formatPrenom(prenom.valeur);
    });
  }

  return interesse;
}

function harmoniserSexeEtNationalite(interesse: IInteresse) {
  interesse.sexe = Interesse.getSexe(interesse);
  interesse.nationalite = Interesse.getNationalite(interesse);
  return interesse;
}
