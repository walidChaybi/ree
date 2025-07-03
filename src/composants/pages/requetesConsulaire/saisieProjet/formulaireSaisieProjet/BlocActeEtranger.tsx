import { ETypeActeEtranger } from "@model/etatcivil/acte/IActeEtrangerDto";
import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { Option } from "@util/Type";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import React, { memo } from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const optionsTypeActe: Option[] = enumVersOptions(ETypeActeEtranger);
const optionsPreposition = enumVersOptions(EPrepositionLieu);

const BlocActeEtranger: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<IProjetActeTranscritForm>();

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <ChampListeDeroulante
          name="acteEtranger.typeActe"
          libelle="Type d'acte étranger"
          options={optionsTypeActe}
          optionVideMasquee
          apresChangement={typeActe => {
            typeActe !== "AUTRE" && setFieldValue("acteEtranger.infoTypeActe", "");
          }}
        />

        {values.acteEtranger?.typeActe === "AUTRE" && (
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

      <div className="mb-4 grid grid-cols-[100px_1fr_1fr_1fr] gap-4">
        <ChampListeDeroulante
          name="acteEtranger.lieuEnregistrement.preposition"
          libelle="Préposition"
          options={optionsPreposition}
        />
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
