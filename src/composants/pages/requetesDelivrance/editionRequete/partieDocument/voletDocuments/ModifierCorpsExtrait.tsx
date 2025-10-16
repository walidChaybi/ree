import { IModifierCorpsExtraitParams, useModifierCorpsExtrait } from "@hook/acte/ModifierCorpsExtraitApiHook";
import { creationCompositionExtraitCopieActeTexte } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitCopieActeTexte";
import { IGenerationECParams, useGenerationEC } from "@hook/generation/generationECHook/generationECHook";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import ChampZoneTexte from "../../../../../commun/champs/ChampZoneTexte";
import BoutonsValiderEtReinitialiser from "../../boutons/BoutonsValiderEtReinitialiser";

interface IModifierCorpsExtraitProps {
  documentReponse: IDocumentReponse;
  versOngletDocumentEdite: () => void;
}

const ModifierCorpsExtrait: React.FC<IModifierCorpsExtraitProps> = ({ documentReponse, versOngletDocumentEdite }) => {
  const { acte, requete, rechargerRequete } = useContext(EditionDelivranceContext);
  const corpsTexteDefaut = useMemo(
    () =>
      (acte &&
        creationCompositionExtraitCopieActeTexte(
          acte,
          requete,
          documentReponse.validation ?? EValidation.O,
          documentReponse.mentionsRetirees ? documentReponse.mentionsRetirees.map(el => el.idMention) : [],
          DocumentDelivrance.getChoixDelivranceFromUUID(documentReponse.typeDocument)
        ).corps_texte) ??
      "",
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
      validation: documentReponse.validation ?? EValidation.O,
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
            type: DocumentDelivrance.estExtraitAvecFilliation(documentReponse.typeDocument)
              ? "EXTRAIT_AVEC_FILIATION"
              : "EXTRAIT_SANS_FILIATION"
          });
        }}
      >
        <Form className="ml-2 mr-4">
          <ChampZoneTexte
            name="corpsTexte"
            libelle="Corps de l'extrait"
            rows={15}
            typeRedimensionnement="fixe"
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
