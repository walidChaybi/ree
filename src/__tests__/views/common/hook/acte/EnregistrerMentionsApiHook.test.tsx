import * as EtatCivilApi from "@api/appels/etatcivilApi";
import { render, screen, waitFor } from "@testing-library/react";
import {
  IEnregistrerMentionsEtAnalyseMarginaleParams,
  useEnregistrerMentionsEtAnalyseMarginaleApiHook
} from "../../../../../views/common/hook/acte/EnregistrerMentionsApiHook";

const EnregistrerMentionsApiHookConsumer: React.FC<
  IEnregistrerMentionsEtAnalyseMarginaleParams
> = props => {
  const resultat = useEnregistrerMentionsEtAnalyseMarginaleApiHook(props);

  return <div data-testid="resultat">{resultat?.toString()}</div>;
};

describe("useEnregistrerMentionsApiHook", () => {
  test("Appel l'endpoint enregistrerMentions avec mention normal", async () => {
    const enregistrerMentionsEtAnalyseMarginaleSpy = jest.spyOn(
      EtatCivilApi,
      "enregistrerMentionsEtAnalyseMarginale"
    );
    const idActe = "b00ebeb2-8ddc-4928-b99e-b06a248d21ae";
    const mentionsEnregistrees = [
      {
        numeroOrdre: 1,
        texteMention: "texteMention",
        idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e"
      }
    ];

    render(
      <EnregistrerMentionsApiHookConsumer
        idActe={idActe}
        mentions={mentionsEnregistrees}
      />
    );
    await waitFor(() => {
      expect(enregistrerMentionsEtAnalyseMarginaleSpy).toHaveBeenCalledWith(
        idActe,
        mentionsEnregistrees,
        // represente analyseMarginale vide dans le cas d'une mention qui ne modifie pas l'analyse marginale
        undefined
      );
    });
  });

  test("Appel l'endpoint enregistrerMentions avec mentions qui change l'analyse marginale", async () => {
    const enregistrerMentionsEtAnalyseMarginaleSpy = jest.spyOn(
      EtatCivilApi,
      "enregistrerMentionsEtAnalyseMarginale"
    );
    const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
    const mentionsEnregistrees = [
      {
        numeroOrdre: 1,
        texteMention: "texteMention",
        idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e"
      }
    ];
    const analyseMarginale = {
      nom: "Schlosser Nahed",
      prenoms: ["Cassandra", "Celia", "Salomé"],
      nomPartie1: "Schlosser",
      nomPartie2: "Nahed",
      motif: "Suite à apposition de mention 14-1"
    };

    render(
      <EnregistrerMentionsApiHookConsumer
        idActe={idActe}
        mentions={mentionsEnregistrees}
        analyseMarginale={analyseMarginale}
      />
    );
    await waitFor(() => {
      expect(enregistrerMentionsEtAnalyseMarginaleSpy).toHaveBeenCalledWith(
        idActe,
        mentionsEnregistrees,
        analyseMarginale
      );
    });
  });

  test("Récupère les informations de composition du document mis à jour.", async () => {
    render(
      <EnregistrerMentionsApiHookConsumer
        idActe={"b00ebeb2-8ddc-4928-b99e-b06a248d21ae"}
        mentions={[]}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("resultat").textContent).toContain(
        "texteMention"
      );
    });
  });
});
