import {
  IGetEntitesFillesParams,
  useGetEntitesFillesRecurivementHookApi
} from "@hook/agent/GetEntitesFillesRecurivementHookApi";
import { Entite } from "@model/agent/IEntiteRattachement";
import { Option } from "@util/Type";
import React, { useEffect, useState } from "react";
import { ListChoixPopin } from "../../widget/popin/listChoixPopin/ListChoixPopin";
import { estNonRenseigne, getLibelle } from "./../../util/Utils";

interface IChoixEntitesPopinProps {
  ouverte: boolean;
  idEntiteMere?: string;
  onEntiteChoisie: (idEntite?: string, libelleEntite?: string) => void;
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
  const entitesFillesTrouvees = useGetEntitesFillesRecurivementHookApi(
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
      onValidation={(option?: Option) =>
        props.onEntiteChoisie(option?.value, option?.str)
      }
      onCancel={props.onCancel}
    />
  );
};
