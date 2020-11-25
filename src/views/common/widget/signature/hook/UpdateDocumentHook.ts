import { useState, useEffect } from "react";
import {
  patchDocumentsDelivresRequetes,
  IQueryParameterUpdateDocument
} from "../../../../../api/appels/requeteApi";

export interface IUpdateDocumentApiResult {
  url: string;
}

export function useUpdateDocumentApi(
  queryParameters?: IQueryParameterUpdateDocument[],
  callBack?: () => void
) {
  const [errorUpdateDocument, setErrorUpdateDocument] = useState(undefined);

  useEffect(() => {
    if (queryParameters !== undefined && queryParameters.length > 0) {
      patchDocumentsDelivresRequetes(queryParameters)
        .then(result => {
          if (callBack !== undefined) {
            callBack();
          }
        })
        .catch(error => {
          setErrorUpdateDocument(error);
        });
    }
  }, [queryParameters, callBack]);

  return {
    errorUpdateDocument
  };
}
