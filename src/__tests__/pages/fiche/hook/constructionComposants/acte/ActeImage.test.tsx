import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { ActeImage } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/ActeImage";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

describe("Display pdf Iframe", () => {
  test("Affichage par défaut", async () => {
    render(<ActeImage id=""></ActeImage>);
    const text = screen.getByText("Pas d'image disponible");
    expect(text).toBeInTheDocument();
  });

  test("Affiche une iframe", async () => {
    // Mock link creation
    window.URL.createObjectURL = jest.fn(() => "url_test");
    render(<ActeImage id="b41079a5-9e8d-478c-b04c-c4c4ey86537g"></ActeImage>);
    await waitFor(() => {
      const linkElement = screen.getByTitle("Visionneuse PDF");
      expect(linkElement).toBeInTheDocument();
    });
    expect(document.querySelector("iframe").getAttribute("src")).toBe(
      "url_test"
    );
    const text = screen.queryByText("Pas d'image disponible");
    expect(text).toBeNull();
  });
});
