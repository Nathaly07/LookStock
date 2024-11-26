import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {
    const credentials = process.env.FIREBASE_CREDENTIALS;

    if (!credentials) {
      throw new Error('Firebase credentials are not defined in the environment variables');
    }

    const firebaseCredentials = JSON.parse(credentials);

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseCredentials),
      });
    }
  }

  async validateToken(token: string): Promise<{ uid: string }> {
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      return { uid: decoded.uid };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

