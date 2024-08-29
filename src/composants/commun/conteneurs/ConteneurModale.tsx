import "./ConteneurModale.scss";

interface IConteneurModaleProps {
  fermerModale: () => void;
}

const ConteneurModale: React.FC<
  React.PropsWithChildren<IConteneurModaleProps>
> = ({ fermerModale, children }) => (
  <div className="conteneur-modale" onClick={() => fermerModale()}>
    <div className="contenu-modale" onClick={event => event.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default ConteneurModale;
