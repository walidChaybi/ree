import { filetypeinfo } from "magic-bytes.js";
import { MimeType } from "../../../ressources/MimeType";
import { Option } from "./Type";

const DATA_URL_BASE_64 = ";base64,";
const NB_BYTES_IN_KILOBYTES = 1000;


export const FILE_TYPES: ExtensionDocumentTypeMime[] = [
  { extension: "png", mimeType: "image/png" },
  { extension: "pdf", mimeType: "application/pdf" },
  { extension: "jpg", mimeType: "image/jpeg" },
  { extension: "jpeg", mimeType: "image/jpeg" }
];

export interface ExtensionDocumentTypeMime {
  extension: string;
  mimeType: string;
}

export interface PieceJointe {
  base64File: Base64File;
  type?: Option;
}

export interface Base64File {
  fileName: string;
  base64String: string;
  extension?: string;
  mimeType?: string;
  taille: number;
  conteneurSwift?: string;
  identifiantSwift?: string;
}

export function getPiecesJointesNonVides(
  formulairePiecesJointes?: PieceJointe[]
) {
  return formulairePiecesJointes?.filter(
    formulairePj => formulairePj.base64File.base64String
  );
}

function toBase64String(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      resolve(result?.split(DATA_URL_BASE_64)?.[1]);
    };
    fileReader.onerror = error => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as ArrayBuffer;
      resolve(result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

export async function getBase64FileAndValidate(
  file: File,
  maxSizeKB?: number,
  extensionsEtTypeMimeAutorisees?: ExtensionDocumentTypeMime[]
): Promise<Base64File> {
  const base64String = await toBase64String(file);

  const { mime, ext } = await getMimeTypeEtExtension(file);

  validateFile(
    file.size,
    ext,
    mime,
    maxSizeKB ? maxSizeKB * NB_BYTES_IN_KILOBYTES : maxSizeKB,
    extensionsEtTypeMimeAutorisees
  );

  return {
    fileName: file?.name,
    base64String,
    extension: ext,
    mimeType: mime,
    taille: file.size
  };
}

async function getMimeTypeEtExtension(file: File) {
  const fileAsArrayBuffer = await toArrayBuffer(file);
  const fileInfos = filetypeinfo(new Uint8Array(fileAsArrayBuffer))[0];
  return {
    mime: fileInfos.mime,
    ext: fileInfos.extension
  };
}

export function validateFile(
  fileSizeBytes: number,
  fileExtension?: string,
  fileMimeType?: string,
  maxSizeBytes?: number,
  extensionsEtTypeMimeAutorisees?: ExtensionDocumentTypeMime[]
) {
  if (maxSizeBytes && maxSizeBytes < fileSizeBytes) {
    throw Error(
      `La taille du fichier ne peut pas excéder ${
        maxSizeBytes / NB_BYTES_IN_KILOBYTES
      } KB`
    );
  }
  if (extensionsEtTypeMimeAutorisees) {
    if (
      !extensionsEtTypeMimeAutorisees.find(
        extTypeMime => extTypeMime.extension === fileExtension
      )
    ) {
      throw Error(
        `Les types d'extensions acceptés sont ${extensionsEtTypeMimeAutorisees
          .map(extTypeMime => extTypeMime.extension)
          .join(", ")}`
      );
    }
    if (
      !extensionsEtTypeMimeAutorisees.find(
        extTypeMime => extTypeMime.mimeType === fileMimeType
      )
    ) {
      throw Error(
        `Les types mime acceptés sont ${extensionsEtTypeMimeAutorisees
          .map(extTypeMime => extTypeMime.mimeType)
          .join(", ")}`
      );
    }
  }
}

export function base64toBlobUrl(base64String: string, type: string): string {
  const byteCharacters = window.atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type });
  return URL.createObjectURL(blob);
}

export function bloblToBlobUrl(blob: Blob, type: string): string {
  return URL.createObjectURL(new Blob([blob], { type }));
}

export function estTypeMimePdf(typeMime?: string) {
  return typeMime === MimeType.APPLI_PDF;
}

export function base64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/pdf" });
}
