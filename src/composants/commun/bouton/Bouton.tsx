import Button, { ButtonProps } from "@mui/material/Button";

type BoutonProps = ButtonProps;

const Bouton = ({
  children,
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  return <Button {...props}>{children}</Button>;
};

export default Bouton;
