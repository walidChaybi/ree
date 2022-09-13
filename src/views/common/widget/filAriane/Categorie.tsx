import { checkDirty } from "@util/Utils";
import React from "react";
import { useHistory } from "react-router-dom";

interface CategorieProps {
  url: string;
  message: string;
  last: boolean;
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
}

export const Categorie: React.FC<CategorieProps> = ({
  url,
  message,
  last,
  isDirty,
  setIsDirty
}) => {
  const history = useHistory();
  const onClickLink = () => {
    if (checkDirty(isDirty, setIsDirty)) {
      history.push(url);
    }
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
