rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /experts/{expert} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}