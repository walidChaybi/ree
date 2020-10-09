import React from "react";
import { mount } from "enzyme";
import { ErrorsSignature } from "../../../../views/common/widget/signature/messages/ErrorsSignature";

test("renders error signature", () => {
  const component = mount(
    <ErrorsSignature
      errors={{
        numeroRequete: 125,
        erreurs: [
          { code: "codeTest1", libelle: "LibelleTest1", detail: "DetailTest1" }
        ]
      }}
    />
  );
  expect(component).toMatchSnapshot();
});
