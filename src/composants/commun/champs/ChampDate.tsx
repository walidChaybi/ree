import Replay from "@mui/icons-material/Replay";
import { useField } from "formik";
import { useEffect, useMemo, useRef } from "react";
import { messagesErreur } from "../../../utils/SchemaValidation";
import BoutonIcon from "../bouton/BoutonIcon";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

type TChampDateProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  avecHeure?: boolean;
  className?: string;
  estObligatoire?: boolean | string;
  desactiverCorrectionAutomatique?: boolean;
  avecBoutonReinitialiser?: boolean;
};

const idElementActif = () => document.activeElement?.getAttribute("id");

const ChampDate: React.FC<TChampDateProps> = ({
  name,
  libelle,
  avecHeure = false,
  className = "",
  estObligatoire,
  desactiverCorrectionAutomatique = true,
  avecBoutonReinitialiser,
  ...props
}) => {
  const champsDate = useMemo(
    () => ({
      jour: `${name}.jour`,
      mois: `${name}.mois`,
      annee: `${name}.annee`,
      heure: `${name}.heure`,
      minute: `${name}.minute`
    }),
    [name]
  );

  const [fieldJour, metaJour, helpersJour] = useField(champsDate.jour);
  const [fieldMois, metaMois, helpersMois] = useField(champsDate.mois);
  const [fieldAnnee, metaAnnee, helpersAnnee] = useField(champsDate.annee);
  const [fieldHeure, metaHeure, helpersHeure] = useField(champsDate.heure);
  const [fieldMinute, metaMinute, helpersMinute] = useField(champsDate.minute);
  const refMois = useRef<HTMLInputElement | null>(null);
  const refAnnee = useRef<HTMLInputElement | null>(null);
  const refHeure = useRef<HTMLInputElement | null>(null);
  const refMinute = useRef<HTMLInputElement | null>(null);

  const erreurs = useMemo(() => {
    const dateEnCompletion = !metaAnnee.touched;

    const listeErreurs = dateEnCompletion
      ? []
      : [metaJour.error ?? "", metaMois.error ?? "", metaAnnee.error ?? "", metaHeure.error ?? "", metaMinute.error ?? ""].filter(erreur =>
          Boolean(erreur.length)
        );

    return listeErreurs.includes(messagesErreur.DATE_INVALIDE) ? [messagesErreur.DATE_INVALIDE] : listeErreurs;
  }, [
    champsDate.jour,
    champsDate.mois,
    metaJour.error,
    metaMois.error,
    metaAnnee.error,
    metaAnnee.touched,
    metaHeure.error,
    metaMinute.error
  ]);

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
    metaHeure?.value?.length === 2 && idElementActif() === champsDate.heure && refMinute.current?.focus();
  }, [metaHeure?.value]);

  const resetDate = () => {
    helpersAnnee.setValue("");
    helpersAnnee.setTouched(false);

    helpersMois.setValue("");
    helpersMois.setTouched(false);

    helpersJour.setValue("");
    helpersJour.setTouched(false);

    if (avecHeure) {
      helpersHeure.setValue("");
      helpersHeure.setTouched(false);

      helpersMinute.setValue("");
      helpersMinute.setTouched(false);
    }
  };

  return (
    <div {...(erreurs.length ? { className: CHAMP_EN_ERREUR } : {})}>
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
              id={champsDate.minute}
              ref={refMinute}
              className={`border-1 w-8 rounded border border-solid px-2 py-1 text-center transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${metaMinute.error && erreurs.length ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
              placeholder="MN"
              maxLength={2}
              value={fieldMinute.value}
              onChange={event => {
                event.target.value = event.target.value.replace(/\D/, "");
                fieldMinute.onChange(event);
              }}
              onBlur={() => {
                const minute = String(fieldMinute.value ?? "");

                let valeurMinute = "";
                switch (true) {
                  case minute.length === 1:
                    valeurMinute = `0${minute}`;
                    break;
                  case !desactiverCorrectionAutomatique && Number(minute) > 60:
                    valeurMinute = "59";
                    break;
                  default:
                    valeurMinute = minute;
                    break;
                }
                helpersMinute.setValue(valeurMinute);
              }}
            />
            <span className="mx-1 text-xl">{"min"}</span>
          </>
        )}
        {avecBoutonReinitialiser && (
          <BoutonIcon
            className="ml-1"
            styleBouton="suppression"
            title="Réinitialiser la date"
            iconeSeule
            onClick={resetDate}
          >
            <Replay />
          </BoutonIcon>
        )}
      </div>
      {Boolean(erreurs.length) && <div className="text-start text-sm text-rouge">{erreurs[0]}</div>}
    </div>
  );
};

export default ChampDate;
