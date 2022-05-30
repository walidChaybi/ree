import { urlImagePngVideBase64 } from "../../mock/data/ImagePng";
import { ChoixDelivrance } from "../../model/requete/enum/ChoixDelivrance";
import { FeatureFlag } from "../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { mappingRequeteDelivrance } from "../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { localStorageFeatureFlagMock } from "../common/util/featureFlag/gestionnaireFeatureFlag.test";

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

export function ajouterFeatureFlag() {
  Object.defineProperty(window, "localStorage", {
    value: localStorageFeatureFlagMock
  });
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS)).toBeTruthy();
}