import React from "react";
import Labels, { UNION, UNION_ACTUELLE } from "../../../../commun/Labels";
import "../scss/ResumeRequeteCreation.scss";
import ItemEffetCollectif, {
  ItemEffetCollectifProps
} from "./items/ItemEffetCollectif";
import ItemEnfantMajeur, {
  ItemEnfantMajeurProps,
  ItemEnfantMajeurProps as ItemFraterieProps
} from "./items/ItemEnfantMajeur";
import ItemFraterie from "./items/ItemFraterie";
import ItemRequete, { ItemRequeteProps } from "./items/ItemRequete";
import ItemTitulaire, { ItemTitulaireProps } from "./items/ItemTitulaire";
import ItemUnion, { ItemUnionProps } from "./items/ItemUnion";

export interface ResumeRequeteCreationEtablissementProps {
  requete: ItemRequeteProps;
  titulaire?: ItemTitulaireProps;
  union?: ItemUnionProps;
  unionsAnterieurs: ItemUnionProps[];
  effetsCollectifs: ItemEffetCollectifProps[];
  enfantsMajeurs: ItemEnfantMajeurProps[];
  frateries: ItemFraterieProps[];
}

const ResumeRequeteCreationEtablissement: React.FC<
  ResumeRequeteCreationEtablissementProps
> = props => {
  return (
    <>
      <ItemRequete {...props.requete} />

      {props.titulaire && (
        <ItemTitulaire {...props.titulaire} titre={Labels.resume.titulaire} />
      )}

      {props.union && <ItemUnion {...props.union} titre={UNION_ACTUELLE} />}

      {props.unionsAnterieurs.map((union, id) => (
        <ItemUnion
          {...union}
          key={UNION + String(id + 1)}
          titre={Labels.resume.union.anterieur}
          numeroItem={id + 1}
          totalItems={props.unionsAnterieurs.length}
        />
      ))}

      {props.effetsCollectifs.map((effetCollectif, id) => (
        <ItemEffetCollectif
          {...effetCollectif}
          key={Labels.resume.effetCollectif + String(id + 1)}
          titre={Labels.resume.effetCollectif}
          numeroItem={id + 1}
          totalItems={props.effetsCollectifs.length}
        />
      ))}

      {props.enfantsMajeurs.map((enfantMajeur, id) => (
        <ItemEnfantMajeur
          {...enfantMajeur}
          key={Labels.resume.enfant.majeur + String(id + 1)}
          titre={Labels.resume.enfant.majeur}
          numeroItem={id + 1}
          totalItems={props.enfantsMajeurs.length}
          etendu={false}
        />
      ))}

      {props.frateries.map((fraterie, id) => (
        <ItemFraterie
          {...fraterie}
          key={Labels.resume.fraterie + String(id + 1)}
          titre={Labels.resume.fraterie}
          numeroItem={id + 1}
          totalItems={props.frateries.length}
          etendu={false}
        />
      ))}
    </>
  );
};

export default ResumeRequeteCreationEtablissement;
