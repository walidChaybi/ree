-- Cleanup de la requête RDD
DELETE FROM etape2.statut s where s.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.detail_requete_delivrance d where d.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
UPDATE etape2.requete req set id_dernier_action=NULL where req.id_requete = '89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.action a where a.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.evenement e where e.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.prenom prenom where prenom.id_titulaire='89aca88e-82b2-403f-a628-ccd07fc451b2';
DELETE FROM etape2.prenom prenom where prenom.id_parent_titulaire='89ac372f-240b-448e-91f1-6cc5ff30703c';
DELETE FROM etape2.parent_titulaire p where p.id_parent_titulaire='89ac372f-240b-448e-91f1-6cc5ff30703c';
DELETE FROM etape2.titulaire titulaire where titulaire.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.provenance_service_public p where p.id_provenance_service_public='89acb762-21f2-4a11-9ef8-5d4854cb6a99'; 
DELETE FROM etape2.requete r where r.id_requete='89acf6d3-f836-4f09-83f9-5708c04c6eb9';
DELETE FROM etape2.requerant r where r.id_requerant='89acb513-785e-4f5f-b8f6-c73a25714ea3';



-- Recréation de la requête RDD en statut A_TRAITER
INSERT INTO etape2.requerant (id_requerant,date_creation,nom_famille,prenom,courriel,telephone,"qualite",courriel_autre_contact,telephone_autre_contact) VALUES
	 ('89acb513-785e-4f5f-b8f6-c73a25714ea3'::uuid,'2025-08-22 14:41:23.87081+02','BRUTUS','Marcus','brutus@gmail.com','+331234567890','PARTICULIER'::etape2."qualite",NULL,NULL);
INSERT INTO etape2.requete (id_requete,numero_fonctionnel,date_creation,"canal","type",id_utilisateur,id_service,id_requerant,id_mandant,date_modification,id_dernier_action) VALUES
	 ('89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid,'LDLK7N','2025-08-22 14:41:23.870803+02','INTERNET'::etape2."canal",'DELIVRANCE'::etape2."type_requete",NULL,'95878ce0-8cfb-456e-a296-f100685ac064'::uuid,'89acb513-785e-4f5f-b8f6-c73a25714ea3'::uuid,NULL,'2025-08-22 14:41:24.163741+02',NULL);
INSERT INTO etape2."action" (id_action,numero_ordre,libelle,date_action,id_utilisateur,id_requete) VALUES
	 ('8a395f4b-0e4f-4ef0-8532-4afeabcb2884'::uuid,1,'A traiter','2025-08-22 14:41:23.690007+02','c4b37383-54c8-4f65-afdf-be1355a90ee2'::uuid,'89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid);
UPDATE etape2.requete req set id_dernier_action='8a395f4b-0e4f-4ef0-8532-4afeabcb2884' where req.id_requete = '89acf6d3-f836-4f09-83f9-5708c04c6eb9';

INSERT INTO etape2.provenance_service_public (id_provenance_service_public,reference_dila,case_id,id_saga_dila_impression) VALUES
	 ('89acb762-21f2-4a11-9ef8-5d4854cb6a99'::uuid,'SP2-RDD-A-2-Q71CEZAR-03','323b4615-9d59-41f7-9273-788c817bc877',NULL);
INSERT INTO etape2.titulaire (id_titulaire,"position",nom_naissance,nom_usage,annee_naissance,mois_naissance,jour_naissance,ville_naissance,pays_naissance,sexe,"nationalite",id_requete,code_postal_naissance,arrondissement_naissance,ville_etrangere_naissance,region_naissance,id_decret,adresse_naissance,id_domiciliation) VALUES
	 ('89aca88e-82b2-403f-a628-ccd07fc451b2'::uuid,1,'CESAR',NULL,1987,NULL,NULL,'Rome','ITALIE','MASCULIN'::etape2."genre",'FRANCAISE'::etape2."nationalite",'89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO etape2.parent_titulaire (id_parent_titulaire,"position",nom_naissance,id_titulaire) VALUES
	 ('89ac372f-240b-448e-91f1-6cc5ff30703c'::uuid,1,'CESAR','89aca88e-82b2-403f-a628-ccd07fc451b2'::uuid);
INSERT INTO etape2.prenom (id_prenom,numero_ordre,prenom,id_titulaire,id_parent_titulaire,id_detail_titulaire_creation,id_retenue_sdanf,prenom_retenu_sdanf_fr) VALUES
	 ('8a39d8aa-423d-4b0c-bbd2-fade17195efc'::uuid,1,'Papa',NULL,'89ac372f-240b-448e-91f1-6cc5ff30703c'::uuid,NULL,NULL,false),
	 ('8a391b31-f251-4f45-bb60-63d7600ad962'::uuid,1,'Julius','89aca88e-82b2-403f-a628-ccd07fc451b2'::uuid,NULL,NULL,NULL,false),
	 ('8a39193d-58ed-4dd2-a691-82562cc6af06'::uuid,2,'Caius','89aca88e-82b2-403f-a628-ccd07fc451b2'::uuid,NULL,NULL,NULL,false);
INSERT INTO etape2.evenement (id_evenement,"nature_acte",jour,mois,annee,ville,pays,id_requete,arrondissement_evenement,region_evenement,adresse_evenement,obtention_ccam,date_obtention_ccam) VALUES
	 ('8a39ab9c-bbf9-46a8-abaf-91d3d93cd819'::uuid,'NAISSANCE'::etape2."nature_acte",NULL,NULL,1987,'Rome','Italie','89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid,NULL,NULL,NULL,NULL,NULL);
INSERT INTO etape2.detail_requete_delivrance (id_detail_requete_delivrance,sous_type,document_demande,motif,complement_motif,date_delivrance_demat,"provenance",id_requete,id_provenance_service_public,id_provenance_rece,id_provenance_planete,nombre_exemplaires_demandes,"choix_delivrance",document_complementaire,"statut_reponse",id_provenance_comedec) VALUES
	 ('8a39d597-a541-4f4d-88b8-3a7ee57ace73'::uuid,'RDD'::etape2."sous_type_delivrance",'0e1e909f-f74c-4b16-9c03-b3733354c6ce'::uuid,'CERTIFICAT_NATIONALITE_FRANCAISE'::etape2."motif_delivrance",NULL,NULL,'SERVICE_PUBLIC'::etape2."provenance",'89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid,'89acb762-21f2-4a11-9ef8-5d4854cb6a99'::uuid,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO etape2.statut (id_statut,"statut_requete",date_effet,raison_statut,id_requete) VALUES
	 ('8a396759-3a9d-4e8b-86d1-46abd9de00f1'::uuid,'A_TRAITER'::etape2."statut_requete",'2025-08-22 14:41:23.578732+02',NULL,'89acf6d3-f836-4f09-83f9-5708c04c6eb9'::uuid);