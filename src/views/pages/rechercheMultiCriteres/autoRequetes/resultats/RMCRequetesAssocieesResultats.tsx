import { CONFIG_POST_RMC_AUTO_REQUETE } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { CONFIG_POST_RMC_REQUETE } from "@api/configurations/requete/rmc/PostRMCRequeteConfigApi";
import { IRequete } from "@model/requete/IRequete";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { mappingCriteresRMCRequeteVersDto } from "@model/rmc/requete/ICriteresRMCRequeteDto";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { SNP } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useState } from "react";
import PageChargeur from "../../../../../composants/commun/chargeurs/PageChargeur";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import "../scss/RMCRequetesAssocieesResultats.scss";
import { RMCTableauRequetesAssociees } from "./RMCTableauRequetesAssociees";

interface RMCRequetesAssocieesResultatsProps {
  requete: IRequete;
}

export const RMCRequetesAssocieesResultats: React.FC<RMCRequetesAssocieesResultatsProps> = ({ requete }) => {
  /* Etats RMC */
  const [requetesTableau, setRequetesTableau] = useState<TRequeteAssociee[]>();
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>();

  /* Etats RMC manuelle*/
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>(null);

  const [criteresRechercheRequete, setCriteresRechercheRequete] = useState<ICriteresRMCRequete>();

  /* Hook d'appel de l'API RMC manuelle requêtes */
  const { appelApi: rmcManuelleRequetes, enAttenteDeReponseApi: opEnCours } = useFetchApi(CONFIG_POST_RMC_REQUETE);

  useEffect(() => {
    if (!criteresRechercheRequete?.valeurs) return;

    rmcManuelleRequetes({
      parametres: {
        query: { range: criteresRechercheRequete.range },
        body: mappingCriteresRMCRequeteVersDto(criteresRechercheRequete.valeurs)
      },
      apresSucces: (requetes, headers) => {
        setRequetesTableau(
          requetes?.map(requete => RequeteAssociee.depuisDto(requete)).filter((requete): requete is TRequeteAssociee => requete !== null)
        );
        setParamsTableau(getParamsTableauDepuisHeaders(headers));
      },
      apresErreur: erreurs => {
        console.error("Erreur lors de la RMC requête auto :", erreurs);
        AfficherMessage.erreur("Impossible de récupérer les requetes de la recherche multi-critères", { erreurs });
        criteresRechercheRequete?.onErreur?.();
      }
    });
  }, [criteresRechercheRequete]);

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
      apresSucces: (requetes, headers) => {
        setRequetesTableau(requetes.map(RequeteAssociee.depuisDto).filter((requete): requete is TRequeteAssociee => requete !== null));
        setParamsTableau(getParamsTableauDepuisHeaders(headers));
      },
      apresErreur: erreurs => {
        console.error("Erreur lors de la RMC requête auto :", erreurs);
        AfficherMessage.erreur("Une erreur est survenue lors de la RMC automatique de requêtes", { erreurs });
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
    <>
      {requetesTableau &&
        paramsTableau &&
        (opEnCours ? (
          <PageChargeur />
        ) : (
          <Fieldset titre={"Autres requêtes associées au titulaire"}>
            <div className="RMCRequetesAssocieesResultats">
              <RMCTableauRequetesAssociees
                dataRMCRequete={requetesTableau}
                dataTableauRMCRequete={paramsTableau}
                setRangeRequete={setRangeRequete}
                setValuesRMCRequete={setValuesRMCRequete}
                setCriteresRechercheRequete={setCriteresRechercheRequete}
              />
            </div>
          </Fieldset>
        ))}
    </>
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
    criteresRMCAuto?.[0] &&
      (criteresRMCAuto[0].nomTitulaire !== SNP ||
        (criteresRMCAuto[0].prenomTitulaire &&
          criteresRMCAuto[0].anneeNaissance &&
          criteresRMCAuto[0].moisNaissance &&
          criteresRMCAuto[0].jourNaissance))
  );
