
# ND Booking 🍴




## Réalisation d'un module de réservation de table pour un restaurant.

&nbsp;
## Fonctionnalités 🥗

&nbsp;

**Le client (restaurateur) doit pouvoir :**

- Ajouter un bouton sur son site renvoyant le visiteur sur le module de réservation destiné à ce même restaurant.
- S’authentifier pour avoir accès à son dashboard.
- Voir le nombre de réservation en temps réel et pour les jours et services à venir (tables réservées, nombre de couverts).
- Réserver des tables.
- Pour son compte, changer son mot de passe, son adresse email et l’adresse du restaurant.
- Recevoir des notifications lorsqu’une nouvelle réservation est enregistrée.

&nbsp;

**Le consommateur (client du restaurant) doit pouvoir :**

- Voir les tables disponibles, en cours de réservation et réservées en temps réel.
- Voir ces disponibilités pour les prochains jours aussi bien pour le service de midi que celui du soir.
- Recevoir une confirmation que la réservation a bien été prise en compte et lui rappeler les informations telles que la date, l’heure et l’adresse du restaurant.

&nbsp;
## Techno 🍕

**Front:** React, Typescript,Bulma

**Back:** Laravel, Mysql

&nbsp;
## Etapes de développement 🍔

* Imaginer et dessiner le schéma de la base de données.
* Créer un environnement Laravel.
* Effectuer la migration pour créer les tables de la BDD.
* Mettre en ligne la BDD contenant des données fictives pour effectuer les tests.
* Mettre l’application en ligne, créer les requêtes vers la base de données et les routes pour les liens API nécessaires.
* Créer :

  * Le design de l’application.

  * Un environnement React et vérifier les connexions à l’Api.

  * La page de réservation pour le consommateur où il peut choisir le jour et le service pour lequel il souhaite réserver, qu’il puisse cliquer sur une table et la réserver.

  * Une page pour le client (restaurateur) pour se loguer et avoir accès au dashboard associé à son restaurant.

  * Le dashboard comprenant la vision du plan de salle et des réservations en fonction de la date et du service choisi. La possibilité de réserver une table.

  * Un accès à une page « profil » où il est possible de modifier son adresse mail, son mot de passe et l’adresse du restaurant.

* Tests et corrections d'éventuels bugs.
 
&nbsp;
## Lien 🍟

 - Deploiement en cours

&nbsp;
## Auteurs 🍗

- [@lambertnicolas](https://github.com/lambertnicolas)
- [@luuduc34](https://github.com/luuduc34)

&nbsp;

## Conclusion de fin de montagne 📝

&nbsp;

**Ce qui a été réalisé :**

- La page d'accueil affiche par défaut le prochain service à venir :
  * Avant 14h30, on affiche le "lunch"
  * Entre 14h30 et 20h00, on affiche le "diner"
  * Après 20h00, on affiche le "lunch" du lendemain

![Page d'accueil](https://github.com/lambertnicolas/NDBooking/blob/development/resources/img/ndb1.jpg)
- Les tables réservées sont grisées. Quelque soient la date et le service choisi.Cliquer sur une table réservée renvoie un message d'erreur à l'utilisateur. Pour l'affichage des messages nous utilisons [SweetAlert2](https://sweetalert2.github.io/)

![Réservations](https://github.com/lambertnicolas/NDBooking/blob/development/resources/img/ndb4.jpg)

- La date et le service choisi (ou ceux par défaut) sont affichés au dessus du plan de salle.
- Lorsque l'utilisateur choisi une table disponible, le formulaire de réservation apparait.

![Formulaire](https://github.com/lambertnicolas/NDBooking/blob/development/resources/img/ndb2.jpg)

- Le choix du "Arrival time" change en fonction du service choisi. Les heures qui ne font pas partie de la tranche horaire du service sont grisées. Pour la gestion des dates et heures nous utilisons [react-datePicker](https://reactdatepicker.com/).
- Des règles sont appliquées au choix du nombre de personne en fonction de la table choisie. Une table de 2 ne pourra pas accueillir 3 personnes, une table de 4 n'acceptera pas moins de 3 personnes et pour une table de 6 il faudra être 5.
- Tous les champs sont requis pour pouvoir valider le formulaire.
- Une fois validé, l'utilisateur est redirigé vers la plan de salle à la date et service pour lesquels il vient d'enregistrer sa réservation. Il peut ainsi voir que la table qu'il a choisi est grisée et ne peut plus être réservée par un autre utilisateur.
- Un email de confirmation contenant la date, l'heure d'arrivée, le nombre de personne et le numéro de la table lui est envoyé.
- Entre temps, le back-end a vérifié que l'utilisateur (identifié avec son numéro de téléphone) n'a pas déjà réservé une table pour ce service à cette date.Dans ce cas il recevra un message d'erreur.
- L'utilisateur est enregistré dans la base de donnée en même temps que sa réservation. Si il a déjà réservé une table dans le passé (via ce numéro de téléphone) il n'est pas créé une deuxième fois (ce qui pourrait permettre d'incrémenter un compteur de réservations).
- Lorsque la réservation est validée, un évènement contenant le numéro de la table est envoyé via [Pusher](https://pusher.com/) aux utilisateurs qui se trouvent sur le même service.

&nbsp;

- Une fois connecté, le restaurateur a accès au dashboard.

![DashBoard](https://github.com/lambertnicolas/NDBooking/blob/development/resources/img/ndb3.jpg)

- Si il ne défini pas une date et un service, on affiche le "lunch" jusque 15h00, ensuite on affiche le "diner".
- Il peut voir les tables libres et réservées sur le plan de salle.
- Il peut aussi voir les réservations par slot de 1h. Lorsqu'un slot contient plus de 10 couverts il devient rouge (pour aider le restaurateur à anticiper sa mise en place).
- Il peut supprimer une réservation.
- Il peut changer de date et/ou service pour voir les réservations.
- Il peut entrer lui même une réservation qu'il reçoit par téléphone.
- Une réservation ne peut etre modifiée car on part du principe qu'une table est réservée pour tout le service (fonctionnalitée à développer lorsqu'on implémentera la gestion d'un double service).

&nbsp;

**Ce qu'il reste à faire :**

- Déploiment (en cours)
- Faire passer en temps réel une table réservée avec l'évènement renvoyé par Pusher.
- Envoyer une notification au restaurateur lorsqu'une nouvelle réservation est validée.
- Design de la page "account" du restaurateur.

&nbsp;

**Suite de notre parcours et du projet :**

**Nico :** Dans les semaines à venir je dois passer sur le projet de la Croix-rouge Jeunesse dans lequel je suis engagé. Dès que possible j'aimerais revenir sur ce projet pour lequel j'ai encore beaucoup d'idées à développer. En fonction de ma recherche de stage j'aimerais continuer mon apprentissage de Laravel et/ou typescript + react ou vue.

**Duc :** Pour ma part, les semaines à venir seront d'abord consacrés à React, Vue et Tailwind (il peut y avoir du changement en fonction des technos qui seront utilisés lors du stage). Celà ne m'empêchera pas non plus de revenir sur ce projet, en concertation avec Nico, afin d'y joindre de nouvelles fonctionnalités mais surtout terminer les objectifs qu'on s'était fixés au départ du projet.
