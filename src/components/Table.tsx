import { useEffect, useRef } from "react";
import { Column, TableProp } from "../constants/tableInterfaces";

export const Table = (props: {
    info: TableProp;
    windowWidth: number;
    onCellOverflowing: () => void;
}) => {
    const { columns, rows, rowTitle } = props.info;
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        splitCells();
    }, []);

    useEffect(() => {
        if (!tableRef.current) return;

        const cells = tableRef.current.querySelectorAll<HTMLDivElement>(".cell");

        for (let cell of cells) {
            if (checkIsCellOverflowing(cell)) {                
                props.onCellOverflowing();

                return;
            }
        }
    }, [props.windowWidth]);

    const splitCells = () => {
        const columnCount = columns.length;
        const rowCount = rows.length;

        const header = tableRef.current?.querySelector<HTMLHeadElement>(".table-header");
        const body = tableRef.current?.querySelector<HTMLDivElement>(".table-body");
        const row = tableRef.current?.querySelectorAll<HTMLDivElement>(".table-row");

        header?.style.setProperty("grid-template-columns", `repeat(${columnCount}, 1fr)`);
        body?.style.setProperty("grid-template-rows", `repeat(${rowCount}, 1fr)`);
        row?.forEach(column => {
            if (column) {
                column.style.setProperty("grid-template-columns", `repeat(${columnCount}, 1fr)`);
            }
        });
    }

    const getColumnOrder = (column: Column) => {
        return column.title === rowTitle ? 0 : column.order;
    }

    const checkIsCellOverflowing = (cell: HTMLDivElement) => {        
        const lineHeight = parseFloat(getComputedStyle(cell).lineHeight);
        const line = Math.round(cell.scrollHeight / lineHeight);        

        return line > 1;
    }

    return (
        <div className="table-wrapper" ref={tableRef}>
            <header className="table-header">
                {columns.map(column => (
                    <div key={ column.order } className="column-title cell" style={{ order: getColumnOrder(column) }}>
                        {column.title}
                    </div>
                ))}
            </header>
            <div className="table-body">
                {rows.map(row => (
                    <div key={ row.order } style={{ order: row.order }}>
                        <div className="table-row">
                            {columns.map(column => (
                                <div key={column.order} className="cell" style={{ order: getColumnOrder(column) }}>
                                    {row[column.title]?.toString()}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;