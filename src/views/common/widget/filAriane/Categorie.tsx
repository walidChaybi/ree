import React from "react";
import { useNavigate } from "react-router-dom";

interface CategorieProps {
  url: string;
  message: string;
  last: boolean;
}

export const Categorie: React.FC<CategorieProps> = ({ url, message, last }) => {
  const navigate = useNavigate();
  const onClickLink = () => {
    navigate(url);
  };

  return (
    <>
      {last ? (
        <div className="TextFilAriane" title={url}>
          {message}
        </div>
      ) : (
        <div className="LinkFilAriane" onClick={onClickLink} title={url}>
          {message}
        </div>
      )}
    </>
  );
};
