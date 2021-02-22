import { useEffect, useState } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/rcrca/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import { IInteresse } from "../../../../model/etatcivil/fiche/IInteresse";
import { IFicheRcRca } from "../../../../model/etatcivil/fiche/IFicheRcRca";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";
import { getPanelsRca } from "./constructionComposants/rcrca/FicheRcaUtils";
import { fournisseurDonneesBandeauFactory } from "../contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { AutresNoms } from "../../../../model/etatcivil/enum/AutresNoms";
import { IPersonne } from "../../../../model/etatcivil/commun/IPersonne";
import { IAutresNoms } from "../../../../model/etatcivil/commun/IAutresNoms";
import { IFicheLien } from "../../../../model/etatcivil/commun/IFicheLien";
import { ILieuEvenement } from "../../../../model/etatcivil/commun/ILieuEvenement";
import {
  getFormatDateFromTimestamp,
  IDateCompose
} from "../../../common/util/DateUtils";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";

import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";
import { getPanelsPacs } from "./constructionComposants/pacs/FichePacsUtils";
import { IFichePacs } from "../../../../model/etatcivil/pacs/IFichePacs";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { IPartenaire } from "../../../../model/etatcivil/pacs/IPartenaire";
import { getPanelsActe } from "./constructionComposants/acte/FicheActeUtils";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { logError } from "../../../common/util/LogManager";
import { formatNom, formatPrenom } from "../../../common/util/Utils";

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
  const dataRcRca = retourBack as IFicheRcRca;
  if (dataRcRca.interesses !== undefined) {
    dataRcRca.interesses.forEach(interesse =>
      harmoniserNomPrenomsInteresse(interesse)
    );
  }

  return {
    ...dataRcRca,
    personnes: mapPersonnes(dataRcRca.personnes, dataRcRca)
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
      sexe: Sexe.getEnumFor(personne.sexe),
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
      type: AutresNoms.getEnumFor(autreNom.type)
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
