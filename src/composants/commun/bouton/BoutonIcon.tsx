import "./BoutonIcon.scss";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
};

const BoutonIcon = ({ children, className, danger = false, ...props }: React.PropsWithChildren<BoutonProps>) => {
  return (
    <button
      className={`bouton-icon-rece ${className ?? ""} ${danger ? "bouton-danger" : ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoutonIcon;
