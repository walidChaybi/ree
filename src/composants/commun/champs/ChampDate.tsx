import { useField } from "formik";
import { useEffect, useMemo, useRef } from "react";

type TChampDateProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  avecHeure?: boolean;
  className?: string;
  estObligatoire?: boolean | string;
  desactiverCorrectionAutomatique?: boolean;
};

const idElementActif = () => document.activeElement?.getAttribute("id");
const ChampDate: React.FC<TChampDateProps> = ({
  name,
  libelle,
  avecHeure = false,
  className = "",
  estObligatoire,
  desactiverCorrectionAutomatique = false,
  ...props
}) => {
  const champsDate = useMemo(
    () => ({
      jour: `${name}.jour`,
      mois: `${name}.mois`,
      annee: `${name}.annee`,
      heure: `${name}.heure`,
      minutes: `${name}.minutes`
    }),
    [name]
  );
  const [fieldJour, metaJour, helpersJour] = useField(champsDate.jour);
  const [fieldMois, metaMois, helpersMois] = useField(champsDate.mois);
  const [fieldAnnee, metaAnnee, helpersAnnee] = useField(champsDate.annee);
  const [fieldHeure, metaHeure, helpersHeure] = useField(champsDate.heure);
  const [fieldMinutes, metaMinutes, helpersMinutes] = useField(champsDate.minutes);
  const refMois = useRef<HTMLInputElement | null>(null);
  const refAnnee = useRef<HTMLInputElement | null>(null);
  const refHeure = useRef<HTMLInputElement | null>(null);
  const refMinutes = useRef<HTMLInputElement | null>(null);

  const erreurs = useMemo(() => {
    const dateEnCompletion = [champsDate.jour, champsDate.mois].includes(idElementActif() ?? "") || !metaAnnee.touched;

    return dateEnCompletion
      ? []
      : [metaJour.error ?? "", metaMois.error ?? "", metaAnnee.error ?? "", metaHeure.error ?? "", metaMinutes.error ?? ""].filter(erreur =>
          Boolean(erreur.length)
        );
  }, [metaJour.error, metaMois.error, metaAnnee]);

  useEffect(() => {
    metaJour?.value?.length === 2 && idElementActif() === champsDate.jour && refMois.current?.focus();
  }, [metaJour?.value]);

  useEffect(() => {
    metaMois?.value?.length === 2 && idElementActif() === champsDate.mois && refAnnee.current?.focus();
  }, [metaMois?.value]);

  useEffect(() => {
    metaAnnee?.value?.length === 4 && idElementActif() === champsDate.annee && refHeure.current?.focus();
  }, [metaAnnee?.value]);

  useEffect(() => {
    metaHeure?.value?.length === 2 && idElementActif() === champsDate.heure && refMinutes.current?.focus();
  }, [metaHeure?.value]);

  return (
    <div className={`${className} w-full flex-wrap justify-between`}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${erreurs.length ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={`${name}.jour`}
      >
        {libelle}
        {estObligatoire && (
          <span className="ml-1 text-rouge">
            {typeof estObligatoire === "string" && <span className="text-xs">{`(${estObligatoire})`}</span>}
            {"*"}
          </span>
        )}
      </label>
      <div className="flex flex-nowrap gap-1">
        <input
          {...props}
          id={champsDate.jour}
          className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaJour?.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={2}
          value={fieldJour.value}
          placeholder="JJ"
          onChange={event => {
            event.target.value = event.target.value.replace(/\D/, "");
            fieldJour.onChange(event);
          }}
          onBlur={() => {
            const jour = String(fieldJour.value ?? "");

            let valeurJour = "";
            switch (true) {
              case ["0", "00"].includes(jour):
                break;
              case jour.length === 1:
                valeurJour = `0${jour}`;
                break;
              case !desactiverCorrectionAutomatique && Number(jour) > 31:
                valeurJour = "31";
                break;
              default:
                valeurJour = jour;
                break;
            }

            helpersJour.setValue(valeurJour);
          }}
        />
        <span className="mx-1 text-xl">{"/"}</span>
        <input
          {...props}
          id={champsDate.mois}
          ref={refMois}
          className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaMois?.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={2}
          value={fieldMois.value}
          placeholder="MM"
          onChange={event => {
            event.target.value = event.target.value.replace(/\D/, "");
            fieldMois.onChange(event);
          }}
          onBlur={() => {
            const mois = String(fieldMois.value ?? "");

            let valeurMois = "";
            switch (true) {
              case ["0", "00"].includes(mois):
                break;
              case mois.length === 1:
                valeurMois = `0${mois}`;
                break;
              case !desactiverCorrectionAutomatique && Number(mois) > 12:
                valeurMois = "12";
                break;
              default:
                valeurMois = mois;
                break;
            }

            helpersMois.setValue(valeurMois);
          }}
        />
        <span className="mx-1 text-xl">{"/"}</span>
        <input
          {...props}
          id={champsDate.annee}
          ref={refAnnee}
          className={`border-1 w-11 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaAnnee.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          placeholder="AAAA"
          maxLength={4}
          value={fieldAnnee.value}
          onChange={event => {
            event.target.value = event.target.value.replace(/\D/, "");
            fieldAnnee.onChange(event);
          }}
          onBlur={() => helpersAnnee.setTouched(true)}
        />

        {avecHeure && (
          <>
            <span className="mx-1 text-xl">{"à"}</span>
            <input
              {...props}
              id={champsDate.heure}
              ref={refHeure}
              className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaHeure.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
              placeholder="HH"
              maxLength={2}
              value={fieldHeure.value}
              onChange={event => {
                event.target.value = event.target.value.replace(/\D/, "");
                fieldHeure.onChange(event);
              }}
              onBlur={() => {
                const heure = String(fieldHeure.value ?? "");

                let valeurHeure = "";
                switch (true) {
                  case heure.length === 1:
                    valeurHeure = `0${heure}`;
                    break;
                  case !desactiverCorrectionAutomatique && Number(heure) > 23:
                    valeurHeure = "23";
                    break;
                  default:
                    valeurHeure = heure;
                    break;
                }

                helpersHeure.setValue(valeurHeure);
              }}
            />
            <span className="mx-1 text-xl">{"h"}</span>
            <input
              {...props}
              id={champsDate.minutes}
              ref={refMinutes}
              className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaMinutes.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
              placeholder="MN"
              maxLength={2}
              value={fieldMinutes.value}
              onChange={event => {
                event.target.value = event.target.value.replace(/\D/, "");
                fieldMinutes.onChange(event);
              }}
              onBlur={() => {
                const minutes = String(fieldMinutes.value ?? "");

                let valeurMinutes = "";
                switch (true) {
                  case minutes.length === 1:
                    valeurMinutes = `0${minutes}`;
                    break;
                  case !desactiverCorrectionAutomatique && Number(minutes) > 60:
                    valeurMinutes = "59";
                    break;
                  default:
                    valeurMinutes = minutes;
                    break;
                }
                helpersMinutes.setValue(valeurMinutes);
              }}
            />
            <span className="mx-1 text-xl">{"min"}</span>
          </>
        )}
      </div>
      {Boolean(erreurs.length) && <div className="text-start text-sm text-rouge">{erreurs[0]}</div>}
    </div>
  );
};

export default ChampDate;
