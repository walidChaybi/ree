import { useField } from "formik";
import { useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import BoutonIcon from "../bouton/BoutonIcon";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

export interface IChampsAnneeEtNumeroProps {
  name: string;
  libelle: string;
  tailleMaxNumero: number;
  caractereSeparateur: string;
  texteDevantChamps?: string;
  actionSuppression?: () => void;
  estObligatoire?: boolean;
  disabled?: boolean;
}

const seulementNumerique = (texte: string) => texte.replace(/\D/, "");

const ChampsAnneeEtNumero: React.FC<IChampsAnneeEtNumeroProps> = ({
  name,
  libelle,
  estObligatoire,
  disabled,
  tailleMaxNumero,
  caractereSeparateur,
  texteDevantChamps,
  actionSuppression
}) => {
  const champsAnneeEtNumero = useMemo(
    () => ({
      annee: `${name}.annee`,
      numero: `${name}.numero`
    }),
    [name]
  );

  const [fieldAnnee, metaAnnee] = useField(champsAnneeEtNumero.annee);
  const [fieldNumero, metaNumero] = useField(champsAnneeEtNumero.numero);
  const [refNumero, setRefNumero] = useState<HTMLInputElement | null>(null);
  const enErreur = useMemo(
    () => (Boolean(metaAnnee.error) && metaAnnee.touched) || (Boolean(metaNumero.error) && metaNumero.touched),
    [metaAnnee, metaNumero]
  );

  return (
    <div {...(enErreur ? { className: CHAMP_EN_ERREUR } : {})}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={champsAnneeEtNumero.annee}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">{"*"}</span>}
      </label>
      <div className="flex items-center gap-1">
        {texteDevantChamps ?? <span className="whitespace-nowrap">{texteDevantChamps}</span>}
        <input
          id={champsAnneeEtNumero.annee}
          className={`border-1 flex w-12 rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${Boolean(metaAnnee.error) && metaAnnee.touched ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={4}
          placeholder="AAAA"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valeur = seulementNumerique(event.target.value).replace(/^0{1,4}/, "");
            valeur.length === 4 && refNumero?.focus();
            event.target.value = valeur;
            fieldAnnee.onChange(event);
          }}
          disabled={disabled}
          {...(() => {
            const { onChange, ...autreProps } = fieldAnnee;

            return autreProps;
          })()}
        />
        <span>{caractereSeparateur}</span>
        <div className="relative flex flex-grow rounded-md shadow-sm">
          <input
            ref={setRefNumero}
            id={champsAnneeEtNumero.numero}
            className={`border-1 flex w-full rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${Boolean(metaNumero.error) && metaNumero.touched ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
            maxLength={tailleMaxNumero}
            placeholder={"X".repeat(tailleMaxNumero)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.target.value = seulementNumerique(event.target.value);
              fieldNumero.onChange(event);
            }}
            disabled={disabled}
            {...(() => {
              const { onChange, ...autreProps } = fieldNumero;

              return autreProps;
            })()}
          />
          {actionSuppression && (
            <BoutonIcon
              className="group absolute right-0 h-full rounded-l-none bg-transparent"
              type="button"
              title="Supprimer ce numéro"
              aria-label="Supprimer ce numéro"
              onClick={actionSuppression}
              styleBouton="suppression"
            >
              <MdDelete
                className="text-rouge group-hover:text-blanc group-focus-visible:text-blanc"
                aria-hidden
              />
            </BoutonIcon>
          )}
        </div>
      </div>
      {enErreur && <div className="text-start text-sm text-rouge">{metaAnnee.error ?? metaNumero.error}</div>}
    </div>
  );
};

export default ChampsAnneeEtNumero;
