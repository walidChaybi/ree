import { deleteObservation, postObservation } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IObservation } from "@model/requete/IObservation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import DateUtils from "@util/DateUtils";
import { UN, ZERO } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useContext, useState } from "react";
import * as Yup from "yup";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";
import "./ObservationsRequete.scss";
import ObservationsRequeteForm, { IObservationsRequeteForm } from "./ObservationsRequeteForm";

interface IObservationsRequeteProps {
  requete: IRequeteDelivrance;
}

const ObservationsRequete: React.FC<IObservationsRequeteProps> = ({ requete }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [observations, setObservations] = useState<IObservation[]>(
    () => requete.observations?.sort((observationA, observationB) => observationA.numeroOrdre - observationB.numeroOrdre) ?? []
  );
  const [observationModifiee, setObservationModifiee] = useState<IObservation | null>(null);
  const [modaleObservationOuverte, setModaleObservationOuverte] = useState<boolean>(false);
  const [idObservationSupprimee, setIdObservationSupprimee] = useState<string | null>(null);
  const [modaleSuppressionOuverte, setModaleSuppressionOuverte] = useState<boolean>(false);

  const ouvrirModaleObservation = (observation?: IObservation) => {
    setObservationModifiee(observation ?? null);
    setModaleObservationOuverte(true);
  };

  const fermerModaleObservation = () => {
    setObservationModifiee(null);
    setModaleObservationOuverte(false);
  };

  const ouvrirModaleSuppression = (idObservation: string) => {
    setIdObservationSupprimee(idObservation);
    setModaleSuppressionOuverte(true);
  };

  const fermerModaleSuppression = () => {
    setIdObservationSupprimee(null);
    setModaleSuppressionOuverte(false);
  };

  // Remplacer par UseFetch
  const [operationEnCours, setOperationEnCours] = useState(false);
  const enregistrerObservation = (values: any) => {
    if (operationEnCours) {
      return;
    }

    setOperationEnCours(true);
    const texteObservation = values.texteObservation;

    postObservation(requete.id, texteObservation, observationModifiee?.id)
      .then(reponse => {
        const idObservation: string = reponse.body.data;
        const observationsMaj = [...observations];
        const indexObservation = observationsMaj.findIndex(observation => observation.id === idObservation);
        if (indexObservation >= ZERO) {
          observationsMaj[indexObservation].texte = texteObservation;
        } else {
          observationsMaj.push({
            id: idObservation,
            texte: texteObservation,
            dateObservation: Date.now(),
            idUtilisateur: utilisateurConnecte.id,
            trigramme: utilisateurConnecte.prenomNom
          } as IObservation);
        }

        setObservations([...observationsMaj]);
      })
      .finally(() => {
        setOperationEnCours(false);
        fermerModaleObservation();
      });
  };

  const supprimerObservation = () => {
    if (operationEnCours || !idObservationSupprimee) {
      return;
    }

    setOperationEnCours(true);
    deleteObservation(idObservationSupprimee)
      .then(reponse => {
        if (!reponse.body.data) {
          return;
        }

        const observationsMaj = [...observations];
        const indexObservationSupprimee = observationsMaj.findIndex(observation => observation.id === idObservationSupprimee);

        if (indexObservationSupprimee >= ZERO) {
          observationsMaj.splice(indexObservationSupprimee, UN);
          setObservations([...observationsMaj]);
        }
      })
      .finally(() => {
        setOperationEnCours(false);
        fermerModaleSuppression();
      });
  };
  // FIN Remplacer par UseFetch

  return (
    <>
      {operationEnCours && <PageChargeur />}
      <div className="conteneur-observations-requete-delivrance">
        <div className="conteneur-lignes-observation">
          {observations.length ? (
            observations.map(observation => (
              <div
                key={observation.id}
                className="ligne-observation"
              >
                <span
                  className="texte-observation"
                  title={observation.texte}
                >
                  {observation.texte}
                </span>
                <span className="whitespace-nowrap">&nbsp;{`- ${DateUtils.getFormatDateFromTimestamp(observation.dateObservation)}`}</span>
                <span className="whitespace-nowrap">&nbsp;{observation.trigramme ? `- ${observation.trigramme}` : ""}</span>
                {observation.idUtilisateur === utilisateurConnecte.id && (
                  <div className="boutons-observation">
                    <button
                      className="bouton-modifier"
                      type="button"
                      title="Modifier l'observation"
                      onClick={() => ouvrirModaleObservation(observation)}
                    >
                      <Edit fontSize="small" />
                    </button>
                    <button
                      className="bouton-supprimer"
                      type="button"
                      title="Supprimer l'observation"
                      onClick={() => ouvrirModaleSuppression(observation.id)}
                    >
                      <DeleteOutline fontSize="small" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="aucune-observation">{"Aucune observation"}</div>
          )}
        </div>
        <div>
          <button
            className="bouton-ajouter"
            type="button"
            title="Ajouter une observation"
            onClick={() => ouvrirModaleObservation()}
          >
            <AddCircleOutline fontSize="large" />
          </button>
        </div>
      </div>

      {modaleObservationOuverte && (
        <ConteneurModale fermerModale={fermerModaleObservation}>
          <div className="conteneur-modale-observation">
            <Formulaire
              formDefaultValues={
                {
                  texteObservation: observationModifiee?.texte ?? ""
                } as IObservationsRequeteForm
              }
              formValidationSchema={Yup.object({
                texteObservation: Yup.string()
                  .required("L'observation ne peut pas être vide")
                  .max(499, "L'observation ne peut pas dépasser 500 caractères")
              })}
              onSubmit={enregistrerObservation}
            >
              <ObservationsRequeteForm fermerModale={fermerModaleObservation} />
            </Formulaire>
          </div>
        </ConteneurModale>
      )}

      {modaleSuppressionOuverte && (
        <ConteneurModale fermerModale={fermerModaleSuppression}>
          <div className="conteneur-modale-observation">
            <div className="label-suppression-observation">{"Voulez-vous vraiment supprimer cette observation?"}</div>

            <div className="boutons-modale-observation">
              <button
                type="button"
                onClick={fermerModaleSuppression}
              >
                {"Annuler"}
              </button>
              <button
                type="button"
                onClick={supprimerObservation}
                disabled={operationEnCours}
              >
                {"Valider"}
              </button>
            </div>
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default ObservationsRequete;
