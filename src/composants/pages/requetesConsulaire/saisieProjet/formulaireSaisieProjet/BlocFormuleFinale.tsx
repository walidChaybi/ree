import { Identite } from "@model/etatcivil/enum/Identite";
import { Option } from "@util/Type";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";

import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const optionsDemandeur: Option[] = [
  { cle: Identite.getKey(Identite.PERE), libelle: Identite.PERE.libelle },
  { cle: Identite.getKey(Identite.MERE), libelle: Identite.MERE.libelle },
  { cle: Identite.getKey(Identite.PERE_ET_MERE), libelle: Identite.PERE_ET_MERE.libelle },
  { cle: Identite.getKey(Identite.TIERS), libelle: Identite.TIERS.libelle }
];

const optionsPieces: Option[] = [
  { cle: "COPIE", libelle: "Copie" },
  { cle: "COPIE_ET_TRADUCTION", libelle: "Copie et traduction" },
  { cle: "COPIES", libelle: "Copies" },
  { cle: "COPIES_ET_TRADUCTION", libelle: "Copies et traduction" }
];

const optionsLegalisationApostille: Option[] = [
  { libelle: "", cle: "" },
  { cle: "LEGALISATION", libelle: "Légalisation" },
  { cle: "APOSTILLE", libelle: "Apostille" }
];

const optionsModeDepot: Option[] = [
  { cle: "TRANSMISE", libelle: "Transmise" },
  { cle: "REMISE", libelle: "Remise" }
];

const optionsIdentiteTransmetteur: Option[] = [{ cle: "IDENTIQUE_DEMANDEUR", libelle: "Identique au demandeur" }];

const BlocFormuleFinale: React.FC = () => {
  const { values, setFieldValue, setFieldTouched, initialValues } = useFormikContext<IProjetActeTranscritForm>();
  const estUnTier = useMemo(
    () => values.formuleFinale?.identiteDemandeur === Identite.getKey(Identite.TIERS),
    [values.formuleFinale.identiteDemandeur]
  );
  const doitAfficherAutresPieces = useMemo(
    () => values.formuleFinale.pieceProduite?.toUpperCase().includes("COPIES"),
    [values.formuleFinale.pieceProduite]
  );

  useEffect(() => {
    if (!estUnTier) {
      setFieldValue("formuleFinale", {
        ...values.formuleFinale,
        nom: initialValues.formuleFinale.nom,
        prenomsChemin: initialValues.formuleFinale.prenomsChemin,
        qualite: initialValues.formuleFinale.qualite,
        identiteDemandeur: values.formuleFinale?.identiteDemandeur
      });
      setFieldTouched("formuleFinale.nom", false);
    }
  }, [values.formuleFinale?.identiteDemandeur]);

  useEffect(() => {
    if (!doitAfficherAutresPieces) {
      setFieldValue("formuleFinale", {
        ...values.formuleFinale,
        autresPieces: initialValues.formuleFinale.autresPieces
      });
      setFieldTouched("formuleFinale.autresPieces", false);
    }
  }, [doitAfficherAutresPieces]);

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="grid grid-cols-2 gap-4">
        <ChampListeDeroulante
          name="formuleFinale.identiteDemandeur"
          libelle="Identité du demandeur"
          options={optionsDemandeur}
          premiereLettreMajuscule
        />
      </div>
      {estUnTier && (
        <>
          <div className="pt-4">
            <ChampTexte
              name="formuleFinale.nom"
              libelle="Nom"
              estObligatoire={estUnTier}
            />
          </div>

          <div className="pt-4">
            <ChampsPrenoms
              cheminPrenoms="formuleFinale.prenomsChemin"
              prefixePrenom="prenom"
            />
          </div>
          <div className="pt-4">
            <ChampTexte
              name="formuleFinale.qualite"
              libelle="Qualité"
            />
          </div>
        </>
      )}
      <SeparateurSection titre="Pièces" />
      <div className="grid grid-cols-2 gap-4">
        <ChampListeDeroulante
          name="formuleFinale.pieceProduite"
          libelle="Pièces produites"
          options={optionsPieces}
        />

        <ChampListeDeroulante
          name="formuleFinale.legalisationApostille"
          libelle="Légalisation / Apostille"
          options={optionsLegalisationApostille}
        />
      </div>

      {doitAfficherAutresPieces && (
        <div className="grid grid-cols-2 pt-4">
          <ChampTexte
            name="formuleFinale.autresPieces"
            libelle="Autres pièces"
            estObligatoire={doitAfficherAutresPieces}
          />
        </div>
      )}
      <SeparateurSection />
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <ChampsRadio
            name={"formuleFinale.modeDepot"}
            libelle="Mode de dépôt de la demande"
            options={optionsModeDepot}
          />
        </div>
        <div className="">
          <ChampListeDeroulante
            name="formuleFinale.identiteTransmetteur"
            libelle="Identité du transmetteur"
            options={optionsIdentiteTransmetteur}
            disabled
          />
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocFormuleFinale;
