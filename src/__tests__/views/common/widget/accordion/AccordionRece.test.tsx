import { fireEvent, render, waitFor } from "@testing-library/react";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { describe, expect, test } from "vitest";

const affichageComposant = () =>
  render(
    <AccordionRece
      panel={{
        panelAreas: [
          {
            parts: [
              {
                partContent: {
                  contents: [{ libelle: "testLibelle1", value: "testValue1" }],
                  title: "titleTest1"
                }
              },
              {
                partContent: {
                  contents: [{ libelle: "testLibelle2", value: "testValue2" }],
                  title: "titleTest2"
                }
              }
            ]
          },
          {
            parts: [
              {
                partContent: {
                  contents: [
                    { libelle: "testLibelle1.1", value: "testValue1.1" }
                  ],
                  title: "titleTest1.1"
                }
              },
              {
                partContent: {
                  contents: [
                    { libelle: "testLibelle2.1", value: "testValue2.1" }
                  ],
                  title: "titleTest2.1"
                }
              }
            ]
          }
        ],
        title: "titlePanel"
      }}
      titre={"titlePanel"}
      index={0}
      disabled={false}
      expanded={true}
    />
  );

describe("Test composant accordeon RECE", () => {
  test("render composant AccordionRece", () => {
    const { queryByText } = affichageComposant();

    expect(queryByText(/titlePanel/i)).toBeDefined();
    expect(queryByText(/titleTest2.1/i)).toBeDefined();
  });

  test("render composant AccordionRece can close", () => {
    const { getByTestId } = affichageComposant();

    fireEvent.click(
      getByTestId("ExpandMoreIcon"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    waitFor(() => {
      expect(
        document.getElementsByClassName("MuiCollapse-hidden")
      ).toHaveLength(1);
    });
  });
});
