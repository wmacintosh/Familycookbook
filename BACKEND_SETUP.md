# Backend API Proxy Setup Instructions

## Quick Start

### 1. Create Environment File

Copy the example file and add your Gemini API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

> [!IMPORTANT]
> Get your API key from: https://ai.google.dev/

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Run the Application

You'll need **2 terminal windows**:

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```

Wait for message: `🚀 Backend API proxy running on http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Verification

### Check Backend is Running
```bash
curl http://localhost:3001/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Check API Endpoints
All Gemini features (tips, search, image, audio) should work exactly as before, but now they're secure!

### Verify Security
1. Open browser DevTools → Network tab
2. Click "Ask for Tips" on any recipe
3. You should see a POST request to `http://localhost:3001/api/gemini/tips`
4. **NO API KEY** should be visible anywhere in the request/response

## Troubleshooting

### "Cannot GET /api/gemini/tips"
- Backend server not running. Start with `npm run dev:server`

### "Network error" or "Failed to fetch"
- Check backend is running on port 3001
- Check no CORS errors in browser console

### "API configuration error"
- Check your `.env` file has the correct `GEMINI_API_KEY`
- Restart backend server after changing `.env`

### Port already in use
- Backend uses port 3001
- Frontend uses port 5173
- Change ports in server/index.js or vite.config.ts if needed

## Production Deployment

### Option 1: Traditional Server
Deploy both frontend and backend to the same domain:
- Frontend: Static files (build with `npm run build`)
- Backend: Node.js server on `/api` path

### Option 2: Separate Deployments
- Frontend: Vercel, Netlify, GitHub Pages
- Backend: Heroku, DigitalOcean, AWS
- Update `config.ts` with backend URL

### Option 3: Serverless Functions
Convert `server/index.js` endpoints to:
- Vercel Functions (`/api/*.js` format)
- Netlify Functions
- AWS Lambda

## Security Checklist

✅ `.env` file is gitignored  
✅ No API keys in client code  
✅ Backend validates all requests  
✅ Rate limiting enabled (100 req/15min)  
✅ CORS configured properly  

## Next Steps

- [ ] Add backend tests (`server/index.test.js`)
- [ ] Set up CI/CD for deployments
- [ ] Add request logging for monitoring
- [ ] Implement user authentication (optional)
