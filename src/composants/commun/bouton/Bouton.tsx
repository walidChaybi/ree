import "./Bouton.scss";

type BoutonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type TStyleBouton =
  | "principal"
  | "secondaire"
  | "suppression"
  | "desactive";

const getStyleBouton = (styleBouton?: TStyleBouton) => {
  switch (styleBouton) {
    case "principal":
      return `border-bleu-sombre bg-bleu-sombre text-blanc hover:bg-bleu hover:border-bleu`;
    case "secondaire":
      return "border-bleu-sombre bg-blanc text-bleu-sombre hover:text-blanc hover:bg-bleu hover:border-bleu";
    case "suppression":
      return "border-rouge bg-blanc text-rouge hover:border-rouge hover:bg-rouge hover:text-blanc";
    default:
      return;
  }
};

interface CustomBoutonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleBouton?: TStyleBouton;
}

const Bouton = ({
  styleBouton,
  children,
  className,
  ...props
}: React.PropsWithChildren<CustomBoutonProps>) => {
  return (
    <button
      className={`bouton-rece ${getStyleBouton(styleBouton)} ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Bouton;


