/* v8 ignore start A TESTER 03/25 */
import { ISaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { Option } from "@util/Type";
import { useFormikContext } from "formik";
import { useCallback } from "react";
import Bouton from "../../../commun/bouton/Bouton";
import ChampRecherche from "../../../commun/champs/ChampRecherche";
import ConteneurModale from "../../../commun/conteneurs/modale/ConteneurModale";

interface ITransmissionServiceProps {
  optionsServices: Option[];
}

const CHAMP = {
  avecService: "service.avecService",
  idService: "service.idService"
};

const TransmissionService: React.FC<ITransmissionServiceProps> = ({ optionsServices }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<ISaisieRequeteRCTCForm>();

  const fermerModale = useCallback(() => {
    setFieldValue(CHAMP.avecService, false);
    setFieldValue(CHAMP.idService, "");
    setFieldTouched(CHAMP.idService, false);
  }, []);

  return (
    <>
      <Bouton
        type="button"
        onClick={() => setFieldValue(CHAMP.avecService, true)}
      >
        {"Transmettre au service compétent"}
      </Bouton>

      {values.service.avecService && (
        <ConteneurModale fermerModale={fermerModale}>
          <div className="w-[95vw] max-w-96 rounded-xl border-2 border-solid border-bleu-sombre bg-white px-5 py-3 text-start">
            <div className="pb-5 text-center text-xl font-semibold text-bleu-sombre">{"Choisissez un service"}</div>
            <ChampRecherche
              name={CHAMP.idService}
              options={optionsServices}
              seulementCle
            />
            <div className="flex items-center justify-center gap-4 pt-8">
              <Bouton
                type="submit"
                title="Transmettre à ce service"
              >
                {"Valider"}
              </Bouton>
              <Bouton
                type="button"
                title="Annuler"
                styleBouton="secondaire"
                onClick={fermerModale}
              >
                {"Annuler"}
              </Bouton>
            </div>
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default TransmissionService;
/* v8 ignore end */
