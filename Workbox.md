FLORENT Victor

# Workbox
 
## 1) Liste des fonctionnalités offertes
WorkBox permet de simplifier le développement de fonctionnalités fréquentes pour le service worker, tel que le routing ou l'utilisation du cache.
<ul>
<li>workbox-routing permet de passer d'une page à une autre en fonction du chemin URL donné. Il peut aussi rediriger vers une page par défaut en cas de chemin invalide.</li>
<li>Workox peut mettre des pages en cache, ce qui permet de ne pas avoir à redemander au serveur web des éléments pour afficher une page déjà visitée.</li>
<li>Le plugin Expiration permet de supprimer des données en cache après un certain moment ou un nombre d'utilisations afin de ne pas conserver de données obsolètes.</li>
<li>Le offline fallback permet d'avoir une page par défaut précachée utilisée en cas de tentative de connexion au site hors-ligne.</li>
<li>Le precaching permet de mettre en cache toute information avant même d'utiliser le service worker. Cela permet d'avoir accès à des pages qui seront utilisées communément, même hors ligne.</li>
<li>Workbox possède un wizard permettant de configurer le service worker de manière simple et personnalisée.</li>
<li>workbox-recipes permet de simplifier le travail du développeur à l'aide de méthodes regroupant des fonctionnalités très fréquentes, comme mettre en cache une page, en utilisant une seule ligne de code.</li>
</ul>

## 2) Méthodes de cache et utilisations possibles
### CacheFirst
Avec cette stratégie, le service worker regarde d'abord si la page demandée se trouve déjà dans le cache. Si ce n'est pas le cas, alors il demandera au serveur et le cache sera ajouté. Cela permet une meilleure performance (On ne repasse pas sur le serveur), au risque de ne pas être à jour (que ce soit l'apparence de la page ou les données affichées).
### NetworkFirst
Avec cette stratégie, c'est le serveur web qui est interrogé en premier. Dans le cas d'un échec, on récupère alors la page dans notre cache, si ce-dernier la possède. Cette stratégie est moins rapide, mais elle permet d'être toujours à jour. Et dans le cas où le serveur est indisponible, nous avons tout de même de quoi retourner sur quelque chose (si nous avons déjà utilisé le site)
### Stale-While-Revalidate
Cette stratégie utilise d'abord le cache pour afficher la fenêtre, puis fait une requête au serveur afin de mettre à jour le cache <em>pour la prochaine fois</em>.
### NetworkOnly
Avec cette stratégie, aucun cache n'est utilisé et nous passons directement sur le serveur. Cela est à utiliser dans le cas où les données récupérées changent en permanence et que les garder en cache n'apporte pas beaucoup d'utilité.
### CacheOnly
Cette stratégie n'utilise que les données se trouvant en cache. Elle est utile quand nous voulons récupérer des données déjà mises en cache (récupérés d'une autre manière à un autre moment)

## 3) Use cases à intégrer dans le projet doctoliberal
### Liste des docteurs disponibles : <em>CacheFirst</em>
La liste des docteurs avec lequel on peut prendre rendez-vous ne risque pas de constamment changer. 
### Liste des rendez-vous pour un docteur : <em>NetworkFirst</em>
Pour un docteur, il est essentiel d'être toujours à jour au niveau de ses rendez-vous. Cependant, lorsqu'il est en déplacement, il vaut tout de même mieux avoir la liste des destinations à portée de main, même hors ligne : l'utilisation du cache est alors primordiale.
### Liste des rendez-vous pour un client : <em>CacheFirst</em>
Contrairement aux docteurs, le patient n'a pas vraiment besoin de requêter le serveur web pour être toujours à jour : lui-même crée ses rendez-vous, et dans le cas où un docteur doit le décaler, il recevra un mail de ce-dernier le prévenant.
### Routing
On aurait pu utiliser WorkBox pour s'occuper du routing plutôt que d'utiliser le package react-router-dom. Cela reste une question de préférence.

# Page d'incitation à l'installation de PWA

## 1 ) Créer un composant React pour inciter et surtout guider un utilisateur à installer la PWA
Voir app.jsx

## 2 ) Expliquer en quoi il serait intéressant de mettre en place une telle page
L'utilisation d'une telle page PWA est intéressante car elle permet à l'utilisateur de pouvoir accéder directement sur la web app sans avoir à passer sur un navigateur web.