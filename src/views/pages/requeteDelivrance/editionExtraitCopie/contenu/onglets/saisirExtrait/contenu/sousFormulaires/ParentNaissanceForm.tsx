import { Filiation } from "@model/etatcivil/acte/Filiation";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { UN, estRenseigne, mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React, { useContext } from "react";
import {
  DATE_NAISSANCE_OU_AGE_DE,
  LIEU_NAISSANCE,
  NOM_NAISSANCE,
  PRENOMS,
  SEXE
} from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "../../../../../../../../common/composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuEvenementForm from "../../../../../../../../common/composant/formulaire/LieuEvenementForm";
import PrenomsForm from "../../../../../../../../common/composant/formulaire/nomsPrenoms/PrenomsForm";
import { SaisirExtraitFormContext } from "../../SaisirExtraitForm";
import "./scss/ParentNaissanceForm.scss";

interface ParentNaissanceFormProps {
  nom: string;
  parent: Filiation;
  sansDateAgeEtLieuNaissance?: boolean;
  sansSexe?: boolean;
}

export const ParentNaissanceForm: React.FC<ParentNaissanceFormProps> = props => {
  const { saisieVerrouillee, mapPrenomAffiche } = useContext(SaisirExtraitFormContext);
  const prenoms: IPrenomOrdonnes[] = mapPrenomsVersPrenomsOrdonnes(props.parent.prenoms);

  const handleNbPrenomAffiche = (prenomAjoute: boolean) => {
    const nbPrenomAffiche = mapPrenomAffiche.get(props.nom);
    if (nbPrenomAffiche != null) {
      const incrementationPrenom = prenomAjoute ? UN : -UN;
      mapPrenomAffiche.set(props.nom, nbPrenomAffiche + incrementationPrenom);
    }
  };

  return (
    <div className="ParentNaissanceForm">
      <InputField
        label={"Nom de naissance"}
        name={withNamespace(props.nom, NOM_NAISSANCE)}
        disabled={estRenseigne(props.parent.nom) && saisieVerrouillee}
      />
      <PrenomsForm
        nom={withNamespace(props.nom, PRENOMS)}
        disabled={estRenseigne(props.parent.prenoms) && saisieVerrouillee}
        nbPrenoms={prenoms.length}
        nbPrenomsAffiche={getNbPrenomsAffiche(prenoms.length, mapPrenomAffiche, props.nom)}
        onNbPrenomChange={handleNbPrenomAffiche}
      />
      {!props.sansSexe && (
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={"Sexe"}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
          disabled={estRenseigne(props.parent.sexe) && props.parent.sexe !== "INCONNU" && saisieVerrouillee}
        />
      )}
      {!props.sansDateAgeEtLieuNaissance && (
        <>
          <DateNaissanceOuAgeDeForm
            nom={withNamespace(props.nom, DATE_NAISSANCE_OU_AGE_DE)}
            naissance={props.parent.naissance ?? undefined}
            age={props.parent.age ?? undefined}
            saisieVerrouillee={saisieVerrouillee}
          />

          <LieuEvenementForm
            nom={withNamespace(props.nom, LIEU_NAISSANCE)}
            label={"Lieu de naissance"}
            evenement={props.parent.naissance ?? undefined}
            gestionEtrangerFrance={true}
            etrangerParDefaut={false}
          />
        </>
      )}
    </div>
  );
};

function getNbPrenomsAffiche(nbPrenoms: number, mapPrenomAffiche: Map<string, number>, nom: string): number {
  let nbPrenomAffiche = mapPrenomAffiche.get(nom);
  if (nbPrenomAffiche == null) {
    nbPrenomAffiche = Math.max(nbPrenoms, 1);
    mapPrenomAffiche.set(nom, nbPrenomAffiche);
  }
  return nbPrenomAffiche > nbPrenoms ? nbPrenomAffiche : nbPrenoms;
}
