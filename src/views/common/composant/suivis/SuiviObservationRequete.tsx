import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ICreationObservationParams,
  useCreationObservationApi
} from "@hook/observation/CreationObservationApiHook";
import {
  ISuppressionObservationParams,
  useSuppressionObservationApi
} from "@hook/observation/SuppressionObservationApiHook";
import { List, ListItemText } from "@material-ui/core";
import { IObservation, Observation } from "@model/requete/IObservation";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { BoutonGaucheAccordionTitle } from "@widget/accordion/BoutonGaucheAccordionTitle";
import React, { useEffect, useState } from "react";
import {
  IAjouterObservationFormValue,
  OBSERVATION,
  PopinAjouterObservation
} from "./contenu/PopinAjouterObservation";
import "./scss/Suivis.scss";

interface SuiviObservationsRequeteProps {
  observations?: IObservation[];
  idRequete: string;
  disabled?: boolean;
}

export const SuiviObservationsRequete: React.FC<
  SuiviObservationsRequeteProps
> = props => {
  const [observations, setObservations] = useState<IObservation[]>(
    props.observations || []
  );
  const [observationASupprimer, setObservationASupprimer] =
    useState<ISuppressionObservationParams>();
  const [idObservationAModifier, setIdObservationAModifier] =
    useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [texteObservation, setTexteObservation] = useState<string>();
  const [creationObservation, setCreationObservation] =
    useState<ICreationObservationParams>();
  const [expanded, setIsExpanded] = useState(true);

  const resultatSuppression = useSuppressionObservationApi(
    observationASupprimer
  );

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
    if (props.observations && props.observations.length) {
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
    if (
      resultatCreation &&
      creationObservation &&
      creationObservation.texteObservation
    ) {
      if (idObservationAModifier) {
        const indexObservation = observations.findIndex(
          el => el.id === resultatCreation.id
        );
        if (indexObservation !== -1) {
          observations[indexObservation].texte =
            creationObservation.texteObservation;
          setObservations(observations);
          setIdObservationAModifier(undefined);
        }
      } else {
        setObservations([
          ...observations,
          {
            id: resultatCreation.id,
            trigramme: storeRece.getTrigrammeFromID(
              getValeurOuVide(storeRece.utilisateurCourant?.idUtilisateur)
            ),
            idUtilisateur: storeRece.utilisateurCourant?.idUtilisateur,
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
    if (
      resultatSuppression &&
      resultatSuppression.resultat &&
      observationASupprimer
    ) {
      observations.splice(
        observations.findIndex(
          el => observationASupprimer.idObservation === el.id
        ),
        1
      );
      setObservationASupprimer(undefined);
      setObservations(observations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSuppression]);

  const onClickSupprimer = (ob: IObservation) => {
    if (
      storeRece.utilisateurCourant?.idUtilisateur === ob.idUtilisateur &&
      !props.disabled
    ) {
      setObservationASupprimer({ idObservation: ob.id });
    } else {
      logError({
        messageUtilisateur:
          "Vous ne pouvez pas supprimer une observation que vous n'avez pas vous-même enregistrée"
      });
    }
  };

  const onClickModifier = (ob: IObservation) => {
    if (
      storeRece.utilisateurCourant?.idUtilisateur === ob.idUtilisateur &&
      !props.disabled
    ) {
      setIdObservationAModifier(ob.id);
      setTexteObservation(ob.texte);
      setIsOpen(true);
    } else {
      logError({
        messageUtilisateur:
          "Vous ne pouvez pas modifier une observation que vous n'avez pas vous-même enregistrée"
      });
    }
  };

  return (
    <div className="suivis-requete">
      <PopinAjouterObservation
        open={isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
        defaultValue={{ observation: getValeurOuVide(texteObservation) }}
      />
      <AccordionRece
        titre={"Observations requête"}
        disabled={false}
        expanded={expanded}
        bouton={
          <BoutonGaucheAccordionTitle
            iconeBouton={faPlusCircle}
            titreBouton={"Ajouter une observation"}
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
                className={
                  Observation.getTrigramme(el) === "RECE" ? "RECE" : ""
                }
              >
                <div
                  onClick={() => onClickModifier(el)}
                  className="Observation"
                >
                  {`${Observation.getTexte(el)} - ${Observation.getDate(el)} ${
                    Observation.getTrigramme(el) !== "RECE"
                      ? getTrigramme(el)
                      : ""
                  }`}
                </div>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="IconeSupprimer"
                  title={getLibelle("Supprimer l'observation")}
                  onClick={() => onClickSupprimer(el)}
                />
              </ListItemText>
            ))}
        </List>
      </AccordionRece>
    </div>
  );
};

function getTrigramme(observation: IObservation) {
  return `- ${Observation.getTrigramme(observation)}`;
}

function getNumeroOrdreMax(observations: IObservation[]) {
  let res = 0;
  if (observations.length > 0) {
    observations.sort((a, b) => b.numeroOrdre - a.numeroOrdre);
    res = observations[0].numeroOrdre;
  }
  return res;
}
