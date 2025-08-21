import { IAnalyseMarginale } from "@model/etatcivil/acte/IAnalyseMarginale";
import { ICorpsExtraitRectification } from "@model/etatcivil/acte/ICorpsExtraitRectification";
import { IDetailMariage } from "@model/etatcivil/acte/IDetailMariage";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { ITypeRegistre } from "@model/etatcivil/acte/TypeRegistre";
import { IAutresNoms } from "@model/etatcivil/commun/AutresNoms";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { ILieuEvenement } from "@model/etatcivil/commun/ILieuEvenement";
import { IPersonne } from "@model/etatcivil/commun/Personne";
import { AutresNoms } from "@model/etatcivil/enum/ETypeAutreNom";
import { ExistenceContratMariage } from "@model/etatcivil/enum/ExistenceContratMariage";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca, IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";
import DateUtils, { IDateCompose } from "@util/DateUtils";
import { mappingMentions } from "../acte/mentions/MentionsApiHook";

export type TFiche = FicheRcRca | FichePacs | IFicheActe;

export const mapRcRca = (data: IFicheRcaDto | IFicheRcDto): FicheRcRca | null => {
  switch (data.categorie) {
    case "RC":
      return FicheRcRca.RcDepuisDto(data);
    case "RCA":
      return FicheRcRca.RcaDepuisDto(data);
    default:
      return null;
  }
};

export function mapActe(data: any): IFicheActe {
  const dataActe: IFicheActe = { ...data };
  dataActe.nature = NatureActe.getEnumFor(data.nature);
  dataActe.registre = mapRegistre(data.registre);
  dataActe.dateDerniereDelivrance = data.dateDerniereDelivrance ? DateUtils.getDateFromTimestamp(data.dateDerniereDelivrance) : undefined;
  dataActe.dateDerniereMaj = data.dateDerniereMaj ? DateUtils.getDateFromTimestamp(data.dateDerniereMaj) : undefined;

  dataActe.personnes = mapPersonnes(data.personnes, data.numero);
  dataActe.mentions = mappingMentions(data.mentions);

  dataActe.visibiliteArchiviste = TypeVisibiliteArchiviste.getEnumFor(data.visibiliteArchiviste);

  dataActe.detailMariage = mapDetailMariage(data.detailMariage);

  dataActe.type = data.type;

  dataActe.corpsExtraitRectifications = mapCorpsRectifications(data.corpsExtraitRectifications);

  dataActe.analyseMarginales = mapAnalysesMarginales(data.analyseMarginales);
  dataActe.titulaires = mapTitulaires(data.titulaires);
  dataActe.origine = data.origine;
  return dataActe;
}

function mapAnalysesMarginales(ams: IAnalyseMarginale[]): IAnalyseMarginale[] | undefined {
  return ams?.map((am: any) => ({
    ...am,
    dateDebut: am.dateDebut ? DateUtils.getDateFromTimestamp(am.dateDebut) : undefined,
    dateFin: am.dateFin ? DateUtils.getDateFromTimestamp(am.dateFin) : undefined,
    titulaires: mapTitulaires(am.titulaires)
  }));
}

export function mapTitulaires(titulaires: any[]): ITitulaireActe[] {
  return titulaires
    .map(titulaire => ({
      ...titulaire,
      sexe: titulaire.sexe ? Sexe.getEnumFor(titulaire.sexe) : Sexe.INCONNU,
      typeDeclarationConjointe: titulaire.typeDeclarationConjointe
        ? TypeDeclarationConjointe.getEnumFor(titulaire.typeDeclarationConjointe)
        : TypeDeclarationConjointe.ABSENCE_DECLARATION,
      dateDeclarationConjointe: titulaire.dateDeclarationConjointe
        ? DateUtils.getDateFromTimestamp(titulaire.dateDeclarationConjointe)
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
    detailMariage.existenceContrat = ExistenceContratMariage.getEnumFor(dm.existenceContrat);
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
      actes: personne.actes
        ?.filter((acte: any) => acte.numero !== numero)
        .map((acte: any) => {
          return {
            ...acte,
            nature: NatureActe.getEnumFor(acte.nature)
          };
        }),
      pacss: personne.pacss?.filter((pacs: IFicheLien) => pacs.numero !== numero),
      rcas: personne.rcas?.filter((rca: IFicheLien) => rca.numero !== numero),
      rcs: personne.rcs?.filter((rc: IFicheLien) => rc.numero !== numero)
    };
  });
}

function mapAutresNoms(autresNoms: any[]): IAutresNoms[] {
  return autresNoms?.map(autreNom => {
    return {
      ...autreNom,
      type: AutresNoms.getEnumFor(autreNom.type)
    };
  });
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

function mapRegistre(data: any) {
  let registre = {} as IRegistre;
  if (data) {
    registre = data as IRegistre;
    registre.type = data.type as ITypeRegistre;
  }
  return registre;
}
