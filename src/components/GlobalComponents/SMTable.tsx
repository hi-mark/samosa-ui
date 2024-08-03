import { useState } from "react";
import styles from "home/styles/SMTable.module.css";

type header = {
  title: string;
  key: string;
  leftAlign?: boolean;
};

type SMProps = {
  headerData: Array<header>;
  tableData: any;
  showPagination?: boolean;
  tableName: string;
  rowsPerPage?: number;
};

const getClassName = ({ index, key, lastIndex }: any) => {
  return index === lastIndex ? styles.lastCell : "";
};

const TableHead = (props: any) => {
  const { headerData } = props;
  const lastIndex = headerData.length - 1;
  return (
    <thead>
      <tr>
        <th className={styles.firstCell}> Serial</th>
        {headerData.map((header: header, index: number) => {
          return (
            <th
              className={getClassName({ index, key: header.key, lastIndex })}
              key={header.key}
              style={{
                textAlign: header.leftAlign ? "left" : "center",
              }}
            >
              {header.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TableBody = (props: any) => {
  const { tableData, headerData, tableName, startIndex } = props;
  const lastIndex = tableData.length - 1;
  return (
    <tbody>
      {tableData.map((row: any, index: number) => (
        <tr key={tableName + index}>
          <td>{startIndex + index + 1}</td>
          {headerData.map((header: header, index: number) => {
            return (
              <td
                className={getClassName({ index, key: header.key, lastIndex })}
                key={header.key}
                style={{
                  textAlign: header.leftAlign ? "left" : "center",
                }}
              >
                {row[header.key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export const SMTable = (SMProps: SMProps) => {
  const {
    headerData,
    tableData,
    showPagination,
    tableName,
    rowsPerPage = 7,
  } = SMProps;

  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = tableData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = tableData.slice(startIndex, endIndex);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.SMTable}>
        <TableHead headerData={headerData} />
        <TableBody
          tableData={paginatedData}
          headerData={headerData}
          tableName={tableName}
          startIndex={startIndex}
        />
      </table>
      {showPagination && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={handleClickPrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p>
            {currentPage} / {totalPages}
          </p>
          <button
            className={styles.paginationButton}
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
