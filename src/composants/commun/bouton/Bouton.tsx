import "./Bouton.scss";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Bouton = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  return (
    <button className={`bouton-rece ${className ?? ""}`.trim()} {...props}>
      {children}
    </button>
  );
};

export default Bouton;
