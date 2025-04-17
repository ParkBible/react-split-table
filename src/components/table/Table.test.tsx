import {render, screen} from "@testing-library/react";
import Table from "./Table";

const mockColumns = [
    {order: 0, title: "Name"},
    {order: 1, title: "Age"},
];

const mockRows = [
    {order: 0, Name: "Alice", Age: 25},
    {order: 1, Name: "Bob", Age: 30},
];

const mockInfo = {
    columns: mockColumns,
    rows: mockRows,
    tableNum: 1,
};

describe("Table", () => {
    describe("줄바꿈 현상이 일어난 셀이 있다면", () => {
        it("모든 데이터를 화면에 표시한다", () => {
            render(<Table info={mockInfo} wrapperWidth={800} onCellOverflowing={() => {}} />);

            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.getByText("Bob")).toBeInTheDocument();
            expect(screen.getByText("Age")).toBeInTheDocument();
            expect(screen.getByText("25")).toBeInTheDocument();
            expect(screen.getByText("30")).toBeInTheDocument();
        });

        it("주어진 컬럼과 로우 개수에 맞게 셀을 나눈다", () => {
            const {container} = render(
                <Table info={mockInfo} wrapperWidth={800} onCellOverflowing={() => {}} />,
            );

            const header = container.querySelector(".table-header") as HTMLElement;
            const body = container.querySelector(".table-body") as HTMLElement;

            expect(header.style.gridTemplateColumns).toBe(`repeat(${mockColumns.length}, 1fr)`);
            expect(body.style.gridTemplateRows).toBe(`repeat(${mockRows.length}, 1fr)`);
        });
    });

    describe("줄바꿈 현상이 일어난 셀이 있다면", () => {
        it("onCellOverflowing 이벤트를 호출한다", () => {
            const mockOnCellOverflowing = vi.fn();

            vi.stubGlobal("getComputedStyle", () => ({
                lineHeight: "10px",
            }));

            const {container} = render(
                <Table
                    info={mockInfo}
                    wrapperWidth={800}
                    onCellOverflowing={mockOnCellOverflowing}
                />,
            );

            expect(mockOnCellOverflowing).not.toHaveBeenCalled();
        });
    });
});
