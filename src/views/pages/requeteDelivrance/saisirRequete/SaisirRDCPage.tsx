import {
  ADRESSE,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  NATURE_ACTE,
  PIECES_JOINTES,
  REQUERANT,
  REQUETE,
  TITULAIRE1,
  TITULAIRE2,
  TYPE_REQUERANT
} from "@composant/formulaire/ConstantesNomsForm";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  TypeLienRequerant,
  TYPE_LIEN_REQUERANT_POUR_TITULAIRE
} from "@model/requete/enum/TypeLienRequerant";
import {
  TypeRequerantRDC,
  UN_TITULAIRE
} from "@model/requete/enum/TypeRequerantRDC";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { PATH_MODIFIER_RDC } from "@router/ReceUrls";
import { getPiecesJointesNonVides, PieceJointe } from "@util/FileUtils";
import { Options } from "@util/Type";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "@widget/formulaire/Formulaire";
import {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "@widget/formulaire/requete/RequeteForm";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { SaisieRequeteRDC } from "../../../../model/form/delivrance/ISaisirRDCPageForm";
import SaisirRequeteBoutons from "../../../common/composant/formulaire/boutons/SaisirRequeteBoutons";
import {
  getMessagesPopin,
  modificationChamps
} from "./contenu/SaisirRDCPageFonctions";
import {
  getAdresseForm,
  getBoutonsPopin,
  getEvenementForm,
  getLienTitulaireForm,
  getMandantForm,
  getPiecesJointesForm,
  getRequerantForm,
  getRequeteForm,
  getTitulaire1Form,
  getTitulaire2Form
} from "./contenu/SaisirRDCPageForms";
import { mappingRequeteDelivranceVersFormulaireRDC } from "./hook/mappingRequeteDelivranceVersFormulaireRDC";
import { useRedirectionApresSoumissionRDCHook } from "./hook/RedirectionApresSoumissionRDCHook";
import { useSoumissionFormulaireRDCHook } from "./hook/SoumissionFormulaireRDCHook";
import "./scss/SaisirRequetePage.scss";
import {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema
} from "./sousFormulaires/evenement/EvenementForm";
import {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import {
  LienTitulaireFormDefaultValues,
  LienTitulaireFormValidationSchema
} from "./sousFormulaires/lienTitulaire/LienTitulaireForm";
import {
  MandantFormDefaultValues,
  MandantFormValidationSchema
} from "./sousFormulaires/mandant/MandantForm";
import {
  RequerantFormValidationSchema,
  TitulairesFormDefaultValues
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesRDCRequete = {
  [REQUETE]: RequeteFormDefaultValues,
  [EVENEMENT]: EvenementFormDefaultValues,
  [TITULAIRE1]: IdentiteFormDefaultValues,
  [TITULAIRE2]: IdentiteFormDefaultValues,
  [REQUERANT]: TitulairesFormDefaultValues,
  [MANDANT]: MandantFormDefaultValues,
  [LIEN_TITULAIRE]: LienTitulaireFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRDCRequete = Yup.object({
  [REQUETE]: RequeteFormValidationSchema,
  [EVENEMENT]: EvenementFormValidationSchema,
  [TITULAIRE1]: IdentiteFormValidationSchema,
  [TITULAIRE2]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [MANDANT]: MandantFormValidationSchema,
  [LIEN_TITULAIRE]: LienTitulaireFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export const titreForm = SousTypeDelivrance.getEnumFor("RDC").libelle;

export const SaisirRDCPage: React.FC = () => {
  // Parametres
  useTitreDeLaFenetre(titreForm);
  const location = useLocation();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();

  // Informations de la requête
  const [idRequete, setIdRequete] = useState<string>();
  const [requete, setRequete] = useState<SaisieRequeteRDC>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  // Etats champs du formulaire
  const [evenementVisible, setEvenementVisible] = useState<boolean>(false);
  const [titulaire2Visible, setTitulaire2Visible] = useState<boolean>(false);
  const [mandantVisible, setMandantVisible] = useState<boolean>(false);
  const [lienTitulaireVisible, setLienTitulaireVisible] =
    useState<boolean>(true);
  const [optionsRequerant, setOptionsRequerant] = useState<Options>(
    TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE)
  );
  const [optionsLienTitulaire, setOptionsLienTitulaire] = useState<Options>(
    TypeLienRequerant.getListEnumsAsOptions(TYPE_LIEN_REQUERANT_POUR_TITULAIRE)
  );

  // Status saisie
  const [modeModification, setModeModification] = useState<boolean>(false);
  const [donneesIncompletes, setDonneesIncompletes] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] =
    useState<PieceJointe[]>();

  const {
    creationRDCParams,
    miseAJourRDCParams,
    requeteRDCResultat,
    onSubmitSaisieRequeteRDC,
    validerSaisie,
    setEstBrouillon: setIsBrouillon
  } = useSoumissionFormulaireRDCHook(
    setRequete,
    setDonneesIncompletes,
    requete,
    idRequete
  );

  const {
    miseAJourStatutRequetePuisRedirection,
    miseAJourActionPuisRedirection
  } = useRedirectionApresSoumissionRDCHook(
    location.pathname,
    setOperationEnCours,
    creationRDCParams,
    miseAJourRDCParams,
    requeteRDCResultat
  );

  const postPiecesJointesApiResultat = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    requeteRDCResultat?.requete.id,
    piecesjointesAMettreAJour
  );

  useEffect(() => {
    setDetailRequeteParams({
      idRequete,
      estConsultation: false
    });
  }, [idRequete]);

  useEffect(() => {
    if (location) {
      const url = location.pathname;
      setModeModification(url.includes(PATH_MODIFIER_RDC));
    }
  }, [location]);

  useEffect(() => {
    setIdRequete(idRequeteParam);
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      const requeteForm = mappingRequeteDelivranceVersFormulaireRDC(
        detailRequeteState as IRequeteDelivrance
      );

      setRequete(requeteForm);
      onChangeNature(requeteForm[REQUETE][NATURE_ACTE]);
      onChangeRequerant(requeteForm[REQUERANT][TYPE_REQUERANT]);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requeteRDCResultat?.requete) {
      // Une fois la requête créée ou mise à jour, la mise à jour des pièces jointes peut se faire
      // On ne prend que les pjs dont le contenu est renseigné,
      //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde
      //   (la requête ramène ses pièces jointes mais sans le contenu)
      const pjAMettreAjour = getPiecesJointesNonVides(
        requete?.[PIECES_JOINTES]
      );
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else if (modeModification) {
        miseAJourActionPuisRedirection(requeteRDCResultat);
      } else {
        miseAJourStatutRequetePuisRedirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDCResultat]);

  useEffect(() => {
    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectuées
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      if (modeModification) {
        miseAJourActionPuisRedirection(requeteRDCResultat);
      } else {
        miseAJourStatutRequetePuisRedirection();
      }
    } else if (postPiecesJointesApiResultat?.erreur) {
      setOperationEnCours(false);
      setIdRequete(requeteRDCResultat?.requete.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPiecesJointesApiResultat]);

  const onChangeNature = (nature: string) => {
    const enumNatureActe = NatureActeRequete.getEnumFor(nature);
    setEvenementVisible(!NatureActeRequete.estNaissance(enumNatureActe));
    setTitulaire2Visible(NatureActeRequete.estMariage(enumNatureActe));
    setOptionsRequerant(
      NatureActeRequete.estMariage(enumNatureActe)
        ? TypeRequerantRDC.getAllEnumsAsOptions()
        : TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE)
    );
  };

  const onChangeRequerant = (typeRequerant: string) => {
    modificationChamps(
      typeRequerant,
      setMandantVisible,
      setLienTitulaireVisible,
      setOptionsLienTitulaire
    );
  };

  const blocsForm: JSX.Element[] = [
    getRequeteForm(onChangeNature),
    getEvenementForm(evenementVisible),
    getTitulaire1Form(detailRequeteState),
    getTitulaire2Form(detailRequeteState, titulaire2Visible),
    getRequerantForm(detailRequeteState, optionsRequerant, onChangeRequerant),
    getMandantForm(mandantVisible),
    getLienTitulaireForm(lienTitulaireVisible, optionsLienTitulaire),
    getAdresseForm(),
    getPiecesJointesForm()
  ];

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <Formulaire
        titre={titreForm}
        formDefaultValues={requete ?? { ...DefaultValuesRDCRequete }}
        formValidationSchema={ValidationSchemaRDCRequete.clone()}
        onSubmit={onSubmitSaisieRequeteRDC}
        className="FormulaireSaisirRDC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons
          setIsBrouillon={setIsBrouillon}
          modeModification={modeModification}
        />
      </Formulaire>
      <ConfirmationPopin
        isOpen={donneesIncompletes}
        messages={getMessagesPopin()}
        boutons={getBoutonsPopin(validerSaisie, setDonneesIncompletes)}
      />
    </>
  );
};
