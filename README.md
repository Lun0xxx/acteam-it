# Gare Acteam-IT

**Langages utilisés** : HTML, CSS, JavaScript (React), PHP (Laravel)  
**Outils utilisés** : TanStack Query, Lucide React, TailwindCSS  

## Comment démarrer le projet ?  
* Docker (recommandé)
* Manuellement

## Docker
Installez Docker si ce n'est pas déjà fait.  

#### Windows / macOS

Téléchargez [Docker](https://www.docker.com/).  
Exécutez le fichier téléchargé pour installer Docker.  

⚠️ Pour macOS, vous pourriez avoir besoin d'installer docker et docker-compose via homebrew.  

Si homebrew n'est pas encore installé, vous pouvez le faire ici :  
[Homebrew](https://brew.sh/)  

Une fois installé, exécutez ces commandes :  
```brew install docker```  
```brew install docker-compose```

Tout est bon, vous pouvez passer au lancement des conteneurs. 

#### Linux  

Téléchargez [Docker pour Linux](https://docs.docker.com/desktop/setup/install/linux/) et suivez les instructions.  
Suivez les instructions pour télécharger le plugin [Docker Compose](https://docs.docker.com/compose/install/linux/).  

Tout est bon, vous pouvez passer au lancement des conteneurs.   

### Lancement des conteneurs  
Rendez-vous dans l'archive téléchargée une fois extraite et lancez la commande :  
```docker compose up -d```  

Lorsque les conteneurs sont démarrés, il ne vous reste plus qu'à vous rendre sur un navigateur et d'entrer l'adresse : localhost:80  

## Manuellement   
Premièrement, téléchargez et installez [PHP](https://www.php.net/downloads.php), [node.js](https://nodejs.org/en/download), [Composer](https://getcomposer.org/download/).  

Une fois avoir tout téléchargé, rendez-vous dans le dossier acteam-trains-backend et entrez ces commandes :  
```composer install```  
```php artisan serve```  

Ensuite, rendez-vous dans le dossier acteam-trains-frontend et entrez ces commandes :  
```npm i```  
```npm run dev```
