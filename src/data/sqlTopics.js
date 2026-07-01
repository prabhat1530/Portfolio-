const SQL_TOPICS = [
  {
    id: 'sql-basics',
    title: 'SQL Basics & SELECT',
    icon: '📋',
    notes: `## SELECT Statement
\`\`\`sql
SELECT column1, column2 FROM table_name;
SELECT * FROM employees;
SELECT DISTINCT department FROM employees;
SELECT name, salary FROM employees WHERE salary > 50000;
\`\`\`

### Key Points:
- \`SELECT\` retrieves data from one or more tables
- \`DISTINCT\` removes duplicate rows
- \`WHERE\` filters rows based on conditions
- \`AS\` creates aliases for columns: \`SELECT name AS employee_name\`
- \`LIMIT\` / \`TOP\` restricts number of rows returned`,
    problems: [
      { id: 'sq1', title: 'SELECT all columns', difficulty: 'easy' },
      { id: 'sq2', title: 'WHERE clause filtering', difficulty: 'easy' },
      { id: 'sq3', title: 'DISTINCT values', difficulty: 'easy' },
      { id: 'sq4', title: 'ORDER BY sorting', difficulty: 'easy' },
      { id: 'sq5', title: 'LIMIT / OFFSET pagination', difficulty: 'easy' },
    ],
  },
  {
    id: 'sql-joins',
    title: 'JOINs',
    icon: '🔗',
    notes: `## JOIN Types
\`\`\`sql
-- INNER JOIN: Returns matching rows from both tables
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN: All rows from left + matching from right
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- RIGHT JOIN: All rows from right + matching from left
-- FULL OUTER JOIN: All rows from both tables
-- CROSS JOIN: Cartesian product of both tables
-- SELF JOIN: Table joined with itself
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

### Key Points:
- **INNER JOIN** = only matching rows
- **LEFT JOIN** = all left rows + matching right
- **RIGHT JOIN** = all right rows + matching left
- **FULL OUTER JOIN** = all rows from both
- **SELF JOIN** = useful for hierarchies`,
    problems: [
      { id: 'sj1', title: 'INNER JOIN basics', difficulty: 'easy' },
      { id: 'sj2', title: 'LEFT vs RIGHT JOIN', difficulty: 'medium' },
      { id: 'sj3', title: 'Multiple table JOINs', difficulty: 'medium' },
      { id: 'sj4', title: 'SELF JOIN for hierarchies', difficulty: 'medium' },
      { id: 'sj5', title: 'CROSS JOIN use cases', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-aggregation',
    title: 'GROUP BY & Aggregation',
    icon: '📊',
    notes: `## Aggregate Functions
\`\`\`sql
-- COUNT, SUM, AVG, MIN, MAX
SELECT department, COUNT(*) AS total, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000
ORDER BY avg_salary DESC;
\`\`\`

### Key Points:
- \`GROUP BY\` groups rows with same values
- \`HAVING\` filters groups (like WHERE for aggregates)
- Aggregate functions: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`
- \`HAVING\` comes after \`GROUP BY\`
- Cannot use aggregate in WHERE, use HAVING instead`,
    problems: [
      { id: 'sa1', title: 'COUNT and GROUP BY', difficulty: 'easy' },
      { id: 'sa2', title: 'SUM and AVG calculations', difficulty: 'easy' },
      { id: 'sa3', title: 'HAVING clause filtering', difficulty: 'medium' },
      { id: 'sa4', title: 'Multiple aggregations', difficulty: 'medium' },
      { id: 'sa5', title: 'Nested aggregation queries', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-subqueries',
    title: 'Subqueries',
    icon: '🎯',
    notes: `## Subquery Types
\`\`\`sql
-- Scalar subquery (returns single value)
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN subquery (returns a list)
SELECT name FROM employees
WHERE dept_id IN (SELECT id FROM departments WHERE location = 'NYC');

-- EXISTS subquery
SELECT name FROM employees e
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.emp_id = e.id);

-- Correlated subquery (references outer query)
SELECT e.name, e.salary,
  (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) AS dept_avg
FROM employees e;
\`\`\`

### Key Points:
- **Scalar** → returns one value
- **Row** → returns one row
- **Table** → returns multiple rows
- **Correlated** → references outer query (runs for each row)`,
    problems: [
      { id: 'ss1', title: 'Scalar subquery basics', difficulty: 'easy' },
      { id: 'ss2', title: 'IN with subquery', difficulty: 'medium' },
      { id: 'ss3', title: 'EXISTS vs IN comparison', difficulty: 'medium' },
      { id: 'ss4', title: 'Correlated subqueries', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-window',
    title: 'Window Functions',
    icon: '🪟',
    notes: `## Window Functions
\`\`\`sql
-- ROW_NUMBER: Assigns unique number to each row
SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- RANK and DENSE_RANK
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- PARTITION BY
SELECT name, department, salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;

-- LAG and LEAD
SELECT name, salary,
  LAG(salary) OVER (ORDER BY hire_date) AS prev_salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_salary
FROM employees;

-- Running totals
SELECT name, salary,
  SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;
\`\`\`

### Key Points:
- Window functions don't reduce rows like GROUP BY
- \`PARTITION BY\` = GROUP BY for window functions
- \`ROW_NUMBER\` = unique, \`RANK\` = gaps, \`DENSE_RANK\` = no gaps
- \`LAG/LEAD\` = access previous/next row`,
    problems: [
      { id: 'sw1', title: 'ROW_NUMBER basics', difficulty: 'medium' },
      { id: 'sw2', title: 'RANK vs DENSE_RANK', difficulty: 'medium' },
      { id: 'sw3', title: 'PARTITION BY grouping', difficulty: 'medium' },
      { id: 'sw4', title: 'LAG and LEAD usage', difficulty: 'medium' },
      { id: 'sw5', title: 'Running totals & averages', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-cte',
    title: 'CTEs & Temp Tables',
    icon: '📦',
    notes: `## Common Table Expressions (CTEs)
\`\`\`sql
-- Basic CTE
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees
  WHERE salary > 80000
)
SELECT department, COUNT(*) AS count
FROM high_earners
GROUP BY department;

-- Recursive CTE (for hierarchies)
WITH RECURSIVE org_chart AS (
  -- Base case
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  -- Recursive case
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;
\`\`\`

### Key Points:
- CTEs improve readability over nested subqueries
- Can chain multiple CTEs with commas
- Recursive CTEs for tree/hierarchical data
- Temporary tables persist for the session; CTEs only for the query`,
    problems: [
      { id: 'sc1', title: 'Basic CTE usage', difficulty: 'medium' },
      { id: 'sc2', title: 'Multiple CTEs', difficulty: 'medium' },
      { id: 'sc3', title: 'Recursive CTE for hierarchy', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-indexes',
    title: 'Indexes & Performance',
    icon: '⚡',
    notes: `## Indexes
\`\`\`sql
-- Create index
CREATE INDEX idx_emp_salary ON employees(salary);

-- Composite index
CREATE INDEX idx_emp_dept_sal ON employees(department, salary);

-- Unique index
CREATE UNIQUE INDEX idx_emp_email ON employees(email);

-- View query execution plan
EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 50000;
\`\`\`

### Key Points:
- Indexes speed up reads but slow down writes
- B-Tree indexes = default, good for range queries
- Hash indexes = good for equality checks only
- Composite index order matters (leftmost prefix rule)
- Don't over-index — each index = storage + write overhead`,
    problems: [
      { id: 'si1', title: 'When to create indexes', difficulty: 'easy' },
      { id: 'si2', title: 'Composite index design', difficulty: 'medium' },
      { id: 'si3', title: 'EXPLAIN query analysis', difficulty: 'hard' },
    ],
  },
  {
    id: 'sql-normalization',
    title: 'Normalization & Design',
    icon: '🏗️',
    notes: `## Database Normalization

### Normal Forms:
- **1NF**: No repeating groups, atomic values
- **2NF**: 1NF + no partial dependencies (every non-key depends on full primary key)
- **3NF**: 2NF + no transitive dependencies
- **BCNF**: Every determinant is a candidate key

### Key Concepts:
- **Primary Key**: Uniquely identifies each row
- **Foreign Key**: References primary key of another table
- **Candidate Key**: Minimal set of columns that uniquely identify a row
- **ACID**: Atomicity, Consistency, Isolation, Durability

\`\`\`sql
-- Transactions
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- or ROLLBACK; if something fails
\`\`\``,
    problems: [
      { id: 'sn1', title: 'Identify normal forms', difficulty: 'easy' },
      { id: 'sn2', title: 'Design a normalized schema', difficulty: 'medium' },
      { id: 'sn3', title: 'Transaction management', difficulty: 'medium' },
      { id: 'sn4', title: 'ACID properties', difficulty: 'easy' },
    ],
  },
];

export default SQL_TOPICS;
