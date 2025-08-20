import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { IRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { getTypeRedactionActeParSousTypeCreation } from "@model/etatcivil/enum/ETypeRedactionActe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ITypePieceJustificative, TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/IDataTableauRMCPersonne";
import { TableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonne";
import { mapDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
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
import { ISauvegardeRMCApiHookParams, useSauvegardeRMCApiHook } from "../tableauPersonnesSelectionnees/hook/useSauvegardeRMCApiHook";
import {
  getTitulairesAsOptions,
  mapDataTableauRMCPersonneVersDataTableauActeInscriptionSelectionne,
  mapDataTableauRMCPersonneVersDataTableauPersonneSelectionnee,
  triDataTableauPersonneSelectionneeSurNomPrenom
} from "./OngletRMCPersonneUtils";
import "./scss/OngletRMCPersonne.scss";

interface OngletRMCPersonneProps {
  sousTypeRequete?: SousTypeCreation;
  natureActeRequete: NatureActeRequete;
  resultatRMCPersonne: IRMCPersonneResultat[];
  listeTitulaires?: ITitulaireRequeteCreation[];
  dataPersonnesSelectionnees?: IDataTableauPersonneSelectionnee[];
  setDataPersonnesSelectionnees?: React.Dispatch<React.SetStateAction<IDataTableauPersonneSelectionnee[] | undefined>>;
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>>;
  tableauRMCPersonneEnChargement: boolean;
  tableauPersonnesSelectionneesEnChargement?: boolean;
  tableauActesInscriptionsSelectionnesEnChargement: boolean;
  setRmcAutoPersonneParams: React.Dispatch<React.SetStateAction<IRMCAutoPersonneParams | undefined>>;
  onSavePersonneEtActeInscription?: () => void;
  idRequeteParam?: string;
}

export const OngletRMCPersonne: React.FC<OngletRMCPersonneProps> = props => {
  const { isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const [sauvegardeRMCApiHookParams, setSauvegardeRMCApiHookParams] = useState<ISauvegardeRMCApiHookParams>();

  const sauvegardeRMCApiHookResultat = useSauvegardeRMCApiHook(sauvegardeRMCApiHookParams);

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
        const role = RolePersonneSauvegardee.getEnumForEnFonctionNatureActeRequete(
          cle,
          NatureActeRequete.estMariage(props.natureActeRequete)
        );
        role && ajouterPersonne(role, ligneTableau, props.dataPersonnesSelectionnees, props.setDataPersonnesSelectionnees);
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

  function onClickBoutonRetirerPersonne(event: TMouseEventSurSVGSVGElement, ligneTableau: IDataTableauPersonneSelectionnee): void {
    if (props.setDataPersonnesSelectionnees) {
      props.setDataPersonnesSelectionnees(
        props.dataPersonnesSelectionnees?.filter(personne => personne.idPersonne !== ligneTableau.idPersonne)
      );
      !isDirty && setIsDirty(true);
    }
  }

  function onClickBoutonRetirerActeInscription(ligneTableau: IDataTableauActeInscriptionSelectionne): void {
    props.setDataActesInscriptionsSelectionnes(
      props.dataActesInscriptionsSelectionnes?.filter(
        acteInscription => acteInscription.idActeInscription !== ligneTableau.idActeInscription
      )
    );
    !isDirty && setIsDirty(true);
  }

  function handleClickMenuItemRMCPersonneRequete(idTitulaire: string) {
    const titulaire = props.listeTitulaires?.filter(titulaireCourant => titulaireCourant.id === idTitulaire).pop();
    if (titulaire) {
      props.setRmcAutoPersonneParams(mapTitulaireVersRMCAutoPersonneParams(titulaire));
    }
  }

  function sauvegardePersonneEtActeSelectionne() {
    setSauvegardeRMCApiHookParams({
      dataPersonnesSelectionnees: props.dataPersonnesSelectionnees || [],
      dataActesInscriptionsSelectionnes: props.dataActesInscriptionsSelectionnes || [],
      idRequete: props.idRequeteParam ?? ""
    });
  }

  useEffect(() => {
    if (sauvegardeRMCApiHookResultat?.estValide && props.onSavePersonneEtActeInscription) {
      props.onSavePersonneEtActeInscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sauvegardeRMCApiHookResultat]);

  return (
    <>
      <TableauRMCPersonne
        typeRedactionActe={getTypeRedactionActeParSousTypeCreation(props.sousTypeRequete)}
        dataTableauRMCPersonne={mapDataTableauRMCPersonne(props.resultatRMCPersonne)}
        identifiantsPersonnesSelectionnees={props.dataPersonnesSelectionnees?.map(personne => personne.idPersonne) || []}
        identifiantsActesInscriptionsSelectionnes={
          props.dataActesInscriptionsSelectionnes?.map(acteInscription => acteInscription.idActeInscription) || []
        }
        natureActeRequete={props.natureActeRequete}
        enChargement={props.tableauRMCPersonneEnChargement}
        onClickBoutonAjouterPersonneOuActeInscription={onClickBoutonAjouterPersonneOuActeInscription}
      />
      <BoutonMenu
        boutonLibelle={"Rechercher sur une personne de la requête"}
        options={getTitulairesAsOptions(props.sousTypeRequete, props.listeTitulaires)}
        onClickOption={e => handleClickMenuItemRMCPersonneRequete(e)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />

      {!SousTypeCreation.estSousTypeEtablissement(props.sousTypeRequete) && (
        <TableauPersonnesSelectionnees
          dataPersonnesSelectionnees={props.dataPersonnesSelectionnees ?? []}
          onClickBoutonRetirerPersonne={onClickBoutonRetirerPersonne}
          enChargement={props.tableauPersonnesSelectionneesEnChargement ?? false}
        />
      )}
      <TableauActesInscriptionsSelectionnes
        dataActesInscriptionsSelectionnes={props.dataActesInscriptionsSelectionnes || []}
        onClickBoutonRetirerActeInscription={onClickBoutonRetirerActeInscription}
      />
      <BoutonDoubleSubmit
        disabled={!isDirty}
        onClick={sauvegardePersonneEtActeSelectionne}
      >
        {"Sauvegarder"}
      </BoutonDoubleSubmit>
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
    ? dataPersonnesSelectionnees.some(personne => personne.idPersonne === identifiant)
    : dataActesInscriptionsSelectionnes.some(acteInscription => acteInscription.idActeInscription === identifiant);
}

function ajouterPersonne(
  role: RolePersonneSauvegardee,
  ligneTableau: IDataTableauRMCPersonne,
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[] | undefined,
  setDataPersonnesSelectionnees?: React.Dispatch<React.SetStateAction<IDataTableauPersonneSelectionnee[] | undefined>>
) {
  if (setDataPersonnesSelectionnees) {
    setDataPersonnesSelectionnees(
      [
        ...(dataPersonnesSelectionnees || []),
        {
          ...mapDataTableauRMCPersonneVersDataTableauPersonneSelectionnee(ligneTableau),
          role: role.libelle
        }
      ].sort(triDataTableauPersonneSelectionneeSurNomPrenom)
    );
  }
}

function ajouterActeInscription(
  cle: string,
  ligneTableau: IDataTableauRMCPersonne,
  dataActesInscriptionsSelectionnes: IDataTableauActeInscriptionSelectionne[] | undefined,
  setDataActesInscriptionsSelectionnes: React.Dispatch<React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>>,
  resultatRMCPersonne: IRMCPersonneResultat[]
) {
  const typePJ: ITypePieceJustificative | null = TypePieceJustificative.depuisId(cle);
  setDataActesInscriptionsSelectionnes([
    ...(dataActesInscriptionsSelectionnes || []),
    {
      ...mapDataTableauRMCPersonneVersDataTableauActeInscriptionSelectionne(ligneTableau, resultatRMCPersonne),
      typePJ: typePJ?.libelle ?? ""
    }
  ]);
}
