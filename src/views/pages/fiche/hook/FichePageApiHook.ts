import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import {
  IBandeauFiche,
  IFicheRcRca
} from "../../../../model/etatcivil/FicheInterfaces";
import { getPanelsRca } from "./constructionComposants/FicheRcaUtils";
import { fournisseurDonneesBandeauFactory } from "../contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { EnumTypeAutresNoms } from "../../../common/util/enum/EnumAutresNoms";
import {
  IAutresNoms,
  ILieuEvenement,
  IFicheLien,
  IPersonne
} from "../contenu/personne/Personne";
import {
  IDateCompose,
  getFormatDateFromTimestamp
} from "../../../common/util/DateUtils";
import { EnumTypeSexe } from "../../../common/util/enum/EnumSexe";

import { TypeFiche } from "../../../../model/etatcivil/TypeFiche";
import { getPanelsPacs } from "./constructionComposants/pacs/FichePacsUtils";
import { IFichePacs } from "../../../../model/etatcivil/pacs/IFichePacs";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { IPartenaire } from "../../../../model/etatcivil/pacs/IPartenaire";
import { getPanelsActe } from "./constructionComposants/acte/FicheActeUtils";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../common/util/enum/NatureActe";
import { logError } from "../../../common/util/LogManager";

export interface IFicheApi {
  dataBandeau: IBandeauFiche;
  fiche: AccordionReceProps;
}

export function useFichePageApiHook(categorie: TypeFiche, identifiant: string) {
  const [dataFicheState, setDataFicheState] = useState<IFicheApi>(
    {} as IFicheApi
  );

  useEffect(() => {
    if (identifiant != null && categorie != null) {
      getInformationsFiche(categorie.toLowerCase(), identifiant)
        .then((result: any) => {
          const dataFiche = {} as IFicheApi;

          dataFiche.dataBandeau = setDataBandeau(
            categorie,
            fournisseurDonneesBandeauFactory.createFournisseur(
              categorie,
              result.body.data
            )
          );
          switch (categorie) {
            case TypeFiche.RC:
              dataFiche.fiche = getPanelsRc(mapRcRca(result.body.data));
              break;

            case TypeFiche.RCA:
              dataFiche.fiche = getPanelsRca(mapRcRca(result.body.data));
              break;

            case TypeFiche.PACS:
              dataFiche.fiche = getPanelsPacs(mapPacs(result.body.data));
              break;

            case TypeFiche.ACTE:
              const dataActe = mapActe(result.body.data);
              dataFiche.fiche = getPanelsActe(dataActe);
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

function mapRcRca(retourBack: any): IFicheRcRca {
  return {
    ...retourBack,
    personnes: mapPersonnes(retourBack.personnes, retourBack)
  };
}

function mapPersonnes(personnes: any, retourBack: any): IPersonne[] {
  return personnes.map((personne: any) => {
    return {
      ...personne,
      autresNoms: mapAutresNoms(personne.autresNoms),
      lieuNaissance: mapLieuPersonne(personne.naissance),
      dateNaissance: mapDatePersonne(personne.naissance),
      lieuDeces: personne.deces && mapLieuPersonne(personne.deces),
      dateDeces: personne.deces && mapDatePersonne(personne.deces),
      sexe: EnumTypeSexe.getEnumFor(personne.sexe),
      actes: personne.actes
        .filter((acte: any) => acte.numero !== retourBack.numero)
        .map((acte: any) => {
          return {
            ...acte,
            nature: NatureActe.getEnumFor(acte.nature)
          };
        }),
      pacss: personne.pacss.filter(
        (pacs: IFicheLien) => pacs.numero !== retourBack.numero
      ),
      rcas: personne.rcas.filter(
        (rca: IFicheLien) => rca.numero !== retourBack.numero
      ),
      rcs: personne.rcs.filter(
        (rc: IFicheLien) => rc.numero !== retourBack.numero
      )
    };
  });
}

function mapAutresNoms(autresNoms: any[]): IAutresNoms[] {
  return autresNoms.map(autreNom => {
    return {
      ...autreNom,
      type: EnumTypeAutresNoms.getEnumFor(autreNom.type)
    };
  });
}

function mapLieuPersonne(lieu: any): ILieuEvenement {
  return {
    arrondissement: lieu.arrondissement,
    pays: lieu.pays,
    region: lieu.region,
    ville: lieu.ville
  };
}

function mapDatePersonne(date: any): IDateCompose {
  return {
    jour: date.jour,
    mois: date.mois,
    annee: date.annee
  };
}

export function mapPacs(data: any) {
  const pacs: IFichePacs = data;
  if (data.partenaires) {
    data.partenaires.forEach((p: any) => {
      (p as IPartenaire).nationalite = Nationalite.getEnumFor(p.nationalite);
    });
  }
  pacs.dateDerniereDelivrance = getFormatDateFromTimestamp(
    data.dateDerniereDelivrance
  );
  pacs.dateDerniereMaj = getFormatDateFromTimestamp(data.dateDerniereMaj);
  pacs.dateEnregistrementParAutorite = getFormatDateFromTimestamp(
    data.dateEnregistrementParAutorite
  );
  pacs.dateInscription = getFormatDateFromTimestamp(data.dateInscription);

  pacs.personnes = mapPersonnes(data.personnes, data);
  return pacs;
}

export function mapActe(data: any): IFicheActe {
  const dataActe = data as IFicheActe;
  dataActe.nature = NatureActe.getEnumFor(data.nature);
  dataActe.personnes = mapPersonnes(data.personnes, data);

  return dataActe;
}
