import { useEffect, useState } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import { IInteresse } from "../../../../model/etatcivil/fiche/IInteresse";
import { IFicheRcRca } from "../../../../model/etatcivil/fiche/IFicheRcRca";
import { AutresNoms } from "../../../../model/etatcivil/enum/AutresNoms";
import { IPersonne } from "../../../../model/etatcivil/commun/IPersonne";
import { IAutresNoms } from "../../../../model/etatcivil/commun/IAutresNoms";
import { IFicheLien } from "../../../../model/etatcivil/commun/IFicheLien";
import { ILieuEvenement } from "../../../../model/etatcivil/commun/ILieuEvenement";
import {
  getDateFromTimestamp,
  IDateCompose
} from "../../../common/util/DateUtils";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";
import { IFichePacs } from "../../../../model/etatcivil/pacs/IFichePacs";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { IPartenaire } from "../../../../model/etatcivil/pacs/IPartenaire";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { logError } from "../../../common/util/LogManager";
import { formatNom, formatPrenom } from "../../../common/util/Utils";
import { IRegistre } from "../../../../model/etatcivil/acte/IRegistre";
import { ITypeRegistre } from "../../../../model/etatcivil/acte/ITypeRegistre";
import { NatureRc } from "../../../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../../../model/etatcivil/enum/NatureRca";
import { TypeVisibiliteArchiviste } from "../../../../model/etatcivil/enum/TypeVisibiliteArchiviste";

export interface IDataFicheApi {
  data: any;
}

export function useFichePageApiHook(categorie: TypeFiche, identifiant: string) {
  const [dataFicheState, setDataFicheState] = useState<IDataFicheApi>(
    {} as IDataFicheApi
  );
  useEffect(() => {
    if (identifiant != null && categorie != null) {
      getInformationsFiche(categorie.toLowerCase(), identifiant)
        .then((result: any) => {
          const dataFiche = {} as IDataFicheApi;

          switch (categorie) {
            case TypeFiche.RC:
              dataFiche.data = mapRcRca(result.body.data);
              break;

            case TypeFiche.RCA:
              dataFiche.data = mapRcRca(result.body.data);
              break;

            case TypeFiche.PACS:
              dataFiche.data = mapPacs(result.body.data);
              break;

            case TypeFiche.ACTE:
              dataFiche.data = mapActe(result.body.data);
              break;

            default:
              break;
          }

          setDataFicheState(dataFiche);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations de la fiche",
            error
          });
        });
    }
  }, [categorie, identifiant]);

  return {
    dataFicheState
  };
}

function mapRcRca(data: any): IFicheRcRca {
  const dataRcRca: IFicheRcRca = data;
  if (dataRcRca.interesses !== undefined) {
    dataRcRca.interesses.forEach(interesse =>
      harmoniserNomPrenomsInteresse(interesse)
    );
  }
  dataRcRca.dateDerniereDelivrance = getDateFromTimestamp(
    data.dateDerniereDelivrance
  );
  dataRcRca.dateDerniereMaj = getDateFromTimestamp(data.dateDerniereMaj);
  dataRcRca.dateInscription = getDateFromTimestamp(data.dateInscription);

  dataRcRca.personnes = mapPersonnes(data.personnes, data.numero);

  dataRcRca.nature =
    data.categorie === "rc"
      ? NatureRc.getEnumFor(data.nature)
      : NatureRca.getEnumFor(data.nature);

  return dataRcRca;
}

export function mapPacs(data: any) {
  const dataPacs: IFichePacs = data;
  if (data.partenaires) {
    data.partenaires.forEach((p: any) => {
      (p as IPartenaire).nationalite = Nationalite.getEnumFor(p.nationalite);
    });
  }
  dataPacs.dateDerniereDelivrance = getDateFromTimestamp(
    data.dateDerniereDelivrance
  );
  dataPacs.dateDerniereMaj = getDateFromTimestamp(data.dateDerniereMaj);
  dataPacs.dateEnregistrementParAutorite = getDateFromTimestamp(
    data.dateEnregistrementParAutorite
  );
  dataPacs.dateInscription = getDateFromTimestamp(data.dateInscription);

  dataPacs.personnes = mapPersonnes(data.personnes, data.numero);

  return dataPacs;
}

export function mapActe(data: any): IFicheActe {
  const dataActe: IFicheActe = data;
  dataActe.nature = NatureActe.getEnumFor(data.nature);
  dataActe.registre = mapRegistre(data.registre);
  dataActe.dateDerniereDelivrance = getDateFromTimestamp(
    data.dateDerniereDelivrance
  );
  dataActe.dateDerniereMaj = getDateFromTimestamp(data.dateDerniereMaj);

  dataActe.personnes = mapPersonnes(data.personnes, data.numero);

  dataActe.visibiliteArchiviste = TypeVisibiliteArchiviste.getEnumFor(
    data.visibiliteArchiviste
  );

  return dataActe;
}

function mapPersonnes(personnes: any, numero: any): IPersonne[] {
  return personnes.map((personne: any) => {
    return {
      ...personne,
      autresNoms: mapAutresNoms(personne.autresNoms),
      lieuNaissance: mapLieuPersonne(personne.naissance),
      dateNaissance: mapDatePersonne(personne.naissance),
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

export function convertToBlob(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/pdf" });
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
      prenom.prenom = formatPrenom(prenom.prenom);
    });
  }

  return interesse;
}
