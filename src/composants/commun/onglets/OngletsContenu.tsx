interface IOngletContenuProps {
  estActif: boolean;
}

const OngletsContenu: React.FC<React.PropsWithChildren<IOngletContenuProps>> = ({ estActif, children }) => (
  <div className={`gap-2 py-4 ${estActif ? "grid" : "hidden"}`}>{children}</div>
);

export default OngletsContenu;
