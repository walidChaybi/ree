import { FaExclamationTriangle } from "react-icons/fa";

export const IconErrorMessage = ({ ...props }) => (
  <span>
    <FaExclamationTriangle
      className="Warning text-xs"
      aria-label="Erreur"
    >
      {props.children}
    </FaExclamationTriangle>
  </span>
);
