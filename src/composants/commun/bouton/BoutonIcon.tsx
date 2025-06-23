import { TStyleBouton } from "./Bouton";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
  styleBouton?: TStyleBouton;
  iconeSeule?: boolean;
};

const getStyleBouton = (styleBouton?: TStyleBouton, iconeSeule?: boolean) => {
  switch (styleBouton) {
    case "principal":
      return " bg-bleu-sombre text-blanc hover:bg-bleu focus-visible:bg-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 disabled:bg-gris-sombre";
    case "secondaire":
      return "border border-solid border-bleu-sombre bg-blanc hover:bg-bleu hover:text-blanc hover:border-bleu focus-visible:bg-bleu focus-visible:text-blanc focus-visible:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 text-bleu-sombre";
    case "suppression":
      return iconeSeule
        ? "text-rouge bg-blanc hover:bg-rouge hover:text-blanc focus-visible:text-blanc focus-visible:bg-rouge focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge focus-visible:ring-offset-2"
        : "hover:bg-rouge focus-visible:bg-rouge focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge focus-visible:ring-offset-2";

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
  iconeSeule,
  ...props
}: React.PropsWithChildren<BoutonProps>) => {
  const baseStyles = danger
    ? "bg-rouge hover:opacity-85 focus:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge focus-visible:ring-offset-2 disabled:bg-gray-400 transition-opacity"
    : getStyleBouton(styleBouton, iconeSeule);

  return (
    <button
      className={`m-0 grid w-fit min-w-0 place-content-center rounded p-[.3rem] uppercase transition-colors duration-200 ease-in-out ${baseStyles} disabled:cursor-not-allowed ${className ?? ""}`.trim()}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoutonIcon;
