import FileType, { FileExtension, MimeType } from "file-type";
import { Option } from "./Type";

const BASE_64 = "base64";
const DATA_URL_BASE_64 = ";base64,";
const NB_BYTES_IN_KILOBYTES = 1000;

export interface ExtensionDocumentTypeMime {
  extension: FileExtension | "jpeg";
  mimeType: MimeType;
}

export interface PieceJointe {
  base64File: Base64File;
  type?: Option;
}

export interface Base64File {
  fileName: string;
  base64String: string;
  extension?: FileExtension | "jpeg";
  mimeType?: MimeType;
  taille: number;
  conteneurSwift?: string;
  identifiantSwift?: string;
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

export async function getBase64FileAndValidate(
  file: File,
  maxSizeKB?: number,
  extensionsEtTypeMimeAutorisees?: ExtensionDocumentTypeMime[]
): Promise<Base64File> {
  const base64String = await toBase64String(file);

  const fileInfos = await FileType.fromBuffer(
    Buffer.from(base64String, BASE_64)
  );

  validateFile(
    file.size,
    fileInfos?.ext,
    fileInfos?.mime,
    maxSizeKB ? maxSizeKB * NB_BYTES_IN_KILOBYTES : maxSizeKB,
    extensionsEtTypeMimeAutorisees
  );

  return {
    fileName: file?.name,
    base64String,
    extension: fileInfos?.ext,
    mimeType: fileInfos?.mime,
    taille: file.size
  };
}

export function validateFile(
  fileSizeBytes: number,
  fileExtension?: FileExtension,
  fileMimeType?: MimeType,
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

export function base64toBlob(base64String: string, type: string): string {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type });
  return URL.createObjectURL(blob);
}
