# react-split-table

> A flexible and extensible React library for building responsive data tables

## Features

- Designed with mobile and small screens in mind
- Break wide tables into manageable sections

## Usage

```typescript
import { TableWrapper } from "react-split-table";
import { Column, Row } from "react-split-table/types/src/constants/tableInterfaces";
import "react-split-table/styles/table.css";

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

<TableWrapper
    columns={exampleColumns}
    rows={exampleRows}
    className="example_table"
/>
```

## Installation

```bash
npm install react-split-table
```

## License

[Park Seong Kyeong](https://github.com/parkbible)
