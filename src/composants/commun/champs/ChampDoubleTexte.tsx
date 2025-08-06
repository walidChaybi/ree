import { useField } from "formik";
import { useMemo } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

interface IDoubleTexteProps {
  proprietesPremierChamp: React.InputHTMLAttributes<HTMLInputElement>;
  proprietesSecondChamp: React.InputHTMLAttributes<HTMLInputElement>;
  libelle: string;
  estObligatoire?: boolean;
}

const ChampDoubleTexte: React.FC<IDoubleTexteProps> = ({ proprietesPremierChamp, proprietesSecondChamp, libelle, estObligatoire }) => {
  const [fieldPremierChamp, metaPremierChamp] = useField(proprietesPremierChamp.name as string);
  const [fieldSecondChamp, metaSecondChamp] = useField(proprietesSecondChamp.name as string);
  const enErreur = useMemo(
    () => (Boolean(metaPremierChamp.error) && metaPremierChamp.touched) || (Boolean(metaSecondChamp.error) && metaSecondChamp.touched),
    [metaPremierChamp, metaSecondChamp]
  );

  return (
    <div {...(enErreur ? { className: CHAMP_EN_ERREUR } : {})}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={proprietesPremierChamp.name}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">{"*"}</span>}
      </label>
      <div className="grid grid-cols-2 gap-3 rounded-md shadow-sm">
        {[
          { proprietes: proprietesPremierChamp, field: fieldPremierChamp },
          { proprietes: proprietesSecondChamp, field: fieldSecondChamp }
        ].map(champ => {
          return (
            <input
              id={champ.proprietes.name}
              key={champ.proprietes.name}
              aria-label={champ.proprietes.name}
              className={`border-1 flex w-auto flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
              {...champ.field}
              {...champ.proprietes}
            />
          );
        })}
      </div>
      {enErreur && <div className="text-start text-sm text-rouge">{metaPremierChamp.error ?? metaSecondChamp.error}</div>}
    </div>
  );
};

export default ChampDoubleTexte;
