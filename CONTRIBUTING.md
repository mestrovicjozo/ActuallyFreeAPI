# Contributing to Free Financial News API

Thank you for your interest in contributing! This guide will help you get started.

## Ways to Contribute

### 1. Add New RSS Feeds

We're always looking to add more financial news sources. To add a new RSS feed:

1. Fork the repository
2. Edit `config/rss-feeds.ts`
3. Add your feed to the `RSS_FEEDS` array:

```typescript
{
  name: 'Your Feed Name',
  url: 'https://example.com/feed.xml',
  category: 'general', // or 'markets', 'stocks', 'investing', etc.
  description: 'Brief description of the feed',
}
```

4. Test the feed locally by running the cron job:
```bash
curl -X POST "http://localhost:3000/api/cron/fetch-rss" \
  -H "Authorization: Bearer your_cron_secret"
```

5. Submit a pull request with a description of the feed

**Requirements for RSS feeds:**
- Must be a reliable, publicly accessible RSS/XML feed
- Should focus on financial news, markets, or economics
- Must include at minimum: title, link, and pubDate
- Should be from a reputable source

### 2. Improve Documentation

Help make the project more accessible:
- Fix typos or unclear instructions
- Add more usage examples
- Translate documentation to other languages
- Create tutorials or guides

### 3. Report Bugs

Found a bug? Please open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

### 4. Suggest Features

Have an idea? Open an issue with:
- Clear description of the feature
- Use case or problem it solves
- Optional: implementation suggestions

### 5. Submit Code Improvements

Contributions for:
- Performance optimizations
- Code refactoring
- Adding tests
- Improving error handling
- Enhancing search functionality

## Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/yourusername/ActuallyFreeAPI.git
cd ActuallyFreeAPI
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
CRON_SECRET=random_secret
```

4. **Run the development server**
```bash
npm run dev
```

5. **Make your changes**
- Create a new branch: `git checkout -b feature/your-feature-name`
- Make your changes
- Test thoroughly

6. **Submit a pull request**

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define interfaces for data structures
- Avoid `any` types when possible
- Use meaningful variable names

### Formatting
- Use the included ESLint configuration
- Run `npm run lint` before committing
- Use 2 spaces for indentation
- Add comments for complex logic

### File Organization
- Keep API routes in `app/api/`
- Put shared utilities in `lib/`
- Configuration files go in `config/`
- Database schemas in `database/`

## Testing Your Changes

### Test API Endpoints Locally

```bash
# Test news endpoint
curl "http://localhost:3000/api/news"

# Test with search
curl "http://localhost:3000/api/news?search=test"

# Test sources endpoint
curl "http://localhost:3000/api/sources"

# Test stats endpoint
curl "http://localhost:3000/api/stats"

# Test cron job
curl -X POST "http://localhost:3000/api/cron/fetch-rss" \
  -H "Authorization: Bearer your_cron_secret"
```

### Test Database Operations

1. Set up a test Supabase project
2. Run the schema from `database/schema.sql`
3. Test that articles are being inserted correctly
4. Verify cleanup functions work

## Pull Request Process

1. **Create a descriptive PR title**
   - Good: "Add Financial Times RSS feed"
   - Bad: "Update config"

2. **Provide context in the description**
   - What changes did you make?
   - Why are these changes needed?
   - How did you test them?

3. **Link related issues**
   - Use "Fixes #123" or "Closes #456"

4. **Keep PRs focused**
   - One feature or fix per PR
   - Split large changes into smaller PRs

5. **Be responsive to feedback**
   - Address review comments
   - Update documentation if needed

## Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add Reuters Business RSS feed"
git commit -m "Fix date filtering bug in news API"
git commit -m "Improve error handling in cron job"

# Bad examples
git commit -m "Update code"
git commit -m "Fix"
git commit -m "Changes"
```

## Suggesting RSS Feeds

Before suggesting a new feed, check:

1. **Is it already included?**
   - Check `config/rss-feeds.ts`
   - Search existing issues and PRs

2. **Is it publicly accessible?**
   - No authentication required
   - CORS-friendly
   - Reliable uptime

3. **Is it relevant?**
   - Financial news, markets, stocks, or economics
   - English language (for now)
   - Professional/reputable source

4. **Does it work?**
   - Test the RSS feed URL
   - Verify it has required fields (title, link, pubDate)
   - Check update frequency

## Feature Ideas

Here are some features we'd love help with:

- **Sentiment Analysis**: Add sentiment scoring to articles
- **Categorization**: Automatically categorize articles by topic
- **Webhooks**: Allow users to subscribe to specific keywords
- **Rate Limiting**: Implement API rate limiting
- **Caching**: Add Redis caching for popular queries
- **SDKs**: Create client libraries (Python, JavaScript, etc.)
- **Analytics**: Track API usage and popular queries
- **Trending Topics**: Identify trending stocks/keywords
- **Email Digests**: Send daily/weekly email summaries

## Questions?

- Open a discussion on GitHub
- Review existing documentation
- Check closed issues for similar questions

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Free Financial News API!
