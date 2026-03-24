# Expense Dashboard

Personal expense tracker dashboard that reads live from your Notion database.

## Setup

### 1. Clone and install
```bash
git clone <your-repo-url>
cd expense-dashboard
npm install
```

### 2. Configure environment variables
Copy `.env.local` and fill in your values:
- `NOTION_API_KEY` — your Notion integration token (starts with `ntn_`)
- `NOTION_DATABASE_ID` — already set to your Expenses database ID

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 4. Deploy to Vercel
```bash
npx vercel
```
Or connect your GitHub repo to Vercel and it auto-deploys.

**Important:** Add your environment variables in Vercel:
- Go to your project → Settings → Environment Variables
- Add `NOTION_API_KEY` and `NOTION_DATABASE_ID`

### 5. Embed in Notion
Once deployed, copy your Vercel URL (e.g. `https://expense-dashboard-xxx.vercel.app`)
and in Notion:
1. Open the page where you want the dashboard
2. Type `/embed`
3. Paste your Vercel URL
4. Resize the embed block to fill the page width
