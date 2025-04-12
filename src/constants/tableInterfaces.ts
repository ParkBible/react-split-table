export interface TableWrapperProp {
    columns: Column[];
    rows: Row[];
    rowTitle?: string;
}

export interface TableProp extends TableWrapperProp {
    order: number;
}

export interface Column {
    order: number;
    title: string;
}

export interface Row {
    order: number;
    [title: string]: string | number | null;
}