import { CONFIG_GET_INSCRIPTIONS_RC_DE_LA_PERSONNE } from "@api/configurations/etatCivil/personnes/GetInscriptionsRCDeLaPersonneConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { IGetAlertesActeApiHookParameters } from "@hook/alertes/GetAlertesActeApiHook";
import { GetTitulairesActeHookParameters, useGetTitulairesActeApiHook } from "@hook/repertoires/TitulairesActeHook";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IInscriptionRc, mappingInscriptionsRCDepuisFicheRcDto } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { aplatirTableau } from "@util/Utils";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import React, { useCallback, useEffect, useState } from "react";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../../utils/AfficherMessage";
import { TableauRMC } from "../../../../rechercheMultiCriteres/autoActesInscriptions/TableauRMC";
import { ChoixAction } from "./actions/ChoixAction";

interface ApercuRequetePriseEnChargePartieDroiteProps {
  detailRequete: IRequeteDelivrance;
}

export const ApercuRequetePriseEnChargePartieDroite: React.FC<ApercuRequetePriseEnChargePartieDroiteProps> = ({ detailRequete }) => {
  /* Etat actes sélectionnés */
  const [actesSelectionnes, setActesSelectionnes] = useState<ResultatRMCActe[]>([]);

  /* Etat alertes associées aux aajoutAlertePossible actes sélectionnés */
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  /* Etat inscriptions sélectionnées */
  const [inscriptionsSelectionnees, setInscriptionsSelectionnees] = useState<TResultatRMCInscription[]>([]);

  /* Etat inscriptions sélectionnées */
  const [addActe, setAddActe] = useState<IGetAlertesActeApiHookParameters>();
  const [idPersonne, setIdPersonne] = useState<string>("");

  /* Etat paramètres d'appel de l'API de récupération des titulaires d'un acte */
  const [titulairesActeHookParameters, setTitulairesActeHookParameters] = useState<GetTitulairesActeHookParameters>();

  /* Titulaires associés aux actes sélectionnés */
  const [titulairesActe, setTitulairesActe] = useState<Map<string, ITitulaireActe[]>>(new Map([]));

  /* Nombre de titulaires associés aux actes sélectionnés */
  const [nbrTitulairesActe, setNbrTitulairesActe] = useState<Map<string, number>>(new Map([]));

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des actes */
  const onClickCheckboxActe = useCallback((event: React.ChangeEvent<HTMLInputElement>, acteClique: ResultatRMCActe): void => {
    const estCoche = event.target.checked;

    setActesSelectionnes(prevActesSelectionnes =>
      estCoche
        ? [...prevActesSelectionnes, acteClique]
        : prevActesSelectionnes.filter(acteSelectionne => acteSelectionne.id !== acteClique.id)
    );

    setAddActe({ idActe: acteClique.id, isChecked: estCoche });

    setTitulairesActeHookParameters({
      idActe: acteClique.id,
      isChecked: estCoche
    });
  }, []);

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des inscriptions */
  const onClickCheckboxInscription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, inscription: TResultatRMCInscription): void => {
      setInscriptionsSelectionnees(prevInscriptionsSelectionnees => {
        const nouvellesInscriptionsSelectionnees = event?.target.checked
          ? [...prevInscriptionsSelectionnees, inscription]
          : prevInscriptionsSelectionnees.filter(inscriptionSelectionnee => inscriptionSelectionnee.id !== inscription.id);

        if (nouvellesInscriptionsSelectionnees.length && inscription.type === "MODIFICATION") {
          setIdPersonne(nouvellesInscriptionsSelectionnees[0].personne.id);
        }

        return nouvellesInscriptionsSelectionnees;
      });
    },
    []
  );

  /* Hook d'appel de l'API de récupération des titulaires associés à un acte */
  const resultatGetTitulairesActe = useGetTitulairesActeApiHook(titulairesActeHookParameters);

  const { appelApi: recuperationDesRCs } = useFetchApi(CONFIG_GET_INSCRIPTIONS_RC_DE_LA_PERSONNE);
  const [inscriptionsRC, setInscriptionsRC] = useState<IInscriptionRc[]>([]);
  useEffect(() => {
    if (!idPersonne) return;

    recuperationDesRCs({
      parametres: { path: { idPersonne } },
      apresSucces: fichesRC => {
        setInscriptionsRC(mappingInscriptionsRCDepuisFicheRcDto(fichesRC));
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les inscriptions liées à une personne", {
          erreurs
        });
      }
    });
  }, [idPersonne]);

  /* Actualisation de la liste des nombres de titulaires et des titulaires des actes sélectionnés */
  useEffect(() => {
    if (titulairesActeHookParameters) {
      const newNbrTitulairesActe = new Map(nbrTitulairesActe);
      const newTitulairesActe = new Map(titulairesActe);
      if (titulairesActeHookParameters.isChecked && resultatGetTitulairesActe) {
        newNbrTitulairesActe.set(titulairesActeHookParameters.idActe, resultatGetTitulairesActe.length);
        newTitulairesActe.set(titulairesActeHookParameters.idActe, resultatGetTitulairesActe);
      } else {
        newNbrTitulairesActe.delete(titulairesActeHookParameters.idActe);
        newTitulairesActe.delete(titulairesActeHookParameters.idActe);
      }
      setNbrTitulairesActe(newNbrTitulairesActe);
      setTitulairesActe(newTitulairesActe);
    }
  }, [titulairesActeHookParameters, resultatGetTitulairesActe]);

  /* Remise à zéro des résultats de la RMC */
  const resetActeInscription = useCallback(() => {
    setActesSelectionnes([]);
    setInscriptionsSelectionnees([]);
  }, []);

  return (
    <>
      <TableauRMC
        requete={detailRequete}
        dataAlertes={aplatirTableau(Array.from(alertes.values()))}
        onClickCheckboxTableauActes={onClickCheckboxActe}
        onClickCheckboxTableauInscriptions={onClickCheckboxInscription}
        reset={resetActeInscription}
      />
      <AlertesActes
        addActe={addActe}
        ajoutAlerte={setAlertes}
      />
      <ChoixAction
        requete={detailRequete}
        actes={actesSelectionnes}
        inscriptions={inscriptionsSelectionnees}
        inscriptionsRC={inscriptionsRC}
        titulairesActe={titulairesActe}
        nbrTitulairesActe={nbrTitulairesActe}
        alertesActe={Array.from(alertes.values()).flatMap(alerte => alerte)}
      />
      <BoutonRetour />
    </>
  );
};
