import React from "react";
import { mount } from "enzyme";
import { ErrorsSignature } from "../ErrorsSignature";

test("renders error signature", () => {
  const component = mount(
    <ErrorsSignature
      errors={[
        { code: "codeTest1", libelle: "LibelleTest1", detail: "DetailTest1" },
      ]}
    />
  );
  expect(component).toMatchSnapshot();
});
