export interface TableWrapperProp {
    columns: Column[];
    rows: Row[];
}

export interface TableProp extends TableWrapperProp {
    tableNum: number;
}

export interface Column {
    order: number;
    title: string;
}

export interface Row {
    order: number;
    [title: string]: string | number | null;
}
