import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { IconeDanger } from "@widget/icones/IconeDanger";
import { IconeMoins } from "@widget/icones/IconeMoins";
import { IconePlus } from "@widget/icones/IconePlus";
import { IconeValider } from "@widget/icones/IconeValider";
import { Ligne, TableauSimple, TableauSimpleProps } from "@widget/tableau/TableauSimple/TableauSimple";
import { texteOptionCourrierModifie } from "./GestionOptionsCourrier";
import "./scss/OptionsCourrierForm.scss";

/** Construction du tableau des Options Disponibles */
export const getTableauOptionsDisponibles = (
  optionsDisponibles: OptionCourrier[],
  optionsChoisies: OptionCourrier[],
  ajouterUneOption: (option: OptionCourrier) => void,
  modifierUneOption: (option: OptionCourrier) => void,
  optionSelectionnee?: OptionCourrier
): JSX.Element => {
  const tableauOptionsDisponiblesProps: TableauSimpleProps = {
    entetes: [
      {
        libelle: "Option(s) disponible(s)"
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
        (optionsChoisies && optionsChoisies.length > 0 && optionsChoisies[0].optionExclusive) ||
        (optionsChoisies.length > 0 && opt.optionExclusive);

      const option = {
        key: opt.code,
        className: optionSelectionnee === opt ? "optionSelectionnee" : undefined,
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
};

/** Construction du tableau des Options Choisies */
export const getTableauOptionsChoisies = (
  optionsChoisies: OptionCourrier[],
  supprimerUneOption: (option: OptionCourrier) => void,
  modifierUneOption: (option: OptionCourrier) => void,
  optionSelectionnee?: OptionCourrier
): JSX.Element => {
  const tableauOptionsChoisiesProps: TableauSimpleProps = {
    entetes: [
      {
        className: "BoutonOption",
        libelle: ""
      },
      {
        libelle: "Option(s) choisie(s)"
      },
      {
        className: "BoutonOption",
        libelle: ""
      }
    ],
    lignes: optionsChoisies.map(opt => ({
      key: opt.code,
      className: optionSelectionnee === opt ? "optionSelectionnee" : undefined,
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
};

const getColonneAjouterOption = (visible: boolean): JSX.Element => (
  <>
    {visible && (
      <div className="BoutonOption">
        <IconePlus
          className="text-md"
          title={"Ajouter"}
        />
      </div>
    )}
  </>
);

const getColonneSupprimerOption = (): JSX.Element => (
  <div className="BoutonOption">
    <IconeMoins title={"Supprimer"} />
  </div>
);

const getColonneModifierOption = (opt: OptionCourrier): JSX.Element => (
  <>
    {(opt.presenceVariables || opt.optionLibre) && (
      <div className="BoutonOption">
        {texteOptionCourrierModifie(opt) ? <IconeValider title={"Option modifiée"} /> : <IconeDanger title={"Option non modifiée"} />}
      </div>
    )}
  </>
);
