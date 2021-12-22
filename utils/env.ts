type NameToType = {
  readonly ENV: "production" | "staging" | "development" | "test";
  readonly NODE_ENV: "production" | "development";
  readonly SPOTIFY_CLIENT_ID: string;
  readonly SPOTIFY_CLIENT_SECRET: string;
  readonly SPOTIFY_REFRESH_TOKEN: string;
  readonly SPOTIFY_ACCESS_TOKEN: string;
  readonly NEXT_PUBLIC_TWITTER_USERNAME: string;
  readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string;
  readonly NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: string;
  readonly NEXT_PUBLIC_URL: string;
};

export function getEnv<Env extends keyof NameToType>(name: Env): NameToType[Env];
export function getEnv(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = process.env[name];

  console.log(val, name);

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}
