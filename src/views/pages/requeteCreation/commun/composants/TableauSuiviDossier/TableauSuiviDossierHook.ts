import {
  IAnalyseMarginaleResultat,
  useTitulaireAnalyseMarginaleApiHook
} from "@hook/acte/TitulaireAnalyseMarginaleApiHook";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { getValeurOuUndefined, joint } from "@util/Utils";
import { useEffect, useMemo, useState } from "react";

export interface ITableauSuiviDossierParams {
  requete: IRequeteCreationEtablissement;
}

export interface ILigneTableauSuiviDossier {
  id: string;
  idActe: string;
  qualite: string;
  nom: string;
  prenoms: string;
  decret: string;
  evenement: string;
  dateEvenement: string;
  avancement: string;
}

interface ITableauSuiviDossierResultat {
  dataTableau: ILigneTableauSuiviDossier[];
}

export function useTableauSuiviDossierHook(
  titulaires?: ITitulaireRequeteCreation[]
): ITableauSuiviDossierResultat {
  const [resultat, setResultat] = useState<ILigneTableauSuiviDossier[]>([]);

  const titulairesAAfficher = useMemo(
    () => getTitulairesAAfficher(titulaires),
    [titulaires]
  );

  const idActes = useMemo(
    () => titulairesAAfficher.reduce(getIdentifiantsActeFromTitulaires, []),
    [titulairesAAfficher]
  );

  const titulaireAnalyseMarginaleResultat =
    useTitulaireAnalyseMarginaleApiHook(idActes);

  useEffect(() => {
    if (titulairesAAfficher && titulaireAnalyseMarginaleResultat) {
      const lignesTableauSuiviDossier = titulairesAAfficher.reduce(
        (
          lignesTableau: ILigneTableauSuiviDossier[],
          titulaireCourant: ITitulaireRequeteCreation
        ) => {
          const dataAnalyseMarginale = titulaireAnalyseMarginaleResultat.find(
            analyseMarginale =>
              titulaireCourant.lienEtatCivil?.some(
                lienEtatCivil =>
                  lienEtatCivil.idActe === analyseMarginale.idActe
              )
          );

          const ligneTitulaire: ILigneTableauSuiviDossier = {
            id: titulaireCourant.id,
            idActe: "",
            prenoms: getPrenomTitulaire(titulaireCourant, dataAnalyseMarginale),
            nom: getNomTitulaire(titulaireCourant, dataAnalyseMarginale),
            qualite:
              QualiteFamille.getEnumFromTitulaire(titulaireCourant)?.libelle ||
              "",
            decret: "",
            evenement: "",
            dateEvenement: "",
            avancement: ""
          };

          const lignesDossiers: ILigneTableauSuiviDossier[] =
            titulaireCourant.lienEtatCivil?.map(lienEtatCivil => {
              return {
                id: "",
                idActe: lienEtatCivil.id,
                prenoms: "",
                nom: "",
                qualite: "",
                decret: "",
                evenement: NatureProjetEtablissement.getEnumFor(
                  lienEtatCivil.natureProjet
                ).libelle,
                dateEvenement: getFormatDateFromTimestamp(
                  lienEtatCivil.dateEtablissement
                ),
                avancement: AvancementProjetActe.getEnumFor(
                  lienEtatCivil.avancement
                ).libelle
              };
            }) || [];

          const lignesSupplementaires = [ligneTitulaire, ...lignesDossiers];

          if (
            QualiteFamille.estPostulant(
              QualiteFamille.getEnumFromLibelle(ligneTitulaire.qualite)
            )
          ) {
            lignesTableau.unshift(...lignesSupplementaires);
          } else {
            lignesTableau.push(...lignesSupplementaires);
          }

          return lignesTableau;
        },
        []
      );

      setResultat(lignesTableauSuiviDossier);
    }
  }, [titulaireAnalyseMarginaleResultat, titulairesAAfficher]);

  return {
    dataTableau: resultat
  };
}

const getTitulairesAAfficher = (
  titulaires?: ITitulaireRequeteCreation[]
): ITitulaireRequeteCreation[] => {
  return (
    titulaires?.filter(
      titulaire =>
        titulaire.lienEtatCivil && titulaire.lienEtatCivil?.length > 0
    ) || []
  );
};

const getIdentifiantsActeFromTitulaires = (
  identifiantsActes: string[],
  titulaireCourant: ITitulaireRequeteCreation
): string[] => {
  const idActe = titulaireCourant.lienEtatCivil?.find(lienEtatCivil =>
    Boolean(lienEtatCivil.idActe)
  )?.idActe;
  if (idActe) {
    identifiantsActes.push(idActe);
  }
  return identifiantsActes;
};

const getPrenomTitulaire = (
  titulaire: ITitulaireRequeteCreation,
  analyseMarginale?: IAnalyseMarginaleResultat
): string => {
  const prenoms =
    analyseMarginale?.prenoms ||
    titulaire.retenueSdanf?.prenomsRetenu?.map(
      prenomOrdonne => prenomOrdonne.prenom
    );
  return prenoms ? joint(prenoms) : "";
};

const getNomTitulaire = (
  titulaire: ITitulaireRequeteCreation,
  analyseMarginale?: IAnalyseMarginaleResultat
): string => {
  return (
    getValeurOuUndefined(analyseMarginale?.nom) ||
    getValeurOuUndefined(titulaire.retenueSdanf?.nomNaissance)
  );
};
