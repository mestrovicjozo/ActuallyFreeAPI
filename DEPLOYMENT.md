# Deployment Guide

This guide walks you through deploying the Free Financial News API to production on Vercel.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] A GitHub account
- [ ] A Vercel account (free tier is sufficient)
- [ ] A Supabase account (free tier is sufficient)
- [ ] Git installed locally
- [ ] Node.js 18+ installed

## Step-by-Step Deployment

### 1. Set Up Supabase Database

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in project details:
   - **Name**: financial-news-api (or your choice)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

#### Run Database Schema

1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open `database/schema.sql` from this repository
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click "Run" or press Ctrl+Enter
7. Verify success message appears

#### Get API Credentials

1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. Copy these values (you'll need them later):
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### 2. Prepare Your Repository

#### Clone or Fork

If you haven't already:

```bash
git clone https://github.com/mestrovicjozo/ActuallyFreeAPI.git
cd ActuallyFreeAPI
```

Or fork the repository on GitHub first, then clone your fork.

#### Install Dependencies

```bash
npm install
```

#### Test Locally (Optional but Recommended)

1. Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
CRON_SECRET=generate_a_random_secret
```

2. Generate a secure CRON_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Run locally:
```bash
npm run dev
```

4. Test endpoints:
```bash
# In another terminal
curl "http://localhost:3000/api/news"
curl "http://localhost:3000/api/sources"
curl "http://localhost:3000/api/stats"
```

5. Test cron job:
```bash
curl -X POST "http://localhost:3000/api/cron/fetch-rss" \
  -H "Authorization: Bearer your_cron_secret"
```

#### Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. Deploy to Vercel

#### Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Select the repository (ActuallyFreeAPI)
6. Click "Import"

#### Configure Project

1. **Framework Preset**: Next.js (should auto-detect)
2. **Root Directory**: ./ (leave as default)
3. **Build Command**: `npm run build` (should be pre-filled)
4. **Output Directory**: .next (should be pre-filled)

#### Add Environment Variables

Click "Environment Variables" and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | From Supabase Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | From Supabase Settings > API |
| `CRON_SECRET` | Random 64-character hex string | Generate with crypto.randomBytes |

For all three variables:
- Set for **Production**, **Preview**, and **Development** environments
- Click "Add" after each

#### Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for deployment to complete
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live site

### 4. Verify Deployment

#### Test API Endpoints

Replace `your-domain.vercel.app` with your actual Vercel URL:

```bash
# Test news endpoint
curl "https://your-domain.vercel.app/api/news"

# Test sources
curl "https://your-domain.vercel.app/api/sources"

# Test stats
curl "https://your-domain.vercel.app/api/stats"
```

#### Verify Cron Job

1. In Vercel dashboard, go to your project
2. Click "Cron Jobs" in the left sidebar
3. You should see `fetch-rss` scheduled for `0 * * * *` (every hour)
4. Click "Run" to trigger it manually
5. Wait 1-2 minutes
6. Check Vercel logs (click "Logs" in sidebar)
7. Look for successful execution logs

#### Check Database

1. Go to your Supabase dashboard
2. Click "Table Editor"
3. Select `news_articles` table
4. Verify articles are being added

### 5. Post-Deployment Configuration

#### Update Domain References

If you have a custom domain or want to update the default URLs:

1. Edit `app/page.tsx`:
   - Find all instances of `your-domain.vercel.app`
   - Replace with your actual domain

2. Edit `app/api/README.md`:
   - Update all example URLs

3. Commit and push:
```bash
git add .
git commit -m "Update domain references"
git push
```

Vercel will automatically redeploy.

#### Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### 6. Monitoring & Maintenance

#### Set Up Monitoring

1. **Vercel Logs**:
   - Go to project → "Logs"
   - Monitor cron job executions
   - Check for errors

2. **Supabase Database**:
   - Monitor storage usage (Settings → Database)
   - Free tier: 500 MB storage
   - Check table size regularly

3. **Uptime Monitoring** (Optional):
   - Use UptimeRobot or similar service
   - Monitor `/api/stats` endpoint
   - Set up alerts for downtime

#### Regular Maintenance

**Weekly**:
- Check Vercel logs for errors
- Verify cron job is running
- Test API endpoints

**Monthly**:
- Review Supabase storage usage
- Check for failed RSS feeds
- Update dependencies if needed

**As Needed**:
- Add new RSS feeds
- Remove non-functional feeds
- Optimize database queries

### 7. Troubleshooting

#### Cron Job Not Running

**Symptoms**: No new articles in database

**Solutions**:
1. Verify `vercel.json` is in repository root
2. Check "Cron Jobs" tab in Vercel dashboard
3. Manually trigger the job and check logs
4. Verify `CRON_SECRET` environment variable is set

#### Database Connection Issues

**Symptoms**: API returns 500 errors

**Solutions**:
1. Verify Supabase credentials in Vercel environment variables
2. Check Supabase project is not paused (happens with inactivity)
3. Test connection from Vercel logs
4. Verify RLS policies in Supabase

#### RSS Feeds Failing

**Symptoms**: Some sources have no articles

**Solutions**:
1. Check Vercel logs for specific feed errors
2. Manually test feed URLs
3. Some feeds may be temporarily down
4. Remove consistently failing feeds from config

#### Out of Storage

**Symptoms**: Database insert errors

**Solutions**:
1. Check Supabase storage usage
2. Reduce retention period (edit cleanup function)
3. Manually run cleanup: `SELECT delete_old_articles();`
4. Upgrade to paid Supabase plan if needed

#### Slow API Responses

**Solutions**:
1. Check database indexes are created
2. Review Supabase query performance
3. Consider adding caching
4. Upgrade Supabase plan for better performance

## Scaling Considerations

### Free Tier Limits

**Vercel (Free)**:
- 100 GB bandwidth/month
- 6,000 minutes execution time/month
- Unlimited requests

**Supabase (Free)**:
- 500 MB database storage
- 1 GB file storage
- 2 GB bandwidth/month

### When to Upgrade

Consider upgrading when:
- Database exceeds 400 MB (80% of free tier)
- API receives >1M requests/month
- Need faster query performance
- Want custom domain with SSL

### Performance Optimization

1. **Caching**:
   - Add Redis (Upstash) for popular queries
   - Cache source list (rarely changes)
   - Implement CDN for static assets

2. **Database**:
   - Review and optimize indexes
   - Partition tables if needed
   - Use database pooling

3. **API**:
   - Implement rate limiting
   - Add request compression
   - Use edge functions where possible

## Rollback Procedure

If deployment fails or has critical bugs:

1. In Vercel dashboard, go to "Deployments"
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Fix issues in your code
5. Deploy again when ready

## Security Checklist

- [ ] `CRON_SECRET` is set and secure (64+ random characters)
- [ ] Supabase RLS policies are enabled
- [ ] Environment variables are not exposed in frontend
- [ ] `.env.local` is in `.gitignore`
- [ ] API endpoints handle errors gracefully
- [ ] No sensitive data in logs

## Success Criteria

Your deployment is successful when:

- [ ] Landing page loads at your Vercel URL
- [ ] `/api/news` returns articles
- [ ] `/api/sources` returns feed list
- [ ] `/api/stats` shows statistics
- [ ] Cron job runs every hour
- [ ] New articles appear in database
- [ ] No errors in Vercel logs
- [ ] Database stays under storage limit

## Getting Help

If you encounter issues:

1. Check this deployment guide
2. Review Vercel logs
3. Check Supabase logs
4. Search GitHub issues
5. Open a new issue with:
   - Detailed problem description
   - Steps to reproduce
   - Error messages
   - Environment details

---

Congratulations on deploying your Financial News API!
