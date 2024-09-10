import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { expect, test } from "vitest";

test("render composant AccordionRece", () => {
  const { getByText } = render(
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

  waitFor(() => {
    expect(getByText(/titlePanel/i)).toBeDefined();
    expect(getByText(/titleTest2.1/i)).toBeDefined();
  });
});

test("render composant AccordionRece can close", () => {
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
  const button = screen.getByTestId("ExpandMoreIcon") as HTMLButtonElement;

  fireEvent.click(
    button,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
  waitFor(() => {
    expect(document.getElementsByClassName("MuiCollapse-hidden")).toHaveLength(
      1
    );
  });
});
