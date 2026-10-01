import { useMemo, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import DataTable from "./components/DataTable";
import { customers } from "./data/customers";
import { ArrowUpRight, Check, DollarSign, Grid } from "react-feather";
import PageHeader from "./components/PageHeader";
import SearchControls from "./components/SearchControls";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return customers;
    }

    return customers.filter((customer) =>
      Object.values(customer).join(" ").toLowerCase().includes(value)
    );
  }, [search]);

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.revenue,
    0
  );

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="app">
      <Header />

      <main className="dashboard-container">
        <PageHeader />

        <section className="stats-grid">
          <Card
            title="Total Records"
            value={customers.length}
            subtitle="All customer records"
            icon={<Grid size={18} />}
          />

          <Card
            title="Active Customers"
            value={activeCustomers}
            subtitle={`${Math.round(
              (activeCustomers / customers.length) * 100
            )}% of total customers`}
            icon={<Check size={18} />}
          />

          <Card
            title="Total Revenue"
            value={`$${(totalRevenue / 1000).toFixed(1)}K`}
            subtitle="Across all customers"
            icon={<DollarSign size={18} />}
          />

          <Card
            title="Average Order"
            value={`$${averageOrderValue.toFixed(0)}`}
            subtitle="Revenue per order"
            icon={<ArrowUpRight size={18} />}
          />
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h3>Customer Records</h3>
              <p>{filteredCustomers.length} records displayed</p>
            </div>

            <SearchControls
              value={search}
              onChange={setSearch}
              onReset={() => setSearch("")}
            />
          </div>

          <DataTable data={filteredCustomers} />
        </section>
      </main>
    </div>
  );
}

export default App;
