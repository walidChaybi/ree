import {
  IAnalyseMarginaleResultat,
  useTitulaireAnalyseMarginaleApiHook
} from "@hook/acte/TitulaireAnalyseMarginaleApiHook";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import DateUtils from "@util/DateUtils";
import { getValeurOuUndefined, joint } from "@util/Utils";
import { useEffect, useMemo, useState } from "react";

export interface ITableauSuiviDossierParams {
  requete: IRequeteCreationEtablissement;
}

export interface ILigneTableauSuiviDossier {
  id: string;
  idActe?: string;
  idSuiviDossier: string;
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

export function useTableauSuiviDossierHook(titulaires?: ITitulaireRequeteCreation[]): ITableauSuiviDossierResultat {
  const [resultat, setResultat] = useState<ILigneTableauSuiviDossier[]>([]);

  const titulairesAAfficher = useMemo(() => getTitulairesAAfficher(titulaires), [titulaires]);

  const idActes = useMemo(() => titulairesAAfficher.reduce(getIdentifiantsActeFromTitulaires, []), [titulairesAAfficher]);

  const titulaireAnalyseMarginaleResultat = useTitulaireAnalyseMarginaleApiHook(idActes);
  
  useEffect(() => {
    if (titulairesAAfficher && titulaireAnalyseMarginaleResultat) {
      const lignesTableauSuiviDossier = titulairesAAfficher.reduce(
        (lignesTableau: ILigneTableauSuiviDossier[], titulaireCourant: ITitulaireRequeteCreation) => {

          // POSTULANT => acte de naissance pour celibataire / sans enfant = pas de verification sur le titulaire de l'analyse marginale
          // TODO => créer tri pour recup la bonne analyse marginale lorsqu'il y aura plusieurs titulaires aux analyses marginales
          const dataAnalyseMarginale = titulaireAnalyseMarginaleResultat[0];

          const ligneTitulaire: ILigneTableauSuiviDossier = {
            id: titulaireCourant.id,
            idActe: idActes[0],
            idSuiviDossier: "",
            prenoms: getPrenomTitulaire(titulaireCourant, dataAnalyseMarginale),
            nom: getNomTitulaire(titulaireCourant, dataAnalyseMarginale),
            qualite: QualiteFamille.afficheLibelleEnfantSiEstEnfant(QualiteFamille.getEnumFromTitulaire(titulaireCourant)) ?? "",
            decret: "",
            evenement: "",
            dateEvenement: "",
            avancement: ""
          };

          const lignesDossiers: ILigneTableauSuiviDossier[] =
            titulaireCourant.suiviDossiers?.map(suiviDossier => {
              return {
                id: titulaireCourant.id,
                idSuiviDossier: suiviDossier.idSuiviDossier,
                prenoms: "",
                nom: "",
                qualite: "",
                decret: "",
                evenement: suiviDossier.natureProjet?.libelle ?? "",
                dateEvenement: DateUtils.getDateStringFromDateCompose({
                  jour: suiviDossier.jourEvenement,
                  mois: suiviDossier.moisEvenement,
                  annee: suiviDossier.anneeEvenement
                }),
                avancement: suiviDossier.avancement.libelle ?? ""
              };
            }) || [];

          const lignesSupplementaires = [ligneTitulaire, ...lignesDossiers];

          if (QualiteFamille.estPostulant(QualiteFamille.getEnumFromLibelle(ligneTitulaire.qualite))) {
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
        titulaire.suiviDossiers && titulaire.suiviDossiers?.length > 0
    ) || []
  );
};

const getIdentifiantsActeFromTitulaires = (
  identifiantsActes: string[],
  titulaireCourant: ITitulaireRequeteCreation
): string[] => {
  const idActe = titulaireCourant.suiviDossiers?.find(suiviDossier =>
    NatureProjetEtablissement.estNaissance(suiviDossier.natureProjet)
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
