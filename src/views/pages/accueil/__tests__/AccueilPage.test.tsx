import React from "react";
import { shallow } from "enzyme";
import { AccueilPage } from "../AccueilPage";
import { Text } from "../../../common/widget/Text";

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
  expect(wrapper.find(Text)).toHaveLength(2);
  const textElements = wrapper.find(Text);
  expect(textElements.get(0).props.messageId).toBe("pages.accueil.titre");
  expect(textElements.get(1).props.messageId).toBe("pages.accueil.bienvenue");
});
