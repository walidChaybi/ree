import { NATIONALITE_1, NATIONALITE_2, NATIONALITE_3 } from "@composant/formulaire/ConstantesNomsForm";
import AddCircle from "@mui/icons-material/AddCircle";
import { DEUX, UN, estRenseigne } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BoutonIcon from "../../../../../composants/commun/bouton/BoutonIcon";
import ChampNationalite from "../../../../../composants/commun/champs/ChampNationalite";
import { CaracteresAutorises } from "../../../../../ressources/Regex";
import "./scss/Nationalite.scss";

const NB_MIN_NATIONALITES = 1;
const NB_MAX_NATIONALITES = 3;

// Valeurs par défaut des champs
export const NationalitesFormDefaultValues = {
  [NATIONALITE_1]: "",
  [NATIONALITE_2]: "",
  [NATIONALITE_3]: ""
};

// Schéma de validation des champs
export const NationalitesFormValidationSchema = Yup.object()
  .shape({
    [NATIONALITE_1]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
    [NATIONALITE_2]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
    [NATIONALITE_3]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
  })
  .test("NATIONALITEObligatoire1", function (value, error) {
    const NATIONALITE1 = value[NATIONALITE_1] as string;
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE1`,
      message: "La saisie du Nationalité 1 est obligatoire"
    };

    return NATIONALITE1 == null && (NATIONALITE2 != null || NATIONALITE3 != null) ? this.createError(params) : true;
  })
  .test("NATIONALITEsObligatoire2", function (value, error) {
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE2`,
      message: "La saisie du Nationalité 2 est obligatoire"
    };

    return NATIONALITE2 == null && NATIONALITE3 != null ? this.createError(params) : true;
  });

interface INationaliteOrdonnes {
  nationalite: string;
  numeroOrdre: number;
}

interface IPropsFormulaireNationalite {
  nationalites?: INationaliteOrdonnes[];
}
export type PropsFormulaireNationalites = IPropsFormulaireNationalite & SubFormProps;

const FormulaireNationalites: React.FC<PropsFormulaireNationalites> = props => {
  const nomNationalite1 = withNamespace(props.nom, NATIONALITE_1);
  const nomNationalite2 = withNamespace(props.nom, NATIONALITE_2);
  const nomNationalite3 = withNamespace(props.nom, NATIONALITE_3);

  const [nbNationalites, setNbNationalites] = useState<number>(1);
  const [nbNationalitesInitialise, setNbNationalitesInitialise] = useState<boolean>(false);
  const [btnAjouterInactif, setBtnAjouterInactif] = useState(false);
  const [btnSupprimerInactif, setBtnSupprimerInactif] = useState(true);

  useEffect(() => {
    if (!nbNationalitesInitialise && props.nationalites && props.nationalites.length > 1) {
      setNbNationalites(props.nationalites.length);
      setNbNationalitesInitialise(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nationalites]);

  const ajouterNationalite = () => {
    if (nbNationalites + 1 <= NB_MAX_NATIONALITES) {
      setNbNationalites(nbNationalites + 1);
    }
  };

  const supprimerNationalite = (champ: string) => {
    if (nbNationalites - 1 >= NB_MIN_NATIONALITES) {
      setNbNationalites(nbNationalites - 1);
      props.formik.setFieldValue(withNamespace(props.nom, champ), "");
    }
  };

  useEffect(() => {
    setBtnAjouterInactif(nbNationalites === NB_MAX_NATIONALITES);
    setBtnSupprimerInactif(nbNationalites === NB_MIN_NATIONALITES);
  }, [nbNationalites]);

  function getBoutonAjouter(): JSX.Element {
    return (
      <BoutonIcon
        type="button"
        title={"Ajouter une nationalité"}
        onClick={ajouterNationalite}
        disabled={btnAjouterInactif}
        styleBouton="principal"
      >
        <div className="flex items-center gap-4 px-2">
          <AddCircle />
          <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter une nationalité"}</span>
        </div>
      </BoutonIcon>
    );
  }

  function estDesactive(index: number) {
    return props.nationalites && estRenseigne(props.nationalites[index]) && props.disabled;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampNationalite
        nom={nomNationalite1}
        libelle={"Nationalité 1"}
        desactive={props.disabled}
      />

      <div className="flex items-end">{getBoutonAjouter()}</div>

      {nbNationalites > NB_MIN_NATIONALITES && (
        <ChampNationalite
          nom={nomNationalite2}
          libelle={"Nationalité 2"}
          desactive={props.disabled}
          afficherBoutonSupprimer={!estDesactive(UN)}
          onSupprimer={() => supprimerNationalite(NATIONALITE_2)}
          boutonSupprimerDesactive={btnSupprimerInactif}
        />
      )}

      {nbNationalites === NB_MAX_NATIONALITES && (
        <ChampNationalite
          nom={nomNationalite3}
          libelle={"Nationalité 3"}
          desactive={props.disabled}
          afficherBoutonSupprimer={!estDesactive(DEUX)}
          onSupprimer={() => supprimerNationalite(NATIONALITE_3)}
          boutonSupprimerDesactive={btnSupprimerInactif}
        />
      )}
    </div>
  );
};

export default connect(FormulaireNationalites);
