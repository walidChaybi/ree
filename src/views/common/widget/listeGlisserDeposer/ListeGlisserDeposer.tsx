import { Checkbox } from "@material-ui/core";
import { DeleteOutlined, DragHandle } from "@material-ui/icons";
import React from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { finirAvec3petitsPoints, getLibelle } from "../../util/Utils";
import "./scss/ListeGlisserDeposer.scss";

const MAX_CARACTERE = 120;

interface ListeGlisserDeposerProps {
  liste?: ListeItem[];
  elementSelect?: string;
  setElementSelect?: (id: string) => void;
  handleReorga?: (oldIndex: number, newIndex: number) => void;
  handleCheckbox?: (id: string) => void;
  onClickSupprimer?: (id: string) => void;
  deverouille?: boolean;
}

export interface ListeItem {
  libelle: string;
  checkbox: boolean;
  id: string;
  aPoubelle: boolean;
  liste1Element?: boolean;
}

export const ListeGlisserDeposer: React.FC<
  ListeGlisserDeposerProps
> = props => {
  const onClickMention = (item: ListeItem) => {
    if (props.deverouille) {
      if (props.setElementSelect) {
        props.setElementSelect(item.id);
      } else if (props.handleCheckbox) {
        props.handleCheckbox(item.id);
      }
    }
  };

  const DragHandleElement = SortableHandle(() => <DragHandle />);

  const SortableItem = SortableElement((item: ListeItem) => (
    <li
      onClick={() => onClickMention(item)}
      className={`${item.id === props.elementSelect ? "selected" : ""}`}
    >
      {props.handleReorga && !item.liste1Element && (
        <span title={getLibelle("Cliquer pour glisser/déposer")}>
          <DragHandleElement />
        </span>
      )}
      {props.deverouille && props.handleCheckbox && (
        <Checkbox
          title={getLibelle("Cliquer pour sélectionner")}
          checked={item.checkbox}
          onClick={() => {
            if (props.handleCheckbox) {
              props.handleCheckbox(item.id);
            }
          }}
        />
      )}

      {props.onClickSupprimer && item.aPoubelle && (
        <DeleteOutlined
          onClick={() => {
            if (props.onClickSupprimer) {
              props.onClickSupprimer(item.id);
            }
          }}
          className="IconeSupprimer"
          titleAccess={getLibelle("Supprimer la mention")}
        />
      )}
      <p title={item.libelle}>
        {finirAvec3petitsPoints(item.libelle, MAX_CARACTERE)}
      </p>
    </li>
  ));

  const SortableList = SortableContainer(() => {
    return (
      <ul>
        {props.liste &&
          props.liste.map((value: ListeItem, index: number) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              libelle={value.libelle}
              checkbox={value.checkbox}
              id={value.id}
              aPoubelle={value.aPoubelle}
              liste1Element={props.liste?.length === 1}
            />
          ))}
      </ul>
    );
  });

  return (
    <div className="ListeGlisserDeposer">
      {props.liste && (
        <SortableList
          onSortEnd={sortEnd => {
            if (props.handleReorga) {
              props.handleReorga(sortEnd.oldIndex, sortEnd.newIndex);
            }
          }}
          useDragHandle
        />
      )}
    </div>
  );
};
