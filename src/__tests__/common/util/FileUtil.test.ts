import {
  base64toBlob,
  validateFile
} from "../../../views/common/util/FileUtils";

test("validateFile : size error", () => {
  expect(() => {
    validateFile(30, "png", "image/png", 20, [
      { extension: "png", mimeType: "image/png" }
    ]);
  }).toThrow();
});

test("validateFile : extension error", () => {
  expect(() => {
    validateFile(10, "png", "image/png", 20, [
      { extension: "jpeg", mimeType: "image/png" }
    ]);
  }).toThrow();
});

test("validateFile : mimeType error", () => {
  expect(() => {
    validateFile(10, "png", "image/png", 20, [
      { extension: "png", mimeType: "image/jpeg" }
    ]);
  }).toThrow();
});

test("validateFile : cas passant", () => {
  validateFile(10, "png", "image/png", 20, [
    { extension: "png", mimeType: "image/png" }
  ]);
});

test("Attendu: base64toBlob fonctionne correctement", () => {
  window.URL.createObjectURL = jest.fn(p => p);
  // Pour info: ce base64 est une vraie image PNG
  const pbgBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
  const blob = base64toBlob(pbgBase64, "image/png");
  expect(blob).toBeDefined();
});
