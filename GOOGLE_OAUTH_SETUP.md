# uWrap - Configurazione Google OAuth

## Problema Riscontrato
Il login con Google non funziona perché mancano le variabili d'ambiente necessarie.

## Soluzione

### 1. Genera AUTH_SECRET
```bash
openssl rand -base64 32
```
Copia l'output e inseriscilo in `.env.local` come `AUTH_SECRET`.

### 2. Configura Google OAuth Credentials

1. Vai su [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Seleziona o crea un progetto
3. Vai su "Credentials" → "Create Credentials" → "OAuth client ID"
4. Configura il consenso OAuth (se non già fatto)
5. Tipo applicazione: "Web application"
6. Nome: "uWrap"
7. Authorized JavaScript origins:
   - `http://localhost:3000` (dev)
   - `https://uwrap.vercel.app` (production)
8. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://uwrap.vercel.app/api/auth/callback/google` (production)
9. Clicca "Create" e copia **Client ID** e **Client Secret**

### 3. Aggiorna .env.local
```bash
# Già presente
AUTH_SECRET="il_tuo_secret_generato"
AUTH_URL="http://localhost:3000"

# Da aggiornare con i tuoi valori
GOOGLE_CLIENT_ID="il_tuo_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="il_tuo_client_secret"
```

### 4. Configura Vercel (Production)
Aggiungi le stesse variabili d'ambiente nel progetto Vercel:
1. Vai su [vercel.com](https://vercel.com)
2. Seleziona il progetto uwrap
3. Settings → Environment Variables
4. Aggiungi:
   - `AUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `AUTH_URL` = `https://uwrap.vercel.app`

### 5. Riavvia il server
```bash
cd /home/drs/.openclaw/workspace/projects/uwrap
npm run dev
```

## Test
1. Vai su `http://localhost:3000`
2. Dovresti essere reindirizzato a `/login`
3. Clicca "Continua con Google"
4. Autenticati con il tuo account Google
5. Dovresti essere reindirizzato alla dashboard

## Troubleshooting

### "OAuthSignin" error
- Verifica che GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET siano corretti
- Controlla che le URI di redirect siano configurate correttamente in Google Cloud Console

### "Callback" error
- Verifica che AUTH_SECRET sia impostato
- Controlla che AUTH_URL corrisponda all'URL effettivo

### Utente non creato nel database
- Verifica che DATABASE_URL sia corretto
- Controlla i log del server per errori Prisma

## Note
- L'adapter Prisma è configurato per creare automaticamente l'utente nel database
- La sessione usa JWT strategy per semplicità
- Il tema dark è il default
