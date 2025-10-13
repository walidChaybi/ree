import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { describe, expect, test, vi } from "vitest";
import { EMimeType } from "../../ressources/EMimeType";
import { base64EnBlobUrl, getMimeTypeEtExtension, validationFichier } from "../../utils/FileUtils";

describe("Test du traitement d'un fichier", () => {
  test("Un fichier PDF possède le mimeType et l'extension corrects", async () => {
    const fichierPdf = new File(["%PDF-12345"], "document.pdf", { type: "application/pdf" });

    const mimeTypeEtExtension = await getMimeTypeEtExtension(fichierPdf);

    expect(mimeTypeEtExtension.ext).toBe("pdf");
    expect(mimeTypeEtExtension.mime).toBe("application/pdf");
  });

  test("Un fichier PNG possède le mimeType et l'extension corrects", async () => {
    const octets = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const fichierPng = new File([octets], "image.png", { type: "image/png" });

    const mimeTypeEtExtension = await getMimeTypeEtExtension(fichierPng);

    expect(mimeTypeEtExtension.ext).toBe("png");
    expect(mimeTypeEtExtension.mime).toBe("image/png");
  });

  test("Un fichier JPG possède le mimeType et l'extension corrects", async () => {
    const octets = new Uint8Array([0xff, 0xd8, 0xff, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const fichierJpg = new File([octets], "image.jpg", { type: "image/jpeg" });

    const mimeTypeEtExtension = await getMimeTypeEtExtension(fichierJpg);

    expect(mimeTypeEtExtension.ext).toBe("jpg");
    expect(mimeTypeEtExtension.mime).toBe("image/jpeg");
  });

  test("Un fichier JPEG possède le mimeType et l'extension corrects", async () => {
    const octets = new Uint8Array([0xff, 0xd8, 0xff, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const fichierJpeg = new File([octets], "image.jpeg", { type: "image/jpeg" });

    const mimeTypeEtExtension = await getMimeTypeEtExtension(fichierJpeg);

    expect(mimeTypeEtExtension.ext).toBe("jpg");
    expect(mimeTypeEtExtension.mime).toBe("image/jpeg");
  });

  test("Un fichier TXT est refusé car ce n'est pas une extension acceptée", async () => {
    const fichierTxt = new File(["Bonjour je suis un fichier TXT"], "fichier.txt", { type: "text/plain" });

    await expect(getMimeTypeEtExtension(fichierTxt)).rejects.toThrow("Ce type de fichier ne peut pas être utilisé.");
  });

  test("Un fichier trop volumineux est refusé en raison de sa taille", () => {
    expect(() => {
      validationFichier(30, "png", EMimeType.IMAGE_PNG, 20, [{ extension: "png", mimeType: EMimeType.IMAGE_PNG }]);
    }).toThrow("La taille du fichier ne peut pas excéder 0.02 KB");
  });

  test("Un fichier avec une extension éronée est refusé", () => {
    expect(() => {
      validationFichier(10, "png", EMimeType.IMAGE_PNG, 20, [{ extension: "jpeg", mimeType: EMimeType.IMAGE_JPG }]);
    }).toThrow("Les types d'extensions acceptés sont jpeg");
  });

  test("Un fichier avec un mimetype éroné est refusé", () => {
    expect(() => {
      validationFichier(10, "png", EMimeType.IMAGE_PNG, 20, [{ extension: "png", mimeType: EMimeType.IMAGE_JPG }]);
    }).toThrow("Les types mime acceptés sont image/jpeg");
  });

  test("Attendu: base64EnBlob fonctionne correctement", () => {
    window.URL.createObjectURL = vi.fn(p => p);
    const blob = base64EnBlobUrl(imagePngVideBase64, EMimeType.IMAGE_PNG);
    expect(blob).toBeDefined();
  });
});
