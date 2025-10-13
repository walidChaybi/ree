import { Option } from "@util/Type";
import { EMimeType } from "../ressources/EMimeType";

const DATA_URL_BASE_64 = ";base64,";
const NB_BYTES_IN_KILOBYTES = 1000;

export const FILE_TYPES: ExtensionDocumentTypeMime[] = [
  { extension: "png", mimeType: EMimeType.IMAGE_PNG },
  { extension: "pdf", mimeType: EMimeType.APPLI_PDF },
  { extension: "jpg", mimeType: EMimeType.IMAGE_JPG },
  { extension: "jpeg", mimeType: EMimeType.IMAGE_JPG }
];

const FILE_TYPES_ET_SIGNATURES: ExtensionDocumentTypeMimeAvecSignature[] = [
  { extension: "png", mimeType: EMimeType.IMAGE_PNG, signature: [0x89, 0x50, 0x4e, 0x47] },
  { extension: "pdf", mimeType: EMimeType.APPLI_PDF, signature: [0x25, 0x50, 0x44, 0x46] },
  { extension: "jpg", mimeType: EMimeType.IMAGE_JPG, signature: [0xff, 0xd8, 0xff] },
  { extension: "jpeg", mimeType: EMimeType.IMAGE_JPG, signature: [0xff, 0xd8, 0xff] }
];

export interface ExtensionDocumentTypeMime {
  extension: string;
  mimeType: EMimeType;
}

interface ExtensionDocumentTypeMimeAvecSignature extends ExtensionDocumentTypeMime {
  signature: number[];
}

export interface PieceJointe {
  base64File: Base64File;
  type?: Option;
}

export interface Base64File {
  fileName: string;
  base64String: string;
  extension?: string;
  mimeType?: EMimeType;
  taille: number;
  conteneurSwift?: string;
  identifiantSwift?: string;
}

const toBase64String = (file: File): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      const result = fileReader.result as string;
      const base64 = result?.split(DATA_URL_BASE_64)?.[1];

      if (base64) {
        resolve(base64);
      } else {
        reject(new Error("Invalid base64 data"));
      }
    };

    fileReader.onerror = error => {
      reject(error);
    };

    fileReader.readAsDataURL(file);
  });
};

const toArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      const result = fileReader.result as ArrayBuffer;

      resolve(result);
    };

    fileReader.onerror = error => {
      reject(error);
    };

    fileReader.readAsArrayBuffer(file);
  });
};

export const getBase64FichierEtLeValide = async (
  file: File,
  maxSizeKB?: number,
  extensionsEtTypeMimeAutorisees?: ExtensionDocumentTypeMime[]
): Promise<Base64File> => {
  const base64String = await toBase64String(file);
  const { mime, ext } = await getMimeTypeEtExtension(file);

  validationFichier(file.size, ext, mime, maxSizeKB ? maxSizeKB * NB_BYTES_IN_KILOBYTES : maxSizeKB, extensionsEtTypeMimeAutorisees);

  return {
    fileName: file?.name,
    base64String,
    extension: ext,
    mimeType: mime,
    taille: file.size
  };
};

export const getMimeTypeEtExtension = async (file: File) => {
  const fileAsArrayBuffer = await toArrayBuffer(file);
  const bytes = new Uint8Array(fileAsArrayBuffer);

  const informationsFichier = FILE_TYPES_ET_SIGNATURES.find(({ signature }) => signature.every((byte, i) => byte === bytes[i]));

  if (!informationsFichier) {
    throw Error(`Ce type de fichier ne peut pas être utilisé.`);
  }

  return {
    mime: informationsFichier.mimeType,
    ext: informationsFichier.extension
  };
};

export const validationFichier = (
  fileSizeBytes: number,
  fileExtension?: string,
  fileMimeType?: EMimeType,
  maxSizeBytes?: number,
  extensionsEtTypeMimeAutorisees?: ExtensionDocumentTypeMime[]
): void => {
  if (maxSizeBytes && maxSizeBytes < fileSizeBytes) {
    throw Error(`La taille du fichier ne peut pas excéder ${maxSizeBytes / NB_BYTES_IN_KILOBYTES} KB`);
  }

  if (extensionsEtTypeMimeAutorisees) {
    if (!extensionsEtTypeMimeAutorisees.find(extTypeMime => extTypeMime.extension === fileExtension)) {
      throw Error(
        `Les types d'extensions acceptés sont ${extensionsEtTypeMimeAutorisees.map(extTypeMime => extTypeMime.extension).join(", ")}`
      );
    }
    if (!extensionsEtTypeMimeAutorisees.find(extTypeMime => extTypeMime.mimeType === fileMimeType)) {
      throw Error(`Les types mime acceptés sont ${extensionsEtTypeMimeAutorisees.map(extTypeMime => extTypeMime.mimeType).join(", ")}`);
    }
  }
};

export const base64EnBlobUrl = (base64String: string, type: EMimeType): string => blobEnBlobUrl(base64EnBlob(base64String, type), type);

export const blobEnBlobUrl = (blob: Blob, type: EMimeType): string => URL.createObjectURL(new Blob([blob], { type }));

const base64EnBlob = (base64: string, type: EMimeType): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type });
};
