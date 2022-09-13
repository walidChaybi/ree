import { estRenseigne } from "@util/Utils";
import React from "react";
import Labels, { REQUETE, SDANF } from "../../Labels";
import { formatLigne, formatLigneSpecificite } from "../Formatages";
import Item from "./Item";
import { ItemInfoBulle } from "./ItemInfoBulle";
import { ItemLigne } from "./ItemLigne";

export interface ItemRequeteProps {
  numeros: {
    rece?: string;
    sdanf?: string;
    dila?: string;
    ancienSI?: string;
    requeteLiee?: string;
  };
  sousType: string;
  natureDANF?: string;
  SDANF: {
    statut?: string;
    dateDepot?: string;
    datePriseEnCharge?: string;
    mailAgent?: string;
    decision?: string;
  };
  demandes: {
    francisation?: boolean;
    identification?: boolean;
  };
  dossierSignaleInfos?: string;
  campagneInfos?: string;
  nomInstitution?: string;
}

const ItemRequete: React.FC<ItemRequeteProps> = props => {
  const numerosRequete = formatLigne([
    props.numeros.rece && `n° ${props.numeros.rece}`,
    props.numeros.sdanf && `n° ${props.numeros.sdanf}`,
    props.numeros.dila && `n° ${props.numeros.dila}`,
    props.numeros.ancienSI && `n° ${props.numeros.ancienSI}`
  ]);

  const specificite = formatLigneSpecificite([
    props.demandes.identification && Labels.resume.identification,
    props.demandes.francisation && Labels.resume.francisation,
    props.dossierSignaleInfos && (
      <ItemInfoBulle
        key={Labels.resume.signale}
        label={Labels.resume.signale}
        texte={props.dossierSignaleInfos}
      />
    ),
    props.campagneInfos && (
      <ItemInfoBulle
        key={Labels.resume.campagne}
        label={Labels.resume.campagne}
        texte={props.campagneInfos}
      />
    )
  ]);

  const texteSpecificite = formatLigneSpecificite(
    [props.natureDANF, specificite],
    " • "
  );

  return (
    <Item
      titre={`${REQUETE} ${numerosRequete}`}
      visible={estRenseigne(numerosRequete)}
      etendu={estRenseigne(props.numeros.requeteLiee)}
    >
      <ItemLigne
        label={Labels.resume.requete.sousType}
        texte={props.sousType}
      />
      <ItemLigne
        label={Labels.resume.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={estRenseigne(props.numeros.requeteLiee)}
      />
      <Item
        titre={Labels.resume.infos.specifiques}
        className={{ title: "bg-clair" }}
        etendu={false}
      >
        <ItemLigne
          classNameTexte="bold"
          texte={texteSpecificite}
          visible={estRenseigne(props.natureDANF)}
        />
        <ItemLigne
          label={Labels.resume.SDANF.statut}
          texte={props.SDANF.statut}
        />
        <ItemLigne
          texte={`Déposée le ${props.SDANF.dateDepot}`}
          visible={estRenseigne(props.SDANF.dateDepot)}
        />
        <ItemLigne
          texte={`Prise en charge ${SDANF} le ${props.SDANF.datePriseEnCharge}`}
          visible={estRenseigne(props.SDANF.datePriseEnCharge)}
        />
        <ItemLigne texte={props.SDANF.mailAgent} />
        <ItemLigne
          label={Labels.resume.SDANF.decision}
          texte={props.SDANF.decision}
        />
      </Item>
      <Item
        titre={Labels.resume.requerant}
        className={{ title: "bg-clair" }}
        etendu={false}
        visible={estRenseigne(props.nomInstitution)}
      >
        <ItemLigne
          label={Labels.resume.institutionnel}
          texte={props.nomInstitution}
        />
      </Item>
    </Item>
  );
};

export default ItemRequete;
