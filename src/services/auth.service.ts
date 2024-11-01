import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from '@firebase/auth';
import { EAuthProvider, EToken } from '@/common/enums/app.enum';
import { IFormLoginRegister } from '@/components/page/auth/FormLoginRegister/FormLoginRegister';
import { ENotification, openNotification } from '@/common/utils/notification.util';
import { EFirebaseError } from '@/common/enums/error.enum';
import {
  ENV_API_KEY,
  ENV_APP_ID,
  ENV_AUTH_DOMAIN,
  ENV_MEASUREMENT_ID,
  ENV_MESSAGING_SENDER_ID,
  ENV_PROJECT_ID,
  ENV_STORAGE_BUCKET,
} from '@/common/constants/env.constant';
import { getCookie, setCookie } from 'cookies-next';

export interface ISignIn {
  provider: EAuthProvider;
  form?: IFormLoginRegister;
}

class AuthService {
  private readonly config: FirebaseOptions;
  private readonly app: FirebaseApp;
  private readonly auth: Auth;
  private readonly googleProvider: GoogleAuthProvider;
  private readonly githubProvider: GithubAuthProvider;

  constructor() {
    this.config = {
      apiKey: ENV_API_KEY,
      authDomain: ENV_AUTH_DOMAIN,
      projectId: ENV_PROJECT_ID,
      storageBucket: ENV_STORAGE_BUCKET,
      messagingSenderId: ENV_MESSAGING_SENDER_ID,
      appId: ENV_APP_ID,
      measurementId: ENV_MEASUREMENT_ID,
    };
    this.app = initializeApp(this.config);
    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }

  getAuth() {
    return this.auth;
  }

  async signIn(data: ISignIn, currentUrl?: string) {
    try {
      let result: UserCredential, credential: OAuthCredential | null;
      switch (data.provider) {
        case EAuthProvider.GOOGLE:
          result = await signInWithPopup(this.auth, this.googleProvider);
          credential = GoogleAuthProvider.credentialFromResult(result);
          break;
        case EAuthProvider.GITHUB:
          result = await signInWithPopup(this.auth, this.githubProvider);
          credential = GoogleAuthProvider.credentialFromResult(result);
          break;
        default:
          result = await signInWithEmailAndPassword(
            this.auth,
            data.form?.username as string,
            data.form?.password as string,
          );
          credential = {
            accessToken: await result.user.getIdToken(),
          } as OAuthCredential;
          break;
      }
      window.location.href = currentUrl ? currentUrl : '/';
    } catch (e: any) {
      console.log(e.code);
      switch (e.code) {
        case EFirebaseError.INVALID_CREDENTIAL:
          openNotification({
            type: ENotification.ERROR,
            message: 'Username or password incorrect!',
          });
          break;
        case EFirebaseError.ACCOUNT_EXISTS:
          openNotification({
            type: ENotification.ERROR,
            message: 'Email matches with another provider, please use another method to login',
          });
          break;
        default:
          break;
      }
    }
  }

  async signUpWithUsernamePassword(data: ISignIn) {
    try {
      let result: UserCredential, credential: OAuthCredential | null;
      result = await createUserWithEmailAndPassword(
        this.auth,
        data.form?.username as string,
        data.form?.password as string,
      );
      credential = {
        accessToken: await result.user.getIdToken(),
      } as OAuthCredential;

      window.location.href = '/';
    } catch (e: any) {
      console.log(e.code);
      switch (e.code) {
        case EFirebaseError.INVALID_CREDENTIAL:
          openNotification({
            type: ENotification.ERROR,
            message: 'Username or password incorrect!',
          });
          break;
        case EFirebaseError.ACCOUNT_EXISTS:
          openNotification({
            type: ENotification.ERROR,
            message: 'Email matches with another provider, please use another method to login',
          });
          break;
        default:
          break;
      }
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
    } catch (e) {
      console.log(e);
    }
  }

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      openNotification({
        type: ENotification.SUCCESS,
        message: 'Lorem isum',
      });
    } catch (e) {
      console.log(e);
      openNotification({
        type: ENotification.SUCCESS,
        message: 'Error',
      });
    }
  }

  async refreshToken() {
    try {
      const refreshToken = getCookie(EToken.REFRESH_TOKEN) || '';

      const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${ENV_API_KEY}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });
      console.log(response);

      const token = await this.auth.currentUser?.getIdToken(true);
      console.log('Token ', token);
      if (!token) {
        await this.signOut();
        return;
      }
      setCookie(EToken.ACCESS_TOKEN, token);
    } catch (e) {
      console.log(e);
      await this.signOut();
    }
  }
}

const authService = new AuthService();

export { authService, AuthService };
