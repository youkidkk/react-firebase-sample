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

※ React App で使用する場合、先頭は「REACT_APP\_」とする必要あり
