import React, { useEffect, useState } from "react";
import { BesoinUsager } from "../../../../../model/requete/v2/enum/BesoinUsager";
import { IReponseRequeteInfo } from "../../../../../model/requete/v2/IReponseRequeteInfo";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { MenuReponseClassique } from "./choixReponse/MenuReponseClassique";
import { ReponseReqInfo } from "./choixReponse/ReponseReqInfoForm";
import { useReponsesReqInfoApiHook } from "./hook/ReponsesReqInfoHook";
import { RequeteInfoProps } from "./ResumeReqInfo";
import "./scss/ChoixReponseReqInfo.scss";

export const ChoixReponseReqInfo: React.FC<RequeteInfoProps> = ({
  requete
}) => {
  const [reponseChoisie, setReponeChoisie] = useState<IReponseRequeteInfo>();
  const [reponsesFiltees, setReponsesFiltees] = useState<
    IReponseRequeteInfo[]
  >();

  const { reponsesReqInfo } = useReponsesReqInfoApiHook();

  useEffect(() => {
    if (reponsesReqInfo) {
      setReponsesFiltees(
        reponsesReqInfo.filter(
          reponse =>
            reponse.objet === requete.objet.nom &&
            reponse.complementObjet === requete.complementObjet.nom
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reponsesReqInfo]);

  const onClick = (reponse: IReponseRequeteInfo) => {
    setReponeChoisie(reponse);
  };

  return (
    <Fieldset titre={getLibelle("Choix de la réponse")}>
      <div>
        {requete.besoinUsager !== BesoinUsager.COMPLETER_DEMANDE && (
          <div className="BoutonsReponse">
            <MenuReponseClassique
              listeReponse={reponsesFiltees}
              onClick={onClick}
            ></MenuReponseClassique>
            <div className="MenuReponse">
              <button disabled>{getLibelle("Saisie Libre")}</button>
            </div>
          </div>
        )}
        <ReponseReqInfo reponse={reponseChoisie} />
      </div>
    </Fieldset>
  );
};
