import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/Erreur.scss";

interface IAvertissementMessageProps {
  afficherMessage: boolean;
}

export const MessageAvertissement: React.FC<
  React.PropsWithChildren<IAvertissementMessageProps>
> = props => {
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
