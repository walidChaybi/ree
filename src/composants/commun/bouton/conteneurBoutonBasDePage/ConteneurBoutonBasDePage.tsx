type TPosition = "droite" | "gauche";

export const ConteneurBoutonBasDePage: React.FC<
  React.PropsWithChildren<{
    position: TPosition;
    afficherDegrade?: boolean;
    className?: string;
  }>
> = ({ position = "droite", afficherDegrade, className, children }) => {
  const getDegrade = `${position === "droite" ? "bg-gradient-to-l pl-20" : "bg-gradient-to-r pr-20"} from-bleu-transparent`;

  return (
    <div
      className={`${afficherDegrade && getDegrade} fixed bottom-0 ${position === "droite" ? "right-0 pr-16" : "left-0 pl-16"} flex gap-4 py-4 ${className}`}
    >
      {children}
    </div>
  );
};
