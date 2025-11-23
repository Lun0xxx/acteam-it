# Gare Acteam-IT

**Langages utilisés** : HTML, CSS, JavaScript (React), PHP (Laravel)  
**Outils utilisés** : TanStack Query, Lucide React, TailwindCSS  

## Comment démarrer le projet ?  
* Docker (recommandé)
* Manuellement

## Docker
Installez Docker si ce n'est pas déjà fait.  

Rendez-vous dans l'archive téléchargée une fois extraite et lancez la commande :  
```docker compose up -d```  

Lorsque les conteneurs sont démarrés, il ne vous reste plus qu'à vous rendre sur un navigateur et d'entrer l'adresse : localhost:80  

## Manuellement   
Premièrement, téléchargez et installez [PHP](https://www.php.net/downloads.php), [node.js](https://nodejs.org/en/download), [Composer](https://getcomposer.org/download/)  

Une fois tout téléchargé, rendez-vous dans le dossier acteam-trains-backend et entrez ces commandes :  
```composer install```  
```php artisan serve```  

Ensuite, rendez-vous dans le dossier acteam-trains-frontend et entrez ces commandes :  
```npm i```  
```npm run dev```
