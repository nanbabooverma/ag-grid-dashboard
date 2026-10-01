import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import type { Employee } from "../types/employee";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps {
  rowData: Employee[];
}

const DataTable = ({ rowData }: DataTableProps) => {
  const columnDefs: ColDef<Employee>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Employee",
      minWidth: 200,
      flex: 1,
      valueGetter: (params) =>
        `${params.data?.firstName ?? ""} ${params.data?.lastName ?? ""}`,
      filter: "agTextColumnFilter",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 240,
      flex: 1.2,
      filter: "agTextColumnFilter",
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 140,
      filter: "agTextColumnFilter",
    },
    {
      field: "position",
      headerName: "Position",
      minWidth: 190,
      filter: "agTextColumnFilter",
    },
    {
      field: "salary",
      headerName: "Salary",
      minWidth: 130,
      type: "numericColumn",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(params.value ?? 0),
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      minWidth: 130,
      filter: "agDateColumnFilter",
    },
    {
      field: "age",
      headerName: "Age",
      width: 90,
      type: "numericColumn",
      filter: "agNumberColumnFilter",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 130,
      filter: "agTextColumnFilter",
    },
    {
      field: "performanceRating",
      headerName: "Performance",
      minWidth: 140,
      type: "numericColumn",
      filter: "agNumberColumnFilter",
      cellRenderer: (params: { value: number }) => {
        const rating = params.value;

        return (
          <span className="performance-rating">
            <span>★</span> {rating}
          </span>
        );
      },
    },
    {
      field: "projectsCompleted",
      headerName: "Projects",
      minWidth: 110,
      type: "numericColumn",
      filter: "agNumberColumnFilter",
    },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 80,
      filter: "agSetColumnFilter",
      cellRenderer: (params: { value: boolean }) => {
        const active = params.value;

        return (
          <span
            className={`status-badge ${
              active ? "status-active" : "status-inactive"
            }`}
          >
            <span className="status-dot" />
            {active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      field: "skills",
      headerName: "Skills",
      minWidth: 360,
      flex: 1,
      filter: "agTextColumnFilter",
      valueGetter: (params) => params.data?.skills?.join(", ") ?? "",
    },
    {
      field: "manager",
      headerName: "Manager",
      minWidth: 160,
      filter: "agTextColumnFilter",
      valueFormatter: (params) => params.value ?? "—",
    },
  ];

  const defaultColDef: ColDef<Employee> = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <div className="grid-wrapper">
      <AgGridProvider modules={[AllCommunityModule]}>
        <div className="ag-theme-quartz dashboard-grid">
          <AgGridReact<Employee>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
            animateRows={true}
            rowHeight={58}
            headerHeight={48}
            suppressCellFocus={true}
            enableCellTextSelection={true}
            cacheQuickFilter={true}
          />
        </div>
      </AgGridProvider>
    </div>
  );
};

export default DataTable;
