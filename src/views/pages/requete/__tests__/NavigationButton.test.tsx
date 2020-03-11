import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NavigationButton } from "../visualisation/NavigationButton";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

test("renders fonction clic déclenchée au clic sur les boutons", () => {
  act(() => {
    const handleSetIndexRequete = jest.fn();
    const { getAllByRole } = render(
      <NavigationButton
        direction={"left"}
        indexRequete={1}
        maxRequetes={1}
        setIndexRequete={handleSetIndexRequete}
      />
    );

    const buttonElement = getAllByRole("button");

    fireEvent.click(buttonElement[0]);

    expect(handleSetIndexRequete).toHaveBeenCalledTimes(1);
  });
});

test("renders bouton suivant disabled si index <=0", () => {
  act(() => {
    const component = mount(
      <NavigationButton
        direction={"left"}
        indexRequete={0}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
      />
    );

    expect(
      component
        .find(".left-button")
        .find("button")
        .props().disabled
    ).toBe(true);
  });
});

test("renders bouton precedent disabled si index >= mexRequetes", () => {
  act(() => {
    const component = mount(
      <NavigationButton
        indexRequete={2}
        direction={"right"}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
      />
    );

    expect(
      component
        .find(".right-button")
        .find("button")
        .props().disabled
    ).toBe(true);
  });
});
