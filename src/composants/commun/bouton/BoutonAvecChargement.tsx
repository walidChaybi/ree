import {
  RECEContextActions,
  RECEContextData,
} from "@core/contexts/RECEContext";
import { checkDirty } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import React, { ReactNode, useContext, useState } from "react";
import Bouton from "./Bouton";

interface BoutonAvecChargementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  executerApresClick: () => void;
  children: ReactNode;
  styleBouton?: "principal" | "secondaire" | "suppression";
  activerVerificationDirty?: boolean;
  timeoutEnMilliSecondes?: number;
}

export const BoutonAvecChargement: React.FC<BoutonAvecChargementProps> = ({
  executerApresClick,
  children,
  styleBouton = "principal",
  activerVerificationDirty = true,
  ...props
}) => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const { decrets, isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !decrets}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <Bouton
        styleBouton={styleBouton}
        {...props}
        onClick={() => {
          if (!activerVerificationDirty || checkDirty(isDirty, setIsDirty)) {
            setOperationEnCours(true);
            executerApresClick();
          }
        }}
      >
        {children}
      </Bouton>
    </>
  );
};
