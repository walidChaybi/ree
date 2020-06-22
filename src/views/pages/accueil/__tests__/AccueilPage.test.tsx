import React from "react";
import { shallow } from "enzyme";
import { AccueilPage } from "../AccueilPage";
import { Text } from "../../../common/widget/Text";
import { Title } from "../../../core/title/Title";

let container: Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("renders page d'accueil", () => {
  const wrapper = shallow(<AccueilPage />);
  const titleElements = wrapper.find(Title);
  expect(titleElements).toHaveLength(1);
  console.log("titleElements", titleElements);
  expect(titleElements.get(0).props.titleId).toBe("pages.accueil.titre");
  const textElements = wrapper.find(Text);
  expect(textElements).toHaveLength(1);
  expect(textElements.get(0).props.messageId).toBe("pages.accueil.bienvenue");
});
