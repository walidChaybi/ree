import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { urlImagePngVideBase64 } from "../../mock/data/ImagePng";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0]!.match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const pngFile = dataURLtoFile(urlImagePngVideBase64, "hello.png");
const pngFiles = [pngFile];
export const inputPngFiles = {
  item: (index: number) => pngFiles[index],
  ...pngFiles
};

export function getRequeteWithChoixDelivrance(
  requete: any,
  choixDelivrance: ChoixDelivrance
) {
  return {
    ...mappingRequeteDelivrance(requete),
    choixDelivrance
  };
}

export function mockFenetreFicheTestFunctions() {
  const globalAny: any = global;
  globalAny.URL.createObjectURL = jest.fn();
  globalAny.scroll = jest.fn();
  globalAny.open = () => {
    return {
      ...window,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    };
  };
  globalAny.close = jest.fn();
}