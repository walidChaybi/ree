import {
  IGetServicesFilsParams,
  useGetServicesFilsRecursivementHookApi
} from "@hook/agent/GetServicesFilsRecursivementHookApi";
import { Service } from "@model/agent/IService";
import React, { useEffect, useState } from "react";
import { estNonRenseigne, getLibelle } from "../../util/Utils";
import { ListChoixPopin } from "../../widget/popin/listChoixPopin/ListChoixPopin";

interface IChoixServicesPopinProps {
  ouverte: boolean;
  idServiceParent?: string;
  onServiceChoisi: (idService?: string) => void;
  onCancel: () => void;
}

export const ChoixServicesPopin: React.FunctionComponent<
  IChoixServicesPopinProps
> = props => {
  // States
  //////////////////////////////////////////////////////////////////////////
  const [paramsGetServicesFils, setParamsGetServicesFils] =
    useState<IGetServicesFilsParams>();

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const servicesFilsTrouves = useGetServicesFilsRecursivementHookApi(
    paramsGetServicesFils
  );

  // UseEffects
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (
      props.ouverte &&
      props.idServiceParent &&
      estNonRenseigne(servicesFilsTrouves?.servicesFils)
    ) {
      setParamsGetServicesFils({ idServiceParent: props.idServiceParent });
    }
  }, [props.ouverte, props.idServiceParent, servicesFilsTrouves]);

  return (
    <ListChoixPopin
      titre={getLibelle("Choisissez un service")}
      placeholder={getLibelle("Services")}
      ariaLabel={getLibelle("Choix des services")}
      ouverte={props.ouverte}
      options={Service.mapCommeOptions(servicesFilsTrouves?.servicesFils)}
      onValidation={props.onServiceChoisi}
      onCancel={props.onCancel}
    />
  );
};
