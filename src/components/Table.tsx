import { useEffect, useRef } from "react";
import "../styles/table.css";
import { TableProps } from "./App";

export const Table = (props: TableProps) => {
    const { columns, rows, rowTitle } = props;
    const headerRef = useRef<HTMLHeadElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        splitCells()
    }, []);

    const splitCells = () => {
        const columnCount = columns.length;
        const rowCount = rows.length;

        headerRef.current?.style.setProperty("grid-template-columns", `repeat(${columnCount}, 1fr)`);
        rowRef.current?.style.setProperty("grid-template-rows", `repeat(${rowCount}, 1fr)`);
        columnsRef.current.forEach(column => {
            if (column) {
                column.style.setProperty("grid-template-columns", `repeat(${columnCount}, 1fr)`);
            }
        });
    }

    return (
        <div className="table-wrapper">
            <header ref={ headerRef } className="table-header">
                {columns.map(column => (
                    <div key={ column.order } className="column-title cell" style={{ order: column.order }}>
                        {column.title}
                    </div>
                ))}
            </header>
            <div ref={ rowRef } className="table-body">
                {rows.map((row, index) => (
                    <div key={ row.order } style={{ order: row.order }}>
                        <div ref={ element => { columnsRef.current[index] = element; } } className="table-row">
                            {columns.map(column => (
                                <div className="cell" style={{ order: column.order }}>
                                    {row[column.title]?.toString()}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;