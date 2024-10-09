import "./Bouton.scss";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Bouton = ({
  children,
  className,
  role,
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  return (
    <button
      className={`bouton-rece ${className ?? ""}`.trim()}
      role={role ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Bouton;
