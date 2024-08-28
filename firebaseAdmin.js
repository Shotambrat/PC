// firebaseAdmin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

const serviceAccount = JSON.parse(
  readFileSync(join(process.cwd(), '/secrets/premium-concept-cd4f5-firebase-adminsdk-q35ef-daffaee7d8.json'), 'utf-8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://premium-concept-cd4f5.firebaseio.com"  // Убедись, что этот URL соответствует твоему проекту Firebase
  });
}

export default admin;
