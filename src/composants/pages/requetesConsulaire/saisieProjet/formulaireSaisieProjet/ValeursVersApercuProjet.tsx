import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { EEventState, useEventDispatch } from "../../../../../hooks/EventHook";

const ValeursVersApercuProjet: React.FC = () => {
  const { values } = useFormikContext<IProjetActeTranscritForm>();
  const { envoyer } = useEventDispatch<IProjetActeTranscritForm>(EEventState.APERCU_PROJET_ACTE);

  useEffect(() => {
    envoyer(values);
  }, [values]);

  return <></>;
};

export default ValeursVersApercuProjet;
