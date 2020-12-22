import React from "react";
import * as renderer from "react-test-renderer";
import { ExtraitDocument } from "../../../../views/common/widget/document/ExtraitDocument";

test("renders Extrait document", () => {
  const component = renderer.create(<ExtraitDocument titre={"titre"} />);
  expect(component.toJSON()).toMatchSnapshot();
});
