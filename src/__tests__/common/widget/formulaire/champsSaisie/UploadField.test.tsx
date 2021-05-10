import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { mount } from "enzyme";
import React from "react";
import { ExtensionDocumentTypeMime } from "../../../../../views/common/util/FileUtils";
import UploadFileField from "../../../../../views/common/widget/formulaire/champsSaisie/UploadFileField";
import { inputPngFiles } from "../../../../testsUtil";

const AJOUT_PIECE_JOINTE = "Ajout d'une pièce jointe";

const PNG_FILE_TYPES: ExtensionDocumentTypeMime[] = [
  { extension: "png", mimeType: "image/png" }
];

const PDF_FILE_TYPES: ExtensionDocumentTypeMime[] = [
  { extension: "pdf", mimeType: "application/pdf" }
];

const FILE_MAX_SIZE_KB = 20;

afterEach(cleanup);

test("Attendu: le composant UploadFileField déclanche la fonction onFileChange lorsqu'un fichier est choisi", async () => {
  const onFileChange = jest.fn();
  const menuItems = [
    { value: "k1", str: "str1" },
    { value: "k2", str: "str2" }
  ];

  const wrapper = mount(
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

  // Utilisation d'enzyme car avec "testing library" pas de déclanchement de l'événement "change" (pourtant ça fonctionne dans PiecesJointesForm.test.tsx #prisedetete)
  const inputUploadFieldWrapper = wrapper.find("input");
  act(() => {
    inputUploadFieldWrapper.simulate("change", {
      target: {
        files: inputPngFiles
      }
    });
  });
  await waitFor(() => {
    expect(onFileChange).toBeCalledTimes(1);
  });
  wrapper.unmount();
});

test("Attendu: le composant UploadFileField ne déclanche pas la fonction onFileChange lorsqu'un fichier du mauvais type est choisi", async () => {
  const onFileChange = jest.fn();
  const menuItems = [
    { value: "k1", str: "str1" },
    { value: "k2", str: "str2" }
  ];

  const wrapper = mount(
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

  // Utilisation d'enzyme car avec "testing library" pas de déclanchement de l'événement "change" (pourtant ça fonctionne dans PiecesJointesForm.test.tsx #prisedetete)
  const inputUploadFieldWrapper = wrapper.find("input");
  act(() => {
    inputUploadFieldWrapper.simulate("change", {
      target: {
        files: inputPngFiles
      }
    });
  });
  await waitFor(() => {
    expect(onFileChange).not.toBeCalled();
  });

  wrapper.unmount();
});

test("Attendu: le composant UploadFileField affiche un menu lorsq'un click sur le bouton principal est effectué", async () => {
  const onFileChange = jest.fn();
  const menuItems = [
    { value: "k1", str: "str1" },
    { value: "k2", str: "str2" }
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
  expect(boutonMenu).toBeDefined();

  fireEvent.click(boutonMenu);

  expect(screen.getByText("str1")).toBeDefined();
  expect(screen.getByText("str2")).toBeDefined();

  fireEvent.click(screen.getByText("str1")); // Rien à vérifier ensuite
});
