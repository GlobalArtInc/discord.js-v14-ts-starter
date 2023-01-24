declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEPLOY_ENV: 'dev' | 'prod' | 'stage';
      DISCORD_TOKEN: string;
      API_URL: string;
      // DB
      DB_HOST: string;
      DB_USER: string;
      DB_NAME: string;
      DB_PASS: string;
      // CLIENT
      CLIENT_ID: string;
      CLIENT_SCOPES: string;
      CLIENT_SECRET: string;
      TEST_GUILD_ID: string;
      REDIRECT_URI: string;
    }
  }
}
