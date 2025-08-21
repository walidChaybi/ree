import { getIn, useFormikContext } from "formik";
import { useRef } from "react";
import { MdCompareArrows } from "react-icons/md";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

export const ChampsNomPrenomInterchangeables: React.FC<{ cheminNom: string; cheminPrenom: string; avecAppauvrissement?: boolean }> = ({
  cheminNom,
  cheminPrenom,
  avecAppauvrissement = false
}) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const nomRef = useRef<HTMLInputElement>(null);
  const prenomRef = useRef<HTMLInputElement>(null);
  const intervertir = () => {
    setFieldValue(cheminNom, getIn(values, cheminPrenom)).finally(() => setFieldTouched(cheminNom, true));
    setFieldValue(cheminPrenom, getIn(values, cheminNom)).finally(() => setFieldTouched(cheminPrenom, true));
  };

  const appauvrirValeur = (cheminValeur: string, nombreCaracteres = 2) => {
    const valeurActuelle = getIn(values, cheminValeur);
    const valeurSansEspaces = valeurActuelle.replace(/\s/g, "");

    if (!valeurActuelle || valeurSansEspaces.length < nombreCaracteres) return;

    const regex = new RegExp(`^((?:\\s*[^\\s]){${nombreCaracteres}})`);

    if (valeurActuelle.match(regex)) {
      setFieldValue(cheminValeur, valeurActuelle.match(regex)[0] + "*");
    }
  };

  const placerNomEtPrenomDansLesBonsChamps = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    const vocables: string[] = event.clipboardData.getData("text").split(" ");
    const estVocableEnMajuscule: boolean[] = vocables
      .map(vocable => (vocable ? vocable === vocable.toLocaleUpperCase() : null))
      .filter((valeur): valeur is boolean => valeur !== null);

    if (estVocableEnMajuscule.length < 2) return;

    const indexPremierVocableAuFormatDifferent = estVocableEnMajuscule.findIndex(enMajuscule => enMajuscule !== estVocableEnMajuscule[0]);

    if (indexPremierVocableAuFormatDifferent === -1) return;

    const vocablesAuxFormatsDifferents = estVocableEnMajuscule.slice(indexPremierVocableAuFormatDifferent);

    if (vocablesAuxFormatsDifferents.every(vocable => vocable === vocablesAuxFormatsDifferents[0])) {
      event.preventDefault();

      const premierePartie = vocables.slice(0, indexPremierVocableAuFormatDifferent).join(" ");
      const secondePartie = vocables.slice(indexPremierVocableAuFormatDifferent).join(" ");

      setFieldValue(cheminNom, estVocableEnMajuscule[0] ? premierePartie : secondePartie);
      setFieldValue(cheminPrenom, estVocableEnMajuscule[0] ? secondePartie : premierePartie);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="flex gap-4">
        <ChampTexte
          name={cheminNom}
          libelle="Nom"
          onPaste={placerNomEtPrenomDansLesBonsChamps}
          refChamp={nomRef}
          boutonChamp={
            avecAppauvrissement
              ? {
                  composant: (
                    <BoutonIcon
                      className="group absolute right-0 top-0 h-full rounded-l-none"
                      type="button"
                      title="Appauvrir le nom"
                      tabIndex={-1} // Accès via tabulation désactivé pour améliorer l'expérience utilisateur. Le bouton n'a pas de fonctionnalité essentielle
                      onClick={() => {
                        appauvrirValeur(cheminNom);
                        nomRef.current?.focus();
                      }}
                    >
                      <span className="mt-1 px-2">*</span>
                    </BoutonIcon>
                  )
                }
              : undefined
          }
        />
        <div className="flex items-start pt-7">
          <BoutonIcon
            title="Intervertir Nom et Prénom"
            aria-label="Intervertir nom et prénom"
            styleBouton="secondaire"
            className="h-8 w-12"
            onClick={intervertir}
            tabIndex={-1} // Accès via tabulation désactivé pour améliorer l'expérience utilisateur. Le bouton n'a pas de fonctionnalité essentielle
          >
            <MdCompareArrows
              className="text-2xl"
              aria-hidden
            />
          </BoutonIcon>
        </div>
      </div>
      <ChampTexte
        name={cheminPrenom}
        refChamp={prenomRef}
        libelle="Prénom"
        boutonChamp={
          avecAppauvrissement
            ? {
                composant: (
                  <BoutonIcon
                    className={`group absolute right-0 top-0 flex h-full rounded-l-none`}
                    type="button"
                    title="Appauvrir le prénom"
                    tabIndex={-1} // Accès via tabulation désactivé pour améliorer l'expérience utilisateur. Le bouton n'a pas de fonctionnalité essentielle
                    onClick={() => {
                      appauvrirValeur(cheminPrenom, 1);
                      prenomRef.current?.focus();
                    }}
                  >
                    <span className="mt-1 px-2">*</span>
                  </BoutonIcon>
                )
              }
            : undefined
        }
      />
    </div>
  );
};
