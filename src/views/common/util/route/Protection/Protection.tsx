import React from "react";

interface ProtectionProps {
  peutAfficher: boolean;
  message: string;
}

export const Protection: React.FC<ProtectionProps> = ({
  children,
  peutAfficher,
  message
}) => {
  return peutAfficher ? <>{children} </> : <p>{message}</p>;
};
