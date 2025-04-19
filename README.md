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
        { order: 1, title: "name" },
        {order: 2, title: "age"}
    ];

    const exampleRows: Row[] = [
        { order: 1, name: "Alice", age: 20 },
        { order: 2, name: "Ben", age: 21 }
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
