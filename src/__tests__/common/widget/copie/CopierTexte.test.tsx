import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import { CopierTexte } from "../../../../views/common/widget/copie/CopierTexte";

const renderCopierTexte = async () => {
  const Wrapper = () => {
    return <CopierTexte numero="TexteACopier" />;
  };

  await act(async () => {
    render(<Wrapper />);
  });
};

Object.assign(navigator, {
  clipboard: {
    writeText: () => {}
  }
});
jest.spyOn(navigator.clipboard, "writeText");
test("Doit rendre le composant correctement", async () => {
  await renderCopierTexte();

  const numeroACopier = screen.getByTitle("TexteACopier").children[0];

  act(() => {
    fireEvent.click(numeroACopier);
  });

  waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(numeroACopier);
  });

  const messageAfficher = "Copier dans le presse papier";

  waitFor(() => {
    expect(messageAfficher).toBeInTheDocument();
  });
});
