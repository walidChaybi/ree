import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/Erreur.scss";

interface WarningMessageProps {
  afficherMessage: boolean;
}

export const WarningMessage: React.FC<WarningMessageProps> = props => {
  return (
    <>
      {props.afficherMessage && (
        <div className="WarningBlock">
          <FontAwesomeIcon icon={faExclamationTriangle} size="xs" />{" "}
          {props.children}
        </div>
      )}
    </>
  );
};
