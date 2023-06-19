import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconErrorMessage = ({ ...props }) => (
  <span>
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      size="xs"
      className="Warning"
    />
    {props.children}
  </span>
);
