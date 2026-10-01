import { ArrowDown } from "react-feather";

const PageHeader = () => {
  return (
    <section className="page-heading">
      <div>
        <p className="eyebrow">OVERVIEW</p>
        <h2>Employee Dashboard</h2>
        <p className="description">
          Monitor employee activity, revenue and order performance from one
          place.
        </p>
      </div>

      <button className="export-button">
        <ArrowDown size={18} /> <span>Export</span>
      </button>
    </section>
  );
};

export default PageHeader;
