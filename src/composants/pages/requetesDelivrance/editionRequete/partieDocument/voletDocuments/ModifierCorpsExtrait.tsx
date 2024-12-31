import { IModifierCorpsExtraitParams, useModifierCorpsExtrait } from "@hook/acte/ModifierCorpsExtraitApiHook";
import { creationCompositionExtraitCopieActeTexte } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitCopieActeTexte";
import { IGenerationECParams, useGenerationEC } from "@hook/generation/generationECHook/generationECHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_AVEC_FILIATION, CODE_EXTRAIT_SANS_FILIATION } from "@model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "@model/requete/enum/Validation";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import ChampsZoneTexte from "../../../../../commun/champs/ChampsZoneTexte";
import BoutonsValiderEtReinitialiser from "../../boutons/BoutonsValiderEtReinitialiser";

interface IModifierCorpsExtraitProps {
  documentReponse: IDocumentReponse;
  versOngletDocumentEdite: () => void;
}

const ModifierCorpsExtrait: React.FC<IModifierCorpsExtraitProps> = ({ documentReponse, versOngletDocumentEdite }) => {
  const { acte, requete, rechargerRequete } = useContext(EditionDelivranceContext);
  const corpsTexteDefaut = useMemo(
    () =>
      creationCompositionExtraitCopieActeTexte(
        acte as IFicheActe,
        requete,
        documentReponse.validation ? documentReponse.validation : Validation.O,
        documentReponse.mentionsRetirees ? documentReponse.mentionsRetirees.map(el => el.idMention) : [],
        DocumentDelivrance.getChoixDelivranceFromUUID(documentReponse.typeDocument)
      ).corps_texte ?? "",
    [acte]
  );

  const [modifierCorpsExtraitParams, setModifierCorpsExtraitParams] = useState<IModifierCorpsExtraitParams>();
  const [generationECParams, setGenerationECParams] = useState<IGenerationECParams>();

  const resultatModifierCorpsExtrait = useModifierCorpsExtrait(modifierCorpsExtraitParams);
  const resultatGenerationEC = useGenerationEC(generationECParams);

  useEffect(() => {
    if (!resultatModifierCorpsExtrait?.resultat) {
      return;
    }

    setGenerationECParams({
      idActe: acte?.id,
      requete: requete,
      validation: documentReponse.validation ? documentReponse.validation : Validation.O,
      mentionsRetirees: documentReponse.mentionsRetirees ? documentReponse.mentionsRetirees.map(el => el.idMention) : [],
      pasDAction: true,
      choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(documentReponse.typeDocument)
    });
  }, [resultatModifierCorpsExtrait]);

  useEffect(() => {
    if (!resultatGenerationEC?.resultGenerationUnDocument) {
      return;
    }

    rechargerRequete("les-deux", versOngletDocumentEdite);
  }, [resultatGenerationEC]);

  return (
    <div className="block pb-8 text-start">
      <Formik
        enableReinitialize
        initialValues={{ corpsTexte: corpsTexteDefaut }}
        onSubmit={values => {
          setModifierCorpsExtraitParams({
            idActe: acte?.id ?? "",
            corpsTexteModifie: values.corpsTexte,
            type: DocumentDelivrance.typeDocumentCorrespondACode(documentReponse.typeDocument, CODE_EXTRAIT_AVEC_FILIATION)
              ? TypeExtrait.getEnumFor(CODE_EXTRAIT_AVEC_FILIATION)
              : TypeExtrait.getEnumFor(CODE_EXTRAIT_SANS_FILIATION)
          });
        }}
      >
        <Form className="ml-2 mr-4">
          <ChampsZoneTexte
            className="w-full resize-none px-1 py-1.5"
            name="corpsTexte"
            libelle="Corps de l'extrait"
            rows={15}
          />

          <div className="mt-4">
            <BoutonsValiderEtReinitialiser />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ModifierCorpsExtrait;
