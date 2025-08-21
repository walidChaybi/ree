-- Cleanup de la requête RDD
DELETE FROM etape2.statut s where s.id_requete='0ad94da2-d0f3-4a07-8954-65ddf0355c11';
DELETE FROM etape2.document_a_signer_elec doc_a_signer where doc_a_signer.id_document_reponse='85d8be73-0128-4bc7-a629-ffe3fd4ae6b0';
DELETE FROM etape2.document_a_signer_elec doc_a_signer where doc_a_signer.id_document_reponse='85d8be73-0128-4bc7-a629-ffe3fd4ae6b2';
DELETE FROM etape2.document_reponse doc where doc.id_detail_requete_delivrance='1550792b-911f-4ce0-99a4-3077bf146214';
DELETE FROM etape2.detail_requete_delivrance d where d.id_requete='0ad94da2-d0f3-4a07-8954-65ddf0355c11';
DELETE FROM etape2.action action where action.id_requete='0ad94da2-d0f3-4a07-8954-65ddf0355c11';
DELETE FROM etape2.prenom prenom where prenom.id_titulaire='7a1fe6db-667e-406d-9146-600ccdddc360';
DELETE FROM etape2.titulaire titulaire where titulaire.id_requete='0ad94da2-d0f3-4a07-8954-65ddf0355c11';
DELETE FROM etape2.requete r where r.id_requete='0ad94da2-d0f3-4a07-8954-65ddf0355c11';


-- Recréation de la requête RDD en statut A_TRAITER
INSERT INTO etape2.requete (id_requete,numero_fonctionnel,date_creation,canal,"type",id_utilisateur,id_service,id_requerant,id_mandant,date_modification,id_dernier_action) VALUES
	 ('0ad94da2-d0f3-4a07-8954-65ddf0355c11'::uuid,'7LND2J','2024-11-19 13:20:47.655+01','INTERNET'::etape2.canal,'DELIVRANCE'::etape2.type_requete,'80fb7690-58a1-11ef-8a47-0800276b552b'::uuid,'9587f6cd-5805-4408-845f-24bfcbf935a4'::uuid,'a1be37f7-c666-41df-af2e-b7c8e79ad51c'::uuid,NULL,'2024-11-19 13:20:47.673+01',NULL);
INSERT INTO etape2.titulaire (id_titulaire,"position",nom_naissance,nom_usage,annee_naissance,mois_naissance,jour_naissance,ville_naissance,pays_naissance,sexe,nationalite,id_requete,code_postal_naissance,arrondissement_naissance,ville_etrangere_naissance,region_naissance,id_decret,adresse_naissance,id_domiciliation) VALUES
	 ('7a1fe6db-667e-406d-9146-600ccdddc360'::uuid,1,'ricardo',NULL,1985,4,15,'Madrid','Espagne','FEMININ'::etape2.genre,'ETRANGERE'::etape2.nationalite,'0ad94da2-d0f3-4a07-8954-65ddf0355c11'::uuid,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO etape2.prenom (id_prenom,numero_ordre,prenom,id_titulaire,id_parent_titulaire,id_detail_titulaire_creation,id_retenue_sdanf,prenom_retenu_sdanf_fr) VALUES
	 ('7a1fe6db-667e-406d-9146-600ccdddc360'::uuid,1,'alain','7a1fe6db-667e-406d-9146-600ccdddc360'::uuid,NULL,NULL,'fa9350df-b0b6-4e87-9bcf-62020cbb26fc'::uuid,true);
INSERT INTO etape2."action" (id_action,numero_ordre,libelle,date_action,id_utilisateur,id_requete) VALUES
	 ('a75b67ce-5f08-11ef-bd23-0800276b552b'::uuid,1,'A signer','2024-11-19 13:20:47.655+01','a75b67ce-5f08-11ef-bd23-0800276b552b'::uuid,'0ad94da2-d0f3-4a07-8954-65ddf0355c11'::uuid);
INSERT INTO etape2.detail_requete_delivrance (id_detail_requete_delivrance,sous_type,document_demande,motif,complement_motif,date_delivrance_demat,provenance,id_requete,id_provenance_service_public,id_provenance_rece,id_provenance_planete,nombre_exemplaires_demandes,choix_delivrance,document_complementaire,statut_reponse,id_provenance_comedec) VALUES
	 ('1550792b-911f-4ce0-99a4-3077bf146214'::uuid,'RDD'::etape2.sous_type_delivrance,'25d725b1-d62e-4024-ba37-be5935a00869'::uuid,'NON_PRECISE_PAR_REQUERANT'::etape2.motif_delivrance,'',NULL,'SERVICE_PUBLIC'::etape2.provenance,'0ad94da2-d0f3-4a07-8954-65ddf0355c11'::uuid,'15500e92-d328-4a37-9649-3e154061d5f4'::uuid,NULL,NULL,1,NULL,NULL,NULL,NULL);
INSERT INTO etape2.statut (id_statut,statut_requete,date_effet,raison_statut,id_requete) VALUES
	 ('fcbe99af-e2fa-4769-b9a7-dffd23fdb6e6'::uuid,'A_TRAITER'::etape2.statut_requete,'2024-11-19 13:20:47.655+01',NULL,'0ad94da2-d0f3-4a07-8954-65ddf0355c11'::uuid);
