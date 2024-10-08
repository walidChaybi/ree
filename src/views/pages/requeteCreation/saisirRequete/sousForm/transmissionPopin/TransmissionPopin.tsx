import { ChoixServicesPopin } from "@composant/choixServicesPopin/ChoixServicesPopin";
import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationRequeteCreationParams,
  useCreationRequeteCreationEtTransmissionService
} from "@hook/requete/CreationRequeteCreationApiHook";
import { Service } from "@model/agent/IService";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { estRenseigne, executeEnDiffere } from "@util/Utils";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { FormikValues, connect } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { mappingSaisieRequeteRCTCVersRequetesAEnvoyer } from "./../../mapping/mappingFormulaireSaisirRCTCVersRequeteTranscription";

interface TransmissionPopinProps {
  ouverte: boolean;
  onCancel: () => void;
  onTransmissionEffectuee: (
    idRequeteCreeApresTransmissionService: string,
    formikValues: FormikValues
  ) => void;
  onTransmissionEnCours?: () => void;
  onErrors: (formik: any) => void;
}

export const TransmissionPopin: React.FC<
  TransmissionPopinProps & FormikComponentProps
> = props => {
  const [
    creationRequeteRCTCEtTransmissionServiceParams,
    setCreationRequeteRCTCEtTransmissionServiceParams
  ] = useState<ICreationRequeteCreationParams>();

  const idRequeteCreeApresTransmissionService =
    useCreationRequeteCreationEtTransmissionService(
      creationRequeteRCTCEtTransmissionServiceParams
    );

  const { services } = useContext(RECEContextData);

  useEffect(() => {
    idRequeteCreeApresTransmissionService &&
      props.onTransmissionEffectuee &&
      props.onTransmissionEffectuee(
        idRequeteCreeApresTransmissionService,
        props.formik.values
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequeteCreeApresTransmissionService]);

  function onServiceChoisiPourTransfert(idServiceChoisi?: string) {
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
        setCreationRequeteRCTCEtTransmissionServiceParams({
          requete,
          idService: idServiceChoisi
        });
      }
    });
  }

  return (
    <ChoixServicesPopin
      ouverte={props.ouverte}
      idServiceParent={Service.trouverEtablissement(services)?.idService}
      onServiceChoisi={onServiceChoisiPourTransfert}
      onCancel={props.onCancel}
    />
  );
};

export default connect<TransmissionPopinProps>(TransmissionPopin);
