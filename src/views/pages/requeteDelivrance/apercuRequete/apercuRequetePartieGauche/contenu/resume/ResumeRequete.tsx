import { ListePiecesJointes } from "@composant/piecesJointes/ListePiecesJointes";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypePieceJointe } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { mAppartient } from "@model/agent/IOfficier";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IPieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import {
  receUrl,
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID,
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID
} from "@router/ReceUrls";
import { FenetreExterne } from "@util/FenetreExterne";
import { getUrlWithParam } from "@util/route/routeUtil";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { DetailRequetePage } from "../../../../detailRequete/DetailRequetePage";
import { ResumeRequetePartieHaute } from "./ResumeRequetePartieHaute";
import { ResumeRequeteType } from "./ResumeRequeteType";
import "./scss/ResumeRequete.scss";

export const titreDetail = "Détails de requête";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
}

const width = 1100;
const height = 600;

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const history = useHistory();
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);

  const onClickNumero = () => {
    setFenetreExterne(true);
  };

  const onClose = () => {
    setFenetreExterne(false);
  };

  const onModificationRequete = () => {
    let url;

    if (SousTypeDelivrance.estRDC(props.requete.sousType)) {
      url = URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID;
    } else {
      url = URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID;
    }

    if (url) {
      receUrl.replaceUrl(history, getUrlWithParam(url, props.requete.id));
    }
  };

  const afficherBoutonModifierRequete =
    mAppartient(props.requete.idUtilisateur) &&
    SousTypeDelivrance.estRDCouRDCSC(props.requete.sousType) &&
    StatutRequete.estPriseEnCharge(props.requete.statutCourant.statut);

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>
            {`Description requête `}
            <span className="LinkNumeroRequete" onClick={onClickNumero}>
              {props.requete.numero}
            </span>
          </span>
        </div>
        {props.requete && (
          <div className="PanelsResumeRequete">
            <ResumeRequetePartieHaute requete={props.requete} />

            <hr className={"separation"} />

            <ListePiecesJointes
              pieces={mapPiecesJustificatives(
                props.requete.piecesJustificatives
              )}
              numRequete={props.requete.numero}
              titre="Pièces Justificatives"
            />

            {afficherBoutonModifierRequete && (
              <Bouton
                type="button"
                onClick={onModificationRequete}
                aria-label="Modifier"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="iconModifierRequete"
                />
                {getLibelle("Modifier la requête")}
              </Bouton>
            )}
          </div>
        )}
      </div>
      <ResumeRequeteType
        provenanceRequete={props.requete.provenanceRequete}
        sousType={props.requete.sousType}
        statut={props.requete.statutCourant.statut}
      />
      {fenetreExterne && (
        <FenetreExterne
          titre={`Détails requête : N°${props.requete.numero}`}
          onCloseHandler={onClose}
          height={height}
          width={width}
        >
          <DetailRequetePage idRequeteAAfficher={props.requete.id} />
        </FenetreExterne>
      )}
    </>
  );
};

function mapPiecesJustificatives(
  pieces?: IPieceJustificative[]
): IPieceJointe[] {
  return pieces
    ? pieces.map(piece => ({
        id: piece.id,
        libelle: piece.typePieceJustificative.libelle,
        nom: piece.nom,
        typePiece: TypePieceJointe.PIECE_JUSTIFICATIVE
      }))
    : [];
}
