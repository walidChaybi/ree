import { RECEContext } from "@core/body/RECEContext";
import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { IRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { getTypeRedactionActeParSousTypeCreation } from "@model/etatcivil/enum/TypeRedactionActe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/IDataTableauRMCPersonne";
import { TableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonne";
import { mapDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import {
  TMouseEventSurHTMLButtonElement,
  TMouseEventSurSVGSVGElement
} from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React, { useContext, useEffect, useState } from "react";
import { IDataTableauActeInscriptionSelectionne } from "../tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { TableauActesInscriptionsSelectionnes } from "../tableauActesInscriptionsSelectionnes/TableauActesInscriptionsSelectionnes";
import { IDataTableauPersonneSelectionnee } from "../tableauPersonnesSelectionnees/IDataTableauPersonneSelectionne";
import { TableauPersonnesSelectionnees } from "../tableauPersonnesSelectionnees/TableauPersonnesSelectionnees";
import {
  ISauvegardeRMCApiHookParams,
  useSauvegardeRMCApiHook
} from "../tableauPersonnesSelectionnees/hook/useSauvegardeRMCApiHook";
import {
  getTitulairesAsOptions,
  mapDataTableauRMCPersonneVersDataTableauActeInscriptionSelectionne,
  mapDataTableauRMCPersonneVersDataTableauPersonneSelectionnee,
  triDataTableauPersonneSelectionneeSurNomPrenom
} from "./OngletRMCPersonneUtils";
import "./scss/OngletRMCPersonne.scss";

interface OngletRMCPersonneProps {
  sousTypeRequete: SousTypeCreation;
  natureActeRequete: NatureActeRequete;
  resultatRMCPersonne: IRMCPersonneResultat[];
  listeTitulaires?: ITitulaireRequeteCreation[];
  dataPersonnesSelectionnees?: IDataTableauPersonneSelectionnee[];
  setDataPersonnesSelectionnees?: React.Dispatch<
    React.SetStateAction<IDataTableauPersonneSelectionnee[] | undefined>
  >;
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<
    React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>
  >;
  tableauRMCPersonneEnChargement: boolean;
  tableauPersonnesSelectionneesEnChargement?: boolean;
  tableauActesInscriptionsSelectionnesEnChargement: boolean;
  setRmcAutoPersonneParams: React.Dispatch<
    React.SetStateAction<IRMCAutoPersonneParams | undefined>
  >;
  onSavePersonneEtActeInscription?: () => void;
  idRequeteParam?: string;
}

export const OngletRMCPersonne: React.FC<OngletRMCPersonneProps> = props => {
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [sauvegardeRMCApiHookParams, setSauvegardeRMCApiHookParams] =
    useState<ISauvegardeRMCApiHookParams>();

  const sauvegardeRMCApiHookResultat = useSauvegardeRMCApiHook(
    sauvegardeRMCApiHookParams
  );

  function onClickBoutonAjouterPersonneOuActeInscription(
    event: TMouseEventSurHTMLButtonElement,
    ligneTableau: IDataTableauRMCPersonne,
    cle?: string
  ): void {
    const estDejaSelectionne = identifiantEstDejaSelectionne(
      ligneTableau.idPersonneOuActeInscription,
      ligneTableau.estDataPersonne,
      props.dataActesInscriptionsSelectionnes,
      props.dataPersonnesSelectionnees
    );

    if (cle && !estDejaSelectionne) {
      if (ligneTableau.estDataPersonne) {
        const role =
          RolePersonneSauvegardee.getEnumForEnFonctionNatureActeRequete(
            cle,
            NatureActeRequete.estMariage(props.natureActeRequete)
          );
        role &&
          ajouterPersonne(
            role,
            ligneTableau,
            props.dataPersonnesSelectionnees,
            props.setDataPersonnesSelectionnees
          );
      } else {
        ajouterActeInscription(
          cle,
          ligneTableau,
          props.dataActesInscriptionsSelectionnes,
          props.setDataActesInscriptionsSelectionnes,
          props.resultatRMCPersonne
        );
      }
      !isDirty && setIsDirty(true);
    }
  }

  function onClickBoutonRetirerPersonne(
    event: TMouseEventSurSVGSVGElement,
    ligneTableau: IDataTableauPersonneSelectionnee
  ): void {
    if (props.setDataPersonnesSelectionnees) {
      props.setDataPersonnesSelectionnees(
        props.dataPersonnesSelectionnees?.filter(
          personne => personne.idPersonne !== ligneTableau.idPersonne
        )
      );
      !isDirty && setIsDirty(true);
    }
  }

  function onClickBoutonRetirerActeInscription(
    event: TMouseEventSurSVGSVGElement,
    ligneTableau: IDataTableauActeInscriptionSelectionne
  ): void {
    props.setDataActesInscriptionsSelectionnes(
      props.dataActesInscriptionsSelectionnes?.filter(
        acteInscription =>
          acteInscription.idActeInscription !== ligneTableau.idActeInscription
      )
    );
    !isDirty && setIsDirty(true);
  }

  function handleClickMenuItemRMCPersonneRequete(idTitulaire: string) {
    const titulaire = props.listeTitulaires
      ?.filter(titulaireCourant => titulaireCourant.id === idTitulaire)
      .pop();
    if (titulaire) {
      props.setRmcAutoPersonneParams(
        mapTitulaireVersRMCAutoPersonneParams(titulaire)
      );
    }
  }

  function sauvegardePersonneEtActeSelectionne() {
    setSauvegardeRMCApiHookParams({
      dataPersonnesSelectionnees: props.dataPersonnesSelectionnees || [],
      dataActesInscriptionsSelectionnes:
        props.dataActesInscriptionsSelectionnes || [],
      idRequete: props.idRequeteParam || ""
    });
  }

  useEffect(() => {
    if (
      sauvegardeRMCApiHookResultat?.estValide &&
      props.onSavePersonneEtActeInscription
    ) {
      props.onSavePersonneEtActeInscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sauvegardeRMCApiHookResultat]);

  return (
    <>
      <TableauRMCPersonne
        typeRedactionActe={getTypeRedactionActeParSousTypeCreation(
          props.sousTypeRequete
        )}
        dataTableauRMCPersonne={mapDataTableauRMCPersonne(
          props.resultatRMCPersonne
        )}
        identifiantsPersonnesSelectionnees={
          props.dataPersonnesSelectionnees?.map(
            personne => personne.idPersonne
          ) || []
        }
        identifiantsActesInscriptionsSelectionnes={
          props.dataActesInscriptionsSelectionnes?.map(
            acteInscription => acteInscription.idActeInscription
          ) || []
        }
        natureActeRequete={props.natureActeRequete}
        enChargement={props.tableauRMCPersonneEnChargement}
        onClickBoutonAjouterPersonneOuActeInscription={
          onClickBoutonAjouterPersonneOuActeInscription
        }
      />
      <BoutonMenu
        boutonLibelle={getLibelle("Rechercher sur une personne de la requête")}
        options={getTitulairesAsOptions(
          props.sousTypeRequete,
          props.listeTitulaires
        )}
        onClickOption={e => handleClickMenuItemRMCPersonneRequete(e)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />

      {!SousTypeCreation.estSousTypeEtablissement(props.sousTypeRequete) && (
        <TableauPersonnesSelectionnees
          dataPersonnesSelectionnees={props.dataPersonnesSelectionnees ?? []}
          onClickBoutonRetirerPersonne={onClickBoutonRetirerPersonne}
          enChargement={
            props.tableauPersonnesSelectionneesEnChargement ?? false
          }
        />
      )}
      <TableauActesInscriptionsSelectionnes
        dataActesInscriptionsSelectionnes={
          props.dataActesInscriptionsSelectionnes || []
        }
        onClickBoutonRetirerActeInscription={
          onClickBoutonRetirerActeInscription
        }
        enChargement={props.tableauActesInscriptionsSelectionnesEnChargement}
      />
      <Bouton disabled={!isDirty} onClick={sauvegardePersonneEtActeSelectionne}>
        {getLibelle("Sauvegarder")}
      </Bouton>
    </>
  );
};

function identifiantEstDejaSelectionne(
  identifiant: string,
  estDataPersonne: boolean,
  dataActesInscriptionsSelectionnes: IDataTableauActeInscriptionSelectionne[] = [],
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[] = []
): boolean {
  return estDataPersonne
    ? dataPersonnesSelectionnees.some(
        personne => personne.idPersonne === identifiant
      )
    : dataActesInscriptionsSelectionnes.some(
        acteInscription => acteInscription.idActeInscription === identifiant
      );
}

function ajouterPersonne(
  role: RolePersonneSauvegardee,
  ligneTableau: IDataTableauRMCPersonne,
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[] | undefined,
  setDataPersonnesSelectionnees?: React.Dispatch<
    React.SetStateAction<IDataTableauPersonneSelectionnee[] | undefined>
  >
) {
  if (setDataPersonnesSelectionnees) {
    setDataPersonnesSelectionnees(
      [
        ...(dataPersonnesSelectionnees || []),
        {
          ...mapDataTableauRMCPersonneVersDataTableauPersonneSelectionnee(
            ligneTableau
          ),
          role: role.libelle
        }
      ].sort(triDataTableauPersonneSelectionneeSurNomPrenom)
    );
  }
}

function ajouterActeInscription(
  cle: string,
  ligneTableau: IDataTableauRMCPersonne,
  dataActesInscriptionsSelectionnes:
    | IDataTableauActeInscriptionSelectionne[]
    | undefined,
  setDataActesInscriptionsSelectionnes: React.Dispatch<
    React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>
  >,
  resultatRMCPersonne: IRMCPersonneResultat[]
) {
  const typePJ: TypePieceJustificative = TypePieceJustificative.getEnumFor(cle);
  setDataActesInscriptionsSelectionnes([
    ...(dataActesInscriptionsSelectionnes || []),
    {
      ...mapDataTableauRMCPersonneVersDataTableauActeInscriptionSelectionne(
        ligneTableau,
        resultatRMCPersonne
      ),
      typePJ: typePJ.libelle
    }
  ]);
}
