import {Column, Row} from "../constants/tableInterfaces";
import TableWrapper from "./table/TableWrapper";

const exampleColumns: Column[] = [
    {order: 4, title: "name"},
    {order: 1, title: "age"},
    {order: 3, title: "occupation"},
    {order: 2, title: "phone"},
    {order: 5, title: "address"},
];

const exampleRows: Row[] = [
    {
        order: 2,
        name: "Alice",
        age: 30,
        occupation: "Software Engineer",
        phone: "010-1234-5678",
        address: null,
    },
    {
        order: 1,
        name: "Ben",
        age: 25,
        occupation: "UX Designer",
        phone: "010-9876-5432",
        address: "123 Main St",
    },
    {
        order: 3,
        name: "Charlie",
        age: 40,
        occupation: "Project Manager",
        phone: "010-1111-2222",
        address: null,
    },
];

export const App = () => {
    return <TableWrapper columns={exampleColumns} rows={exampleRows} />;
};

export default App;
