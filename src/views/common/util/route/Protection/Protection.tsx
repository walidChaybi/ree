interface ProtectionProps {
  peutAfficher: boolean;
  message: string;
}

export const Protection: React.FC<React.PropsWithChildren<ProtectionProps>> = ({
  children,
  peutAfficher,
  message
}) => {
  return peutAfficher ? <>{children} </> : <p>{message}</p>;
};
