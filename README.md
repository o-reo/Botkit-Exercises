# Quelques exercices sur Botkit

## Exercice 1
> Faire un mini-backend qui expose une API REST de récupération aléatoire de citation \
\- Node avec Express.js \
\- Citations dans un fichier JSON

La solution proposée est dans le fichier `index.js`

## Exercice 2
> Faire un mini-chatbot "Citations" en mode ligne de commande avec reconnaissance de mots clés
\- NodeJS avec dépendances Botkit et Axios uniquement \
\- Appel de l'API de l'exercice 1 pour obtenir les citations \
\- Répondre correctement à au revoir pour être poli \
\- Répondre avec une citation si un des mots-clés de la citation est présent dans la phrase utilisateur 

La solution proposée est dans le fichier `bot.js`. \
Si les keywords correspondant à plusieurs citations sont données elles sont toutes retournées.

## Exercice 3
> Pourquoi utiliser un Linter ? Quel est le linter le plus connu pour Javascript

Un Linter permet de vérifier intéractivement que le code est conforme à une norme. Utiliser un Linter permet de rendre
le code plus lisible et contient généralement des règles de bonnes pratiques.  \
Le Linter considéré comme un standard est ESLint. La norme en Javascript n'est pas universelle et dépend des exigences
du développeur, ESLint est donc modulaire.