import React from "react";
import { ConfigProvider, Empty, Pagination, Skeleton, Table } from "antd";

const CustomDataTable = (props) => {
  // TEAM LOADING STATE
  const loading = props.loading;

  return (
    <React.Fragment>
      <div className="custom-pagination-table table-responsive">
        <ConfigProvider
          theme={{
            token: {
              headerBg: "#F1F1F6",
              colorText: "#222B40",
            },
            components: {
              Table: {
                headerBg: "#F1F1F6",
                headerColor: "#003d92",
                rowHoverBg: "transparent",
                cellPaddingBlock: 8,
              },
            },
          }}
        >
          <Table
            size="middle"
            bordered
            className="custom-antd-table"
            columns={props.columns}
            dataSource={props.dataSource}
            pagination={false}
            locale={{
              emptyText: loading ? (
                <Skeleton active={true} />
              ) : (
                <Empty description={<>No Data</>} />
              ),
            }}
          />
        </ConfigProvider>
      </div>
      <div className="row w-100 m-0 pagination-container py-3 text-end">
        <Pagination
          defaultCurrent={props.defaultPage}
          total={props.totalData}
          onChange={props.handlePageination}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </div>
    </React.Fragment>
  );
};

export default CustomDataTable;
