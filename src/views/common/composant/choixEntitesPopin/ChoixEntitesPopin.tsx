import {
  IGetEntitesFillesParams,
  useGetEntitesFillesRecursivementHookApi
} from "@hook/agent/GetEntitesFillesRecursivementHookApi";
import { Entite } from "@model/agent/IEntiteRattachement";
import React, { useEffect, useState } from "react";
import { ListChoixPopin } from "../../widget/popin/listChoixPopin/ListChoixPopin";
import { estNonRenseigne, getLibelle } from "./../../util/Utils";

interface IChoixEntitesPopinProps {
  ouverte: boolean;
  idEntiteMere?: string;
  onEntiteChoisie: (idEntite?: string) => void;
  onCancel: () => void;
}

export const ChoixEntitePopin: React.FunctionComponent<
  IChoixEntitesPopinProps
> = props => {
  // States
  //////////////////////////////////////////////////////////////////////////
  const [paramsGetEntitesFilles, setParamsGetEntitesFilles] =
    useState<IGetEntitesFillesParams>();

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const entitesFillesTrouvees = useGetEntitesFillesRecursivementHookApi(
    paramsGetEntitesFilles
  );

  // UseEffects
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (
      props.ouverte &&
      props.idEntiteMere &&
      estNonRenseigne(entitesFillesTrouvees?.entitesFilles)
    ) {
      setParamsGetEntitesFilles({ idEntiteMere: props.idEntiteMere });
    }
  }, [props.ouverte, props.idEntiteMere, entitesFillesTrouvees]);

  return (
    <ListChoixPopin
      titre={getLibelle("Choisissez une entité")}
      placeholder={getLibelle("Entités")}
      ariaLabel={getLibelle("Choix des entités")}
      ouverte={props.ouverte}
      options={Entite.mapCommeOptions(entitesFillesTrouvees?.entitesFilles)}
      onValidation={props.onEntiteChoisie}
      onCancel={props.onCancel}
    />
  );
};
