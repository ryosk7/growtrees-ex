# growing-trees-ex
Firebase hosting site is here [growing-trees-ex](https://grow-trees-ex.firebaseapp.com/).
> Nuxt.js and Firebase Studing.

## Build Setup
``` bash
# First, build to Docker
$ docker-compose build

# Second, enter to Docker container
$ docker-compose run nuxt sh

# Third, login to Firebase and nuxt generate
(docker)$ firebase login --no-localhost
(docker)$ npm run generat

# Then, deploy on Firebase
(docker)$ firebase init
(docker)$ firebase deploy
```
Done! :fire::whale: