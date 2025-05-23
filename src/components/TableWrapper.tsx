import {useEffect, useRef, useState} from "react";
import "../../styles/table.css";
import {TableProp, TableWrapperProp} from "../constants/tableInterfaces";
import Table from "./Table";
import {debounce} from "../util/debounce";

export const TableWrapper = (props: TableWrapperProp) => {
    const {columns, rows, className} = props;

    const [wrapperWidth, setWrapperWidth] = useState<number>(0);
    const [tablesInfo, setTablesInfo] = useState<TableProp[]>([]);
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTablesInfo([
            {
                columns: columns.sort((a, b) => a.order - b.order),
                rows: rows,
                tableNum: 0,
            },
        ]);
    }, []);

    useEffect(() => {
        if (tablesInfo.length === 0) return;

        const resizeHandler = debounce((entries: ResizeObserverEntry[]) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                setWrapperWidth(width);
            }
        }, 100);

        const observer = new ResizeObserver(resizeHandler);
        observer.observe(tableWrapperRef.current!);

        return () => {
            observer.disconnect();
        };
    }, [tablesInfo]);

    const splitTable = (tableNum: number) => {
        setTablesInfo(prev => {
            const targetTableIndex = prev.findIndex(t => t.tableNum === tableNum);
            if (targetTableIndex === -1) return prev;

            const targetTable = prev[targetTableIndex];
            const {columns, rows} = targetTable;

            const isLastTable = tableNum === prev.length - 1;
            const columnCount = columns.length;

            if (columnCount < 2) return prev;
            const splitIndex = columnCount - 1;

            const firstHalfColumns = columns.slice(0, splitIndex);
            const secondHalfColumns = columns.slice(splitIndex);

            const firstHalf = {
                columns: firstHalfColumns,
                rows,
                tableNum: tableNum,
            };

            const secondHalf = {
                columns: secondHalfColumns,
                rows,
                tableNum: tablesInfo.length,
            };

            const newTablesInfo = structuredClone(prev);

            // 마지막 테이블이 아니라면, 그 다음 테이블과 합친다.
            // 마지막 테이블이라면 테이블 하나를 추가한다.
            if (!isLastTable) {
                const nextTable = prev.find(t => t.tableNum === tableNum + 1);

                if (nextTable) {
                    newTablesInfo[targetTableIndex] = {
                        ...firstHalf,
                        columns: firstHalfColumns,
                    };

                    const nextTableColumns = nextTable.columns.concat(secondHalfColumns);

                    newTablesInfo[targetTableIndex + 1] = {
                        ...nextTable,
                        columns: nextTableColumns.sort((a, b) => a.order - b.order),
                    };
                }
            } else {
                newTablesInfo.splice(targetTableIndex, 1, firstHalf, secondHalf);
            }

            return newTablesInfo;
        });
    };

    return (
        <div className={className} ref={tableWrapperRef}>
            {tablesInfo.map(info => (
                <Table
                    key={info.tableNum}
                    info={info}
                    wrapperWidth={wrapperWidth}
                    onCellOverflowing={splitTable}
                />
            ))}
        </div>
    );
};

export default TableWrapper;
