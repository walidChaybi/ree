import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { useCreationRequeteDelivrance } from "../../../../views/pages/saisirRequete/hook/SaisirRDCSCApiHook";
import { SaisieRequeteRDCSC } from "../../../../views/pages/saisirRequete/modelForm/ISaisirRDCSCPageModel";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsummer: React.FC = () => {
  const creationRequeteRDCSC: SaisieRequeteRDCSC = {
    piecesJointes: [
      {
        base64File: {
          fileName: "test.pdf",
          base64String: "base64",
          extension: "pdf",
          mimeType: "application/pdf",
          taille: 123
        }
      }
    ]
  } as SaisieRequeteRDCSC;

  const urlNouvelleRequete = useCreationRequeteDelivrance(
    SousTypeDelivrance.RDCSC,
    creationRequeteRDCSC
  );
  return <>{urlNouvelleRequete}</>;
};

test("Création requête délivrance hook", async () => {
  render(<HookConsummer />);

  waitFor(() => {
    expect(
      screen.getAllByText("1072bc37-f889-4365-8f75-912166b767dd")
    ).toBeDefined();
  });
});
