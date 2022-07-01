import React from "react";
import Labels, { REQUETE, SDANF } from "../../Labels";
import { formatLigne } from "../Formatages";
import Item, { AccordeonInfos } from "./Item";
import { ItemLigne } from "./ItemLigne";

export interface ItemRequeteProps {
  numeros: {
    rece?: string;
    dila?: string;
    ancienSI?: string;
    requeteLiee?: string;
  };
  sousType: string;
  natureDANF?: string;
  SDANF: {
    statut?: string;
    dateDepot?: number;
    datePriseEnCharge?: number;
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
    props.numeros.dila && `n° ${props.numeros.dila}`,
    props.numeros.ancienSI && `n° ${props.numeros.ancienSI}`
  ]);

  const specificite = formatLigne([
    props.demandes.identification && Labels.identification,
    props.demandes.francisation && Labels.francisation,
    props.dossierSignaleInfos && Labels.signale,
    props.campagneInfos && Labels.campagne
  ]);

  const specificitePoint = `  •  ${specificite}`;
  const texteSpecificite = `${props.natureDANF}${
    specificite ? specificitePoint : ""
  }`;

  return (
    <Item
      titre={`${REQUETE} ${numerosRequete}`}
      visible={numerosRequete !== undefined}
    >
      <ItemLigne label={Labels.requete.sousType} texte={props.sousType} />
      <ItemLigne
        label={Labels.requete.liee}
        texte={`N° ${props.numeros.requeteLiee}`}
        visible={props.numeros.requeteLiee !== undefined}
      />
      <AccordeonInfos titre={Labels.infos.specifiques} etendu={false}>
        <ItemLigne
          classNameTexte="bold"
          texte={texteSpecificite}
          visible={props.natureDANF !== undefined}
        />
        <ItemLigne label={Labels.SDANF.statut} texte={props.SDANF.statut} />
        <ItemLigne
          texte={`Déposée le ${props.SDANF.dateDepot}`}
          visible={props.SDANF.dateDepot !== undefined}
        />
        <ItemLigne
          texte={`Prise en charge ${SDANF} le ${props.SDANF.datePriseEnCharge}`}
          visible={props.SDANF.datePriseEnCharge !== undefined}
        />
        <ItemLigne texte={props.SDANF.mailAgent} />
        <ItemLigne label={Labels.SDANF.decision} texte={props.SDANF.decision} />
      </AccordeonInfos>
      <AccordeonInfos titre={Labels.requerant} etendu={false}>
        <ItemLigne label={Labels.institutionnel} texte={props.nomInstitution} />
      </AccordeonInfos>
    </Item>
  );
};

export default ItemRequete;
