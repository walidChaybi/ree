import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { ITransfertPopinForm, TransfertPopin } from "@views/common/composant/menuTransfert/TransfertPopin";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@views/common/hook/requete/CreationActionMiseAjourStatutHook";
import { IRegenerationDocumentsParams, useRegenerationDocumentsHook } from "@views/common/hook/requete/RegenerationDocumentsHook";
import { IRetourValideurParams, useRetourValideurApiHook } from "@views/common/hook/requete/RetourValideur";
import { getDefaultValuesCourrier } from "@views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { mappingRequeteDelivranceToRequeteTableau } from "@views/pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import Bouton from "../../../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../../../commun/bouton/BoutonListeDeroulante";
import { BoutonsTerminer } from "./BoutonsTerminer";

const BoutonsTerminerOuRelecture: React.FC = () => {
  const { requete, acte, rechargerRequete } = useContext(EditionDelivranceContext);

  const [retourParams, setRetourParams] = useState<IRetourValideurParams>();
  const [majStatutParams, setMajStatutParams] = useState<ICreationActionMiseAjourStatutHookParams>();
  const [regenerationParams, setRegenerationParams] = useState<IRegenerationDocumentsParams>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* v8 ignore start : Appelle des hooks de views, pas testable en l'état */
  const onClickReprise = useCallback(
    (statutRequete: keyof typeof EStatutRequete) =>
      setRegenerationParams({
        acte: acte ?? undefined,
        requete,
        regenererCourrier: true,
        valeursCourrierParDefaut: getDefaultValuesCourrier(requete),
        callBack: () =>
          setMajStatutParams({
            statutRequete,
            libelleAction: "Requête reprise",
            requete: mappingRequeteDelivranceToRequeteTableau(requete),
            callback: () => rechargerRequete("requete")
          })
      }),
    [requete, acte, setRegenerationParams, setMajStatutParams]
  );
  /* v8 ignore stop */

  useRegenerationDocumentsHook(regenerationParams);

  useCreationActionMiseAjourStatut(majStatutParams);

  const onClickValidate = useCallback((statut: StatutRequete, texte?: string) => {
    setRetourParams({
      libelleAction: statut === StatutRequete.A_REVOIR ? statut.libelle : `Requête approuvée - ${statut.libelle}`,
      statutDemande: statut.nom,
      requeteId: requete.id,
      texteObservation: statut === StatutRequete.A_REVOIR ? `Requête relue - ${texte ?? ""}` : "Requête approuvée"
    });
  }, []);

  const idActionRetour = useRetourValideurApiHook(retourParams);

  useEffect(() => {
    if (idActionRetour) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idActionRetour]);

  return (
    <>
      {requete.statutCourant.statut === StatutRequete.TRANSMISE_A_VALIDEUR ? (
        <>
          {!SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType) && (
            <Bouton
              styleBouton="secondaire"
              onClick={() => onClickReprise(requete.documentsReponses.some(document => document.avecCtv) ? "A_SIGNER" : "A_VALIDER")}
            >
              Reprendre le traitement
            </Bouton>
          )}
          <BoutonListeDeroulante
            titre="Relecture"
            pointAncrageMenu="haut-droite"
          >
            <Bouton
              onClick={() =>
                onClickValidate(
                  requete.documentsReponses.some(document => document.avecCtv) ? StatutRequete.A_SIGNER : StatutRequete.A_VALIDER
                )
              }
            >
              Relecture approuvée
            </Bouton>
            <Bouton onClick={() => setOpen(true)}>Relecture commentée</Bouton>
          </BoutonListeDeroulante>
        </>
      ) : (
        <BoutonsTerminer
          requete={requete}
          acte={acte ?? undefined}
        />
      )}
      <TransfertPopin
        onValidate={(valeurs: ITransfertPopinForm) => onClickValidate(StatutRequete.A_REVOIR, valeurs.texte)}
        open={open}
        onClose={() => setOpen(false)}
        titre={"Commentaire pour agent requérant"}
        placeholder={"En retour"}
      />
    </>
  );
};

export default BoutonsTerminerOuRelecture;
