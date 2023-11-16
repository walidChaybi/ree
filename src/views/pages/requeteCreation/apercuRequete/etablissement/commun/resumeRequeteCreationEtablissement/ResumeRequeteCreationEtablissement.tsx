import { UN } from "@util/Utils";
import React from "react";
import Labels, { UNION, UNION_ACTUELLE } from "../../../../commun/Labels";
import "../scss/ResumeRequeteCreation.scss";
import ItemEnfantMajeur, {
  ItemEnfantMajeurProps
} from "./items/ItemEnfantMajeur";
import ItemEnfantMineur, {
  ItemEnfantMineurProps
} from "./items/ItemEnfantMineur";
import ItemFraterie, { ItemFraterieProps } from "./items/ItemFraterie";
import ItemRequete, { ItemRequeteProps } from "./items/ItemRequete";
import ItemTitulaire, { ItemTitulaireProps } from "./items/ItemTitulaire";
import ItemUnion, { ItemUnionProps } from "./items/ItemUnion";

export interface ResumeRequeteCreationEtablissementProps {
  requete: ItemRequeteProps;
  titulaire?: ItemTitulaireProps;
  union?: ItemUnionProps;
  unionsAnterieurs: ItemUnionProps[];
  effetsCollectifs: ItemEnfantMineurProps[];
  enfantsMineursHorsEffetCollectif: ItemEnfantMineurProps[];
  enfantsMineursAttenteSDANF: ItemEnfantMineurProps[];
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
          key={UNION + String(id + UN)}
          titre={Labels.resume.union.anterieur}
          numeroItem={id + UN}
          totalItems={props.unionsAnterieurs.length}
        />
      ))}

      {props.effetsCollectifs.map((effetCollectif, id) => (
        <ItemEnfantMineur
          {...effetCollectif}
          key={Labels.resume.effetCollectif + String(id + UN)}
          titre={Labels.resume.effetCollectif}
          numeroItem={id + UN}
          totalItems={props.effetsCollectifs.length}
        />
      ))}

      {props.enfantsMineursHorsEffetCollectif.map(
        (enfantMineurHorsEffetCollectif, id) => (
          <ItemEnfantMineur
            {...enfantMineurHorsEffetCollectif}
            key={Labels.resume.enfantMineurHorsEffetCollectif + String(id + UN)}
            titre={Labels.resume.enfantMineurHorsEffetCollectif}
            numeroItem={id + UN}
            totalItems={props.enfantsMineursHorsEffetCollectif.length}
          />
        )
      )}

      {props.enfantsMineursAttenteSDANF.map((enfantMineurAttenteSDANF, id) => (
        <ItemEnfantMineur
          {...enfantMineurAttenteSDANF}
          key={Labels.resume.enfantMineurAttenteSDANF + String(id + UN)}
          titre={Labels.resume.enfantMineurAttenteSDANF}
          numeroItem={id + UN}
          totalItems={props.enfantsMineursAttenteSDANF.length}
        />
      ))}

      {props.enfantsMajeurs.map((enfantMajeur, id) => (
        <ItemEnfantMajeur
          {...enfantMajeur}
          key={Labels.resume.enfant.majeur + String(id + UN)}
          titre={Labels.resume.enfant.majeur}
          numeroItem={id + UN}
          totalItems={props.enfantsMajeurs.length}
          etendu={false}
        />
      ))}

      {props.frateries.map((fraterie, id) => (
        <ItemFraterie
          {...fraterie}
          key={Labels.resume.fraterie + String(id + UN)}
          titre={Labels.resume.fraterie}
          numeroItem={id + UN}
          totalItems={props.frateries.length}
          etendu={false}
        />
      ))}
    </>
  );
};

export default ResumeRequeteCreationEtablissement;
