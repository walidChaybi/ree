import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";

test("render composant AccordionRece", async () => {
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

  await waitFor(() => {
    expect(getByText(/titlePanel/i)).toBeDefined();
    expect(getByText(/titleTest2.1/i)).toBeDefined();
  });
});

test("render composant AccordionRece can close", async () => {
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
  await waitFor(() => {
    expect(document.getElementsByClassName("MuiCollapse-hidden")).toHaveLength(
      1
    );
  });
});
