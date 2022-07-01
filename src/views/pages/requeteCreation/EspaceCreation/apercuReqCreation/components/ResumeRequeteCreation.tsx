import React, { useState } from "react";
import Labels, { UNION } from "../Labels";
import ItemEffetCollectif, {
  ItemEffetCollectifProps
} from "./Item/ItemEffetCollectif";
import ItemEnfantMajeur, {
  ItemEnfantMajeurProps,
  ItemEnfantMajeurProps as ItemFraterieProps
} from "./Item/ItemEnfantMajeur";
import ItemFraterie from "./Item/ItemFraterie";
import ItemRequete, { ItemRequeteProps } from "./Item/ItemRequete";
import ItemTitulaire, { ItemTitulaireProps } from "./Item/ItemTitulaire";
import ItemUnion, { ItemUnionProps } from "./Item/ItemUnion";
import "./scss/ResumeRequeteCreation.scss";
import Titre from "./Titre";

export interface ResumeRequeteCreationProps {
  requete: ItemRequeteProps;
  postulant?: ItemTitulaireProps;
  unions: ItemUnionProps[];
  effetsCollectifs: ItemEffetCollectifProps[];
  enfantsMajeurs: ItemEnfantMajeurProps[];
  frateries: ItemFraterieProps[];
}

const ResumeRequeteCreation: React.FC<ResumeRequeteCreationProps> = props => {
  const [pleinEcran, setPleinEcran] = useState<boolean>(false);

  return (
    <div className={`ResumeRequeteCreation ${pleinEcran ? "pleinEcran" : ""}`}>
      <Titre
        label={Labels.requete.description}
        pleinEcran={pleinEcran}
        setPleinEcran={setPleinEcran}
      />

      <div className="ResumerACacherEnPleinEcran">
        <ItemRequete {...props.requete} />

        {props.postulant && (
          <ItemTitulaire {...props.postulant} titre={Labels.titulaire} />
        )}

        {props.unions.map((union, id) => (
          <ItemUnion
            {...union}
            key={UNION + String(id + 1)}
            titre={union.mariage || union.PACS ? UNION : Labels.union.anterieur}
            numeroItem={id + 1}
            totalItems={props.effetsCollectifs.length}
          />
        ))}

        {props.effetsCollectifs.map((effetCollectif, id) => (
          <ItemEffetCollectif
            {...effetCollectif}
            key={Labels.effetCollectif + String(id + 1)}
            titre={Labels.effetCollectif}
            numeroItem={id + 1}
            totalItems={props.effetsCollectifs.length}
          />
        ))}

        {props.enfantsMajeurs.map((enfantMajeur, id) => (
          <ItemEnfantMajeur
            {...enfantMajeur}
            key={Labels.enfant.majeur + String(id + 1)}
            titre={Labels.enfant.majeur}
            numeroItem={id + 1}
            totalItems={props.enfantsMajeurs.length}
          />
        ))}

        {props.frateries.map((fraterie, id) => (
          <ItemFraterie
            {...fraterie}
            key={Labels.fraterie + String(id + 1)}
            titre={Labels.fraterie}
            numeroItem={id + 1}
            totalItems={props.frateries.length}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeRequeteCreation;
