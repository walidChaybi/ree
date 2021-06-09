import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { AccordionRece } from "../../../../views/common/widget/accordion/AccordionRece";

test("render composant AccordionRece", async () => {
  const { getByText } = render(
    <AccordionRece
      panel={{
        panelAreas: [
          {
            parts: [
              {
                contentsPart: {
                  contents: [{ libelle: "testLibelle1", value: "testValue1" }],
                  title: "titleTest1"
                }
              },
              {
                contentsPart: {
                  contents: [{ libelle: "testLibelle2", value: "testValue2" }],
                  title: "titleTest2"
                }
              }
            ]
          },
          {
            parts: [
              {
                contentsPart: {
                  contents: [
                    { libelle: "testLibelle1.1", value: "testValue1.1" }
                  ],
                  title: "titleTest1.1"
                }
              },
              {
                contentsPart: {
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
      defaultExpanded={true}
    />
  );

  await waitFor(() => {
    expect(getByText(/titlePanel/i)).toBeDefined();
    expect(getByText(/titleTest2.1/i)).toBeDefined();
  });
});

test("render composant AccordionRece can close", async () => {
  const { container } = render(
    <AccordionRece
      panel={{
        panelAreas: [
          {
            parts: [
              {
                contentsPart: {
                  contents: [{ libelle: "testLibelle1", value: "testValue1" }],
                  title: "titleTest1"
                }
              },
              {
                contentsPart: {
                  contents: [{ libelle: "testLibelle2", value: "testValue2" }],
                  title: "titleTest2"
                }
              }
            ]
          },
          {
            parts: [
              {
                contentsPart: {
                  contents: [
                    { libelle: "testLibelle1.1", value: "testValue1.1" }
                  ],
                  title: "titleTest1.1"
                }
              },
              {
                contentsPart: {
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
      defaultExpanded={true}
    />
  );
  const button = container.firstChild?.firstChild?.childNodes[1].firstChild;

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
