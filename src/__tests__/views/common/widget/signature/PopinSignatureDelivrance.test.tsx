import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  createEvent,
  fireEvent,
  render,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { PopinSignatureDelivrance } from "@widget/signature/PopinSignatureDelivrance";
import { acte } from "../../../../../mock/data/ficheEtBandeau/ficheActe";

test("renders PopinSignatureDelivrance, signature event is received and success displayed", async () => {
  const { getByText } = render(
    <PopinSignatureDelivrance
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD,
          acte: acte
        }
      }}
      open={true}
      onClose={() => {
        return;
      }}
    />
  );

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreur: {}
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    const successMsg = getByText(
      "Le(s) document(s) de la requête n°1 a (ont) été signé(s) le",
      { exact: false }
    );
    expect(successMsg).toBeDefined();
  });
});

test("renders PopinSignatureDelivrance, signature event is received and error displayed", async () => {
  // Désactivation de la log car l'erreur loguée est normale
  storeRece.logErrorOff = true;
  const { getByText } = render(
    <PopinSignatureDelivrance
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD,
          acte: acte
        }
      }}
      open={true}
      onClose={() => {
        return;
      }}
    />
  );

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreur: {
            code: "TECH_1",
            libelle: "Erreur technique inconnue"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    const errorCode = getByText("Requête n°1");
    const errorMsg = getByText("Erreur technique inconnue");
    expect(errorCode).toBeDefined();
    expect(errorMsg).toBeDefined();
  });
  storeRece.logErrorOff = false;
});

test("renders PopinSignatureDelivrance, code erroné", async () => {
  // Désactivation de la log car l'erreur loguée est normale
  storeRece.logErrorOff = true;
  const { getByText } = render(
    <PopinSignatureDelivrance
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD,
          acte: acte
        }
      }}
      open={true}
      onClose={() => {
        return;
      }}
    />
  );

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreur: {
            code: "FONC_3",
            libelle: "Code PIN invalide"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    const errorMsg = getByText("Code PIN invalide");
    expect(errorMsg).toBeDefined();
  });
  storeRece.logErrorOff = false;
});
