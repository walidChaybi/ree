import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import BoutonIcon from "../bouton/BoutonIcon";

interface IGestionnairePagesProps {
  nombreDePages: number;
  pageCourante: number;
  setPageCourante: React.Dispatch<React.SetStateAction<number>>;
}

const GestionnairePages: React.FC<IGestionnairePagesProps> = ({ nombreDePages, pageCourante, setPageCourante }) => {
  const allerAPagePrecedente = () => {
    setPageCourante(page => Math.max(0, page - 1));
  };

  const allerAPageSuivante = () => {
    setPageCourante(p => Math.min(nombreDePages - 1, p + 1));
  };

  return (
    <div className="absolute right-1.5 top-1 flex items-center">
      <BoutonIcon
        type="button"
        title="Page précédente"
        className="border-2 border-solid border-bleu-sombre"
        onClick={allerAPagePrecedente}
      >
        <FaLongArrowAltLeft size={18} />
      </BoutonIcon>
      <p className="mx-1 my-0 p-0 text-lg">
        {pageCourante + 1} / {nombreDePages}
      </p>
      <BoutonIcon
        type="button"
        title="Page suivante"
        className="border-2 border-solid border-bleu-sombre"
        onClick={allerAPageSuivante}
      >
        <FaLongArrowAltRight size={18} />
      </BoutonIcon>
    </div>
  );
};

export default GestionnairePages;
