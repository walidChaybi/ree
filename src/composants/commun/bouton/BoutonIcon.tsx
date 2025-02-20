import { TStyleBouton } from "./Bouton";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
  styleBouton?: TStyleBouton;
};

const getStyleBouton = (styleBouton?: TStyleBouton) => {
  switch (styleBouton) {
    case "principal":
      return " bg-bleu-sombre text-blanc hover:bg-bleu disabled:bg-gris-sombre";
    case "suppression":
      return "hover:bg-rouge";
    default:
      return "";
  }
};

const BoutonIcon = ({
  children,
  className,
  danger = false,
  type,
  styleBouton = "principal",
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  const baseStyles = danger ? "bg-rouge hover:opacity-85 disabled:bg-gray-400" : getStyleBouton(styleBouton);

  return (
    <button
      className={`m-0 grid w-fit min-w-0 place-content-center rounded p-[.3rem] uppercase transition-colors duration-200 ease-in-out ${baseStyles} text-white disabled:cursor-not-allowed ${className || ""}`.trim()}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoutonIcon;
