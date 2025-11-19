import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { IdentiteType } from "@model/requete/IdentiteType";
import { NationaliteType } from "@model/requete/NationaliteType";
import { Residence } from "@model/requete/enum/Residence";
import { estRenseigne, formatLigne, formatMajusculesMinusculesMotCompose } from "@util/Utils";
import Labels from "../../../../../commun/Labels";
import { formatLigneNationalites } from "../formatages";
import { LigneDateNaissanceAdresse } from "../lignes/LigneDateNaissanceAdresse";
import { LigneFrancisationIdentification } from "../lignes/LigneFrancisationIdentification";
import { formatagePrenoms } from "../mappingIRequeteCreationVersResumeRequeteCreationProps";
import Item, { ItemProps } from "./Item";
import { ItemLigne } from "./ItemLigne";
import { ItemLigneSdanf } from "./ItemLigneSdanf";
import ItemParent, { ItemParentProps } from "./ItemParent";

export interface IItemEnfantMineurProps {
  numeros: {
    requeteLiee?: string;
  };
  identite: IdentiteType;
  naissance: DateCoordonneesType;
  nationalites: NationaliteType[];
  statut?: string;
  residence?: Residence;
  domiciliation?: string;
  parent?: ItemParentProps;
  retenueSdanf?: IRetenueSdanf;
}

const ItemEnfantMineur: React.FC<IItemEnfantMineurProps & ItemProps> = props => {
  const idDeuxiemeParent = 2;

  return (
    <Item {...props}>
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />
      <div className="itemLigneEnfantMineur">
        <ItemLigneSdanf
          separateur={""}
          texteSdanf={props.retenueSdanf?.nomNaissance ? `${props.retenueSdanf?.nomNaissance}` : undefined}
          texteTitulaire={props.identite.noms.naissance ? `${props.identite.noms.naissance}` : undefined}
        />

        <ItemLigneSdanf
          texteSdanf={props.retenueSdanf?.nomUsage ? `(${"Usage :"}${props.retenueSdanf?.nomUsage})` : undefined}
          texteTitulaire={props.identite.noms.usage ? `(${"Usage :"}${props.identite.noms.usage})` : undefined}
          separateurVisible={false}
        />
      </div>
      <div>
        <ItemLigneSdanf
          texteTitulaire={formatLigne(props.identite.prenoms.naissance)}
          texteSdanf={formatLigne(formatagePrenoms(props.retenueSdanf?.prenomsRetenu))}
          separateurVisible={false}
        />
      </div>
      <LigneFrancisationIdentification
        identite={props.identite}
        retenueSdanf={props.retenueSdanf}
      />
      <LigneDateNaissanceAdresse
        naissance={props.naissance}
        retenueSdanf={props.retenueSdanf}
      />
      <ItemLigne
        texte={formatMajusculesMinusculesMotCompose(formatLigneNationalites(props.nationalites)) ?? Labels.resume.nationalite.defaut}
      />
      {props.statut === "Non renseigné" ? (
        <ItemLigne
          label={Labels.resume.effetCollectif}
          texte={props.statut}
        />
      ) : null}
      {props.parent && (
        <ItemParent
          {...props.parent}
          titre={Labels.resume.parent}
          numeroItem={idDeuxiemeParent}
          retenueSdanf={props.parent.retenueSdanf}
          parent2Enfant={true}
        />
      )}
    </Item>
  );
};

export default ItemEnfantMineur;
