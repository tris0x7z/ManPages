#!/usr/bin/bash

### Build unsigned apk - https://stackoverflow.com/questions/35283959/build-and-install-unsigned-apk-on-device-without-the-development-server


# bundle
npx react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

# create debug build
# generated apk will be located at `android/app/build/outputs/apk`
cd android && ./gradlew assembleDebug

# create release build:
# cd android && ./gradlew assembleRelease 

