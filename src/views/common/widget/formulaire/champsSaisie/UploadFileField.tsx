import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import messageManager from "@util/messageManager";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import React, { useEffect, useRef, useState } from "react";
import { Base64File, ExtensionDocumentTypeMime, getBase64FichierEtLeValide } from "../../../../../utils/FileUtils";

interface UploadFileFieldProps {
  name: string;
  libelleBouton?: string;
  iconBouton?: JSX.Element;
  ariaLabel?: string;
  menuItems?: Options; // Il est possible d'ajouter un menu pour choisir un type fonctionnel de fichier par exemple avant d'ouvrir la fenêtre de choix du fichier
  title?: string;
  acceptFileTypes: ExtensionDocumentTypeMime[];
  maxSizeKB?: number;
  disabled?: boolean;
  contenu?: Base64File;
  hideInput?: boolean;
  onFileChange: (base64File: Base64File, type?: Option) => void;
  verificationAvantDOuvriLeMenu?: () => boolean;
  className?: string;
}

const UploadFileField: React.FC<UploadFileFieldProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const [fileState, setFileState] = useState<Base64File>();
  const [menuItemState, setMenuItemState] = useState<Option>();

  useEffect(() => {
    if (props.contenu) {
      setFileState(props.contenu);
    }
  }, [props.contenu]);

  const onChange = async (event: any) => {
    const file: File = event?.target?.files?.[0];
    try {
      const base64File: Base64File = await getBase64FichierEtLeValide(file, props.maxSizeKB, props.acceptFileTypes);

      setFileState(base64File);
      props.onFileChange(base64File, menuItemState);
    } catch (error) {
      messageManager.showErrorAndClose((error as Error).message);
    }
  };
  const handleCloseMenu = () => {
    setMenu(null);
  };
  const handleClickBoutonChoisirFichier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.menuItems) {
      if (props.verificationAvantDOuvriLeMenu) {
        if (props.verificationAvantDOuvriLeMenu()) {
          setMenu(e.currentTarget);
        }
      } else {
        setMenu(e.currentTarget);
      }
    } else {
      refLabelButton.current?.click();
    }
  };

  const refLabelButton = useRef<HTMLLabelElement>(null);

  return (
    <div className={props.className}>
      {!props.hideInput && (
        <input
          id={`input-file-name-${props.name}`}
          name={`input-file-name-${props.name}`}
          title={props.title}
          aria-label={props.ariaLabel || props.name}
          type="text"
          value={fileState?.fileName || ""}
          readOnly
        />
      )}
      <label
        ref={refLabelButton}
        htmlFor={props.name}
        className="FakeLabel"
      >
        <button
          className="BoutonUpload"
          onClick={e => handleClickBoutonChoisirFichier(e)}
          disabled={props.disabled}
        >
          {props.iconBouton}
          {props.libelleBouton ? props.libelleBouton : getLibelle("...")}
        </button>
        {props.menuItems && (
          <Menu
            className="Menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            {props.menuItems.map(menuItem => (
              <MenuItem
                key={menuItem.cle}
                onClick={(e: any) => {
                  setMenuItemState(menuItem);
                  setMenu(null);
                  refLabelButton.current?.click();
                }}
              >
                {menuItem.libelle}
              </MenuItem>
            ))}
          </Menu>
        )}
        <input
          id={props.name}
          data-testid={props.name}
          name={props.name}
          type="file"
          accept={formatAcceptFileTypes(props.acceptFileTypes)}
          disabled={props.disabled}
          onChange={onChange}
          hidden
        />
      </label>
    </div>
  );

  /**
   * Convertion d'un tapleau de types de fichier en une chaîne utilisable par l'attribut "accept" d'un "input" HTML
   * Ex: ["png", "pdf", "jpg", "jpeg"] => ".png, .pdf, .jpg, .jpeg"
   */
  function formatAcceptFileTypes(fileTypes: ExtensionDocumentTypeMime[]) {
    return "." + fileTypes.map(f => f.extension).join(", .");
  }
};

export default UploadFileField;
