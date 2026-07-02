# GitHub Authentication Setup

## Prerequisites

To enable GitHub sign-in/up, you need to configure a GitHub OAuth App and connect it to your Supabase project:

## 1. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Select "OAuth Apps" from the left sidebar
3. Click "New OAuth App"
4. Fill in the application details:
   - **Application name**: Your app name, for example `SaaS Starter`
   - **Homepage URL**: Your local or production app URL, for example `http://localhost:3000`
   - **Application description**: Optional description for your app
   - **Authorization callback URL**: Your Supabase OAuth callback URL
5. Add the callback URL:
   - For development: `https://your-project-ref.supabase.co/auth/v1/callback`
   - For production: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Click "Register application"

## 2. GitHub OAuth Credentials

After creating the OAuth App, get the credentials from the GitHub app settings page:

1. Copy the **Client ID** shown near the top of the OAuth App page
2. Click "Generate a new client secret"
3. Copy the **Client Secret** immediately after it is generated
4. Store the Client Secret securely. GitHub will not show the full secret again after you leave the page

## 3. Callback URL Configuration

GitHub must redirect users back to Supabase, not directly back to your Next.js app.

Use this callback URL format in GitHub:

```text
https://your-project-ref.supabase.co/auth/v1/callback
```

Important notes:

1. Replace `your-project-ref` with your actual Supabase project reference
2. The callback URL must exactly match the URL configured in your GitHub OAuth App
3. Use `https://your-project-ref.supabase.co/auth/v1/callback` for both local development and production when Supabase handles the OAuth callback
4. Do not use `http://localhost:3000/auth/callback` as the GitHub OAuth App callback URL
5. In Supabase, configure your app redirect URLs separately if you need to redirect users back to `/app` after authentication

## 4. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "GitHub" and enable it
4. Enter your GitHub OAuth credentials:
   - **Client ID**: From the GitHub OAuth App settings page
   - **Client Secret**: From the GitHub OAuth App settings page
5. Save the configuration

## 5. Environment Variables

Make sure your environment variables are properly set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## 6. Testing

1. Start your development server: `pnpm dev`
2. Go to `/auth/login` or `/auth/register`
3. Click "Sign in/up with GitHub"
4. You should be redirected to GitHub's OAuth flow
5. After successful authentication, you'll be redirected back to the app

## 7. Troubleshooting

### Callback URL mismatch

If GitHub shows a redirect URI or callback URL error:

1. Check the **Authorization callback URL** in your GitHub OAuth App
2. Make sure it is exactly `https://your-project-ref.supabase.co/auth/v1/callback`
3. Confirm that the Supabase project ref is correct

### Invalid Client ID or Client Secret

If Supabase reports invalid OAuth credentials:

1. Copy the Client ID again from GitHub
2. Generate a new Client Secret in GitHub if needed
3. Update the GitHub provider settings in Supabase
4. Save the provider configuration again

### Provider is not enabled

If the GitHub button redirects but authentication does not start:

1. Go to "Authentication" → "Providers" in Supabase
2. Confirm that GitHub is enabled
3. Confirm that both Client ID and Client Secret are set

### User is not redirected back to the app

If authentication succeeds but the user does not land on the expected page:

1. Check the redirect URL used by your app during OAuth sign-in
2. Confirm the redirect URL is allowed in Supabase Authentication URL settings
3. For this project, the authenticated app entry should be `/app`

### Missing environment variables

If the app cannot create a Supabase client:

1. Confirm `NEXT_PUBLIC_SUPABASE_URL` is set
2. Confirm `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set
3. Restart the development server after changing environment variables
