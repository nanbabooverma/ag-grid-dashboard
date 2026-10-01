import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import type { Customer } from "../data/customers";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps {
  data: Customer[];
}

const DataTable = ({ data }: DataTableProps) => {
  const columnDefs: ColDef<Customer>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: "agNumberColumnFilter",
    },

    {
      field: "customer",
      headerName: "Customer",
      minWidth: 180,
      flex: 1,
      filter: "agTextColumnFilter",
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 230,
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
      field: "location",
      headerName: "Location",
      minWidth: 140,
      filter: "agTextColumnFilter",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      filter: "agTextColumnFilter",

      cellRenderer: (params: { value: Customer["status"] }) => {
        return (
          <span className={`status-badge status-${params.value.toLowerCase()}`}>
            {params.value}
          </span>
        );
      },
    },

    {
      field: "revenue",
      headerName: "Revenue",
      minWidth: 140,
      type: "numericColumn",

      valueFormatter: (params) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(params.value ?? 0);
      },
    },

    {
      field: "orders",
      headerName: "Orders",
      minWidth: 110,
      type: "numericColumn",
    },

    {
      field: "joinedDate",
      headerName: "Joined",
      minWidth: 130,
      filter: "agDateColumnFilter",
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <div className="grid-wrapper">
      <AgGridProvider modules={[AllCommunityModule]}>
        <div className="ag-theme-quartz dashboard-grid">
          <AgGridReact<Customer>
            rowData={data}
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
