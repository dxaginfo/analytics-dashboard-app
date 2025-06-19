# Analytics Dashboard Architecture

## Component Architecture

```
+-----------------------+
|        App           |
+-----------+-----------+
            |
            | (Protected Routes)
            |
+-----------v-----------+
|      Layout          |
|   +---------------+  |
|   | Sidebar       |  |
|   | Header        |  |
|   +-------+-------+  |
|           |          |
|   +-------v-------+  |
|   | Routes        |  |
|   +---------------+  |
+-----------------------+
            |
            |
+-----------v-----------+----------------+-----------------+---------------+
|     Dashboard        |  Channel       |  Audience       |  Content      |
|                      |  Analysis      |  Analysis       |  Analysis     |
|  +----------------+  |                |                 |               |
|  | Summary Cards  |  |                |                 |               |
|  +----------------+  |                |                 |               |
|  | Charts         |  |                |                 |               |
|  +----------------+  |                |                 |               |
+-----------------------+----------------+-----------------+---------------+

```

## Data Flow Architecture

```
+----------------+
|   Component    |
+--------+-------+
         |
         | Dispatch Action
         v
+----------------+
|  Redux Action  |
+--------+-------+
         |
         | Call API
         v
+----------------+
|  Dashboard API | (Mock API Service)
+--------+-------+
         |
         | Return Data
         v
+----------------+
| Redux Reducer  |
+--------+-------+
         |
         | Update State
         v
+----------------+
|  Redux Store   |
+--------+-------+
         |
         | State Changes
         v
+----------------+
|   Component    | (Re-render)
+----------------+
```

## File Structure

```
src/
├── api/
│   └── dashboardApi.ts       # API service functions
├── components/
│   ├── charts/               # Chart components
│   │   ├── ChannelPerformanceChart.tsx
│   │   ├── AudienceDistributionChart.tsx
│   │   ├── ContentPerformanceChart.tsx
│   │   └── TrendChart.tsx
│   └── layout/
│       └── Layout.tsx        # Main layout with navigation
├── features/
│   ├── auth/                 # Authentication
│   │   ├── authSlice.ts
│   │   └── Login.tsx
│   ├── dashboard/            # Main dashboard
│   │   ├── Dashboard.tsx
│   │   └── dashboardSlice.ts
│   ├── channels/             # Channel analysis
│   │   └── ChannelAnalysis.tsx
│   ├── audience/             # Audience analysis
│   │   └── AudienceAnalysis.tsx
│   └── content/              # Content analysis
│       └── ContentAnalysis.tsx
├── App.tsx                   # Main app with routes
├── index.tsx                 # Entry point
└── store.ts                  # Redux store configuration
```

## Authentication Flow

```
+----------------+    +----------------+    +----------------+
|   Login Page   |---▶| Authentication |---▶|  Save Token   |
+----------------+    |    Service     |    +-------+-------+
                      +----------------+            |
                                                    |
                      +----------------+    +-------v-------+
                      | Protected     |◀---| Redirect to   |
                      |   Routes      |    |   Dashboard   |
                      +----------------+    +---------------+
```

## Tech Stack

- **Frontend**: React, TypeScript, Material UI
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Data Visualization**: Recharts
- **Authentication**: JWT (simulated in this demo)
- **API Integration**: Fetch API with Promises
