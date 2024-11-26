import { Action } from "@model/requete/IActions";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { useContext, useEffect, useRef, useState } from "react";
import { EditionDelivranceContext } from "../../../../contexts/EditionDelivranceContextProvider";
import PartieActeRequete, { ECleOngletRequete } from "./partieActeRequete/PartieActeRequete";
import PartieDocuments, { ECleOngletDocuments } from "./partieDocument/PartieDocuments";

const EditionRequeteDelivrance: React.FC = () => {
  const { acte, requete } = useContext(EditionDelivranceContext);

  const getOngletActifActeRequeteParDefaut = () => {
    switch (true) {
      case Action.estARevoir(Action.getActionsDansLOrdre(requete.actions).at(-2)):
        return ECleOngletRequete.REQUETE;
      case Boolean(acte):
        return ECleOngletRequete.ACTE;
      case Boolean(requete.documentsReponses.filter(doc => DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument)).shift()):
        return ECleOngletRequete.COURRIER_EDITE;

      default:
        return ECleOngletRequete.REQUETE;
    }
  };

  const [ongletActifActeRequete, setOngletActifActeRequete] = useState<string>(getOngletActifActeRequeteParDefaut());
  const [ongletActifDocuments, setOngletActifDocuments] = useState<string>(
    acte ? ECleOngletDocuments.PRINCIPAL : ECleOngletDocuments.COURRIER
  );

  const ongletDocumentPrecedent = useRef<string>();

  useEffect(() => {
    const changerOnglet = ((event: CustomEvent) => setOngletActifActeRequete(event.detail)) as EventListener;
    document.addEventListener("changerOngletActifPartieActeRequete", changerOnglet);

    return () => {
      document.removeEventListener("changerOngletActifPartieActeRequete", changerOnglet);
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
