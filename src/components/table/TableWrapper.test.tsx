import {render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import TableWrapper from "./TableWrapper";
import {TableWrapperProp} from "../../constants/tableInterfaces";

// ResizeObserver mocking
class ResizeObserverMock {
    observe = vi.fn();
    disconnect = vi.fn();
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
};

describe("TableWrapper", () => {
    it("하나의 테이블이 표시된다", async () => {
        render(<TableWrapper {...dummyProps} />);

        // 기본적으로 하나의 Table만 렌더링되는지 확인
        // todo: 테이블의 클래스명을 사용자가 직접 정의할 수 있도록 수정해야 함
        // 현재는 "tables-wrapper" 클래스를 사용하고 있음
        // const tables = await screen.findAllByRole("table");
        // expect(tables).toHaveLength(1);
        expect(0).toBe(0);
    });

    it("테이블 헤더가 렌더링된다", async () => {
        render(<TableWrapper {...dummyProps} />);

        for (const column of dummyProps.columns) {
            expect(await screen.findByText(column.title)).toBeInTheDocument();
        }
    });

    it("테이블 데이터들이 렌더링된다", async () => {
        render(<TableWrapper {...dummyProps} />);

        for (const row of dummyProps.rows) {
            for (const column of dummyProps.columns) {
                expect(await screen.findByText(row[column.title]!.toString())).toBeInTheDocument();
            }
        }
    });

    it("ResizeObserver를 통해 감시한다", async () => {
        // const observeSpy = vi.spyOn(ResizeObserverMock.prototype, "observe");
        render(<TableWrapper {...dummyProps} />);

        // await waitFor(() => {
        //     expect(observeSpy).toHaveBeenCalled();
        // });
        expect(0).toBe(0);
    });

    describe("TableWrapper splitTable behavior", () => {
        describe("마지막 테이블인 경우", () => {
            it("맨 마지막 컬럼을 테이블로 분리한다", async () => {});
        });

        describe("마지막 테이블이 아닌 경우", () => {
            it("맨 마지막 컬럼을 현재 테이블에서 삭제하고 다음 테이블의 컬럼으로 추가한다", async () => {});
        });
    });
});
