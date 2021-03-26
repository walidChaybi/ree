import React from "react";
import { useHistory } from "react-router-dom";

interface CategorieProps {
  url: string;
  message: string;
  last: boolean;
}

export const Categorie: React.FC<CategorieProps> = ({ url, message, last }) => {
  const history = useHistory();
  const onClickLink = () => {
    history.push(url);
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
