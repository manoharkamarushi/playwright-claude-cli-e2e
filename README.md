# playwright-claude-cli-e2e

Playwright E2E test framework for Claude CLI — built on an 8-layer architecture with Page Object Model, fixtures, API layer, and component abstractions.

## Stack

- [Playwright](https://playwright.dev/) `^1.44.0`
- TypeScript `^5.4.0`
- Faker.js `^8.4.1`
- dotenv `^16.4.5`

## Architecture

```
Layer 1: CONFIG     playwright.config.ts, config/env.ts
Layer 2: DATA       types, factories, seeds
Layer 3: API        base HTTP client, auth/users endpoints
Layer 4: FIXTURES   auth setup, page fixtures, merged test
Layer 5: BASE       BasePage, BaseComponent abstractions
Layer 6: PAGES      login, register, dashboard
Layer 7: COMPONENTS nav, modal, table
Layer 8: SPECS      auth, dashboard, API specs
```

Dependency flow:
```
Spec → Fixture → Page → BasePage
                      → Component → BaseComponent
                      → API → BaseAPI
                      → Data → Config
```

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

```env
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000/api
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123!
TEST_USER_EMAIL=user@example.com
TEST_USER_PASSWORD=UserPass123!
CI=false
```

## Running Tests

```bash
# All tests
npm test

# Headed mode
npm run test:headed

# Interactive UI mode
npm run test:ui

# Debug mode
npm run test:debug

# Smoke tests only
npm run test:smoke

# Critical tests only
npm run test:critical

# Open HTML report
npm run test:report
```

## Browsers

Runs across 5 projects by default:

| Project       | Device            |
|---------------|-------------------|
| chromium      | Desktop Chrome    |
| firefox       | Desktop Firefox   |
| webkit        | Desktop Safari    |
| mobile-chrome | Pixel 5           |
| mobile-safari | iPhone 13         |

Auth setup runs once before all browser projects.

## Project Structure

```
├── config/
│   └── env.ts                    # Env var loader
├── tests/
│   ├── api/                      # API client layer
│   │   ├── base.api.ts
│   │   ├── auth.api.ts
│   │   └── users.api.ts
│   ├── base/                     # Abstract base classes
│   │   ├── base.page.ts
│   │   └── base.component.ts
│   ├── components/               # Reusable UI components
│   │   ├── nav.component.ts
│   │   ├── modal.component.ts
│   │   └── table.component.ts
│   ├── data/                     # Test data
│   │   ├── types.ts
│   │   ├── user.factory.ts
│   │   └── seeds.ts
│   ├── fixtures/                 # Playwright fixtures
│   │   ├── auth.setup.ts
│   │   ├── auth.fixture.ts
│   │   ├── page.fixture.ts
│   │   └── index.ts
│   ├── pages/                    # Page objects
│   │   ├── login.page.ts
│   │   ├── register.page.ts
│   │   └── dashboard.page.ts
│   └── specs/                    # Test specs
│       ├── auth/
│       ├── dashboard/
│       └── api/
├── .env.example
├── playwright.config.ts
└── tsconfig.json
```

## Key Patterns

- **POM**: All pages extend `BasePage`, all components extend `BaseComponent`
- **Fixtures**: All test setup via `mergeTests` — single import from `tests/fixtures/index.ts`
- **Auth**: `auth.setup.ts` runs once per project, `storageState` reused across tests
- **API layer**: Used for setup/teardown only, not UI automation
- **No `waitForTimeout`**: Auto-waiting throughout; explicit waits use events only
- **Tags**: `@smoke`, `@critical` for selective runs

## CI

Set `CI=true` in environment. Config automatically:
- Enables 2 retries
- Sets workers to 1
- Uses GitHub reporter
- Forbids `.only`
