import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import DragHandle from "@mui/icons-material/DragHandle";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { finirAvec3petitsPoints, getLibelle } from "@util/Utils";
import React, { useCallback } from "react";
import "./scss/ListeGlisserDeposer.scss";

const CARACTERES_MAXIMUM_LIBELLE_LISTE = 120;

interface ListeGlisserDeposerProps {
  liste: ListeItem[];
  elementSelect?: string;
  setElementSelect?: (id: number) => void;
  handleReorga?: (oldIndex: number, newIndex: number) => void;
  handleCheckbox?: (id: number) => void;
  onClickSupprimer?: (id: number) => void;
  onClickModifier?: (id: number) => void;
  deverrouille?: boolean;
  afficheDragHandle: boolean;
  useDragHandle: boolean;
  libellesSontTitres: boolean;
  nombreCaracteresMaximum?: number;
  afficheInfoBulle?: boolean;
}

export interface ListeItem {
  checkbox: boolean;
  libelle: string;
  id: string;
  estSupprimable: boolean;
  estModifiable: boolean;
  sousElement?: any;
  nouveau?: boolean;
}

type ListeItemAvecIndex = ListeItem & { index: number };

export const ListeGlisserDeposer: React.FC<
  ListeGlisserDeposerProps
> = props => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const SortableItem: React.FC<ListeItemAvecIndex> = item => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      setActivatorNodeRef
    } = useSortable({
      id: item.id
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    const onClickItem = (itemClique: ListeItemAvecIndex) => {
      if (props.setElementSelect) {
        props.setElementSelect(itemClique.index);
      }
    };

    return (
      <li
        ref={setNodeRef}
        style={style}
        onClick={() => onClickItem(item)}
        className={`${item.id === props.elementSelect ? "selected" : ""}`}
      >
        <span className="enTete">
          {afficherHandle(props) && (
            <span
              ref={props.useDragHandle ? setActivatorNodeRef : null}
              title={getLibelle("Cliquer pour glisser/déposer")}
              className="handler"
              {...attributes}
              {...listeners}
            >
              <DragHandle />
            </span>
          )}
          {props.deverrouille && props.handleCheckbox && (
            <Checkbox
              title={getLibelle("Cliquer pour sélectionner")}
              checked={item.checkbox}
              onClick={e => {
                if (props.handleCheckbox) {
                  props.handleCheckbox(item.index);
                  e.stopPropagation();
                }
              }}
              disabled={item.nouveau}
            />
          )}

          {props.onClickSupprimer && item.estSupprimable && (
            <DeleteOutlined
              onClick={() => {
                if (props.onClickSupprimer) {
                  props.onClickSupprimer(item.index);
                }
              }}
              className="IconeSupprimer"
              titleAccess={getLibelle("Supprimer la mention")}
            />
          )}
          {props.onClickModifier && item.estModifiable && (
            <EditOutlined
              onClick={() => {
                if (props.onClickModifier) {
                  props.onClickModifier(item.index);
                }
              }}
              className="IconeModifier"
              titleAccess={getLibelle("Modifier la mention")}
            />
          )}
          {props.libellesSontTitres ? (
            <h2 className="titre" title={item.libelle}>
              {props.nombreCaracteresMaximum &&
                finirAvec3petitsPoints(
                  item.libelle,
                  props.nombreCaracteresMaximum
                )}
            </h2>
          ) : (
            <p className="titre" title={item.libelle}>
              {props.nombreCaracteresMaximum &&
                finirAvec3petitsPoints(
                  item.libelle,
                  props.nombreCaracteresMaximum
                )}
            </p>
          )}
        </span>
        {item.sousElement}
      </li>
    );
  };

  const handleSort = useCallback(
    (event: any) => {
      const { active, over } = event;

      if (
        active.data.current.sortable.index !==
          over.data.current.sortable.index &&
        props.handleReorga
      ) {
        props.handleReorga(
          active.data.current.sortable.index,
          over.data.current.sortable.index
        );
      }
    },
    [props]
  );

  function renderSortableItems(el: ListeItem, index: number) {
    const component = (
      <SortableItem
        key={`item-${el.id}`}
        libelle={el.libelle}
        checkbox={el.checkbox}
        index={index}
        id={el.id}
        estSupprimable={el.estSupprimable}
        estModifiable={el.estModifiable}
        sousElement={el.sousElement}
        nouveau={el.nouveau}
      />
    );

    if (props.afficheInfoBulle) {
      return (
        <Tooltip key={`tooltip-${el.id}`} title={el.libelle}>
          {component}
        </Tooltip>
      );
    }

    return component;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleSort}
    >
      <ul className="ListeGlisserDeposer">
        <SortableContext
          items={props.liste}
          strategy={verticalListSortingStrategy}
        >
          {props.liste.map((el, index) => renderSortableItems(el, index))}
        </SortableContext>
      </ul>
    </DndContext>
  );
};
function afficherHandle(
  props: React.PropsWithChildren<ListeGlisserDeposerProps>
) {
  return (
    props.handleReorga && props.liste?.length !== 1 && props.afficheDragHandle
  );
}

ListeGlisserDeposer.defaultProps = {
  nombreCaracteresMaximum: CARACTERES_MAXIMUM_LIBELLE_LISTE
};
