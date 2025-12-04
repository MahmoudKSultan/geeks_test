// Validate and export environment variables
function getEnvVar(key: string): string {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  BASE_URL: getEnvVar("VITE_BASE_URL"),
} as const;
