import { useMemo, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import DataTable from "./components/DataTable";
import { ArrowUpRight, Check, DollarSign, Grid } from "react-feather";
import PageHeader from "./components/PageHeader";
import SearchControls from "./components/SearchControls";
import { rowData } from "./data/rowData";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const totalEmployees = rowData.length;

  const activeEmployees = rowData.filter(
    (employee) => employee.isActive
  ).length;

  const totalSalary = rowData.reduce(
    (total, employee) => total + employee.salary,
    0
  );

  const averagePerformance =
    rowData.reduce((total, employee) => total + employee.performanceRating, 0) /
    rowData.length;

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return rowData;
    }
    return rowData.filter((employee) =>
      Object.values(employee).flat().join(" ").toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <div className="app">
      <Header />

      <main className="dashboard-container">
        <PageHeader />

        <section className="stats-grid">
          <Card
            title="Total Employees"
            value={totalEmployees}
            subtitle="All employees"
            icon={<Grid size={18} />}
          />

          <Card
            title="Active Employees"
            value={activeEmployees}
            subtitle="Currently active"
            icon={<Check size={18} />}
          />

          <Card
            title="Total Payroll"
            value={`$${totalSalary.toLocaleString()}`}
            subtitle="Annual salary"
            icon={<DollarSign size={18} />}
          />

          <Card
            title="Avg. Performance"
            value={averagePerformance.toFixed(1)}
            subtitle="Out of 5.0"
            icon={<ArrowUpRight size={18} />}
          />
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h3>Employee Records</h3>
              <p>{filteredData.length} records displayed</p>
            </div>

            <SearchControls
              value={search}
              onChange={setSearch}
              onReset={() => setSearch("")}
            />
          </div>

          <DataTable rowData={filteredData} />
        </section>
      </main>
    </div>
  );
}

export default App;
