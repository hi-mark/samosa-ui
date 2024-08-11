import { useState } from "react";
import styles from "home/styles/GlobalComponents/SMTable.module.css";
import { useRouter } from "next/router";

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
  clickableRow?: boolean;
  linkPrefix?: string;
  linkKey?: string;
  emptyMsg?: string;
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
  const {
    tableData,
    headerData,
    tableName,
    startIndex,
    clickableRow,
    linkPrefix,
    linkKey,
  } = props;

  const lastIndex = tableData.length - 1;
  const router = useRouter();
  const handleNavigation = (row: any) => {
    if (clickableRow && linkPrefix && linkKey) {
      router.push(`${linkPrefix}${row[linkKey]}`);
    }
  };

  return (
    <tbody>
      {tableData.map((row: any, index: number) => (
        <tr
          key={tableName + index}
          className={clickableRow ? styles.clickableRow : ""}
          onClick={() => {
            handleNavigation(row);
          }}
        >
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
    clickableRow = false,
    linkPrefix,
    linkKey,
    emptyMsg = "No Data to display",
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
      {tableData.length ? (
        <table className={styles.SMTable}>
          <TableHead headerData={headerData} />
          <TableBody
            tableData={paginatedData}
            headerData={headerData}
            tableName={tableName}
            startIndex={startIndex}
            clickableRow={clickableRow}
            linkPrefix={linkPrefix}
            linkKey={linkKey}
          />
        </table>
      ) : (
        <p className={styles.emptyMsg}>{emptyMsg}</p>
      )}
      {showPagination && !!tableData.length && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={handleClickPrev}
            disabled={currentPage === 1}
          >
            <img
              src="/icons/LeftArrow.svg"
              className={styles.paginationIcon}
              alt="Next"
            />
          </button>
          <p>
            {currentPage} / {totalPages}
          </p>
          <button
            className={styles.paginationButton}
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
          >
            <img
              src="/icons/RightArrow.svg"
              className={styles.paginationIcon}
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
