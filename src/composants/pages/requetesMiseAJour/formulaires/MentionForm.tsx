import { CONFIG_GET_METAMODELE_TYPE_MENTION } from "@api/configurations/requete/miseAJour/GetMetamodeleTypeMentionConfigApi";
import { TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { ITypeMention, TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IMetaModeleTypeMentionDto, MetaModeleTypeMention } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { logError } from "@util/LogManager";
import { Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { EEvent, useEventDispatch, useEventState } from "../../../../hooks/EventHook";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import SchemaValidation from "../../../../utils/SchemaValidation";
import Bouton from "../../../commun/bouton/Bouton";
import ChampZoneTexte from "../../../commun/champs/ChampZoneTexte";
import ComposantChargeur from "../../../commun/chargeurs/ComposantChargeur";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import ScrollVersErreur from "../../../commun/formulaire/ScrollVersErreur";
import { IMentionEnCours } from "../PartieFormulaire";
import AideALaSaisieMention from "./mentions/AideALaSaisieMentionForm";
import ChampTypeMention from "./mentions/ChampTypeMention";

interface IInfoTitulaire {
  sexe: Sexe | null;
}

export interface ITypeMentionDisponible {
  id: string;
  libelle: string;
  parents: { parent1: string | null; parent2: string | null };
  aideSaisie: boolean;
  affecteAnalyseMarginale: boolean;
  avecEnfants: boolean;
  libellesEnfants: string[];
  libellesParents: string[];
}

export type TMentionForm = {
  idTypeMention: string;
  mentionAffecteAnalyseMarginale: boolean;
  texteMention: string;
  textesEdites: { [cle: string]: { edite: string; original: string } };
} & TObjetFormulaire;

interface IMentionFormProps {
  infoTitulaire: IInfoTitulaire;
  setEnCoursDeSaisie: (estEnCours: boolean) => void;
}

const SCHEMA_VALIDATION_MENTIONS = {
  idTypeMention: Yup.string().required("Veuillez choisir un type de mention"),
  texteMention: Yup.string().required("Veuillez saisir le texte de la mention")
};

const getTypesMentionDisponibles = (natureActe: NatureActe): ITypeMentionDisponible[] => {
  const typesMentionDisponibles: ITypeMentionDisponible[] = [];
  const ajouterTypesMention = (
    typesMention: ITypeMention[],
    parents: { parent1: string | null; parent2: string | null },
    libellesParents: string[] = []
  ) => {
    typesMention.forEach(typeMention => {
      if (!typeMention.estPresentListeDeroulante) {
        return;
      }

      typesMentionDisponibles.push({
        id: typeMention.id,
        libelle: typeMention.libelle,
        parents: parents,
        aideSaisie: typeMention.estSaisieAssistee,
        affecteAnalyseMarginale: typeMention.affecteAnalyseMarginale,
        avecEnfants: Boolean(typeMention.sousTypes?.length),
        libellesEnfants:
          typeMention.sousTypes?.reduce((libelles: string[], sousType) => {
            if (sousType.estPresentListeDeroulante) {
              libelles.push(sousType.libelle);
              sousType.sousTypes?.forEach(sousSousType => sousSousType.estPresentListeDeroulante && libelles.push(sousSousType.libelle));
            }
            return libelles;
          }, []) ?? [],
        libellesParents: libellesParents
      });
      if (typeMention.sousTypes?.length) {
        ajouterTypesMention(
          typeMention.sousTypes,
          {
            parent1: parents.parent1 ?? typeMention.id,
            parent2: parents.parent1 ? typeMention.id : null
          },
          [...libellesParents, typeMention.libelle]
        );
      }
    });
  };

  ajouterTypesMention(TypeMention.getTypeMentionParNatureActe(natureActe), { parent1: null, parent2: null });

  return typesMentionDisponibles;
};

const DEFAUT_CREATION: TMentionForm = { idTypeMention: "", texteMention: "", textesEdites: {}, mentionAffecteAnalyseMarginale: false };

const MentionForm: React.FC<IMentionFormProps> = ({ infoTitulaire, setEnCoursDeSaisie }) => {
  const typesMentionDisponibles = useMemo(() => getTypesMentionDisponibles(NatureActe.NAISSANCE), []);
  const [valeurDefaut, setValeurDefaut] = useState<TMentionForm>({ ...DEFAUT_CREATION });
  const [typeMentionChoisi, setTypeMentionChoisi] = useState<ITypeMentionDisponible | null>(null);
  const [metamodeleTypeMention, setMetamodeleTypeMention] = useState<MetaModeleTypeMention | null>(null);
  const { appelApi: appelApiGetMetamodeleTypeMention, enAttenteDeReponseApi: enAttenteMetamodele } =
    useFetchApi(CONFIG_GET_METAMODELE_TYPE_MENTION);
  const [mentionModifiee, setMentionModifiee] = useEventState<IMentionEnCours | null>(EEvent.MODIFIER_MENTION, null);
  const { envoyer: enregistrerMention } = useEventDispatch<IMentionEnCours | null>(EEvent.ENREGISTRER_MENTION);
  const schemaValidation = useMemo(() => {
    return SchemaValidation.objet({
      ...SCHEMA_VALIDATION_MENTIONS,
      ...(metamodeleTypeMention?.schemaValidation ?? {})
    });
  }, [metamodeleTypeMention]);

  useEffect(() => {
    if (!mentionModifiee) {
      return;
    }

    const idModifie = mentionModifiee.mention.idTypeMention;
    const typeMentionModifie = typesMentionDisponibles.find(typeMention => typeMention.id === idModifie) ?? null;
    if (!typeMentionModifie) {
      return;
    }

    setTypeMentionChoisi(typeMentionModifie);
  }, [mentionModifiee]);

  useEffect(() => {
    setEnCoursDeSaisie(Boolean(typeMentionChoisi));

    if (!typeMentionChoisi) {
      setMetamodeleTypeMention(null);

      return;
    }

    if (typeMentionChoisi?.aideSaisie) {
      appelApiGetMetamodeleTypeMention({
        parametres: { path: { idTypeMention: typeMentionChoisi.id } },
        apresSucces: (metamodele: IMetaModeleTypeMentionDto) => {
          const modele = MetaModeleTypeMention.depuisDto(metamodele);
          if (!modele) {
            throw new Error();
          }

          setMetamodeleTypeMention(modele);
          setValeurDefaut({
            ...modele.valeursInitiales(mentionModifiee?.mention.donneesAideSaisie?.champs),
            titulaire: { sexe: infoTitulaire.sexe?.libelle ?? "" },
            idTypeMention: typeMentionChoisi.id,
            texteMention: mentionModifiee?.mention.texte ?? "",
            textesEdites: mentionModifiee?.mention.donneesAideSaisie?.textesEdites ?? {},
            mentionAffecteAnalyseMarginale: typeMentionChoisi.affecteAnalyseMarginale
          });
        },
        apresErreur: () => {
          logError({
            messageUtilisateur: "Impossible de récupérer les metamodeles"
          });
          setValeurDefaut((prec: any) => ({ ...prec, texteMention: "" }));
        }
      });

      return;
    }

    setMetamodeleTypeMention(null);
    setValeurDefaut({
      idTypeMention: typeMentionChoisi.id,
      texteMention: mentionModifiee?.mention.texte ?? "",
      textesEdites: {},
      mentionAffecteAnalyseMarginale: typeMentionChoisi.affecteAnalyseMarginale
    });
  }, [typeMentionChoisi]);

  return (
    <Formik<TMentionForm>
      initialValues={valeurDefaut}
      validationSchema={schemaValidation}
      enableReinitialize
      onSubmit={values => {
        enregistrerMention({
          index: mentionModifiee?.index ?? null,
          mention: {
            idTypeMention: values.idTypeMention,
            texte: values.texteMention,
            donneesAideSaisie: {
              champs: (() => {
                const { idTypeMention, texteMention, textesEdites, ...champsAideSaisie } = values;

                return champsAideSaisie;
              })(),
              textesEdites: values.textesEdites
            },
            affecteAnalyseMarginale: values.mentionAffecteAnalyseMarginale
          }
        });
        setMentionModifiee(null);
        setValeurDefaut({ ...DEFAUT_CREATION });
      }}
    >
      {({ values, initialValues }) => (
        <ConteneurAvecBordure titreEnTete={mentionModifiee ? "Modification d'une mention" : "Ajout d'une mention"}>
          <Form className="grid gap-9 px-1 pt-3">
            <ScrollVersErreur />
            <ChampTypeMention
              name="idTypeMention"
              typesMentionDisponibles={typesMentionDisponibles}
              setIdTypeMentionChoisi={id => setTypeMentionChoisi(typesMentionDisponibles.find(mention => mention.id === id) ?? null)}
            />

            {initialValues.idTypeMention && (
              <>
                {enAttenteMetamodele ? (
                  <ComposantChargeur />
                ) : (
                  <>
                    {metamodeleTypeMention ? (
                      <AideALaSaisieMention metamodeleTypeMention={metamodeleTypeMention} />
                    ) : (
                      <ChampZoneTexte
                        libelle="Texte mention"
                        name={TEXTE_MENTION}
                        rows={8}
                        typeRedimensionnement="fixe"
                      />
                    )}
                  </>
                )}

                <div className="flex justify-end gap-6">
                  <Bouton
                    title="Valider"
                    disabled={!values.texteMention}
                    type="submit"
                  >
                    {mentionModifiee ? "Modifier mention" : "Ajouter mention"}
                  </Bouton>
                  <Bouton
                    title="Annuler"
                    styleBouton="secondaire"
                    onClick={() => {
                      if (mentionModifiee) {
                        enregistrerMention(mentionModifiee);
                        setMentionModifiee(null);
                      }
                      setValeurDefaut({ ...DEFAUT_CREATION });
                      setTypeMentionChoisi(null);
                    }}
                  >
                    {"Annuler"}
                  </Bouton>
                </div>
              </>
            )}
          </Form>
        </ConteneurAvecBordure>
      )}
    </Formik>
  );
};

export default MentionForm;
