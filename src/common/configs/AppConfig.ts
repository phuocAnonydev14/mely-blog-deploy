export class AppConfig {
  static getEnv(env: string) {
    const value = process.env[env];
    console.log('Env ', value);
    if (!value) {
      console.log(`Environment variable ${env} not found`);
    }
    return value;
  }
}
