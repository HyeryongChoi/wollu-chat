import { Fragment, ReactNode } from 'react';

import ExcelLogoIcon from '/excel_logo.svg';

type RenderProps<P extends object = object> = (payload?: P) => ReactNode;
interface SpreadsheetProps {
  renderItems?: RenderProps[];
}

function Spreadsheet(props: SpreadsheetProps) {
  const { renderItems } = props;
  const tableHTML = createHTMLTable();

  return (
    <div className='absolute h-screen w-full overflow-hidden' aria-label='엑셀인척하는 배경'>
      <header className='flex w-full items-center bg-[#F9FBFD] p-4'>
        <img className='m-2 w-10' src={ExcelLogoIcon} alt='' />
        <div>
          <h1 className='mb-2 text-lg' aria-hidden>
            제목 없는 스프레드시트
          </h1>
          <div className='flex whitespace-pre text-sm' aria-hidden>
            <p aria-hidden>
              {`파일   수정   보기   삽입   서식   데이터   도구   확장프로그램   도움말   `}
            </p>
            {renderItems &&
              renderItems.map((renderItem, index) => (
                <Fragment key={index}>{renderItem()}</Fragment>
              ))}
          </div>
        </div>
      </header>
      {tableHTML}
    </div>
  );
}

export default Spreadsheet;

const createHTMLTable = (rows: number = 60, cols: number = 26) => {
  const tableRows = [];

  // 테이블 헤더 생성
  const headerCells = [<th key={-1} scope='col' className='w-12 border-r border-gray-300' />]; // 첫 번째 열은 빈 열

  for (let i = 0; i < cols; i++) {
    if (i === 0) {
      headerCells.push(
        <th key={i} scope='col' className='w-20 border-r border-gray-300 bg-[#D3E2FD] font-normal'>
          {String.fromCharCode(65 + i)}
        </th>,
      );
    } else {
      headerCells.push(
        <th key={i} scope='col' className='w-20 border-r border-gray-300 font-normal'>
          {String.fromCharCode(65 + i)}
        </th>,
      );
    }
  }

  const headerRow = <tr key={0}>{headerCells}</tr>;
  tableRows.push(headerRow);

  // 테이블 데이터 생성
  for (let i = 0; i < rows; i++) {
    const rowData = [];

    if (i === 0) {
      rowData.push(
        <th key={-1} scope='row' className=' border-r border-gray-300 bg-[#D3E2FD] font-normal'>
          {i + 1}
        </th>,
      );
    } else {
      rowData.push(
        <th key={-1} scope='row' className=' border-r border-gray-300 font-normal'>
          {i + 1}
        </th>,
      );
    }

    // 행 번호 추가
    for (let j = 0; j < cols; j++) {
      if (i === 0 && j === 0) rowData.push(<td key={j} className='border-2 border-[#1C73E8]' />);
      else rowData.push(<td key={j} className=' border-r border-gray-200' />);
    }

    const row = (
      <tr key={i + 1} className='border-b border-gray-200'>
        {rowData}
      </tr>
    );

    tableRows.push(row);
  }

  return (
    <table className='w-full table-fixed border-[1px] border-gray-300' aria-hidden>
      <thead className='h-6 border-b border-gray-300 text-sm font-normal'>{tableRows[0]}</thead>
      <tbody className='h-5 text-xs font-normal'>{tableRows.slice(1)}</tbody>
    </table>
  );
};
