import { Link } from "react-router-dom";

export type TStyleBouton = "principal" | "secondaire" | "suppression" | "old";

const getStyleBouton = (styleBouton?: TStyleBouton) => {
  switch (styleBouton) {
    case "principal":
      return "border-bleu-sombre bg-bleu-sombre text-blanc hover:bg-bleu hover:border-bleu focus:bg-bleu focus:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 disabled:bg-bleu-sombre";
    case "secondaire":
      return "border-bleu-sombre bg-blanc text-bleu-sombre hover:text-bleu hover:border-bleu focus:text-bleu focus:border-bleu focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2";
    case "suppression":
      return "border-rouge bg-blanc text-rouge hover:border-rouge hover:bg-rouge hover:text-blanc focus:border-rouge focus:bg-rouge focus:text-blanc focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge focus-visible:ring-offset-2";
    default:
      return "";
  }
};

export interface IBoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleBouton?: TStyleBouton;
  garderStyleSiDisabled?: boolean;
  lienVers?: string;
}

const Bouton: React.FC<React.PropsWithChildren<IBoutonProps>> = ({
  styleBouton = "principal",
  garderStyleSiDisabled = false,
  children,
  className,
  type,
  lienVers,
  ...props
}) =>
  lienVers ? (
    <Link
      to={lienVers}
      className={`rounded-md border border-solid px-4 py-2 font-noto-sans-ui-bold no-underline transition-colors ${getStyleBouton(styleBouton)} ${!garderStyleSiDisabled && "disabled:border-gris-sombre disabled:bg-gris-sombre disabled:text-blanc"} ${className ?? ""}`.trim()}
      title={props.title}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`m-0 min-w-0 rounded-md border border-solid px-4 py-2 uppercase transition-colors ${getStyleBouton(styleBouton)} ${!garderStyleSiDisabled && "disabled:border-gris-sombre disabled:bg-gris-sombre disabled:text-blanc"} ${className ?? ""}`.trim()}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );

export default Bouton;
