import { ReinitialiserValiderBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { RECEContextActions } from "@core/contexts/RECEContext";
import { IModifierCorpsExtraitParams, useModifierCorpsExtrait } from "@hook/acte/ModifierCorpsExtraitApiHook";
import { creationCompositionExtraitCopieActeTexte } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitCopieActeTexte";
import { IGenerationECParams, useGenerationEC } from "@hook/generation/generationECHook/generationECHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_AVEC_FILIATION, CODE_EXTRAIT_SANS_FILIATION } from "@model/requete/enum/DocumentDelivranceConstante";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { Validation } from "@model/requete/enum/Validation";
import { EditionExtraitCopiePageContext } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { StaticField } from "@widget/formulaire/champFixe/StaticField";
import React, { useContext, useEffect, useState } from "react";
import "./scss/ModifierCorpsExtrait.scss";

export interface ModifierCorpsExtraitProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
}

export const ModifierCorpsExtrait: React.FC<ModifierCorpsExtraitProps> = props => {
  const { setIsDirty } = useContext(RECEContextActions);
  const { rafraichirRequete } = useContext(EditionExtraitCopiePageContext);

  const [corpsTexte] = useState<string | undefined>(getCorpsTexte(props.acte, props.requete, props.document));
  const [corpsTexteNew, setCorpsTexteNew] = useState<string>(corpsTexte ?? "");
  const [modifierCorpsExtraitParams, setModifierCorpsExtraitParams] = useState<IModifierCorpsExtraitParams>();
  const [generationECParams, setGenerationECParams] = useState<IGenerationECParams>();

  const resultatModifierCorpsExtrait = useModifierCorpsExtrait(modifierCorpsExtraitParams);

  const resultatGenerationEC = useGenerationEC(generationECParams);

  function handleChangeText(e: any) {
    setIsDirty(corpsTexte !== e.target.value);
    setCorpsTexteNew(e.target.value);
  }

  function reinitialisation() {
    setCorpsTexteNew(corpsTexte ?? "");
  }

  function valider() {
    setModifierCorpsExtraitParams({
      idActe: props.acte.id,
      corpsTexteModifie: corpsTexteNew,
      type: getTypeExtrait(props.document.typeDocument)
    });
  }

  useEffect(() => {
    if (resultatModifierCorpsExtrait?.resultat) {
      setGenerationECParams({
        idActe: props.acte.id,
        requete: props.requete,
        validation: props.document.validation ? props.document.validation : Validation.O,
        mentionsRetirees: props.document.mentionsRetirees ? props.document.mentionsRetirees.map(el => el.idMention) : [],
        pasDAction: true,
        choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(props.document.typeDocument)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatModifierCorpsExtrait]);

  useEffect(() => {
    if (resultatGenerationEC?.resultGenerationUnDocument) {
      rafraichirRequete();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC]);

  return (
    <div className="ModifierCorpsExtrait">
      <div className="DeuxColonnes">
        <StaticField
          libelle={"Délivrance"}
          valeur={getTypeExtrait(props.document.typeDocument).libelle}
        ></StaticField>
        <StaticField
          libelle={"Nature"}
          valeur={props.acte.nature.libelle}
        ></StaticField>
        <StaticField
          libelle={"Référence"}
          valeur={FicheActe.getReference(props.acte)}
        ></StaticField>
      </div>
      <textarea
        onChange={handleChangeText}
        placeholder={"Corps de l'extrait"}
        value={corpsTexteNew}
      ></textarea>
      <ReinitialiserValiderBoutons
        reInitialiserDisabled={!corpsModifie(corpsTexteNew, corpsTexte)}
        validerDisabled={corpsNonModifierOuCorpsVide(corpsTexteNew, corpsTexte)}
        onClickReInitialiser={reinitialisation}
        onClickValider={valider}
        afficherBouton={!StatutRequete.estTransmiseAValideur(props.requete.statutCourant.statut)}
      />
    </div>
  );
};

export function getTypeExtrait(typeDocument: string): TypeExtrait {
  return DocumentDelivrance.typeDocumentCorrespondACode(typeDocument, CODE_EXTRAIT_AVEC_FILIATION)
    ? TypeExtrait.getEnumFor(CODE_EXTRAIT_AVEC_FILIATION)
    : TypeExtrait.getEnumFor(CODE_EXTRAIT_SANS_FILIATION);
}

export function getCorpsTexte(acte: IFicheActe, requete: IRequeteDelivrance, document: IDocumentReponse) {
  let composition;
  composition = creationCompositionExtraitCopieActeTexte(
    acte,
    requete,
    document.validation ? document.validation : Validation.O,
    document.mentionsRetirees ? document.mentionsRetirees.map(el => el.idMention) : [],
    DocumentDelivrance.getChoixDelivranceFromUUID(document.typeDocument)
  );

  return composition?.corps_texte;
}

export function corpsNonModifierOuCorpsVide(corpsTexteNew: string, corpsTexte?: string) {
  return !corpsModifie(corpsTexteNew, corpsTexte) || corpsTexteNew === "";
}

export function corpsModifie(corpsTexteNew: string, corpsTexte?: string) {
  return corpsTexte !== corpsTexteNew;
}
