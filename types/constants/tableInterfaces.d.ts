export interface TableWrapperProp {
    columns: Column[];
    rows: Row[];
    className: string;
}
export interface TableProp extends Omit<TableWrapperProp, "className"> {
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
