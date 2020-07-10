import React from "react";
import * as renderer from "react-test-renderer";
import { SelectDialog } from "../form/SelectDialog";
import { getText } from "../Text";

test("renders composant SelectDialog", () => {
  const component = renderer.create(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" }
      ]}
      defaultElementId={"k1"}
      title={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.title"
      )}
      libelle={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.libelle"
      )}
      validate={(req: any) => {
        console.log("validate", req);
      }}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
