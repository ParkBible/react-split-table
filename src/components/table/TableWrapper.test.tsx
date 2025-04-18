let savedOnCellOverflowing: (tableNum: number) => void;
const receivedPropsList: any[] = [];

vi.mock("./Table", () => ({
    __esModule: true,
    default: (props: any) => {
        receivedPropsList.push(props);
        savedOnCellOverflowing = props.onCellOverflowing;
        return <div data-testid="table">Mocked Table</div>;
    },
}));

import {render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import TableWrapper from "./TableWrapper";
import {TableWrapperProp} from "../../constants/tableInterfaces";

class ResizeObserverMock {
    observe() {
        return;
    }

    disconnect() {
        return;
    }
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const dummyProps: TableWrapperProp = {
    columns: [
        {order: 0, title: "Name"},
        {order: 1, title: "Age"},
        {order: 2, title: "Job"},
    ],
    rows: [
        {order: 0, Name: "Alice", Age: 25, Job: "Developer"},
        {order: 1, Name: "Bob", Age: 30, Job: "Designer"},
    ],
    className: "test-table",
};

describe("TableWrapper", () => {
    describe("컴포넌트가 렌더링되었을 때", () => {
        it("사용자가 설정한 클래스 네임으로 렌더링된다", async () => {
            render(<TableWrapper {...dummyProps} />);

            const tableWrapper = await screen.findByTestId("table-wrapper");

            expect(tableWrapper).toBeInTheDocument();
            expect(tableWrapper).toHaveClass(dummyProps.className);
        });

        it("TableWrapper 안에 테이블 하나가 렌더링된다", async () => {
            render(<TableWrapper {...dummyProps} />);

            expect(screen.getAllByTestId("table")).toHaveLength(1);
        });

        it("ResizeObserver를 통해 감시한다", async () => {
            const observeSpy = vi.spyOn(ResizeObserverMock.prototype, "observe");
            render(<TableWrapper {...dummyProps} />);

            await waitFor(() => {
                expect(observeSpy).toHaveBeenCalled();
            });
        });
    });

    describe("onCellOverflowing 이벤트가 호출되었을 때", () => {
        describe("마지막 테이블인 경우", () => {
            it("맨 마지막 컬럼을 테이블로 분리한다", async () => {
                render(<TableWrapper {...dummyProps} />);

                savedOnCellOverflowing(0);

                await waitFor(() => {
                    expect(screen.getAllByTestId("table")).toHaveLength(2);
                });

                const [table0, table1] = receivedPropsList.slice(-2).map(p => p.info);

                const table0ColumnTitles = table0.columns.map((c: any) => c.title);
                const table1ColumnTitles = table1.columns.map((c: any) => c.title);

                expect(table0ColumnTitles).not.toContain("Job");
                expect(table1ColumnTitles).toContain("Job");
            });
        });

        describe("마지막 테이블이 아닌 경우", () => {
            it("맨 마지막 컬럼을 현재 테이블에서 삭제하고 다음 테이블의 컬럼으로 추가한다", async () => {
                render(<TableWrapper {...dummyProps} />);

                savedOnCellOverflowing(0);

                await waitFor(() => {
                    expect(screen.getAllByTestId("table")).toHaveLength(2);
                    savedOnCellOverflowing(0);
                });

                const [table0, table1] = receivedPropsList.slice(-2).map(p => p.info);

                const table0ColumnTitles = table0.columns.map((c: any) => c.title);
                const table1ColumnTitles = table1.columns.map((c: any) => c.title);

                expect(table0ColumnTitles).not.toContain("Job");
                expect(table1ColumnTitles).toContain("Job");
            });
        });
    });
});
