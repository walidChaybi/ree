// imports and applies the jest extensions
// imports the files entrypoint
import { filesOfProject } from "tsarch";
import "tsarch/dist/jest";

describe("architecture", () => {

  
  test("'common' NE DOIT PAS dépendre de 'pages'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("views/common")
      .shouldNot()
      .dependOnFiles()
      .inFolder("views/pages");

    await expect(rule).toPassAsync();
  });

  test("'api' NE DOIT PAS dépendre de 'pages'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("api")
      .shouldNot()
      .dependOnFiles()
      .inFolder("views/pages");

    await expect(rule).toPassAsync();
  });

  test("'model' NE DOIT PAS dépendre de 'pages'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("model")
      .matchingPattern("src/model")
      .shouldNot()
      .dependOnFiles()
      .inFolder("views/pages");

    await expect(rule).toPassAsync();
  });

  test("'model' NE DOIT PAS dépendre de 'api/appels'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("model")
      .matchingPattern("src/model")
      .shouldNot()
      .dependOnFiles()
      .inFolder("api/appels");

    await expect(rule).toPassAsync();
  });

  test("'model' NE DOIT PAS dépendre de 'hook'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("model")
      .matchingPattern("src/model")
      .shouldNot()
      .dependOnFiles()
      .inFolder("common/hook");

    await expect(rule).toPassAsync();
  });

  test("'model' NE DOIT PAS dépendre de 'widget'", async () => {
    const rule = filesOfProject("tsconfig-ts-arch.json")
      .inFolder("model")
      .matchingPattern("src/model")
      .shouldNot()
      .dependOnFiles()
      .inFolder("common/widget");
    //.matchingPattern(".+/^(ConstantesNomsForm).*");

    await expect(rule).toPassAsync();
  });
});
