import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissementPieceJustificative } from "@mock/data/requeteCreationEtablissement";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ListePiecesJustificativesEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/commun/ListePiecesJustificativesEtablissement";
import { typeFctRenommePieceJustificative } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { pngFiles } from "../../../../../../__tests__utils__/testsUtil";

interface HookConsumerListePiecesJustificativesEtablissementProps {
  requete?: IRequeteCreationEtablissement;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative?: typeFctRenommePieceJustificative;
  resetRequete?: () => void;
}

const history = createMemoryHistory();

const HookConsumerHookConsumerListePiecesJustificativesEtablissement: React.FC<
  HookConsumerListePiecesJustificativesEtablissementProps
> = props => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      props.requete?.id || ""
    )
  );

  return (
    <Router history={history}>
      <ListePiecesJustificativesEtablissement
        requete={props.requete}
        autoriseOuvertureFenetreExt={true}
        rechargerRequete={() => {}}
        onRenommePieceJustificative={() => {}}
      />
    </Router>
  );
};

test("DOIT ouvrir et afficher la modal QUAND on clique sur le bouton d'ouverture de la modal.", async () => {
  const requete = mappingRequeteCreation(
    requeteCreationEtablissementPieceJustificative.data
  );
  render(
    <HookConsumerHookConsumerListePiecesJustificativesEtablissement
      requete={requete}
    />
  );

  const boutonOuvrirModal = screen.getByText("Ajouter un fichier");

  await waitFor(() => {
    expect(boutonOuvrirModal).toBeDefined();
  });

  await waitFor(() => {
    fireEvent.click(boutonOuvrirModal);
  });

  await waitFor(() => {
    expect(
      screen.getByLabelText("Catégorie de la pièce justificative")
    ).toBeDefined();
    expect(screen.getByText("Sélectionner un fichier")).toBeDefined();
    expect(screen.getByText("Valider")).toBeDisabled();
    expect(screen.getByText("Fermer")).toBeDefined();
  });
});

test("DOIT activer le bouton de validation QUAND des données ont été selectionné", async () => {
  const user = userEvent.setup();
  const requete = mappingRequeteCreation(
    requeteCreationEtablissementPieceJustificative.data
  );
  render(
    <HookConsumerHookConsumerListePiecesJustificativesEtablissement
      requete={requete}
    />
  );

  const boutonOuvrirModal = screen.getByText("Ajouter un fichier");
  fireEvent.click(boutonOuvrirModal);

  const selectField = screen.getByLabelText(
    "Catégorie de la pièce justificative"
  ) as HTMLInputElement;
  const uploadFileField = screen.getByTestId("file") as HTMLInputElement;
  const fakeFile = new File(["hello"], "hello.png", { type: "image/jpg" });

  await waitFor(() => {
    fireEvent.change(selectField, {
      target: { value: "a272a8ad-8295-4742-9b89-b571d298e881" }
    });
  });

  await user.upload(uploadFileField, pngFiles);

  await waitFor(() => {
    expect(selectField).toBeDefined();
    expect(uploadFileField).toBeDefined();
    expect(selectField.value).toBe("a272a8ad-8295-4742-9b89-b571d298e881");
    expect(screen.getByDisplayValue("AN Postulant")).toBeDefined();
    expect(uploadFileField.files?.[0]).toStrictEqual(fakeFile);
    expect(screen.getByText("hello.png")).toBeDefined();
    expect(screen.getByText("Valider")).toBeDefined();
    expect(screen.getByText("Valider")).not.toBeDisabled();
    expect(screen.getByText("Fermer")).toBeDefined();
  });
});
