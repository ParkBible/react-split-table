import {Column, Row} from "../src/constants/tableInterfaces";
import TableWrapper from "../src/components/TableWrapper";

const ticketColumns: Column[] = [
    {order: 1, title: "ticketId"},
    {order: 2, title: "customer"},
    {order: 3, title: "subject"},
    {order: 4, title: "status"},
    {order: 5, title: "assignedTo"},
];

const ticketRows: Row[] = [
    {
        order: 1,
        ticketId: "#20250401",
        customer: "Alice Kim",
        subject: "Cannot reset password",
        status: "Open",
        assignedTo: "Support Team A",
    },
    {
        order: 2,
        ticketId: "#20250402",
        customer: "Ben Choi",
        subject: "Error 500 on checkout page",
        status: "In Progress",
        assignedTo: "Backend Team",
    },
    {
        order: 3,
        ticketId: "#20250403",
        customer: "Charlie Park",
        subject: "Refund request",
        status: "Resolved",
        assignedTo: "Billing Dept",
    },
    {
        order: 4,
        ticketId: "#20250404",
        customer: "Dana Lee",
        subject: "Profile picture upload issue",
        status: "Pending Customer",
        assignedTo: "Frontend Team",
    },
    {
        order: 5,
        ticketId: "#20250405",
        customer: "Eric Kim",
        subject: "Login loading problem",
        status: "Open",
        assignedTo: "Platform Team",
    },
];

export const TicketTable = () => {
    return <TableWrapper columns={ticketColumns} rows={ticketRows} className="ticket-table" />;
};

export default TicketTable;
