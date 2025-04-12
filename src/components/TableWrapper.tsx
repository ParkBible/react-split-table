import { useEffect, useRef, useState } from "react";
import "../styles/table.css";
import { Column, TableProp, TableWrapperProp } from "../constants/tableInterfaces";
import Table from "./Table";

// 여러 테이블을 감싸는 구조
export const TableWrapper = (props: TableWrapperProp) => {
    const { columns, rows, rowTitle } = props;
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [tablesInfo, setTablesInfo] = useState<TableProp[]>([]);

    useEffect(() => {
        setTablesInfo([...tablesInfo, {
            columns: columns,
            rows: rows,
            rowTitle: rowTitle,
            order: 0
        }]);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const splitTable = () => {
        console.log("split");
    }

    return (
        <div className="tables-wrapper">
            {tablesInfo.map(info => (
                <Table 
                    key={info.order} 
                    info={info}
                    windowWidth={windowWidth}
                    onCellOverflowing={splitTable}
                />
            ))}
        </div>
    )
}

export default TableWrapper;