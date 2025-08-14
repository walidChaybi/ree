import NavigateNext from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { URL_ACCUEIL } from "../../../router/infoPages/InfoPagesBase";
import GestionnaireFilAriane, { EVENT_MISE_A_JOUR_FIL_ARIANE, IElementsFilAriane } from "../../../utils/GestionnaireFilAriane";

const TITRE_ACCUEIL = "Accueil";

const FilAriane: React.FC = () => {
  const [elementsFilAriane, setElementsFilAriane] = useState<IElementsFilAriane>(() =>
    structuredClone(GestionnaireFilAriane.elementsFilAriane)
  );

  useEffect(() => {
    const miseAJourElement = () => setElementsFilAriane(structuredClone(GestionnaireFilAriane.elementsFilAriane));
    document.addEventListener(EVENT_MISE_A_JOUR_FIL_ARIANE, miseAJourElement);

    return () => {
      document.removeEventListener(EVENT_MISE_A_JOUR_FIL_ARIANE, miseAJourElement);
    };
  }, []);

  if (!elementsFilAriane.niveau1 && !elementsFilAriane.niveau2) return <></>;

  return (
    <div className="mt-2 flex h-8 animate-apparition flex-nowrap items-center gap-3 font-semibold text-bleu-sombre">
      <Link
        className="underline-offset-3 text-bleu-sombre underline decoration-transparent decoration-2 transition-colors hover:decoration-bleu-sombre"
        to={URL_ACCUEIL}
        title={TITRE_ACCUEIL}
        replace
      >
        {TITRE_ACCUEIL}
      </Link>

      <NavigateNext fontSize="small" />

      {elementsFilAriane.niveau1 && !elementsFilAriane.niveau2 && <span>{elementsFilAriane.niveau1.titre}</span>}

      {elementsFilAriane.niveau1 && elementsFilAriane.niveau2 && (
        <Link
          className="underline-offset-3 text-bleu-sombre underline decoration-transparent decoration-2 transition-colors hover:decoration-bleu-sombre"
          to={elementsFilAriane.niveau1.url}
          title={elementsFilAriane.niveau1.titre}
          replace
        >
          {elementsFilAriane.niveau1.titre}
        </Link>
      )}

      {elementsFilAriane.niveau1 && elementsFilAriane.niveau2 && <NavigateNext fontSize="small" />}

      {elementsFilAriane.niveau2 && <span>{elementsFilAriane.niveau2.titre}</span>}
    </div>
  );
};

export default FilAriane;
