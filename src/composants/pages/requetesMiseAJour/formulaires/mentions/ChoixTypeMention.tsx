import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Option } from "@util/Type";
import { useContext, useEffect, useMemo, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import { IListeTypeMentionSelectionne } from "./AjoutMentionsMiseAJour";
import { ITypesMentionSelectionne } from "./MiseAJourMentions";

interface IChoixTypeMention {
  natureActe: NatureActe;
  typeMentionSelectionne: ITypesMentionSelectionne | null;
  setTypeMentionSelectionne: React.Dispatch<React.SetStateAction<ITypesMentionSelectionne | null>>;
}

interface IListeTypeMentionDisponible {
  niveau1: Option[];
  niveau2: Option[] | null;
  niveau3: Option[] | null;
}

const LISTES_TYPES_MENTIONS_VIDE = {
  niveau1: null,
  niveau2: null,
  niveau3: null
};

const ChoixTypeMention: React.FC<IChoixTypeMention> = ({ natureActe, typeMentionSelectionne, setTypeMentionSelectionne }) => {
  const { listeMentions, indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);

  const typesMention = useMemo(() => TypeMention.getTypeMentionAsOptions([...TypeMention.getTypeMentionParNatureActe(natureActe)]), []);

  const [typesDisponibles, setTypesDisponibles] = useState<IListeTypeMentionDisponible>({
    ...LISTES_TYPES_MENTIONS_VIDE,
    niveau1: typesMention
  });
  const [typesSelectionnes, setTypesSelectionnes] = useState<IListeTypeMentionSelectionne>(LISTES_TYPES_MENTIONS_VIDE);

  useEffect(() => {
    if (!typeMentionSelectionne) {
      setTypesSelectionnes(LISTES_TYPES_MENTIONS_VIDE);
      setTypesDisponibles({ ...LISTES_TYPES_MENTIONS_VIDE, niveau1: typesMention });
    }
  }, [typeMentionSelectionne]);

  useEffect(() => {
    switch (true) {
      case Boolean(typesSelectionnes.niveau3):
        setTypeMentionSelectionne({ typeMention: typesSelectionnes.niveau3, listeTypeMentionAssociee: typesSelectionnes });
        break;
      case Boolean(typesSelectionnes.niveau2 && !typesSelectionnes.niveau2?.sousTypes):
        setTypeMentionSelectionne({ typeMention: typesSelectionnes.niveau2, listeTypeMentionAssociee: typesSelectionnes });
        break;
      case Boolean(typesSelectionnes.niveau1 && !typesSelectionnes.niveau1?.sousTypes):
        setTypeMentionSelectionne({ typeMention: typesSelectionnes.niveau1, listeTypeMentionAssociee: typesSelectionnes });
        break;
    }
  }, [typesSelectionnes]);

  useEffect(() => {
    if (indexMentionModifiee === undefined) return;

    const { typeMention } = listeMentions[indexMentionModifiee];
    const typeMentionUn = TypeMention.getTypesMention().find(mention => typeMention.idMentionNiveauUn === mention.id) ?? null;
    const typeMentionDeux = typeMentionUn?.sousTypes?.find(mention => typeMention.idMentionNiveauDeux === mention.id) ?? null;
    const typeMentionTrois = typeMentionDeux?.sousTypes?.find(mention => typeMention.idMentionNiveauTrois === mention.id) ?? null;

    setTypesDisponibles({
      niveau1: typesMention,
      niveau2: typeMentionUn?.sousTypes ? TypeMention.getTypeMentionAsOptions(typeMentionUn?.sousTypes) : null,
      niveau3: typeMentionDeux?.sousTypes ? TypeMention.getTypeMentionAsOptions(typeMentionDeux?.sousTypes) : null
    });
    setTypesSelectionnes({
      niveau1: typeMentionUn,
      niveau2: typeMentionDeux,
      niveau3: typeMentionTrois
    });
  }, [indexMentionModifiee]);

  return (
    <div className="grid justify-center space-y-5">
      <span className="text-bleu-sombre">Type mention</span>
      <select
        className="select-rece border-1 h-9 w-[40rem] rounded border border-solid border-gris bg-blanc transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-opacity-70 disabled:bg-gris-clair"
        data-testid="listesTypesMention.mentionNiveauUn"
        onChange={e => {
          const typeMentionSelectionne = TypeMention.getTypesMention().find(mention => e.target.value === mention.id) ?? null;
          setTypesSelectionnes({ ...typesSelectionnes, niveau1: typeMentionSelectionne, niveau2: null, niveau3: null });
          setTypesDisponibles({
            ...typesDisponibles,
            niveau2: typeMentionSelectionne?.sousTypes ? TypeMention.getTypeMentionAsOptions(typeMentionSelectionne?.sousTypes) : null,
            niveau3: null
          });
        }}
      >
        <option
          value=""
          selected
          hidden
        ></option>
        {typesDisponibles.niveau1?.map(type => (
          <option
            key={type.cle}
            value={type.cle}
            selected={typesSelectionnes.niveau1?.id === type.cle}
          >
            {type.libelle}
          </option>
        ))}
      </select>
      {typesDisponibles.niveau2 && (
        <select
          className="select-rece border-1 h-9 w-[40rem] rounded border border-solid border-gris bg-blanc transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-opacity-70 disabled:bg-gris-clair"
          data-testid="listesTypesMention.mentionNiveauDeux"
          onChange={e => {
            const typeMentionSelectionne = typesSelectionnes.niveau1?.sousTypes?.find(mention => mention.id === e.target.value) ?? null;
            setTypesSelectionnes({ ...typesSelectionnes, niveau2: typeMentionSelectionne, niveau3: null });
            setTypesDisponibles({
              ...typesDisponibles,
              niveau3: typeMentionSelectionne?.sousTypes ? TypeMention.getTypeMentionAsOptions(typeMentionSelectionne?.sousTypes) : null
            });
          }}
        >
          <option
            value=""
            selected
            hidden
          ></option>
          {typesDisponibles.niveau2.map(type => (
            <option
              key={type.cle}
              value={type.cle}
              selected={typesSelectionnes.niveau2?.id === type.cle}
            >
              {type.libelle}
            </option>
          ))}
        </select>
      )}
      {typesDisponibles.niveau3 && (
        <select
          className="select-rece border-1 h-9 w-[40rem] rounded border border-solid border-gris bg-blanc transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-opacity-70 disabled:bg-gris-clair"
          data-testid="listesTypesMention.mentionNiveauTrois"
          onChange={e =>
            setTypesSelectionnes({
              ...typesSelectionnes,
              niveau3: typesSelectionnes.niveau2?.sousTypes?.find(mention => mention.id === e.target.value) ?? null
            })
          }
        >
          <option
            value=""
            selected
            hidden
          ></option>
          {typesDisponibles.niveau3.map(type => (
            <option
              key={type.cle}
              value={type.cle}
              selected={typesSelectionnes.niveau3?.id === type.cle}
            >
              {type.libelle}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ChoixTypeMention;
