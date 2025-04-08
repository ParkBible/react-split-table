import Table from "./Table";

export interface TableProps {
    columns: Column[];
    rows: Row[];
    rowTitle?: string;
}

interface Column {
    order: number;
    title: string;
}

interface Row {
    order: number;
    [title: string]: string | number | boolean | null;
}

const exampleColumns: Column[] = [
    { order: 1, title: "name" },
    { order: 4, title: "age" },
    { order: 3, title: "occupation" },
    { order: 2, title: "isActive" },
    { order: 5, title: "address" }
];

const exampleRows: Row[] = [
    { order: 2, name: "Alice", age: 30, occupation: "Software Engineer", isActive: true, address: null },
    { order: 1, name: "Ben", age: 25, occupation: "UX Designer", isActive: false, address: "123 Main St" },
    { order: 3, name: "Charlie", age: 40, occupation: "Project Manager", isActive: true, address: null }
];

export const App = () => {
    return (
        <Table columns={exampleColumns} rows={exampleRows} rowTitle="age" />
    )
}

export default App;