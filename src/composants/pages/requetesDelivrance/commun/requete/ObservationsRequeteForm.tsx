import { CINQ } from "@util/Utils";
import { useFormikContext } from "formik";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";

export interface IObservationsRequeteForm {
  texteObservation?: string;
}

interface IObservationsRequeteFormProps {
  fermerModale: () => void;
}

const ObservationsRequeteForm: React.FC<IObservationsRequeteFormProps> = ({ fermerModale }) => {
  const { values, initialValues } = useFormikContext<IObservationsRequeteForm>();

  return (
    <>
      <label>
        <span className="label-text-observation">{"Saisissez l'observation"}</span>
        <ChampZoneTexte
          id="champsObservation"
          placeholder="Description"
          name="texteObservation"
          rows={CINQ}
        />
      </label>

      <div className="boutons-modale-observation">
        <button
          type="button"
          onClick={fermerModale}
        >
          {"Annuler"}
        </button>
        <button
          type="submit"
          disabled={!values.texteObservation || initialValues.texteObservation === values.texteObservation}
        >
          {"Valider"}
        </button>
      </div>
    </>
  );
};

export default ObservationsRequeteForm;
