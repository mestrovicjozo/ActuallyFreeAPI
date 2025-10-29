# Ticker Labeling Analysis

This document analyzes the current system for labeling articles with stock tickers.

## How it Works

The ticker labeling process is a multi-step, tiered system designed to accurately identify company mentions in news articles and associate them with their corresponding stock tickers.

1.  **Explicit Ticker Extraction:** The system first scans the article text (title, description, and content) for explicit ticker symbols. It recognizes several common formats:
    *   **Dollar Sign:** `$AAPL`
    *   **Parentheses:** `(AAPL)` or `(NASDAQ:AAPL)`
    *   **Exchange Prefix:** `NASDAQ:AAPL`
    *   **Quotes:** `"AAPL"` or `'AAPL'`
    *   **Context-Aware:** "AAPL stock" or "shares of AAPL"

2.  **Company Name and Alias Mapping:** If no explicit tickers are found, the system attempts to identify company names, product names, and other aliases. This is powered by a comprehensive mapping that links various names to their respective tickers. This mapping includes:
    *   Official company names (`Apple Inc.`)
    *   Common variations (`Apple`)
    *   Product names (`iPhone`, `iPad`)
    *   Service names (`AWS`, `Azure`)
    *   Key personnel (`Tim Cook`, `Elon Musk`)

3.  **Contextual Validation:** To reduce false positives, the company name matching is context-aware. It looks for keywords related to finance, business, and technology (e.g., "stock", "earnings", "CEO", "partnership") near the identified name to ensure the mention is relevant.

4.  **Validation Against Tracked Stocks:** All potential tickers are validated against a master list of tracked stocks. This ensures that only tickers for companies the system is configured to follow are used for labeling. A false positive list of common acronyms (e.g., "CEO", "API") is also used to filter out incorrect matches.

## Pros

*   **Robust and Comprehensive:** The multi-tiered approach is very effective. It catches both explicit ticker mentions and more subtle company references.
*   **High Accuracy:** The combination of regex patterns, extensive alias mapping, contextual validation, and a false positive list results in a high degree of accuracy and minimizes incorrect labeling.
*   **Extensible:** The system is easy to extend. New companies, products, and aliases can be added to the `config/stock-tickers.ts` and `lib/ticker-mappings.ts` files to expand the system's knowledge base.
*   **Reduces False Positives:** The use of contextual keywords and a false positive list is a smart way to avoid misinterpreting common acronyms or words as stock tickers.

## Cons

*   **Manual Maintenance:** The `MANUAL_ALIASES` mapping in `lib/ticker-mappings.ts` requires manual updates to keep it current with new products, CEOs, and company name changes. This can be time-consuming and prone to becoming outdated.
*   **Limited to Pre-defined List:** The system can only identify tickers for companies that are explicitly defined in `config/stock-tickers.ts`. It cannot dynamically identify tickers for new or untracked companies.
*   **Potential for Missed Context:** While the contextual analysis is good, it might miss some nuanced mentions of companies, especially in articles that don't use typical financial or business language.
*   **US-centric:** The current list of tracked stocks and aliases is heavily focused on US companies.

## Potential Improvements

*   **Automated Alias Generation:** Instead of manually maintaining the alias list, a script could be created to periodically scrape information from financial websites (like Yahoo Finance, Finviz, or Wikipedia) to automatically generate and update the list of aliases, products, and key personnel for each tracked company.
*   **Dynamic Ticker Discovery:** For a more advanced system, consider a mechanism to discover and suggest new tickers to track. This could involve identifying frequently mentioned but untracked company names in the news feed and flagging them for review.
*   **Natural Language Processing (NLP):** For even higher accuracy and better context understanding, a lightweight NLP library could be integrated. NLP models can perform Named Entity Recognition (NER) to more reliably identify company names and differentiate them from other entities. This would reduce the reliance on keyword matching.
*   **Internationalization:** Expand the list of tracked stocks and exchanges to include more international companies and markets. This would require updating the `EXCHANGES` list and adding more diverse company data.
*   **Confidence Scoring:** Assign a confidence score to each extracted ticker based on the extraction method. For example, an explicit `$AAPL` mention would have a higher confidence score than a ticker derived from a product name mention. This would allow for more nuanced filtering and display of ticker information.

## Solving the "Google and Nvidia" Problem

The user raised a valid concern: if an article mentions both "Google" and "Nvidia," only "Google" might be ticketed. This is a real issue, and here's why it happens and how to fix it.

### The Root Cause

The problem lies in the `extractTickersFromCompanyNames` function within `lib/ticker-mappings.ts`. This function iterates through all known company names and aliases. When it finds a match in the article text that has sufficient context, it adds the corresponding ticker to a set and then immediately stops its search using a `break` statement. This is a performance optimization, but it prevents the function from finding any other company mentions in the rest of the article.

### The Solution

The fix is straightforward: remove the `break` statement. By allowing the loop to continue, the function will check every known company name and alias against the entire article text, ensuring that all valid mentions are found and ticketed.

This change will have a minor performance impact, as the function will now always iterate through the entire list of company names. However, given the importance of accurately ticketing all mentioned companies, this is a necessary trade-off.

To implement this fix, I will modify `lib/ticker-mappings.ts` and remove the `break` statement from the `extractTickersFromCompanyNames` function.

## Additional Improvements

### Database

*   **Normalization:** The `company_name` column in the `stock_prices` table is redundant. It could be removed, and the company name could be retrieved from the `config/stock-tickers.ts` file or a separate `companies` table. This would reduce data duplication and make it easier to update company names.
*   **Data Types:** The `price`, `change`, and `change_percent` columns in the `stock_prices` table are `DECIMAL` types, which is appropriate for financial data. However, the precision and scale could be reviewed to ensure they are optimal for the data being stored.
*   **Cascade Deletes:** When a company is removed from the `config/stock-tickers.ts` file, the corresponding stock prices are not automatically deleted. This could be handled with a cascade delete or a cleanup script.

### API

*   **Full-Text Search:** The `search` filter in the `/api/news` endpoint uses `ilike`, which can be slow for large datasets. It would be more efficient to use the `to_tsvector` function and the GIN index that's already created on the `title` and `description` columns. This would significantly improve the performance of search queries.
*   **Multiple Tickers:** The `ticker` filter in the `/api/news` endpoint only supports a single ticker. It would be more powerful to allow filtering by multiple tickers (e.g., `?tickers=AAPL,GOOGL`). This could be implemented by splitting the `tickers` query parameter by commas and using the `contains` operator with an array of tickers.
*   **Sorting:** The results are always sorted by `pub_date` in descending order. It would be useful to allow sorting by other fields (e.g., `source`, `created_at`) and in different directions (ascending or descending).
*   **API Documentation:** While the code is relatively clear, adding API documentation (e.g., using Swagger or OpenAPI) would make it easier for other developers to understand and use the endpoint.
