import "./BoutonIcon.scss";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
};

const BoutonIcon = ({ children, className, danger = false, type, ...props }: React.PropsWithChildren<BoutonProps>) => {
  return (
    <button
      className={`bouton-icon-rece ${className ?? ""} ${danger ? "bouton-danger" : ""}`.trim()}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoutonIcon;
