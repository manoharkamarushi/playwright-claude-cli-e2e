# Playwright 8-Layer Architecture

```
Layer 1: CONFIG
├── playwright.config.ts        ← Playwright config (browsers, reporters, timeouts)
└── config/env.ts               ← Environment variables with dotenv

Layer 2: DATA
├── tests/data/types.ts         ← TypeScript interfaces (User, Product, Order, etc.)
├── tests/data/user.factory.ts  ← Faker-powered data factories
└── tests/data/seeds.ts         ← Static test seeds (admin, test user)

Layer 3: API
├── tests/api/base.api.ts       ← Abstract HTTP client (get/post/put/delete)
├── tests/api/auth.api.ts       ← Auth endpoints (login, logout, register)
└── tests/api/users.api.ts      ← Users CRUD endpoints

Layer 4: FIXTURES
├── tests/fixtures/auth.setup.ts    ← Auth state setup (runs once, saves storageState)
├── tests/fixtures/auth.fixture.ts  ← authenticatedPage, adminPage, authToken, createdUser
├── tests/fixtures/page.fixture.ts  ← loginPage, dashboardPage, registerPage
└── tests/fixtures/index.ts         ← mergeTests/mergeExpects → single import

Layer 5: BASE
├── tests/base/base.page.ts         ← Abstract page (navigate, waitForLoad, toast helpers)
└── tests/base/base.component.ts    ← Abstract component (root locator, scoped queries)

Layer 6: PAGES
├── tests/pages/login.page.ts       ← Login form + login() method
├── tests/pages/register.page.ts    ← Register form + register() method
└── tests/pages/dashboard.page.ts   ← Dashboard + nav + stats cards

Layer 7: COMPONENTS
├── tests/components/nav.component.ts    ← Navigation (clickNavLink, expectActiveLink)
├── tests/components/modal.component.ts  ← Dialog (confirm, cancel, close, Escape)
└── tests/components/table.component.ts  ← Data table (getCellValue, sort, paginate)

Layer 8: SPECS
├── tests/specs/auth/login.spec.ts        ← Login flows (valid, invalid, edge cases)
├── tests/specs/auth/register.spec.ts     ← Registration flows
├── tests/specs/dashboard/dashboard.spec.ts ← Dashboard UI (user + admin views)
└── tests/specs/api/users.api.spec.ts     ← API-level tests using UsersApi
```

## Dependency Flow

```
Spec (8) → Fixture (4) → Page (6) → Base.Page (5)
                       → Component (7) → Base.Component (5)
                       → API (3) → Base.API
                       → Data (2)
                       → Config (1)
```

## Key Patterns

- **POM**: Every page extends `BasePage`. Every component extends `BaseComponent`.
- **Fixtures**: All test setup via `mergeTests`. Import from `tests/fixtures/index.ts`.
- **Auth**: `auth.setup.ts` runs once per project; `storageState` reused across tests.
- **API Layer**: Used for test setup/teardown, not UI automation. Separate from pages.
- **Data Layer**: `Factory` classes for dynamic data; `seeds.ts` for static credentials.
- **Tags**: `@smoke`, `@critical` for selective test runs.
- **No `waitForTimeout`**: Auto-waiting everywhere. Explicit waits use events only.
