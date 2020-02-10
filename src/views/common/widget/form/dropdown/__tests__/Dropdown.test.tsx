import React from "react";
import { mount } from "enzyme";
import { Dropdown } from "../Dropdown";
import * as renderer from "react-test-renderer";
import { DropdownOption } from "../DropdownOption";

test("renders dropdown de l'application", () => {
  const component = renderer.create(
    <>
      <Dropdown name="developpeurs">
        <DropdownOption value={1} messageId="Nabil" />
        <DropdownOption value={2} messageId="Florent" />
        <DropdownOption value={3} messageId="Bertrand" />
      </Dropdown>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders dropdown de l'application avec blank manuel", () => {
  const wrapper = mount(
    <>
      <Dropdown name="developpeurs">
        <DropdownOption value={0} messageId="" />
        <DropdownOption value={1} messageId="Nabil" />
        <DropdownOption value={2} messageId="Florent" />
        <DropdownOption value={3} messageId="Bertrand" />
      </Dropdown>
    </>
  );

  expect(wrapper.find(DropdownOption).length).toBe(4);
});

test("renders dropdown de l'application autoblank", () => {
  const wrapper = mount(
    <>
      <Dropdown name="developpeurs" isBlankAllowed={true}>
        <DropdownOption value={1} messageId="Nabil" />
        <DropdownOption value={2} messageId="Florent" />
        <DropdownOption value={3} messageId="Bertrand" />
      </Dropdown>
    </>
  );
  expect(wrapper.find(DropdownOption).length).toBe(4);
});
