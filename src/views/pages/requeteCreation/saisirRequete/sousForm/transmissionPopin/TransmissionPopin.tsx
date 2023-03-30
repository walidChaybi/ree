import { ChoixEntitePopin } from "@composant/choixEntitesPopin/ChoixEntitesPopin";
import {
  ICreationRequeteCreationParams,
  useCreationRequeteCreationEtTransmissionEntite
} from "@hook/requete/CreationRequeteCreationApiHook";
import { Entite } from "@model/agent/IEntiteRattachement";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { estRenseigne, executeEnDiffere } from "@util/Utils";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect, FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import { mappingSaisieRequeteRCTCVersRequetesAEnvoyer } from "./../../mapping/mappingFormulaireSaisirRCTCVersRequeteTranscription";

interface TransmissionPopinProps {
  ouverte: boolean;
  onCancel: () => void;
  onTransmissionEffectuee: (
    idRequeteCreeApresTransmissionEntite: string,
    formikValues: FormikValues
  ) => void;
  onTransmissionEnCours?: () => void;
  onErrors: (formik: any) => void;
}

export const TransmissionPopin: React.FC<
  TransmissionPopinProps & FormikComponentProps
> = props => {
  //States
  //////////////////////////////////////////////////////////////////////////
  const [
    creationRequeteRCTCEtTransmissionEntiteParams,
    setCreationRequeteRCTCEtTransmissionEntiteParams
  ] = useState<ICreationRequeteCreationParams>();

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const idRequeteCreeApresTransmissionEntite =
    useCreationRequeteCreationEtTransmissionEntite(
      creationRequeteRCTCEtTransmissionEntiteParams
    );

  // Effects
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    idRequeteCreeApresTransmissionEntite &&
      props.onTransmissionEffectuee &&
      props.onTransmissionEffectuee(
        idRequeteCreeApresTransmissionEntite,
        props.formik.values
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequeteCreeApresTransmissionEntite]);

  // Evenements
  //////////////////////////////////////////////////////////////////////////
  function onEntiteChoisiePourTransfert(idEntiteChoisie?: string) {
    props.onErrors(props.formik);
    props.formik.validateForm().then(errors => {
      if (estRenseigne(errors)) {
        props.onErrors(errors);
        // Force l'affichage des erreurs (ce que ne fait pas "validateForm")
        // cf. https://github.com/jaredpalmer/formik/issues/3151
        props.formik.submitForm().then(() => {
          executeEnDiffere(GestionnaireBlockErreur.scrollALaPremiereErreur);
        });
      } else {
        props.onTransmissionEnCours && props.onTransmissionEnCours();
        const requete = mappingSaisieRequeteRCTCVersRequetesAEnvoyer(
          props.formik.values as ISaisieRequeteRCTC
        );
        setCreationRequeteRCTCEtTransmissionEntiteParams({
          requete,
          idEntiteRattachement: idEntiteChoisie
        });
      }
    });
  }

  return (
    <ChoixEntitePopin
      ouverte={props.ouverte}
      idEntiteMere={Entite.getEntiteEtablissement()?.idEntite}
      onEntiteChoisie={onEntiteChoisiePourTransfert}
      onCancel={props.onCancel}
    />
  );
};

export default connect<TransmissionPopinProps>(TransmissionPopin);
