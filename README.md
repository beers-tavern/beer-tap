## Setup l'environnement de dev

Pour angular:
```sh
npm install -g @angular/cli
```

Pour android et ios:
```sh
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
export CAPACITOR_ANDROID_STUDIO_PATH=/usr/local/bin/android-studio # set le path de android studio
```

## Build et run

### Serve en dev (par défaut)
```sh
ng serve
```

### Build en production
```sh
ng build --configuration=prod
```

## Tests

Pour lancer les tests:
```sh
ng test
```

Sans browser:
```sh
ng test --no-watch --no-progress --browsers=ChromeHeadless
```

## Android et iOS

Pour compiler en android et/ou ios:
```sh
npx cap add android
npx cap add ios
```

Pour lancer sur android studio et/ou xcode:
```sh
npx cap open android
npx cap open ios
```