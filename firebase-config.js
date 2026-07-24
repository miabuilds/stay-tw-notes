// StayTW Study — Firebase 設定
// ─────────────────────────────────────────────────────
// 使い方（StayJP と同じ手順）:
//   1. https://console.firebase.google.com で新しいプロジェクトを作成
//   2. Authentication → Google ログインを有効化
//   3. Firestore Database を作成（本番モード + firestore.rules をデプロイ）
//   4. プロジェクト設定 → ウェブアプリを追加 → 下の設定値を貼り替える
// apiKey が "YOUR_" のままの間はログイン機能は自動的に非表示になり、
// 学習履歴は localStorage（この端末のみ）に保存される。
// ─────────────────────────────────────────────────────
const STW_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
