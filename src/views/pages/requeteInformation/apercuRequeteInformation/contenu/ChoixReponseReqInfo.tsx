import React, { useEffect, useState } from "react";
import { BesoinUsager } from "../../../../../model/requete/v2/enum/BesoinUsager";
import { ComplementObjetRequete } from "../../../../../model/requete/v2/enum/ComplementObjetRequete";
import { ObjetRequete } from "../../../../../model/requete/v2/enum/ObjetRequete";
import { SousTypeInformation } from "../../../../../model/requete/v2/enum/SousTypeInformation";
import { IReponseRequeteInfo } from "../../../../../model/requete/v2/IReponseRequeteInfo";
import { getValeurOuVide } from "../../../../common/util/Utils";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { BoutonReponseLibre } from "./choixReponse/BoutonReponseLibre";
import { MenuReponseClassique } from "./choixReponse/MenuReponseClassique";
import { ReponseReqInfo } from "./choixReponse/ReponseReqInfoForm";
import { useReponsesReqInfoApiHook } from "./hook/ReponsesReqInfoHook";
import { RequeteInfoProps } from "./ResumeReqInfo";
import "./scss/ChoixReponseReqInfo.scss";

export const ChoixReponseReqInfo: React.FC<RequeteInfoProps> = ({
  requete
}) => {
  const SAISIE_LIBRE_REPONSE = {
    id: "",
    libelle: "Saisie libre agent",
    objet: requete.objet.libelle,
    complementObjet: requete.complementObjet.libelle,
    corpsMail: ""
  };

  const [reponseChoisie, setReponseChoisie] =
    useState<IReponseRequeteInfo>(SAISIE_LIBRE_REPONSE);

  const { reponsesReqInfo } = useReponsesReqInfoApiHook();

  useEffect(() => {
    if (requete.sousType === SousTypeInformation.COMPLETION_REQUETE_EN_COURS) {
      const reponseLibre = SAISIE_LIBRE_REPONSE;
      reponseLibre.corpsMail = getValeurOuVide(
        reponsesReqInfo.find(
          (reponse: IReponseRequeteInfo) =>
            reponse.objet === ObjetRequete.COMPLETION_REQUETE_EN_COURS.nom &&
            reponse.complementObjet ===
              ComplementObjetRequete.REPONSE_LIBRE_AGENT.nom
        )?.corpsMail
      );
      setReponseChoisie(reponseLibre);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reponsesReqInfo]);

  const onClick = (reponse: IReponseRequeteInfo) => {
    setReponseChoisie(reponse);
  };

  return (
    <Fieldset titre={getLibelle("Choix de la réponse")}>
      <div>
        {requete.besoinUsager !== BesoinUsager.COMPLETER_DEMANDE &&
          requete.sousType !==
            SousTypeInformation.COMPLETION_REQUETE_EN_COURS && (
            <div className="BoutonsReponse">
              <MenuReponseClassique
                listeReponse={reponsesReqInfo}
                requete={requete}
                onClick={onClick}
              ></MenuReponseClassique>
              <BoutonReponseLibre
                onClick={onClick}
                reponse={SAISIE_LIBRE_REPONSE}
              ></BoutonReponseLibre>
            </div>
          )}
        <ReponseReqInfo reponse={reponseChoisie} requeteId={requete.id} />
      </div>
    </Fieldset>
  );
};
