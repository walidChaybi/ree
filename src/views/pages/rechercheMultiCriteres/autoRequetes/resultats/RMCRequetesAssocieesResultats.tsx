import { CONFIG_POST_RMC_AUTO_REQUETE } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { IRequete } from "@model/requete/IRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import RequeteRMCAuto, { TRequeteRMCAuto } from "@model/rmc/requete/RequeteRMCAuto";
import { IHeadersAvecParamsTableau, IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { SNP } from "@util/Utils";
import messageManager from "@util/messageManager";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { useRMCRequeteApiHook } from "../../requete/hook/RMCRequeteApiHook";
import "../scss/RMCRequetesAssocieesResultats.scss";
import { RMCTableauRequetesAssociees } from "./RMCTableauRequetesAssociees";

interface RMCRequetesAssocieesResultatsProps {
  requete: IRequete;
}

export const RMCRequetesAssocieesResultats: React.FC<RMCRequetesAssocieesResultatsProps> = ({ requete }) => {
  /* Etats RMC */
  const [requetesTableau, setRequetesTableau] = useState<TRequeteTableau[] | TRequeteRMCAuto[]>();
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>();

  /* Etats RMC manuelle*/
  const [nouvelleRMCRequete, setNouvelleRMCRequete] = useState<boolean>(false);
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});

  const [criteresRechercheRequete, setCriteresRechercheRequete] = useState<ICriteresRMCRequete>();

  /* Hook d'appel de l'API RMC manuelle requêtes */
  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(criteresRechercheRequete);

  /* Actualisation des résultats de la RMC manuelle */
  useEffect(() => {
    if (dataRMCRequete && dataTableauRMCRequete) {
      setRequetesTableau(dataRMCRequete);
      setParamsTableau(dataTableauRMCRequete);
    }
  }, [dataRMCRequete, dataTableauRMCRequete]);

  /* Appel de l'API RMC Auto requêtes */
  const { appelApi: rmcAutoRequetes } = useFetchApi(CONFIG_POST_RMC_AUTO_REQUETE);

  useEffect(() => {
    if (!requete) return;
    const criteresRMCAuto = determinerCriteresRMCAutoRequeteDepuisTitulaire(requete.titulaires);

    if (!criteresAvecDonneesTitulaireSuffisantes(criteresRMCAuto.criteres)) {
      setRequetesTableau([]);
      setParamsTableau(PARAMS_TABLEAU_VIDE);
      return;
    }

    rmcAutoRequetes({
      parametres: { body: criteresRMCAuto, query: { range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}` } },
      apresSucces: ({ resultatsRecherche }, headers) => {
        setRequetesTableau(
          resultatsRecherche.map(RequeteRMCAuto.depuisDto).filter((requete): requete is TRequeteRMCAuto => requete !== null)
        );
        setParamsTableau(getParamsTableauDepuisHeaders(headers as unknown as IHeadersAvecParamsTableau));
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de la RMC requête auto : ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors de la RMC de requêtes automatique");
      }
    });
  }, [requete]);

  /* Gestion de la pagination pour la RMC */
  const setRangeRequete = (rangeRequete: string) => {
    if (valuesRMCRequete && rangeRequete !== "") {
      setCriteresRechercheRequete({
        valeurs: valuesRMCRequete,
        range: rangeRequete
      });
    }
  };

  return (
    (requetesTableau && paramsTableau && (
      <Fieldset titre={"Autres requêtes associées au titulaire"}>
        <div className="RMCRequetesAssocieesResultats">
          <RMCTableauRequetesAssociees
            dataRMCRequete={requetesTableau}
            dataTableauRMCRequete={paramsTableau}
            setRangeRequete={setRangeRequete}
            setNouvelleRMCRequete={setNouvelleRMCRequete}
            setValuesRMCRequete={setValuesRMCRequete}
            setCriteresRechercheRequete={setCriteresRechercheRequete}
            resetTableauRequete={nouvelleRMCRequete}
          />
        </div>
      </Fieldset>
    )) || <></>
  );
};

export interface IEnveloppeCriteresRMCAutoRequete {
  criteres: ICritereRMCAutoRequete[];
}

interface ICritereRMCAutoRequete {
  nomTitulaire?: string;
  prenomTitulaire?: string;
  jourNaissance?: string;
  moisNaissance?: string;
  anneeNaissance?: string;
}

export const determinerCriteresRMCAutoRequeteDepuisTitulaire = (titulaires?: ITitulaireRequete[]): IEnveloppeCriteresRMCAutoRequete => ({
  criteres:
    titulaires?.map((titulaire: ITitulaireRequete) => ({
      nomTitulaire: titulaire.nomNaissance,
      prenomTitulaire: TitulaireRequete.getPrenom1(titulaire),
      jourNaissance: titulaire.jourNaissance?.toString(),
      moisNaissance: titulaire.moisNaissance?.toString(),
      anneeNaissance: titulaire.anneeNaissance?.toString()
    })) ?? []
});

export const criteresAvecDonneesTitulaireSuffisantes = (criteresRMCAuto: ICritereRMCAutoRequete[]): boolean =>
  Boolean(
    criteresRMCAuto?.[0].nomTitulaire !== SNP ||
      (criteresRMCAuto?.[0].prenomTitulaire &&
        criteresRMCAuto?.[0].anneeNaissance &&
        criteresRMCAuto?.[0].moisNaissance &&
        criteresRMCAuto?.[0].jourNaissance)
  );
