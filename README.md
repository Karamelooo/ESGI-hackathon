# Listing des fonctionnalités :

  - Planning et algorithme de génération : Hugo PETIT @Karamelooo
  - CRUD des salles ainsi que les matériels attitrés à un utilisateur ou à une salle :
Arthur VALENTIM @Valentin460
  - CRUD user, Student, Intervenant, Post, Comment, Matiere, Promotion, Cours, Indispo, Pause, Periode, Contrainte (en cours), middleware(auth, upload image) : Riad AHMED YAHIA @riri95500
  - CRUD user (pas utilisé), auth middleware(pas utilisé), front login(pas utilisé) et aide sur les materiels attitrés a un utilisateurs/salles : Léo Poumailloux

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
