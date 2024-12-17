export const CLOUDFLARE_CONFIG = {
  accountId: import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || '',
  apiToken: import.meta.env.VITE_CLOUDFLARE_API_TOKEN || '',
  baseUrl: 'https://api.cloudflare.com/client/v4',
};

export const APP_CONFIG = {
  baseUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  shortUrlDomain: 'teske.sh',
};