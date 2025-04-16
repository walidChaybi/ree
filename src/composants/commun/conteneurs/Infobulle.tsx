import React, { ReactNode, useRef, useState } from "react";

interface IInfobulleProps {
  contenu: ReactNode;
  children: ReactNode;
  delai?: number;
}

const Infobulle: React.FC<IInfobulleProps> = ({ contenu, children, delai = 300 }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          setVisible(true);
        }, delai);
      }}
      onMouseLeave={() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setVisible(false);
      }}
    >
      {children}
      {visible && contenu && (
        <div className="absolute left-1/2 mt-2 w-max -translate-x-1/2">
          <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-gray-600" />
          <div className="text-md relative max-w-md rounded bg-gray-600 px-3 py-2 text-white shadow-xl">{contenu}</div>
        </div>
      )}
    </div>
  );
};

export default Infobulle;
