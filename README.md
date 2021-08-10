# React Firebase Sample

## 環境

```shell
$ node -v
v14.17.3

$ npm -v
6.14.13

$ yarn -v
1.22.11
```

## プロジェクト作成

```shell
$ yarn create react-app react-firebase-sample
```

## Firebase の設定

プロジェクト直下に .env を追加し、Firebase の API 設定を記載。

```
REACT_APP_FIREBASE_API_KEY="[apiKey]"
REACT_APP_FIREBASE_AUTH_DOMAIN="[authDomain]"
REACT_APP_FIREBASE_PROJECT_ID="[projectId]"
REACT_APP_FIREBASE_STORAGE_BUCKET="[storageBucket]"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="[messagingSenderId]"
REACT_APP_FIREBASE_APP_ID="[appId]"
```

### Firestore ルールの設定

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create, read, update, delete: if request.auth.uid == userId;
    }
    match /users/{userId}/{document=**} {
      allow create, read, update, delete: if request.auth.uid == userId;
    }
  }
}
```

※ React App で使用する場合、先頭は「REACT_APP\_」とする必要あり

## Firebase Hosting へのデプロイ

```
$ firebase login --reauth --no-localhost

$ firebase init
? Are you ready to proceed? Yes
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter t
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No

$ yarn build

$ firebase deploy
```
