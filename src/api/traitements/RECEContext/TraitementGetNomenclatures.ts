import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { MandataireRc } from "@model/etatcivil/enum/MandataireRc";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { useEffect, useState } from "react";
import { TRAITEMENT_SANS_ERREUR, TRAITEMENT_SANS_REPONSE, TTraitementApi } from "../TTraitementApi";

interface IAppelsNomenclatures {
  // Nomenclatures EtatCivil
  natureRc: boolean;
  natureRca: boolean;
  natureMention: boolean;
  mandataireRc: boolean;
  typeAlerte: boolean;
  typeMention: boolean;
  typePopinSignature: boolean;
  // Nomenclatures Requete
  documentDelivrance: boolean;
  typePieceJustificative: boolean;
  paysSecabilite: boolean;
  // Parametre Base Requete
  parametreBaseRequete: boolean;
}

export const TRAITEMENT_GET_NOMENCLATURES: TTraitementApi = {
  Lancer: terminerTraitement => {
    const [appelsTermines, setAppelsTermines] = useState<IAppelsNomenclatures>({
      // Nomenclatures EtatCivil
      natureRc: false,
      natureRca: false,
      natureMention: false,
      mandataireRc: false,
      typeAlerte: false,
      typeMention: false,
      typePopinSignature: false,
      // Nomenclatures Requete
      documentDelivrance: false,
      typePieceJustificative: false,
      paysSecabilite: false,
      // Parametre Base Requete
      parametreBaseRequete: false
    });

    const finAppel = (nomenclature: keyof IAppelsNomenclatures) =>
      setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, [nomenclature]: true }));

    const lancer = () => {
      NatureRc.init().finally(() => finAppel("natureRc"));
      NatureRca.init().finally(() => finAppel("natureRca"));
      NatureMention.init().finally(() => finAppel("natureMention"));
      MandataireRc.init().finally(() => finAppel("mandataireRc"));
      TypeAlerte.init().finally(() => finAppel("typeAlerte"));
      TypeMention.init().finally(() => finAppel("typeMention"));
      TypePopinSignature.init().finally(() => finAppel("typePopinSignature"));
      DocumentDelivrance.init().finally(() => finAppel("documentDelivrance"));
      TypePieceJustificative.init().finally(() => finAppel("typePieceJustificative"));
      PaysSecabilite.init().finally(() => finAppel("paysSecabilite"));
      ParametreBaseRequete.init().finally(() => finAppel("parametreBaseRequete"));
    };

    useEffect(() => {
      const traitementEnCours = Object.values(appelsTermines).some(appelTermine => appelTermine === false);
      if (traitementEnCours) {
        return;
      }

      terminerTraitement();
    }, [appelsTermines]);

    return { lancer, erreurTraitement: TRAITEMENT_SANS_ERREUR, reponseTraitement: TRAITEMENT_SANS_REPONSE };
  }
};
