.
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Root landing/home page
│   ├── favicon.ico
│   ├── globals.css
│   ├── dashboard/                    # Main dashboard layout
│   │   ├── layout.tsx                # Sidebar or topbar layout
│   │   └── page.tsx
│   ├── house-fee/                    # House fee module pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── saving/                       # Saving module pages
│       ├── layout.tsx
│       └── page.tsx
│
├── features/                         # Domain-driven feature modules
│   ├── transactions/
│   │   ├── api/
│   │   │   └── transactionApi.ts
│   │   ├── components/
│   │   │   ├── BalanceLineChart.tsx
│   │   │   ├── DetailedTransactionAnalysisChart.tsx
│   │   │   ├── ExpenseTreeMap.tsx
│   │   │   ├── MonthlyIncomeExpenseChart.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   ├── TableTransaction.tsx
│   │   │   ├── TransactionDistributionChart.tsx
│   │   │   └── TransactionFilters.tsx
│   │   ├── hooks/
│   │   │   ├── useOverviewTransactions.ts
│   │   │   ├── useTransactionData.ts
│   │   │   └── useTransactions.ts
│   │   ├── service/
│   │   │   └── transactionService.ts
│   │   └── types/
│   │       └── transaction.ts
│
│   ├── house-fee/
│   │   ├── api/
│   │   │   └── houseFeeApi.ts
│   │   ├── components/
│   │   │   ├── AreaChartComponent.tsx
│   │   │   ├── HouseFeeChart.tsx
│   │   │   ├── HouseFeeSummary.tsx
│   │   │   └── MonthlyExpenseTable.tsx
│   │   ├── service/
│   │   │   └── houseFeeService.ts
│   │   └── types/
│   │       └── houseFee.ts
│
│   └── saving/
│       ├── api/
│       │   └── savingApi.ts
│       ├── components/
│       │   ├── CumulativeBalanceLineChart.tsx
│       │   ├── MonthlyBalanceBarChart.tsx
│       │   └── SavingTable.tsx
│       ├── service/
│       │   └── savingService.ts
│       └── types/
│           └── saving.ts
│
├── ui/                               # Shared, reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Table.tsx
│   ├── ChartWrapper.tsx
│   └── Spinner.tsx
│
├── lib/                              # Utility and helper functions
│   ├── sortTransactions.ts
│   ├── utilities.ts
│   ├── auth.ts                       # Token/session helper
│   ├── constants.ts                  # Global constants (e.g., colors)
│   └── api-client/
│       └── fetcher.ts
│
├── middleware.ts                     # Middleware for auth, logging
│
├── models/                           # Data shape definitions (DB-level or DTOs)
│   ├── ExpenseTreeMapModel.ts
│   ├── FetchTransactionsParams.ts
│   ├── OverviewTransaction.ts
│   ├── SummaryTransaction.ts
│   └── Transaction.ts
│
├── types/                            # Global and API-specific types
│   ├── api.ts
│   ├── filters.ts
│   └── chart.ts
│
├── shared/                           # Global shared services/utilities
│   └── toastService.ts
│
├── public/                           # Static files (images, etc.)
│   └── assets/
│       └── logo.png
│
├── tests/                            # Unit and integration tests
│   ├── components/
│   └── services/
│
├── scripts/                          # Useful automation or seed scripts
│   └── seed.ts
│
├── docs/                             # Developer documentation
│   ├── architecture.md
│   └── getting-started.md
│
├── .eslintrc.js                      # Linting config
├── .prettierrc                       # Formatting rules
├── jest.config.ts                    # Jest testing config
├── tsconfig.json                     # TypeScript config
└── next.config.js                    # Next.js config
