# 2 - Publier votre image Docker

## Objectif
- Publier votre application Hangman sur Docker Hub
- Deployer l'app hangman sur votre VM

## Technique
- Docker
## Compétences développées
- Conteneurisation d'une application
## Rendu
- Votre image docker est publié sur hub.docker.com
- Un container avec l'application est déployé sur votre VM

Lets Go 🔥

## Publier une image Docker sur Docker Hub

Une fois votre application conteneurisée et fonctionnelle en local, une étape essentielle consiste à la **rendre disponible publiquement ou à la partager avec d'autres développeurs**.  
Pour cela, nous allons utiliser **Docker Hub**, le registre d’images Docker le plus populaire, qui permet d’héberger et de distribuer facilement vos images à travers le monde.

L’objectif de cette section est de vous guider pas à pas dans la **publication de votre image Docker Hangman** sur Docker Hub, afin qu’elle puisse être téléchargée et exécutée depuis n’importe quelle machine disposant de Docker.

---

### Préparer son environnement

Avant toute chose, assurez-vous d’avoir un **compte Docker Hub**.  
Si ce n’est pas le cas, vous pouvez en créer un gratuitement sur le site officiel :  
👉 [https://hub.docker.com/signup](https://hub.docker.com/signup)

Une fois votre compte créé, connectez-vous depuis votre terminal à l’aide de la commande suivante :

```bash
docker login
```

Cette commande vous demandera votre nom d’utilisateur Docker Hub ainsi que votre mot de passe.
Une confirmation s’affichera une fois la connexion établie avec succès :

```
Login Succeeded
```

### Nommer correctement votre image

Pour que votre image puisse être publiée sur Docker Hub, elle doit être taguée selon le format suivant :

```
<nom_utilisateur>/<nom_image>:<tag>
```

Par exemple, si votre nom d’utilisateur Docker Hub est ```vberthet``` et que vous souhaitez publier l’image de 
votre projet Hangman, vous pouvez exécuter :

```bash
docker tag hangman vberthet/hangman:latest
```

Cette commande associe à votre image locale hangman un nouveau tag qui respecte la nomenclature requise par Docker Hub.
Le tag latest indique qu’il s’agit de la version la plus récente de l’image.

### Publier l’image sur Docker Hub

Une fois l’image correctement taguée, il ne vous reste plus qu’à la pousser vers Docker Hub :
```bash
docker push vberthet/hangman:latest
```

Docker commencera alors à transférer les différentes couches de votre image vers le registre distant.
Une fois le processus terminé, vous verrez un message confirmant la réussite de l’opération :

```
The push refers to repository [registry-host:5000/myname/myimage]
195be5f8be1d: Pushed
latest: digest: sha256:edafc0a0fb057813850d1ba44014914ca02d671ae247107ca70c94db686e7de6 size: 4527
```

Votre image est désormais disponible publiquement sur votre espace Docker Hub à l’adresse suivante :
👉 https://hub.docker.com/r/vberthet/hangman

### Vérifier la publication

Pour vous assurer que tout s’est bien déroulé, vous pouvez accéder à votre espace personnel sur Docker Hub.
Vous y trouverez votre nouvelle image listée, accompagnée de son tag et de ses métadonnées (taille, date de mise à jour, etc.).

Il est également possible de tester le téléchargement de l’image depuis une autre machine :

```bash
docker pull vberthet/hangman:latest
```

Cette commande récupérera votre image depuis Docker Hub et permettra à tout utilisateur de l’exécuter localement :

```bash
docker run -p 3000:3000 vberthet/hangman:latest
```

## Bonnes pratiques

- Toujours utiliser un tag explicite (par exemple v1.0.0 ou dev) pour éviter les confusions entre les différentes versions.
- Ne pas publier de données sensibles (fichiers .env, clés API, mots de passe).
- Maintenir votre image à jour en republiant une nouvelle version après chaque évolution majeure du projet.
- Ajouter une description et un README sur Docker Hub afin de documenter votre image pour les autres utilisateurs.

## Ressources utiles

- Documentation officielle de Docker Hub : https://docs.docker.com/docker-hub/
- Gestion des tags et versions : https://docs.docker.com/engine/reference/commandline/tag/
- Bonnes pratiques Docker : https://docs.docker.com/develop/develop-images/dockerfile_best-practices/