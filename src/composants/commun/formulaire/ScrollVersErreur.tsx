/* v8 ignore start A TESTER 03/25 */
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

export const CHAMP_EN_ERREUR = "champ-en-erreur";

const ScrollVersErreur: React.FC = () => {
  const { submitCount, isValid } = useFormikContext();
  const [nombreSubmit, setNombreSubmit] = useState<number>(0);

  useEffect(() => {
    if (submitCount === nombreSubmit || isValid) {
      return;
    }

    document.querySelectorAll(`.${CHAMP_EN_ERREUR}`)[0]?.scrollIntoView({ behavior: "smooth" });
    setNombreSubmit(submitCount);
  }, [submitCount, isValid]);

  return <></>;
};

export default ScrollVersErreur;
/* v8 ignore end */
