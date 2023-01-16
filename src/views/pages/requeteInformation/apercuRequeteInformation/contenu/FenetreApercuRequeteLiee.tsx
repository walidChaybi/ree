import { Link } from "@mui/material";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { FenetreExterne } from "@util/FenetreExterne";
import React, { useState } from "react";
import { ApercuRequetePage } from "../../../requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "../ApercuReqInfoPage";

const width = 1100;
const height = 600;

interface FenetreApercuRequeteLieeProps {
  idRequeteLiee: string;
  numeroRequeteLiee: string;
  typeRequeteLiee: TypeRequete;
}

export const FenetreApercuRequeteLiee: React.FC<
  FenetreApercuRequeteLieeProps
> = props => {
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);

  const onClickNumero = () => {
    setFenetreExterne(true);
  };

  const onClose = () => {
    setFenetreExterne(false);
  };

  const navigationRequeteLiee = (type: TypeRequete, id: string) => {
    if (type === TypeRequete.INFORMATION) {
      return <ApercuReqInfoPage idRequeteAAfficher={props.idRequeteLiee} />;
    } else {
      return <ApercuRequetePage idRequeteAAfficher={props.idRequeteLiee} />;
    }
  };

  return <>
    <Link
      className={"lienFiche"}
      href={"#"}
      onClick={onClickNumero}
      underline="hover">
      {props.numeroRequeteLiee}
    </Link>

    {fenetreExterne && (
      <FenetreExterne
        titre={`Aperçu requête : N°${props.numeroRequeteLiee}`}
        onCloseHandler={onClose}
        height={height}
        width={width}
      >
        {navigationRequeteLiee(props.typeRequeteLiee, props.idRequeteLiee)}
      </FenetreExterne>
    )}
  </>;
};
