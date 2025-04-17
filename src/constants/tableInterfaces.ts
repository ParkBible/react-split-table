export interface TableProps {
    columns: Column[];
    rows: Row[];
    rowTitle?: string;
}

export interface Column {
    order: number;
    title: string;
}

export interface Row {
    order: number;
    [title: string]: string | number | null;
}