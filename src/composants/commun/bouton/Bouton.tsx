export type TStyleBouton = "principal" | "secondaire" | "suppression";

const getStyleBouton = (styleBouton?: TStyleBouton) => {
  switch (styleBouton) {
    case "principal":
      return `border-bleu-sombre bg-bleu-sombre text-blanc hover:bg-bleu hover:border-bleu disabled:bg-bleu-sombre `;
    case "secondaire":
      return "border-bleu-sombre bg-blanc text-bleu-sombre hover:text-bleu hover:border-bleu hover:border-bleu";
    case "suppression":
      return "border-rouge bg-blanc text-rouge hover:border-rouge hover:bg-rouge hover:text-blanc";
    default:
      return;
  }
};
export interface IBoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleBouton?: TStyleBouton;
  garderStyleSiDisabled?: boolean;
}

const Bouton: React.FC<React.PropsWithChildren<IBoutonProps>> = ({
  styleBouton = "principal",
  garderStyleSiDisabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`m-0 min-w-0 rounded-md border border-solid px-4 py-2 uppercase transition-colors ${getStyleBouton(styleBouton)} ${!garderStyleSiDisabled && "disabled:border-gris-sombre disabled:bg-gris-sombre disabled:text-blanc"} ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Bouton;
