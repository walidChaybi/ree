const ConteneurDocument: React.FC<React.PropsWithChildren> = ({ children }) => {
  // TODO gestion du drag/zoom/print du document
  return (
    <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-gris-clair">
      <div
        className="absolute w-[calc(100%-80px)] pb-24 transition-all duration-100"
        style={{ top: "40px", left: "40px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default ConteneurDocument;
