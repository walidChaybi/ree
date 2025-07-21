import CompareArrows from "@mui/icons-material/CompareArrows";
import { getIn, useFormikContext } from "formik";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

export const ChampsNomPrenomInterchangeables: React.FC<{ cheminNom: string; cheminPrenom: string }> = ({ cheminNom, cheminPrenom }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  const intervertir = () => {
    setFieldValue(cheminNom, getIn(values, cheminPrenom)).finally(() => setFieldTouched(cheminNom, true));
    setFieldValue(cheminPrenom, getIn(values, cheminNom)).finally(() => setFieldTouched(cheminPrenom, true));
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
        />
        <BoutonIcon
          title="Intervertir Nom et Prénom"
          styleBouton="secondaire"
          className="mt-7 h-8 w-12"
          onClick={intervertir}
        >
          <CompareArrows />
        </BoutonIcon>
      </div>
      <ChampTexte
        name={cheminPrenom}
        libelle="Prénom"
      />
    </div>
  );
};
