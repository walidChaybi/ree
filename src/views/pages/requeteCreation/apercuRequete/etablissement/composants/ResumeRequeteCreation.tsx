import React from "react";
import Labels, { UNION, UNION_ACTUELLE } from "../../../commun/Labels";
import ItemEffetCollectif, {
  ItemEffetCollectifProps
} from "./item/ItemEffetCollectif";
import ItemEnfantMajeur, {
  ItemEnfantMajeurProps,
  ItemEnfantMajeurProps as ItemFraterieProps
} from "./item/ItemEnfantMajeur";
import ItemFraterie from "./item/ItemFraterie";
import ItemRequete, { ItemRequeteProps } from "./item/ItemRequete";
import ItemTitulaire, {
  ItemTitulaireProps
} from "./item/itemTitulaire/ItemTitulaire";
import ItemUnion, { ItemUnionProps } from "./item/ItemUnion";
import "./scss/ResumeRequeteCreation.scss";

export interface ResumeRequeteCreationProps {
  requete: ItemRequeteProps;
  titulaire?: ItemTitulaireProps;
  union?: ItemUnionProps;
  unionsAnterieurs: ItemUnionProps[];
  effetsCollectifs: ItemEffetCollectifProps[];
  enfantsMajeurs: ItemEnfantMajeurProps[];
  frateries: ItemFraterieProps[];
}

const ResumeRequeteCreation: React.FC<ResumeRequeteCreationProps> = props => {
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

export default ResumeRequeteCreation;
