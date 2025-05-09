import { EIdentite } from "@model/etatcivil/enum/Identite";
import { Option } from "@util/Type";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";

import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { enumVersOptions } from "@util/Utils";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const optionsDemandeur: Option[] = enumVersOptions(EIdentite);

const optionsPieces: Option[] = enumVersOptions(EPieceProduite);

const optionsLegalisationApostille: Option[] = enumVersOptions(ELegalisationApostille, true);

const optionsModeDepot: Option[] = enumVersOptions(EModeDepot);

const optionsIdentiteTransmetteur: Option[] = [{ cle: "IDENTIQUE_DEMANDEUR", libelle: "Identique au demandeur" }];

const BlocFormuleFinale: React.FC = () => {
  const { values, setFieldValue, setFieldTouched, initialValues } = useFormikContext<IProjetActeTranscritForm>();
  const estUnTier = useMemo(
    () => values.formuleFinale?.identiteDemandeur === ("TIERS" as keyof typeof EIdentite),
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
