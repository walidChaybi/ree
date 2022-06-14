import React, { useEffect, useState } from "react";
import {
  FicheActe,
  IFicheActe
} from "../../../../../../../model/etatcivil/acte/IFicheActe";
import { TypeExtrait } from "../../../../../../../model/etatcivil/enum/TypeExtrait";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../../../../../model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "../../../../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { ReinitialiserValiderBoutons } from "../../../../../../common/composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  IModifierCorpsExtraitParams,
  useModifierCorpsExtrait
} from "../../../../../../common/hook/acte/ModifierCorpsExtraitApiHook";
import { creationCompositionExtraitCopieActeTexte } from "../../../../../../common/hook/generation/generationECHook/creationComposition/creationCompositionExtraitCopieActeTexte";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../../../../../common/hook/generation/generationECHook/generationECHook";
import { getLibelle } from "../../../../../../common/util/Utils";
import { StaticField } from "../../../../../../common/widget/formulaire/champFixe/StaticField";
import { DocumentEC } from "../../../enum/DocumentEC";
import "./scss/ModifierCorpsExtrait.scss";

export interface ModifierCorpsExtraitProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  handleDocumentEnregistre: (document: DocumentEC) => void;
}

export const ModifierCorpsExtrait: React.FC<
  ModifierCorpsExtraitProps
> = props => {
  const [corpsTexte] = useState<string | undefined>(
    getCorpsTexte(props.acte, props.requete, props.document)
  );
  const [corpsTexteNew, setCorpsTexteNew] = useState<string>(
    corpsTexte ? corpsTexte : ""
  );
  const [modifierCorpsExtraitParams, setModifierCorpsExtraitParams] =
    useState<IModifierCorpsExtraitParams>();
  const [generationECParams, setGenerationECParams] =
    useState<IGenerationECParams>();

  const resultatModifierCorpsExtrait = useModifierCorpsExtrait(
    modifierCorpsExtraitParams
  );

  const resultatGenerationEC = useGenerationEC(generationECParams);

  function handleChangeText(e: any) {
    setCorpsTexteNew(e.target.value);
  }

  function reinitialisation() {
    setCorpsTexteNew(corpsTexte ? corpsTexte : "");
  }

  function valider() {
    setModifierCorpsExtraitParams({
      idActe: props.acte.id,
      corpsTexteModifie: corpsTexteNew,
      type: getTypeExtrait(props.document.typeDocument)
    });
  }

  useEffect(() => {
    if (resultatModifierCorpsExtrait && resultatModifierCorpsExtrait.resultat) {
      setGenerationECParams({
        idActe: props.acte.id,
        requete: props.requete,
        validation: props.document.validation
          ? props.document.validation
          : Validation.O,
        mentionsRetirees: props.document.mentionsRetirees
          ? props.document.mentionsRetirees.map(el => el.idMention)
          : [],
        pasDAction: true,
        choixDelivrance: props.requete.choixDelivrance
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatModifierCorpsExtrait]);

  useEffect(() => {
    if (
      resultatGenerationEC &&
      resultatGenerationEC.resultGenerationUnDocument
    ) {
      props.handleDocumentEnregistre(DocumentEC.Principal);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC]);

  return (
    <div className="ModifierCorpsExtrait">
      <div className="DeuxColonnes">
        <StaticField
          libelle={getLibelle("Délivrance")}
          valeur={getTypeExtrait(props.document.nom).libelle}
        ></StaticField>
        <StaticField
          libelle={getLibelle("Nature")}
          valeur={props.acte.nature.libelle}
        ></StaticField>
        <StaticField
          libelle={getLibelle("Référence")}
          valeur={FicheActe.getReference(props.acte)}
        ></StaticField>
      </div>
      <textarea
        onChange={handleChangeText}
        placeholder={getLibelle("Corps de l'extrait")}
        value={corpsTexteNew}
      ></textarea>
      <ReinitialiserValiderBoutons
        reInitialiserDisabled={!corpsModifie(corpsTexteNew, corpsTexte)}
        validerDisabled={corpsNonModifierOuCorpsVide(corpsTexteNew, corpsTexte)}
        onClickReInitialiser={reinitialisation}
        onClickValider={valider}
      />
    </div>
  );
};

export function getTypeExtrait(typeDocument: string): TypeExtrait {
  return DocumentDelivrance.typeDocumentCorrespondACode(
    typeDocument,
    CODE_EXTRAIT_AVEC_FILIATION
  )
    ? TypeExtrait.getEnumFor(CODE_EXTRAIT_AVEC_FILIATION)
    : TypeExtrait.getEnumFor(CODE_EXTRAIT_SANS_FILIATION);
}

export function getCorpsTexte(
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  document: IDocumentReponse
) {
  const composition = creationCompositionExtraitCopieActeTexte(
    acte,
    requete,
    document.validation ? document.validation : Validation.O,
    document.mentionsRetirees
      ? document.mentionsRetirees.map(el => el.idMention)
      : []
  );
  return composition.corps_texte;
}

export function corpsNonModifierOuCorpsVide(
  corpsTexteNew: string,
  corpsTexte?: string
) {
  return !corpsModifie(corpsTexteNew, corpsTexte) || corpsTexteNew === "";
}

export function corpsModifie(corpsTexteNew: string, corpsTexte?: string) {
  return corpsTexte !== corpsTexteNew;
}
