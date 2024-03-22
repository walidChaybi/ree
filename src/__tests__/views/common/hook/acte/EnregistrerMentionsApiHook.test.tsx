import * as EtatCivilApi from "@api/appels/etatcivilApi";
import { render, screen, waitFor } from "@testing-library/react";
import {
  IEnregistrerMentionsParams,
  useEnregistrerMentionsApiHook
} from "../../../../../views/common/hook/acte/EnregistrerMentionsApiHook";

const EnregistrerMentionsApiHookConsumer: React.FC<
  IEnregistrerMentionsParams
> = props => {
  const resultat = useEnregistrerMentionsApiHook(props);

  return <div data-testid="resultat">{resultat?.toString()}</div>;
};

describe("useEnregistrerMentionsApiHook", () => {
  test("Appel l'endpoint enregistrerMentions", async () => {
    const enregistrerMentionsSpy = jest.spyOn(
      EtatCivilApi,
      "enregistrerMentions"
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
      expect(enregistrerMentionsSpy).toHaveBeenCalledWith(
        idActe,
        mentionsEnregistrees
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
