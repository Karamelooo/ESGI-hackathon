# Listing des fonctionnalités :

  - Planning et algorithme de génération : Hugo PETIT @Karamelooo
  - CRUD des salles ainsi que les matériels attitrés à un utilisateur ou à une salle :
Arthur VALENTIM @Valentin460
  - CRUD user, Student, Intervenant, Post, Comment, Matiere, Promotion, Cours, Indispo, Pause, Periode, Contrainte (en cours), middleware(auth, upload image) : Riad AHMED YAHIA @riri95500
  - CRUD user (pas utilisé), auth middleware(pas utilisé), front login(pas utilisé) et aide sur les materiels attitrés a un utilisateurs/salles : Léo Poumailloux
  - CRUD users, intervenants, promotions, matières, salles, cours, assinger une matiere, layouts et login page: Riadh Benchouche @riadh-benchouche

# Procédure d’installation et de lancement de votre solution

  - Dans le répertoire `frontend`, exécuter la commande suivante :
```
npm i
 ```

   - Dans le répertoire racine, exécuter la commande suivante :
```
docker compose up
```

- Afin de tester la génération du planning, il convient d'ajouter les éléments suivants en base de données :

  - Salles
  - Promotions
  - Matières
  - Utilisateurs ayant le rôle professeur
  - Assignation des matières aux promotions et aux professeurs
  - Périodes de cours par promotion

```SQL

INSERT INTO "Matiere" (id, name, semester, color, "updatedAt")
VALUES 
  ('1', 'Développement projet lowcode', 1, '#FF6B6B', CURRENT_TIMESTAMP),
  ('2', 'UX Research avancé', 1, '#4ECDC4', CURRENT_TIMESTAMP),
  ('3', 'Design XR', 1, '#45B7D1', CURRENT_TIMESTAMP),
  ('4', 'Psychologie cognitive et sociologie', 1, '#96CEB4', CURRENT_TIMESTAMP),
  ('5', 'Méthodologie et protocole de tests', 1, '#FFEEAD', CURRENT_TIMESTAMP),
  ('6', 'Management de projets design', 1, '#D4A5A5', CURRENT_TIMESTAMP),
  ('7', 'Veille et innovation', 1, '#9B59B6', CURRENT_TIMESTAMP),
  ('8', 'Culture du design', 1, '#3498DB', CURRENT_TIMESTAMP),
  ('9', 'Projets pratiques et études de cas', 1, '#E67E22', CURRENT_TIMESTAMP),
  ('10', 'Workshop RNCP', 1, '#2ECC71', CURRENT_TIMESTAMP),
  ('11', 'Accompagnement mémoires', 1, '#F1C40F', CURRENT_TIMESTAMP),
  ('12', 'Anglais S1', 1, '#E74C3C', CURRENT_TIMESTAMP),
  ('13', 'Pôle associatif EEMI', 1, '#1ABC9C', CURRENT_TIMESTAMP),
  ('14', 'Gamification', 2, '#D35400', CURRENT_TIMESTAMP),
  ('15', 'UI conversationnel', 2, '#8E44AD', CURRENT_TIMESTAMP),
  ('16', 'Récupération et exploitation de la data pour l''UX', 2, '#2980B9', CURRENT_TIMESTAMP),
  ('17', 'Propriété intellectuelle et sécurité', 2, '#27AE60', CURRENT_TIMESTAMP),
  ('18', 'Eco-conception', 2, '#F39C12', CURRENT_TIMESTAMP),
  ('19', 'Direction artistique', 2, '#C0392B', CURRENT_TIMESTAMP),
  ('20', 'UI Design', 2, '#16A085', CURRENT_TIMESTAMP),
  ('21', 'IA ethique', 2, '#7F8C8D', CURRENT_TIMESTAMP),
  ('22', 'Projets pratiques et études de cas', 2, '#E67E22', CURRENT_TIMESTAMP),
  ('23', 'Workshop RNCP', 2, '#2ECC71', CURRENT_TIMESTAMP),
  ('24', 'Prise de parole en public', 2, '#BDC3C7', CURRENT_TIMESTAMP),
  ('25', 'Accompagnement mémoires', 2, '#F1C40F', CURRENT_TIMESTAMP),
  ('26', 'Anglais S2', 2, '#E74C3C', CURRENT_TIMESTAMP),
  ('27', 'Pôle associatif EEMI S2', 2, '#1ABC9C', CURRENT_TIMESTAMP);

INSERT INTO "User" (id, name, firstname, email, password, role, "updatedAt")
VALUES 
  ('user-martin', 'Martin', 'Jean', 'jean.martin@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-bernard', 'Bernard', 'Marie', 'marie.bernard@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-petit', 'Petit', 'Pierre', 'pierre.petit@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-lambert', 'Lambert', 'Sophie', 'sophie.lambert@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-rousseau', 'Rousseau', 'Paul', 'paul.rousseau@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-moreau', 'Moreau', 'Claire', 'claire.moreau@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-dubois', 'Dubois', 'Thomas', 'thomas.dubois@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-thomas', 'Thomas', 'Julie', 'julie.thomas@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-robert', 'Robert', 'Michel', 'michel.robert@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-michel', 'Michel', 'Anne', 'anne.michel@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-richard', 'Richard', 'David', 'david.richard@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-garcia', 'Garcia', 'Emma', 'emma.garcia@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-martinez', 'Martinez', 'Lucas', 'lucas.martinez@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-simon', 'Simon', 'Laura', 'laura.simon@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-laurent', 'Laurent', 'Nicolas', 'nicolas.laurent@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-roux', 'Roux', 'Sarah', 'sarah.roux@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-vincent', 'Vincent', 'Antoine', 'antoine.vincent@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-leroy', 'Leroy', 'Camille', 'camille.leroy@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP),
  ('user-boyer', 'Boyer', 'Alexandre', 'alexandre.boyer@eemi.com', 'password123', 'INTERVENANT', CURRENT_TIMESTAMP);

INSERT INTO "Intervenant" (id, "userId", name, firstname, "updatedAt")
VALUES 
  ('1', 'user-martin', 'Martin', 'Jean', CURRENT_TIMESTAMP),
  ('2', 'user-bernard', 'Bernard', 'Marie', CURRENT_TIMESTAMP),
  ('3', 'user-petit', 'Petit', 'Pierre', CURRENT_TIMESTAMP),
  ('4', 'user-lambert', 'Lambert', 'Sophie', CURRENT_TIMESTAMP),
  ('5', 'user-rousseau', 'Rousseau', 'Paul', CURRENT_TIMESTAMP),
  ('6', 'user-moreau', 'Moreau', 'Claire', CURRENT_TIMESTAMP),
  ('7', 'user-dubois', 'Dubois', 'Thomas', CURRENT_TIMESTAMP),
  ('8', 'user-thomas', 'Thomas', 'Julie', CURRENT_TIMESTAMP),
  ('9', 'user-robert', 'Robert', 'Michel', CURRENT_TIMESTAMP),
  ('10', 'user-michel', 'Michel', 'Anne', CURRENT_TIMESTAMP),
  ('11', 'user-richard', 'Richard', 'David', CURRENT_TIMESTAMP),
  ('12', 'user-garcia', 'Garcia', 'Emma', CURRENT_TIMESTAMP),
  ('13', 'user-martinez', 'Martinez', 'Lucas', CURRENT_TIMESTAMP),
  ('14', 'user-simon', 'Simon', 'Laura', CURRENT_TIMESTAMP),
  ('15', 'user-laurent', 'Laurent', 'Nicolas', CURRENT_TIMESTAMP),
  ('16', 'user-roux', 'Roux', 'Sarah', CURRENT_TIMESTAMP),
  ('17', 'user-vincent', 'Vincent', 'Antoine', CURRENT_TIMESTAMP),
  ('18', 'user-leroy', 'Leroy', 'Camille', CURRENT_TIMESTAMP),
  ('19', 'user-boyer', 'Boyer', 'Alexandre', CURRENT_TIMESTAMP);

INSERT INTO "Indisponibilite" (id, start, "end", "intervenantId", "createdAt", "updatedAt")
VALUES 
  -- Semaine 1 (27-31 janvier 2025)
  ('1', '2025-01-27 08:00:00', '2025-01-27 12:00:00', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2', '2025-01-28 14:00:00', '2025-01-28 19:00:00', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('3', '2025-01-29 08:00:00', '2025-01-29 19:00:00', '3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('4', '2025-01-30 13:00:00', '2025-01-30 17:00:00', '4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('5', '2025-01-31 08:00:00', '2025-01-31 12:00:00', '5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  -- Semaine 2 (3-7 février 2025)
  ('6', '2025-02-03 14:00:00', '2025-02-03 19:00:00', '6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('7', '2025-02-04 08:00:00', '2025-02-04 12:00:00', '7', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('8', '2025-02-05 13:00:00', '2025-02-05 19:00:00', '8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('9', '2025-02-06 08:00:00', '2025-02-06 12:00:00', '9', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('10', '2025-02-07 14:00:00', '2025-02-07 19:00:00', '10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  -- Indisponibilités journée complète
  ('11', '2025-01-27 08:00:00', '2025-01-27 19:00:00', '11', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('12', '2025-01-29 08:00:00', '2025-01-29 19:00:00', '12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('13', '2025-02-03 08:00:00', '2025-02-03 19:00:00', '13', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('14', '2025-02-05 08:00:00', '2025-02-05 19:00:00', '14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  -- Indisponibilités matinée
  ('15', '2025-01-28 08:00:00', '2025-01-28 12:00:00', '15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('16', '2025-01-30 08:00:00', '2025-01-30 12:00:00', '16', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('17', '2025-02-04 08:00:00', '2025-02-04 12:00:00', '17', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('18', '2025-02-06 08:00:00', '2025-02-06 12:00:00', '18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  -- Indisponibilités après-midi
  ('19', '2025-01-31 14:00:00', '2025-01-31 19:00:00', '19', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('20', '2025-02-07 14:00:00', '2025-02-07 19:00:00', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "Promotion" (id, name, students, "updatedAt")
VALUES 
  ('1', 'M1 UX Design', 25, CURRENT_TIMESTAMP),
  ('2', 'M2 UX Design', 22, CURRENT_TIMESTAMP);

INSERT INTO "Salle" (id, name, capacite, "updatedAt")
VALUES 
  ('1', 'Salle 301', 30, CURRENT_TIMESTAMP),
  ('2', 'Salle 302', 30, CURRENT_TIMESTAMP),
  ('3', 'Salle 303', 30, CURRENT_TIMESTAMP);

INSERT INTO "Periode" (id, "start", "end", "promotionId", "updatedAt")
VALUES 
  -- Pour Promotion 1
  ('p1-1', '2025-01-27 00:00:00', '2025-01-31 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-2', '2025-02-24 00:00:00', '2025-02-28 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-3', '2025-03-25 00:00:00', '2025-03-28 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-4', '2025-04-21 00:00:00', '2025-04-25 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-5', '2025-05-19 00:00:00', '2025-05-23 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-6', '2025-06-16 00:00:00', '2025-06-20 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-7', '2025-07-21 00:00:00', '2025-07-25 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-8', '2025-09-01 00:00:00', '2025-09-05 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-9', '2025-09-08 00:00:00', '2025-09-12 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-10', '2025-10-06 00:00:00', '2025-10-10 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-11', '2025-11-03 00:00:00', '2025-11-07 23:59:59', '1', CURRENT_TIMESTAMP),
  ('p1-12', '2025-12-01 00:00:00', '2025-12-05 23:59:59', '1', CURRENT_TIMESTAMP),

  -- Pour Promotion 2
  ('p2-1', '2025-01-27 00:00:00', '2025-01-31 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-2', '2025-02-24 00:00:00', '2025-02-28 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-3', '2025-03-25 00:00:00', '2025-03-28 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-4', '2025-04-21 00:00:00', '2025-04-25 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-5', '2025-05-19 00:00:00', '2025-05-23 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-6', '2025-06-16 00:00:00', '2025-06-20 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-7', '2025-07-21 00:00:00', '2025-07-25 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-8', '2025-09-01 00:00:00', '2025-09-05 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-9', '2025-09-08 00:00:00', '2025-09-12 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-10', '2025-10-06 00:00:00', '2025-10-10 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-11', '2025-11-03 00:00:00', '2025-11-07 23:59:59', '2', CURRENT_TIMESTAMP),
  ('p2-12', '2025-12-01 00:00:00', '2025-12-05 23:59:59', '2', CURRENT_TIMESTAMP);

INSERT INTO "MatiereMapping" (id, "volumeHeure", "matiereId", "promotionId", "intervenantId", "updatedAt")
VALUES 
  -- Promotion 1
  ('1-1', 14, '1', '1', '1', CURRENT_TIMESTAMP),  -- Martin
  ('1-2', 17, '2', '1', '2', CURRENT_TIMESTAMP),  -- Bernard
  ('1-3', 10, '3', '1', '2', CURRENT_TIMESTAMP),  -- Bernard
  ('1-4', 10, '4', '1', '3', CURRENT_TIMESTAMP),  -- Petit
  ('1-5', 10, '5', '1', '4', CURRENT_TIMESTAMP),  -- Lambert
  ('1-6', 10, '6', '1', '5', CURRENT_TIMESTAMP),  -- Rousseau
  ('1-7', 10, '7', '1', '6', CURRENT_TIMESTAMP),  -- Moreau
  ('1-8', 10, '8', '1', '7', CURRENT_TIMESTAMP),  -- Dubois
  ('1-9', 10, '9', '1', '8', CURRENT_TIMESTAMP),  -- Thomas
  ('1-10', 3, '10', '1', '9', CURRENT_TIMESTAMP), -- Robert
  ('1-11', 10, '11', '1', '10', CURRENT_TIMESTAMP), -- Michel
  ('1-12', 10, '12', '1', '11', CURRENT_TIMESTAMP), -- Richard
  ('1-13', 10, '13', '1', '12', CURRENT_TIMESTAMP), -- Garcia
  ('1-14', 10, '14', '1', '13', CURRENT_TIMESTAMP), -- Martinez
  ('1-15', 17, '15', '1', '14', CURRENT_TIMESTAMP), -- Simon
  ('1-16', 10, '16', '1', '15', CURRENT_TIMESTAMP), -- Laurent
  ('1-17', 10, '17', '1', '16', CURRENT_TIMESTAMP), -- Roux
  ('1-18', 10, '18', '1', '17', CURRENT_TIMESTAMP), -- Vincent
  ('1-19', 10, '19', '1', '18', CURRENT_TIMESTAMP), -- Leroy
  ('1-20', 17, '20', '1', '19', CURRENT_TIMESTAMP), -- Boyer
  ('1-21', 10, '21', '1', '18', CURRENT_TIMESTAMP), -- Leroy
  ('1-22', 10, '22', '1', '10', CURRENT_TIMESTAMP), -- Michel
  ('1-23', 10, '23', '1', '9', CURRENT_TIMESTAMP),  -- Robert
  ('1-24', 10, '24', '1', '5', CURRENT_TIMESTAMP),  -- Rousseau
  ('1-25', 10, '25', '1', '10', CURRENT_TIMESTAMP), -- Michel
  ('1-26', 10, '26', '1', '11', CURRENT_TIMESTAMP), -- Richard
  ('1-27', 10, '27', '1', '12', CURRENT_TIMESTAMP);  -- Garcia

-- Promotion 2
INSERT INTO "MatiereMapping" (id, "volumeHeure", "matiereId", "promotionId", "intervenantId", "updatedAt")
VALUES 
  ('2-1', 14, '1', '2', '1', CURRENT_TIMESTAMP),  -- Martin
  ('2-2', 17, '2', '2', '2', CURRENT_TIMESTAMP),  -- Bernard
  ('2-3', 10, '3', '2', '2', CURRENT_TIMESTAMP),  -- Bernard
  ('2-4', 10, '4', '2', '3', CURRENT_TIMESTAMP),  -- Petit
  ('2-5', 10, '5', '2', '4', CURRENT_TIMESTAMP),  -- Lambert
  ('2-6', 10, '6', '2', '5', CURRENT_TIMESTAMP),  -- Rousseau
  ('2-7', 10, '7', '2', '6', CURRENT_TIMESTAMP),  -- Moreau
  ('2-8', 10, '8', '2', '7', CURRENT_TIMESTAMP),  -- Dubois
  ('2-9', 10, '9', '2', '8', CURRENT_TIMESTAMP),  -- Thomas
  ('2-10', 3, '10', '2', '9', CURRENT_TIMESTAMP), -- Robert
  ('2-11', 10, '11', '2', '10', CURRENT_TIMESTAMP), -- Michel
  ('2-12', 10, '12', '2', '11', CURRENT_TIMESTAMP), -- Richard
  ('2-13', 10, '13', '2', '12', CURRENT_TIMESTAMP), -- Garcia
  ('2-14', 10, '14', '2', '13', CURRENT_TIMESTAMP), -- Martinez
  ('2-15', 17, '15', '2', '14', CURRENT_TIMESTAMP), -- Simon
  ('2-16', 10, '16', '2', '15', CURRENT_TIMESTAMP), -- Laurent
  ('2-17', 10, '17', '2', '16', CURRENT_TIMESTAMP), -- Roux
  ('2-18', 10, '18', '2', '17', CURRENT_TIMESTAMP), -- Vincent
  ('2-19', 10, '19', '2', '18', CURRENT_TIMESTAMP), -- Leroy
  ('2-20', 17, '20', '2', '19', CURRENT_TIMESTAMP), -- Boyer
  ('2-21', 10, '21', '2', '18', CURRENT_TIMESTAMP), -- Leroy
  ('2-22', 10, '22', '2', '10', CURRENT_TIMESTAMP), -- Michel
  ('2-23', 10, '23', '2', '9', CURRENT_TIMESTAMP),  -- Robert
  ('2-24', 10, '24', '2', '5', CURRENT_TIMESTAMP),  -- Rousseau
  ('2-25', 10, '25', '2', '10', CURRENT_TIMESTAMP), -- Michel
  ('2-26', 10, '26', '2', '11', CURRENT_TIMESTAMP), -- Richard
  ('2-27', 10, '27', '2', '12', CURRENT_TIMESTAMP);
```
