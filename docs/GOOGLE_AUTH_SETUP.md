# Google Authentication Setup

## Prerequisites

To enable Google sign-in/up, you need to configure Google OAuth in your Supabase project:

## 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen if prompted
6. Set the application type to "Web application"
7. Add authorized redirect URIs:
   - For development: `https://your-project-ref.supabase.co/auth/v1/callback`
   - For production: `https://your-production-domain.com/auth/v1/callback`

## 2. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "Google" and enable it
4. Enter your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
5. Set the redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Save the configuration

## 3. Environment Variables

Make sure your environment variables are properly set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Testing

1. Start your development server: `npm run dev`
2. Go to `/auth/login` or `/auth/register`
3. Click "Sign in/up with Google"
4. You should be redirected to Google's OAuth flow
5. check if successful authentication, you'll be redirected to `/dashboard`
