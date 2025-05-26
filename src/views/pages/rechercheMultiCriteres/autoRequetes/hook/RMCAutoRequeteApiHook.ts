import { rechercheMultiCriteresAutoRequetes } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TRequete } from "@model/requete/IRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { mappingRequetesTableau } from "@util/RequetesUtils";
import { SNP } from "@util/Utils";
import { useContext, useEffect, useState } from "react";

export interface IEnveloppeCriteresRMCAutoRequete {
  criteres: ICritereRMCAutoRequete[];
}

export interface ICritereRMCAutoRequete {
  nomTitulaire?: string;
  prenomTitulaire?: string;
  jourNaissance?: string;
  moisNaissance?: string;
  anneeNaissance?: string;
}

export const useRMCAutoRequeteApiHook = (requete: TRequete, range: string) => {
  const [dataRMCAutoRequete, setDataRMCAutoRequete] = useState<TRequeteTableau[]>();

  const [dataTableauRMCAutoRequete, setDataTableauRMCAutoRequete] = useState<IParamsTableau>();

  const { utilisateurs, services } = useContext(RECEContextData);

  useEffect(() => {
    if (!requete) return;
    const criteresRMCAuto = determinerCriteresRMCAutoRequete(requete);

    if (!criteresAvecDonneesTitulaireSuffisantes(criteresRMCAuto.criteres)) {
      setDataRMCAutoRequete([]);
      setDataTableauRMCAutoRequete(PARAMS_TABLEAU_VIDE);
      return;
    }

    rechercheMultiCriteresAutoRequetes(criteresRMCAuto, range)
      .then(result => {
        setDataRMCAutoRequete(mappingRequetesTableau(result?.body?.data?.resultatsRecherche, true, utilisateurs, services));
        setDataTableauRMCAutoRequete(getParamsTableau(result));
      })
      .catch(error => {
        logError({
          messageUtilisateur: "Impossible de récupérer les requêtes de la recherche multi-critères automatique",
          error
        });
      });
  }, [requete, range]);

  return {
    dataRMCAutoRequete,
    dataTableauRMCAutoRequete
  };
};

export const determinerCriteresRMCAutoRequete = (requete: TRequete): IEnveloppeCriteresRMCAutoRequete => ({
  criteres: criteresRMCAutoRequeteDepuisTitulaireRequete(requete.titulaires)
});

const criteresRMCAutoRequeteDepuisTitulaireRequete = (titulaires?: ITitulaireRequete[]): ICritereRMCAutoRequete[] =>
  titulaires?.map((titulaire: ITitulaireRequete) => ({
    nomTitulaire: titulaire.nomNaissance,
    prenomTitulaire: TitulaireRequete.getPrenom1(titulaire),
    jourNaissance: titulaire.jourNaissance?.toString(),
    moisNaissance: titulaire.moisNaissance?.toString(),
    anneeNaissance: titulaire.anneeNaissance?.toString()
  })) ?? [];

export const criteresAvecDonneesTitulaireSuffisantes = (criteresRMCAuto: ICritereRMCAutoRequete[]): boolean =>
  Boolean(
    criteresRMCAuto?.[0].nomTitulaire !== SNP ||
      (criteresRMCAuto?.[0].prenomTitulaire &&
        criteresRMCAuto?.[0].anneeNaissance &&
        criteresRMCAuto?.[0].moisNaissance &&
        criteresRMCAuto?.[0].jourNaissance)
  );
