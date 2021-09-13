import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { IRequeteTableau } from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MimeType } from "../../../../../../ressources/MimeType";
import { IResultGenerationPlusieursDocument } from "../generationUtils";

export function sauvegardeContenuInscriptionSuivante(
  contenuComposition: string | undefined,
  liste: IResultatRMCInscription[] | undefined,
  contenuDocuments: string[],
  setContenuDocumentsComposition: (
    value: React.SetStateAction<string[]>
  ) => void,
  setListe: (
    value: React.SetStateAction<IResultatRMCInscription | undefined>
  ) => void
) {
  if (contenuComposition && liste && liste.length > 0) {
    contenuDocuments.push(contenuComposition);
    setContenuDocumentsComposition(contenuDocuments);
    liste.pop();
    if (liste.length > 0) {
      setListe(liste[liste.length - 1]);
    }
  }
}

export function creationDocumentReponseInscription(
  contenuDocumentsComposition: string[],
  liste: IResultatRMCInscription[] | undefined,
  requete: IRequeteTableau | undefined,
  setDocumentsReponsePourStockage: React.Dispatch<
    React.SetStateAction<IDocumentReponse[] | undefined>
  >,
  nomDocument: string,
  idTypeDocument: string
) {
  if (
    setDocumentsReponsePourStockage &&
    contenuDocumentsComposition &&
    contenuDocumentsComposition.length > 0 &&
    liste &&
    liste.length === 0 &&
    requete
  ) {
    const documents: IDocumentReponse[] = [];
    contenuDocumentsComposition.forEach((contenu: string) => {
      documents.push({
        contenu,
        nom: nomDocument,
        mimeType: MimeType.APPLI_PDF,
        typeDocument: idTypeDocument, // UUID du type de document demandé (nomenclature)
        nbPages: 1,
        orientation: Orientation.PORTRAIT
      } as IDocumentReponse);
    });
    setDocumentsReponsePourStockage(documents);
  }
}

export function setResultGenerationCertificatInscription(
  uuidDocumentsReponse: string[] | undefined,
  contenuDocumentsComposition: string[],
  setResultGenerationCertificatRC: React.Dispatch<
    React.SetStateAction<IResultGenerationPlusieursDocument | undefined>
  >
) {
  if (
    uuidDocumentsReponse &&
    uuidDocumentsReponse.length > 0 &&
    contenuDocumentsComposition &&
    contenuDocumentsComposition.length > 0
  ) {
    setResultGenerationCertificatRC({
      idDocumentsReponse: uuidDocumentsReponse,
      contenuDocumentsReponse: contenuDocumentsComposition
    });
  }
}
