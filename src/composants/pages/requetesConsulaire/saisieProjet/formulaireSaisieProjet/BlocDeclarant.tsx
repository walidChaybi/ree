import { EIdentiteDeclarant } from "@model/etatcivil/acte/projetActe/transcription/DeclarantProjetActeTranscrit";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { Option } from "@util/Type";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import React from "react";
import ChampCaseACocher from "../../../../commun/champs/ChampCaseACocher";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ChampsAdresse from "../../../../commun/champs/ChampsAddresse";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

const optionsDeclarant: Option[] = enumVersOptions(EIdentiteDeclarant);

const BlocDeclarant: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<IProjetActeTranscritForm>();

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <ChampListeDeroulante
            name="declarant.identite"
            libelle="Identité"
            options={optionsDeclarant}
            premiereLettreMajuscule
          />
        </div>
      </div>

      {values.declarant.identite === "TIERS" && (
        <>
          <div className="pt-4">
            <ChampTexte
              name="declarant.nom"
              libelle="Nom"
              estObligatoire={true}
            />
          </div>

          <div className="pt-4">
            <ChampsPrenoms
              cheminPrenoms="declarant.prenomsChemin"
              prefixePrenom="prenom"
            />
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampsRadio
              name="declarant.sexe"
              libelle="Sexe"
              options={Sexe.getMasculinFemininAsOptions()}
            />
            <ChampTexte
              className="w-1/2"
              name="declarant.age"
              libelle={"Âge"}
              numerique
              maxLength={3}
            />
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampTexte
              name="declarant.qualite"
              libelle="Qualité"
              placeholder="Ex: la grand-mère"
            />
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampTexte
              name="declarant.profession"
              libelle="Profession"
              data-testid="declarant-profession"
              disabled={values.declarant.sansProfession}
            />

            <div className="w-full pt-[2rem] text-start">
              <ChampCaseACocher
                name="declarant.sansProfession"
                libelle="Sans profession"
                apresChangement={() => setFieldValue(`declarant.profession`, "")}
              />
            </div>
          </div>

          <SeparateurSection
            titre="Domicile"
            libellePour="declarant.domicile"
          />

          <ChampsAdresse prefixe={"declarant.domicile"} />

          <SeparateurSection
            titre="Complément"
            libellePour="declarant.complement"
          />
          <ChampZoneTexte
            name="declarant.complement"
            libelle=""
            placeholder="Ex: Chez qui l'accouchement a eu lieu"
            maxLength={250}
            typeRedimensionnement="fixe"
          />
        </>
      )}
    </ConteneurAvecBordure>
  );
};

export default BlocDeclarant;
