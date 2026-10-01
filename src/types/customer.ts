export type CustomerStatus = "Active" | "Inactive" | "Pending";

export interface Customer {
  id: number;
  customer: string;
  email: string;
  department: string;
  location: string;
  status: CustomerStatus;
  revenue: number;
  orders: number;
  joinedDate: string;
}
