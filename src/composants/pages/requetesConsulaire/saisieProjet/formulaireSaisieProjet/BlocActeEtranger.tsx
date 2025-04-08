import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const OPTIONSTYPEACTE = [
  { cle: "ACTE_DRESSE", libelle: "Acte dressé" },
  { cle: "ACTE_TRANSCRIT", libelle: "Acte transcrit" },
  { cle: "ACTE_ENREGISTRE", libelle: "Acte enregistré" },
  { cle: "JUGEMENT_DECLARATIF", libelle: "Jugement déclaratif" },
  { cle: "JUGEMENT_SUPPLETIF", libelle: "Jugement supplétif" },
  { cle: "AUTRE", libelle: "Autre" }
];

const BlocActeEtranger: React.FC = () => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<IProjetActeTranscritForm>();
  const estAutreTypeActe = useMemo(() => values.acteEtranger?.typeActe === "AUTRE", [values.acteEtranger?.typeActe]);

  useEffect(() => {
    if (!estAutreTypeActe) {
      setFieldValue("acteEtranger.infoTypeActe", "");
      setFieldTouched("acteEtranger.infoTypeActe", false);
    }
  }, [estAutreTypeActe]);

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <ChampListeDeroulante
          name="acteEtranger.typeActe"
          libelle="Type d'acte étranger"
          options={OPTIONSTYPEACTE}
          optionVideMasquee
        />
        {estAutreTypeActe && (
          <ChampTexte
            name="acteEtranger.infoTypeActe"
            libelle="Précisez le type d'acte"
            estObligatoire
          />
        )}
      </div>
      <ChampDate
        name="acteEtranger.dateEnregistrement"
        libelle="Date d'enregistrement"
      />

      <SeparateurSection titre="Lieu d'enregistrement" />

      <div className="mb-4 grid grid-cols-3 gap-4">
        <ChampTexte
          name="acteEtranger.lieuEnregistrement.ville"
          libelle="Ville"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name="acteEtranger.lieuEnregistrement.etatProvince"
          libelle="État, canton, province"
        />
        <ChampTexte
          name="acteEtranger.lieuEnregistrement.pays"
          libelle="Pays"
          optionFormatage="PREMIER_MAJUSCULE"
        />
      </div>
      <ChampTexte
        name="acteEtranger.redacteur"
        libelle="Rédacteur"
        className="mb-4"
        maxLength={300}
      />
      <ChampZoneTexte
        name="acteEtranger.referenceComplement"
        libelle="Référence et/ou complément"
        maxLength={2000}
        typeRedimensionnement="vertical"
      />
    </ConteneurAvecBordure>
  );
};

export default memo(BlocActeEtranger);
