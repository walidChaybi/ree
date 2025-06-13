import { Option } from "@util/Type";
import { useFormikContext } from "formik";

import { EIdentiteDemandeur, EIdentiteTransmetteur } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FormuleFinale";
import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { enumVersOptions } from "@util/Utils";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const optionsDemandeur: Option[] = enumVersOptions(EIdentiteDemandeur);
const optionsTransmetteur: Option[] = enumVersOptions(EIdentiteTransmetteur);
const optionsPieces: Option[] = enumVersOptions(EPieceProduite);
const optionsLegalisationApostille: Option[] = enumVersOptions(ELegalisationApostille, true);
const optionsModeDepot: Option[] = enumVersOptions(EModeDepot);

const BlocFormuleFinale: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<IProjetActeTranscritForm>();

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="grid grid-cols-2 gap-4">
        <ChampListeDeroulante
          name="formuleFinale.identiteDemandeur"
          libelle="Identité du demandeur"
          options={optionsDemandeur}
          premiereLettreMajuscule
          apresChangement={identiteDemandeur =>
            identiteDemandeur !== "TIERS" &&
            setFieldValue("formuleFinale", {
              ...values.formuleFinale,
              nom: "",
              prenomsChemin: PrenomsForm.valeursInitiales(),
              qualite: "",
              identiteDemandeur
            })
          }
        />
      </div>

      {values.formuleFinale.identiteDemandeur === "TIERS" && (
        <>
          <div className="pt-4">
            <ChampTexte
              name="formuleFinale.nom"
              libelle="Nom"
              estObligatoire
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
          apresChangement={pieceProduite => {
            if (!pieceProduite?.includes("COPIES")) {
              setFieldValue("formuleFinale.autresPieces", "");
            }
          }}
        />

        <ChampListeDeroulante
          name="formuleFinale.legalisationApostille"
          libelle="Légalisation / Apostille"
          options={optionsLegalisationApostille}
        />
      </div>

      {values.formuleFinale.pieceProduite?.includes("COPIES") && (
        <div className="grid grid-cols-2 pt-4">
          <ChampTexte
            name="formuleFinale.autresPieces"
            libelle="Autres pièces"
            estObligatoire
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
            options={optionsTransmetteur}
          />
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocFormuleFinale;
