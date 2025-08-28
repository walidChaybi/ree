import React, { useEffect, useRef } from "react";

const DELAI = 200;

interface IDefilementAutomatiqueProps {
  faireDefiler: boolean;
}

const DefilementAutomatique: React.FC<IDefilementAutomatiqueProps> = ({ faireDefiler }) => {
  const refBalise = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (faireDefiler && refBalise?.current) {
      const timer = setTimeout(() => {
        refBalise.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, DELAI);

      return () => clearTimeout(timer);
    }
  }, [faireDefiler]);

  return (
    <div
      ref={refBalise}
      aria-hidden
    />
  );
};

export default DefilementAutomatique;
