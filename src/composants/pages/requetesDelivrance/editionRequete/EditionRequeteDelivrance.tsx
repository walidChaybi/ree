import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useContext, useEffect, useRef, useState } from "react";
import { EditionDelivranceContext } from "../../../../contexts/EditionDelivranceContextProvider";
import PartieActeRequete, {
  ECleOngletRequete,
} from "./partieActeRequete/PartieActeRequete";
import PartieDocuments, {
  ECleOngletDocuments,
} from "./partieDocument/PartieDocuments";

const EditionRequeteDelivrance: React.FC = () => {
  const { acte, requete } = useContext(EditionDelivranceContext);

  const getOngletActifActeRequeteParDefaut = () => {
    switch (true) {
      case Boolean(requete.statutCourant.statut === StatutRequete.A_REVOIR):
        return ECleOngletRequete.REQUETE;
      case Boolean(acte):
        return ECleOngletRequete.ACTE;
      case Boolean(
        requete.documentsReponses
          .filter((doc) =>
            DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument),
          )
          .shift(),
      ):
        return ECleOngletRequete.COURRIER_EDITE;

      default:
        return ECleOngletRequete.REQUETE;
    }
  };

  const [ongletActifActeRequete, setOngletActifActeRequete] = useState<string>(
    getOngletActifActeRequeteParDefaut(),
  );
  const [ongletActifDocuments, setOngletActifDocuments] = useState<string>(
    acte ? ECleOngletDocuments.PRINCIPAL : ECleOngletDocuments.COURRIER,
  );

  const ongletDocumentPrecedent = useRef<string>();

  useEffect(() => {
    document.addEventListener(
      "changerOngletActifPartieActeRequete",
      (event) => {
        setOngletActifActeRequete((event as CustomEvent).detail);
      },
    );
    return () => {
      document.removeEventListener(
        "changerOngletActifPartieActeRequete",
        () => () => {},
      );
    };
  }, []);

  useEffect(() => {
    if (ongletDocumentPrecedent.current === ECleOngletDocuments.COURRIER) {
      setOngletActifActeRequete(ECleOngletRequete.ACTE);
    }
    ongletDocumentPrecedent.current = ongletActifDocuments;
  }, [ongletActifDocuments]);

  return (
    <>
      <PartieActeRequete
        ongletActif={ongletActifActeRequete}
        setOngletActif={setOngletActifActeRequete}
      />
      <PartieDocuments
        ongletActif={ongletActifDocuments}
        setOngletActif={setOngletActifDocuments}
      />
    </>
  );
};

export default EditionRequeteDelivrance;
