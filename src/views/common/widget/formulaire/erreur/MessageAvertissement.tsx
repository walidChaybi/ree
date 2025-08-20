import { FaExclamationTriangle } from "react-icons/fa";
import "./scss/Erreur.scss";

interface IAvertissementMessageProps {
  afficherMessage: boolean;
}

export const MessageAvertissement: React.FC<React.PropsWithChildren<IAvertissementMessageProps>> = props => {
  return (
    <>
      {props.afficherMessage && (
        <div className="WarningBlock">
          <FaExclamationTriangle
            className="text-xs"
            aria-label="Avertissement"
          />{" "}
          {props.children}
        </div>
      )}
    </>
  );
};
