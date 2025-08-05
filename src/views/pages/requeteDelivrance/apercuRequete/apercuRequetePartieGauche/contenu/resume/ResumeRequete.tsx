import { ListePiecesJointes } from "@composant/piecesJointes/ListePiecesJointes";
import { RECEContextData } from "@core/contexts/RECEContext";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IPieceJointe, TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import DetailRequetePage from "@pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID, URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID } from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import FenetreExterne from "../../../../../../../composants/commun/conteneurs/FenetreExterne";
import { ResumeRequetePartieHaute } from "./ResumeRequetePartieHaute";
import { ResumeRequeteType } from "./ResumeRequeteType";
import "./scss/ResumeRequete.scss";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
  disabledActions?: boolean;
}

const width = 1100;
const height = 600;

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const navigate = useNavigate();
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);
  const { utilisateurConnecte } = useContext(RECEContextData);

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
      navigate(getUrlWithParam(url, props.requete.id));
    }
  };

  const afficherBoutonModifierRequete =
    utilisateurConnecte.id === props.requete.idUtilisateur &&
    SousTypeDelivrance.estRDCouRDCSC(props.requete.sousType) &&
    StatutRequete.estPriseEnCharge(props.requete.statutCourant.statut) &&
    !props.disabledActions;

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>
            {`Description requête `}
            <span
              className="LinkNumeroRequete"
              onClick={onClickNumero}
            >
              {props.requete.numero}
            </span>
          </span>
        </div>
        {props.requete && (
          <div className="PanelsResumeRequete">
            <ResumeRequetePartieHaute requete={props.requete} />

            <hr className={"separation"} />

            <ListePiecesJointes
              pieces={mapPiecesJustificatives(props.requete.piecesJustificatives)}
              numRequete={props.requete.numero}
              titre="Pièces Justificatives"
            />

            {afficherBoutonModifierRequete && (
              <BoutonDoubleSubmit
                type="button"
                onClick={onModificationRequete}
                aria-label="Modifier"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="iconModifierRequete"
                />
                {"Modifier la requête"}
              </BoutonDoubleSubmit>
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
          apresFermeture={onClose}
          hauteur={height}
          largeur={width}
        >
          <DetailRequetePage requete={props.requete} />
        </FenetreExterne>
      )}
    </>
  );
};

function mapPiecesJustificatives(pieces?: IPieceJustificative[]): IPieceJointe[] {
  return pieces
    ? pieces.map(piece => ({
        id: piece.id,
        libelle: piece.typePieceJustificative?.libelle,
        nom: piece.nom,
        typePiece: TypePieceJointe.PIECE_JUSTIFICATIVE
      }))
    : [];
}
