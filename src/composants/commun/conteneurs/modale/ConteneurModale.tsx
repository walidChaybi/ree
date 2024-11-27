interface IConteneurModaleProps {
  fermerModale?: () => void;
}

const ConteneurModale: React.FC<React.PropsWithChildren<IConteneurModaleProps>> = ({ fermerModale, children }) => (
  <div
    className="fixed left-0 top-0 z-[1000] flex h-screen w-screen animate-apparition items-center justify-center bg-black bg-opacity-40 duration-100"
    {...(fermerModale ? { onClick: fermerModale } : {})}
  >
    <div
      className="m-4 flex"
      onClick={event => event.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default ConteneurModale;
