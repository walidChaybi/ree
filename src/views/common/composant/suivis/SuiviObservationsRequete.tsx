import { RECEContextData } from "@core/contexts/RECEContext";
import { ICreationObservationParams, useCreationObservationApi } from "@hook/observation/CreationObservationApiHook";
import { ISuppressionObservationParams, useSuppressionObservationApi } from "@hook/observation/SuppressionObservationApiHook";
import { IObservation, Observation } from "@model/requete/IObservation";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { BoutonAccordionTitle } from "@widget/accordion/BoutonAccordionTitle";
import React, { useContext, useEffect, useState } from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { IAjouterObservationFormValue, OBSERVATION, PopinAjouterObservation } from "./contenu/PopinAjouterObservation";
import "./scss/Suivis.scss";

interface SuiviObservationsRequeteProps {
  observations?: IObservation[];
  idRequete: string;
  disabled?: boolean;
}

export const SuiviObservationsRequete: React.FC<SuiviObservationsRequeteProps> = props => {
  const [observations, setObservations] = useState<IObservation[]>(props.observations || []);
  const [observationASupprimer, setObservationASupprimer] = useState<ISuppressionObservationParams>();
  const [idObservationAModifier, setIdObservationAModifier] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [texteObservation, setTexteObservation] = useState<string>();
  const [creationObservation, setCreationObservation] = useState<ICreationObservationParams>();
  const [isExpanded, setIsExpanded] = useState(true);

  const { utilisateurConnecte } = useContext(RECEContextData);

  const resultatSuppression = useSuppressionObservationApi(observationASupprimer);

  const resultatCreation = useCreationObservationApi(creationObservation);

  const onClickBouton = (): void => {
    if (!props.disabled) {
      setTexteObservation(undefined);
      setIsOpen(true);
    }
  };

  const onClosePopin = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (props.observations?.length) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [props.observations]);

  const onSubmit = (value: IAjouterObservationFormValue): void => {
    setCreationObservation({
      idRequete: props.idRequete,
      texteObservation: value[OBSERVATION],
      idObservation: idObservationAModifier
    });
  };

  useEffect(() => {
    if (resultatCreation && creationObservation?.texteObservation) {
      if (idObservationAModifier) {
        const indexObservation = observations.findIndex(el => el.id === resultatCreation.id);
        if (indexObservation !== -1) {
          observations[indexObservation].texte = creationObservation.texteObservation;
          setObservations(observations);
          setIdObservationAModifier(undefined);
        }
      } else {
        setObservations([
          ...observations,
          {
            id: resultatCreation.id,
            trigramme: utilisateurConnecte.prenomNom,
            idUtilisateur: utilisateurConnecte.id,
            texte: creationObservation?.texteObservation,
            numeroOrdre: getNumeroOrdreMax(observations) + 1,
            dateObservation: Date.now()
          } as IObservation
        ]);
        setIsExpanded(true);
      }
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatCreation]);

  useEffect(() => {
    if (resultatSuppression && resultatSuppression.resultat && observationASupprimer) {
      observations.splice(
        observations.findIndex(el => observationASupprimer.idObservation === el.id),
        1
      );
      setObservationASupprimer(undefined);
      setObservations(observations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSuppression]);

  const onClickSupprimer = (ob: IObservation) => {
    if (utilisateurConnecte.id === ob.idUtilisateur && !props.disabled) {
      setObservationASupprimer({ idObservation: ob.id });
    } else {
      AfficherMessage.erreur("Vous ne pouvez pas supprimer une observation que vous n'avez pas vous-même enregistrée", {
        fermetureAuto: true
      });
    }
  };

  const onClickModifier = (ob: IObservation) => {
    if (utilisateurConnecte.id === ob.idUtilisateur && !props.disabled) {
      setIdObservationAModifier(ob.id);
      setTexteObservation(ob.texte);
      setIsOpen(true);
    } else {
      AfficherMessage.erreur("Vous ne pouvez pas modifier une observation que vous n'avez pas vous-même enregistrée", {
        fermetureAuto: true
      });
    }
  };

  return (
    <div className="suivis-requete">
      <PopinAjouterObservation
        open={isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
        defaultValue={{ observation: texteObservation ?? "" }}
      />
      <AccordionRece
        titre={"Observations requête"}
        expanded={isExpanded}
        expandedPossible={observations?.length > 0}
        bouton={
          <BoutonAccordionTitle
            iconeBouton={
              <FaPlusCircle
                className="BoutonAccordionTitle BoutonAjouter"
                title="Ajouter une observation"
                aria-label="Ajouter une observation"
              />
            }
            onClickBouton={onClickBouton}
          />
        }
      >
        <List>
          {observations
            ?.sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? -1 : 1))
            .map(el => (
              <ListItemText
                title={el.texte}
                key={el.id}
                className={el.trigramme === "RECE Système" ? "RECE" : ""}
              >
                <div
                  onClick={() => onClickModifier(el)}
                  className="Observation"
                >
                  {`${Observation.getTexte(el)} - ${Observation.getDate(el)} ${el.trigramme !== "RECE Système" ? getTrigramme(el) : ""}`}
                </div>
                <FaTrashAlt
                  className="IconeSupprimer"
                  title="Supprimer l'observation"
                  aria-label="Supprimer l'observation"
                  onClick={() => onClickSupprimer(el)}
                />
              </ListItemText>
            ))}
        </List>
      </AccordionRece>
    </div>
  );
};

const getTrigramme = (observation: IObservation) => `- ${observation.trigramme}`;

const getNumeroOrdreMax = (observations: IObservation[]) => {
  let res = 0;
  if (observations.length > 0) {
    observations.sort((a, b) => b.numeroOrdre - a.numeroOrdre);
    res = observations[0].numeroOrdre;
  }
  return res;
};
