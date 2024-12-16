import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useMemo, useRef } from "react";

type TChampDateProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
};

const ChampDate: React.FC<TChampDateProps> = ({ name, libelle }) => {
  const champsDate = useMemo(
    () => ({
      jour: `${name}.jour`,
      mois: `${name}.mois`,
      annee: `${name}.annee`
    }),
    [name]
  );
  const { setFieldValue } = useFormikContext();
  const [fieldJour, metaJour] = useField(champsDate.jour);
  const [fieldMois, metaMois] = useField(champsDate.mois);
  const [fieldAnnee, metaAnnee] = useField(champsDate.annee);
  const refMois = useRef<HTMLInputElement | null>(null);
  const refAnnee = useRef<HTMLInputElement | null>(null);
  const erreurs = useMemo(
    () => [
      ...(metaJour?.error ? [champsDate.jour] : []),
      ...(metaMois?.error ? [champsDate.mois] : []),
      ...(metaAnnee?.error ? [champsDate.annee] : [])
    ],
    [metaJour, metaMois, metaAnnee]
  );

  useEffect(() => {
    metaJour?.value?.length === 2 && refMois.current?.focus();
  }, [metaJour?.value]);

  useEffect(() => {
    metaMois?.value?.length === 2 && refAnnee.current?.focus();
  }, [metaMois?.value]);

  return (
    <div className="w-full flex-wrap justify-between">
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${erreurs.length ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={`${name}.jour`}
      >
        {libelle}
      </label>
      <div className="flex flex-nowrap gap-1">
        <input
          id={champsDate.jour}
          className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaJour?.error ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={2}
          value={fieldJour.value}
          placeholder="JJ"
          onChange={event => {
            const valeurJour = event.target.value.replace(/\D/, "");
            event.target.value = Number(valeurJour) > 31 ? "31" : valeurJour;
            fieldJour.onChange(event);
          }}
          onBlur={() => {
            const jour = String(fieldJour.value);
            if (["0", "00"].includes(jour)) {
              setFieldValue(champsDate.jour, "");

              return;
            }

            let valeurJour;
            switch (true) {
              case jour.length === 1:
                valeurJour = `0${jour}`;
                break;
              case Number(jour) > 31:
                valeurJour = "31";
                break;
              default:
                valeurJour = jour;
                break;
            }

            setFieldValue(champsDate.jour, valeurJour);
          }}
        />
        <span className="mx-1 text-xl">{"/"}</span>
        <input
          id={champsDate.mois}
          ref={refMois}
          className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaMois?.error ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={2}
          value={fieldMois.value}
          placeholder="MM"
          onChange={event => {
            const valeurMois = event.target.value.replace(/\D/, "");
            event.target.value = Number(valeurMois) > 12 ? "12" : valeurMois;
            fieldMois.onChange(event);
          }}
          onBlur={() => {
            const mois = String(fieldMois.value);
            if (["0", "00"].includes(mois)) {
              setFieldValue(champsDate.mois, "");

              return;
            }

            let valeurMois;
            switch (true) {
              case mois.length === 1:
                valeurMois = `0${mois}`;
                break;
              case Number(mois) > 12:
                valeurMois = "12";
                break;
              default:
                valeurMois = mois;
                break;
            }

            setFieldValue(champsDate.mois, valeurMois);
          }}
        />
        <span className="mx-1 text-xl">{"/"}</span>
        <input
          id={champsDate.annee}
          ref={refAnnee}
          className={`border-1 w-11 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaAnnee.error ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          placeholder="AAAA"
          value={fieldAnnee.value}
          onChange={event => {
            event.target.value = event.target.value.replace(/\D/, "");
            fieldAnnee.onChange(event);
          }}
        />
      </div>

      {Boolean(erreurs.length) && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={erreurs[0]} />
        </div>
      )}
    </div>
  );
};

export default ChampDate;
