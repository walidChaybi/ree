import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Options } from "@util/Type";
import UploadFileField from "@widget/formulaire/champsSaisie/UploadFileField";
import { afterEach, expect, test, vi } from "vitest";
import { ExtensionDocumentTypeMime } from "../../../../../../utils/FileUtils";
import { inputPngFiles } from "../../../../../__tests__utils__/testsUtil";

const AJOUT_PIECE_JOINTE = "Ajout d'une pièce jointe";

const PNG_FILE_TYPES: ExtensionDocumentTypeMime[] = [{ extension: "png", mimeType: "image/png" }];

const PDF_FILE_TYPES: ExtensionDocumentTypeMime[] = [{ extension: "pdf", mimeType: "application/pdf" }];

const FILE_MAX_SIZE_KB = 20;

afterEach(cleanup);

test("Attendu: le composant UploadFileField déclanche la fonction onFileChange lorsqu'un fichier est choisi", () => {
  const onFileChange = vi.fn();
  const menuItems: Options = [
    { cle: "k1", libelle: "str1" },
    { cle: "k2", libelle: "str2" }
  ];

  render(
    <UploadFileField
      name="piecesJointes"
      libelleBouton={"Ajouter"}
      menuItems={menuItems}
      hideInput={true}
      title={AJOUT_PIECE_JOINTE}
      acceptFileTypes={PNG_FILE_TYPES}
      maxSizeKB={FILE_MAX_SIZE_KB}
      onFileChange={onFileChange}
    />
  );

  const inputUploadFieldWrapper = screen.getByTestId("piecesJointes") as HTMLInputElement;
  fireEvent.change(inputUploadFieldWrapper, {
    target: {
      files: inputPngFiles
    }
  });

  waitFor(() => {
    expect(onFileChange).toBeCalledTimes(1);
  });
});

test("Attendu: le composant UploadFileField ne déclanche pas la fonction onFileChange lorsqu'un fichier du mauvais type est choisi", () => {
  const onFileChange = vi.fn();
  const menuItems: Options = [
    { cle: "k1", libelle: "str1" },
    { cle: "k2", libelle: "str2" }
  ];

  render(
    <UploadFileField
      name="piecesJointes"
      libelleBouton={"Ajouter"}
      menuItems={menuItems}
      hideInput={true}
      title={AJOUT_PIECE_JOINTE}
      acceptFileTypes={PDF_FILE_TYPES}
      maxSizeKB={FILE_MAX_SIZE_KB}
      onFileChange={onFileChange}
    />
  );

  const inputUploadFieldWrapper = screen.getByTestId("piecesJointes") as HTMLInputElement;
  fireEvent.change(inputUploadFieldWrapper, {
    target: {
      files: inputPngFiles
    }
  });
  waitFor(() => {
    expect(onFileChange).not.toBeCalled();
  });
});

test("Attendu: le composant UploadFileField affiche un menu lorsq'un click sur le bouton principal est effectué", () => {
  const onFileChange = vi.fn();
  const menuItems: Options = [
    { cle: "k1", libelle: "str1" },
    { cle: "k2", libelle: "str2" }
  ];

  render(
    <UploadFileField
      name="piecesJointes"
      libelleBouton={"Ajouter"}
      menuItems={menuItems}
      hideInput={false}
      title={AJOUT_PIECE_JOINTE}
      acceptFileTypes={PNG_FILE_TYPES}
      maxSizeKB={FILE_MAX_SIZE_KB}
      onFileChange={onFileChange}
    />
  );

  const boutonMenu = screen.getByRole("button") as HTMLButtonElement;

  waitFor(() => {
    expect(boutonMenu).toBeDefined();
  });

  fireEvent.click(boutonMenu);

  waitFor(() => {
    expect(screen.getByText("str1")).toBeDefined();
    expect(screen.getByText("str2")).toBeDefined();
  });

  fireEvent.click(screen.getByText("str1")); // Rien à vérifier ensuite
});
