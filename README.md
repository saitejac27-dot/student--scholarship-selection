# SCHOLARSELECT
### Smart Scholarship Candidate Selection & Budget Optimization Platform
*Hackathon MVP — Design & Analysis of Algorithms (DAA) Component*

ScholarSelect uses automated eligibility filtering, multi-factor priority scoring, and a manually implemented **0/1 Knapsack Dynamic Programming (DP)** algorithm to help universities allocate limited scholarship funds with mathematical optimality.

---

## 1. DAA Algorithm: 0/1 Knapsack Formulation

Universities operate with finite scholarship budgets. Each eligible candidate requires an award amount and possesses an objective priority score.

### Problem Mapping:
* **Item**: Scholarship Candidate
* **Weight ($w_i$)**: Scholarship Amount Required (₹)
* **Value ($v_i$)**: Candidate Priority Score (0 – 100)
* **Capacity ($W$)**: Available University Fund Budget (₹)
* **Decision Variable**: $x_i \in \{0, 1\}$ (each candidate can be selected at most once)

### Objective:
$$\max \sum_{i=1}^{n} v_i \cdot x_i \quad \text{subject to} \quad \sum_{i=1}^{n} w_i \cdot x_i \le W$$

### Dynamic Programming Recurrence:
$$\text{dp}[i][w] = \begin{cases} \text{dp}[i-1][w] & \text{if } w_i > w \\ \max(\text{dp}[i-1][w], \, \text{dp}[i-1][w - w_i] + v_i) & \text{if } w_i \le w \end{cases}$$

### Time & Space Complexity:
* **Time Complexity**: $\mathcal{O}(n \cdot W_{\text{scaled}})$
* **Space Complexity**: $\mathcal{O}(n \cdot W_{\text{scaled}})$
* Implemented in [`src/services/knapsack.js`](file:///src/services/knapsack.js) with GCD capacity compression for numerical precision.

---

## 2. Mandatory Verification Benchmark

The system includes the exact benchmark test case specified in Section 10:

| Candidate | Scholarship Amount ($w_i$) | Priority Score ($v_i$) | Status |
| :--- | :--- | :--- | :--- |
| **Student A** | ₹1,00,000 | 85 | **SELECTED** |
| **Student B** | ₹2,00,000 | 92 | **SELECTED** |
| **Student C** | ₹1,50,000 | 78 | Not Selected |
| **Student D** | ₹3,00,000 | 95 | Not Selected |

* **Available Budget ($W$)**: **₹3,00,000**
* **Knapsack Result**: **Student A + Student B**
* **Total Amount**: **₹3,00,000**
* **Total Priority Score**: **177**
* **Remaining Budget**: **₹0**
*(Note: A greedy heuristic by priority would naively pick Student D for only 95 score; the 0/1 Knapsack DP guarantees the optimal 177 score).*

---

## 3. Technology Stack

* **Frontend**: React 19, Vite, JavaScript
* **Styling**: Vanilla Tailwind CSS v4 (`@tailwindcss/vite`)
* **Routing**: React Router DOM v7
* **Database & Auth**: Supabase (`@supabase/supabase-js`) + PostgreSQL Schema (`supabase_schema.sql`)
* **Visualizations**: Recharts
* **Icons**: Lucide React

---

## 4. User Roles & 9 Required Pages

### Public:
1. **Landing Page** (`/`): Hero, explanation, system workflow (Application → Eligibility → Priority Score → Optimization → Selection), DAA benchmark card.
2. **Scholarships** (`/scholarships`): Directory of grant programs with criteria filters.
3. **Scholarship Details** (`/scholarships/:id`): In-depth criteria, requirements, and direct apply link.

### Student Portal:
4. **Student Login / Register** (`/student/login`): Institutional authentication with 1-click demo fast-fill.
5. **Application Form** (`/scholarships/:id/apply`): Multi-section form (Personal, Academic, Financial, Extracurricular honors) with automated pre-validation.
6. **Student Dashboard** (`/student/dashboard`): Status tracking with complete breakdown of eligibility reasons (Academic, Income, Required fields) and priority score.

### Administrator Portal:
7. **Admin Login** (`/admin/login`): Secure institutional portal with 1-click demo credentials.
8. **Admin Dashboard** (`/admin/dashboard`): 8 live metric cards, dynamic budget setter, filterable applicant table, and **RUN OPTIMIZATION** trigger.
9. **Optimization Results** (`/admin/optimization-results`): Summary metrics, budget charts, Selected Students list, and Not Selected Students list with required moral-neutrality transparency statement.

---

## 5. Instant Evaluation (Quick Start)

The app comes pre-configured with active demo data and 1-click quick login buttons in the navigation bar for hackathon judges:

1. **Start Dev Server**:
   ```bash
   npm run dev
   ```
2. **Open in Browser**:
   [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
3. **Quick Demo Credentials**:
   * **Student**: `student@scholarselect.edu` / `Student@123` (or click **"Demo: Student"** in top bar)
   * **Admin**: `admin@scholarselect.edu` / `Admin@123` (or click **"Demo: Admin"** in top bar)

---

## 6. Supabase Setup (Optional Live Connection)

The app seamlessly operates in dual mode:
1. **Out-of-the-box Fallback**: Pre-seeded state in `localStorage` for immediate offline judging.
2. **Live Supabase Mode**: Copy `.env.example` to `.env` and fill in:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   Execute the included [`supabase_schema.sql`](file:///supabase_schema.sql) in the Supabase SQL Editor to provision the 4 tables (`profiles`, `scholarships`, `applications`, `selection_results`) with Row Level Security.
