# Conteneurisation avec Docker

## Objectif
- Utiliser une image existante pour la base de données et savoir la configurer
- Conteneuriser votre application Hangman (Créer une image Docker)
- Avoir une application fonctionnelle en local sur votre poste de travail

## Technique
- Docker
## Compétences développées
- Conteneurisation d'une application
## Rendu
- L’application fonctionnelle sur votre poste de travail en utilisant une application conteneurisées. L’idée est d’avoir un fichier docker-compose.yaml et de simplement lancer la commande docker-compose up pour avoir l’application fonctionnelle sur votre poste
- Un fichier Dockerfile
- Un fichier docker-compose.yml

Lets Go 🔥

## Intro
Docker a révolutionné le monde du développement et du déploiement d'applications en introduisant une approche simplifiée et efficace : la conteneurisation. Cette notion permet d'isoler l'application de son environnement et garantit qu'elle fonctionne de manière uniforme, malgré les différences entre les machines de développement et de production. Contrairement aux machines virtuelles, qui virtualisent un système d'exploitation complet, les conteneurs Docker partagent le noyau du système hôte, ce qui les rend nettement plus légers et plus rapides.

## Lancer mon premier container

Commençons par exécuter un premier conteneur à partir d’une image officielle Node.js afin de découvrir le fonctionnement de base de Docker.

La commande suivante permet d’ouvrir un shell interactif dans un conteneur basé sur l’image node:22-slim :
```bash
docker run -it node:22-slim bash
```

Une fois à l’intérieur du conteneur, vous pouvez exécuter la commande suivante :
```bash
# Afficher la version de node
node -v
```

Cette commande vous indiquera la version de Node.js disponible dans le conteneur.
Essayez maintenant de modifier la commande docker run pour lancer une autre version de Node.js.

Par exemple, comment procéderiez-vous pour utiliser Node 20 ou Node 18 à la place de la version 22 ?

## Lancer le projet en mode développement

Nous allons maintenant exécuter notre application Hangman en mode développement directement à l’intérieur d’un conteneur Docker.

Utilisez la commande suivante :

```bash 
docker run -it --rm -p 3000:3000 -v "$(pwd)":/app -w /app node:22-slim bash
```

Prenez un moment pour analyser les différents paramètres utilisés dans cette commande.
En vous appuyant sur la documentation officielle de Docker, expliquez le rôle de chacun d’eux.

- ```-v "$(pwd)":/app``` 
- ```-p 3000:3000```

Cette approche permet de tester et d’exécuter votre projet en environnement isolé, tout en conservant une expérience de développement fluide.


## Creer mon premier container

Nous allons maintenant créer une image Docker spécifique pour notre projet Node.js.
Cette image contiendra tous les éléments nécessaires à l’exécution de votre application : le code source, les dépendances et les outils indispensables.

Les étapes nécessaires sont fournies avec une grande partie du code requis.
Toutefois, il est essentiel de prendre le temps de comprendre chaque action effectuée.
Cela vous permettra non seulement de personnaliser votre image, mais aussi de mieux appréhender le fonctionnement des conteneurs Docker.

[Ecrire un Dockerfile](https://blog.stephane-robert.info/docs/conteneurs/images-conteneurs/ecrire-dockerfile/)

### Creer un dockerfile

```dockerfile
# We start for a docker image named "node:20-slim" 
# see https://hub.docker.com/_/node
# We use base as an alias name
FROM node:20-slim AS base

# We'll work inside the directory /app
WORKDIR /app

# Copy project file 
COPY . .
# Run npm install
# We use "npm ci" instead of "npm install"
# Read https://docs.npmjs.com/cli/v7/commands/npm-ci for explaination
RUN npm ci
# We run our custom build script
RUN npm run build

# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD npm run start
```

### Contruire le container

La commande suivante permet de construire une image Docker à partir d'un Dockerfile dans le répertoire courant :

```bash
$ docker build -t hangman .
```
L'option `-t hangman` permet de taguer l'image Docker construite avec un nom spécifique. Ici, le nom donné à l'image est hangman.


Une fois l'image créée, il est important de vérifier sa présence sur votre machine.
Pour ce faire, vous pouvez lister toutes les images Docker en exécutant la commande suivante :
```bash
$ docker image ls
REPOSITORY   TAG         IMAGE ID       CREATED          SIZE
hangman      latest      f4f394185d24   13 minutes ago   368MB
```
Vous constaterez que l'image "hangman" apparaît bien dans la liste des images disponibles.

### Lancer mon container

Une fois l'image Docker "hangman" créée, vous pouvez la lancer en exécutant la commande suivante :
```bash
$ docker run -p 3000:3000 hangman
```

**Quitter le conteneur**

Pour quitter le conteneur en cours d'exécution, appuyez sur CTRL + C.

**Accéder à un shell interactif dans le conteneur**
Si vous souhaitez ouvrir un shell interactif à l'intérieur du conteneur, vous pouvez utiliser la commande suivante :
```bash
$ docker run -it hangman bash
```

Depuis ce terminal, vous pouvez inspecter le contenu du conteneur en utilisant la commande suivante :
`ls -la`, qui permet de lister les fichiers présents dans le répertoire actuel en
affichant des informations détaillées (permissions, propriétaires, tailles, etc.).

## Docker compose

Docker Compose est un outil qui permet de définir et de gérer des applications multi-conteneurs Docker à l'aide d'un fichier de configuration. Ce fichier, généralement nommé docker-compose.yml, permet de spécifier les services, réseaux et volumes nécessaires au bon fonctionnement de l'application.

Grâce à Docker Compose, vous pouvez facilement démarrer, arrêter et gérer plusieurs conteneurs simultanément avec une seule commande.

**Créer le fichier `docker-compose.yml`**

Vous trouverez ci-dessous un exemple de contenu à inclure dans ce fichier.

```yaml

# Declare all services use by our application
services:
  # Declare a service named "web"
  web:
    # We obtain its image by building the Dockerfile present in the same directory
    build: .
    # Our container will expose the port 3000 
    # we bind the port 3000 of our machine to the port 3000 of the container
    # This will allow use to access our service using "http://localhost:3000" 
    ports:
      - 3000:3000

# TODO : If your restart this stack your database is lost, use a volume to preserve it across restart 

```

Pour démarrer votre stack, exécutez la commande suivante :
```bash
docker compose up
```

**Mettre en place un volume pour la persistance des données**

Il est essentiel de configurer un volume dans votre fichier docker-compose.yml.
Cela permettra de garantir la persistance de vos données, notamment la base de données, même après un redémarrage du container.
Notament dans notre cas le fichier prisma/dev.db est perdu a chaque redemarrage du container. 

### Documentation utile

* Docker compose : https://blog.stephane-robert.info/docs/conteneurs/orchestrateurs/docker-compose/
* Volumes Docker : https://blog.stephane-robert.info/docs/conteneurs/moteurs-conteneurs/cheat-sheet/#cr%C3%A9er-un-volume

**Remarque importante :**

Cette commande démarre les containers définis dans votre fichier docker-compose.yml, mais elle ne reconstruira pas les images des containers si elles sont déjà présentes.

**Reconstruction de l'image :**
Si vous souhaitez forcer Docker à reconstruire le container avant de le démarrer, utilisez la commande suivante :
```bash
docker compose up --build
```
Cela permettra de régénérer l'image et de relancer les containers avec la version mise à jour.

## Netoyer le container

Comme vous l'avez peut-être constaté, le conteneur contient des fichiers qui ne devraient pas être présents dans un environnement de production.
Il est recommandé, en suivant les bonnes pratiques, de ne pas inclure les sources, les fichiers de tests, ou tout autre élément superflu dans un conteneur destiné à la production.
Pour répondre à cette exigence, nous allons utiliser un build multi-stage (Voir [https://docs.docker.com/build/building/multi-stage/])

```dockerfile
# We start for a docker image named "node:20-slim"
# see https://hub.docker.com/_/node
# We use base as an alias name
FROM node:20-slim AS base
# We'll work inside the directory /app
WORKDIR /app

######################################
# First stage (build the app)
FROM base as builder
# Copy project file
COPY . .
# Run npm install
# We use "npm ci" instead of "npm install"
# Read https://docs.npmjs.com/cli/v7/commands/npm-ci for explaination
RUN npm ci
# We run our custom build script
RUN npm run build

######################################
# Second stage (build the production container)
FROM base AS runner

# Here we copy a file from "builder" stage to the current "runner" stage
COPY --from=builder /app/node_modules /app/node_modules
# TODO Add missing COPY to complete the production container
# Read NextJs documentation to understand what is missing : https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
# ......

# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD node server.js
```


## Securiser le container
Dans un environnement de conteneur, vous avez peut-être remarqué que l'utilisateur par défaut est souvent configuré comme root.
Pour vérifier l'utilisateur actuellement connecté, vous pouvez utiliser la commande suivante :
```bash
$ docker run -it hangman whoami
root
```
Cette commande retournera le nom de l'utilisateur actif dans le shell du conteneur.

Dans l'écosystème Linux, root est l'utilisateur doté de tous les privilèges système. Cela signifie qu'il dispose d'un accès illimité pour modifier, supprimer ou configurer n'importe quel aspect du système.

Cependant, si une personne malveillante parvient à exploiter une faille dans votre application, elle pourrait obtenir ces privilèges élevés, mettant en danger l'intégrité de votre système.

Pour cette raison, il est impératif de ne jamais utiliser l'utilisateur root pour exécuter une application en environnement de production. Préférez l'utilisation d'un utilisateur avec des privilèges limités afin de minimiser les risques en cas de compromission.

```dockerfile
# We start for a docker image named "node:20-slim"
# see https://hub.docker.com/_/node
# We use base as an alias name
FROM node:20-slim AS base
# We'll work inside the directory /app
WORKDIR /app

######################################
# First stage (build the app)
FROM base as builder
# Copy project file
COPY . .
# Run npm install
# We use "npm ci" instead of "npm install"
# Read https://docs.npmjs.com/cli/v7/commands/npm-ci for explaination
RUN npm ci
# We run our custom build script
RUN npm run build

######################################
# Second stage (build the production container)
FROM base AS runner

# our base image "node" has a user named "node"
# After that line, all command run inside the conatiner will be launched by the "node" user 
USER node

# Here we copy a file from "builder" stage to the current "runner" stage
# We also need to change the owner of the files to ensure the "node" user can access them
COPY --from=builder --chown=node:node /app/node_modules /app/node_modules
# TODO Add missing COPY to complete the production container
# ......

# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD node server.js
```

## [Optionnel] Process Control System

Une bonne partique est egalement d'utiliser un "Process Control System" pour lancer notre application dans le container.

Celui-ci aura pour responsabilité de relancer le programme si celui-ci venat à echouer.

Pour cela vous pouvez utiliser `Supervisor`

Voir Documentation de Supervisor : http://supervisord.org/