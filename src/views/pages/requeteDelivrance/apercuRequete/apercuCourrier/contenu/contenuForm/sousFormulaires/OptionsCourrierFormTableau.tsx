import {
  OptionCourrier,
  OptionsCourrier
} from "@model/requete/IOptionCourrier";
import { getLibelle } from "@util/Utils";
import { IconeDanger } from "@widget/icones/IconeDanger";
import { IconeMoins } from "@widget/icones/IconeMoins";
import { IconePlus } from "@widget/icones/IconePlus";
import { IconeValider } from "@widget/icones/IconeValider";
import {
  Ligne,
  TableauSimple,
  TableauSimpleProps
} from "@widget/tableau/TableauSimple/TableauSimple";
import React from "react";
import { texteOptionCourrierModifie } from "./GestionOptionsCourrier";
import "./scss/OptionsCourrierForm.scss";

/** Construction du tableau des Options Disponibles */
export function getTableauOptionsDisponibles(
  optionsDisponibles: OptionsCourrier,
  optionsChoisies: OptionsCourrier,
  ajouterUneOption: (option: OptionCourrier) => void,
  modifierUneOption: (option: OptionCourrier) => void,
  optionSelectionne?: OptionCourrier
): JSX.Element {
  const tableauOptionsDisponiblesProps: TableauSimpleProps = {
    entetes: [
      {
        libelle: getLibelle("Option(s) disponible(s)")
      },
      {
        className: "BoutonOption",
        libelle: ""
      }
    ],
    lignes: optionsDisponibles.map((opt: OptionCourrier) => {
      // Si l'option choisie est exclusive alors on interdit les l'ajout d'autres options
      // OU S'il y a déjà une option choisie alors on interdit l'ajout d'une optionexclusive
      const ajoutOptionDesactiver =
        (optionsChoisies &&
          optionsChoisies.length > 0 &&
          optionsChoisies[0].optionExclusive) ||
        (optionsChoisies.length > 0 && opt.optionExclusive);

      const option = {
        key: opt.code,
        className: optionSelectionne === opt ? "optionSelectionner" : undefined,
        colonnes: [
          {
            contenu: opt.libelle,
            onClick: () => {
              modifierUneOption(opt);
            }
          },
          {
            contenu: getColonneAjouterOption(!ajoutOptionDesactiver)
          }
        ]
      } as Ligne;

      if (!ajoutOptionDesactiver) {
        option.colonnes[0].onDoubleClick = () => {
          ajouterUneOption(opt);
        };
        option.colonnes[1].onClick = () => {
          ajouterUneOption(opt);
        };
      }
      return option;
    })
  };

  return (
    <div className="TableauOptions">
      <TableauSimple {...tableauOptionsDisponiblesProps} />
    </div>
  );
}

/** Construction du tableau des Options Choisies */
export function getTableauOptionsChoisies(
  optionsChoisies: OptionsCourrier,
  supprimerUneOption: (option: OptionCourrier) => void,
  modifierUneOption: (option: OptionCourrier) => void,
  optionSelectionne?: OptionCourrier
): JSX.Element {
  const tableauOptionsChoisiesProps: TableauSimpleProps = {
    entetes: [
      {
        className: "BoutonOption",
        libelle: ""
      },
      {
        libelle: getLibelle("Option(s) choisie(s)")
      },
      {
        className: "BoutonOption",
        libelle: ""
      }
    ],
    lignes: optionsChoisies.map(opt => ({
      key: opt.code,
      className: optionSelectionne === opt ? "optionSelectionner" : undefined,
      colonnes: [
        {
          onClick: () => {
            supprimerUneOption(opt);
          },
          contenu: getColonneSupprimerOption()
        },
        {
          contenu: opt.libelle,
          onClick: () => {
            modifierUneOption(opt);
          },
          onDoubleClick: () => {
            supprimerUneOption(opt);
          }
        },
        {
          onClick: () => {
            modifierUneOption(opt);
          },
          contenu: getColonneModifierOption(opt)
        }
      ]
    }))
  };
  return (
    <div className="TableauOptions">
      <TableauSimple {...tableauOptionsChoisiesProps} />
    </div>
  );
}

function getColonneAjouterOption(visible: boolean): JSX.Element {
  return (
    <>
      {visible && (
        <div className="BoutonOption">
          <IconePlus title={getLibelle("Ajouter")} />
        </div>
      )}
    </>
  );
}

function getColonneSupprimerOption(): JSX.Element {
  return (
    <div className="BoutonOption">
      <IconeMoins title={getLibelle("Supprimer")} />
    </div>
  );
}

function getColonneModifierOption(opt: OptionCourrier): JSX.Element {
  return (
    <>
      {(opt.presenceVariables || opt.optionLibre) && (
        <div className="BoutonOption">
          {texteOptionCourrierModifie(opt) ? (
            <IconeValider title={getLibelle("Option modifié")} />
          ) : (
            <IconeDanger title={getLibelle("Option non modifié")} />
          )}
        </div>
      )}
    </>
  );
}
