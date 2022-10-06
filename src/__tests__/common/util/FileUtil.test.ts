import { base64toBlobUrl, validateFile } from "@util/FileUtils";
import { imagePngVideBase64 } from "../../../mock/data/ImagePng";

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
  const blob = base64toBlobUrl(imagePngVideBase64, "image/png");
  expect(blob).toBeDefined();
});
