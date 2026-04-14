import React from "react";
import { Table, Tag, Spin, Empty } from "antd";
import dayjs from "dayjs";
import { useGetAllPaymentsQuery } from "../../redux/services/payment/paymentApiService";
import useAuthData from "../../hooks/useAuthData";

const InvoiceTable = () => {
  const { user } = useAuthData();

  const { data: paymentData, isLoading } = useGetAllPaymentsQuery(user?.userId);

  // ✅ Table Columns
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => dayjs(date).format("DD MMM YYYY, hh:mm A"), // 12 hour format
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method) => (
        <span className="text-indigo-300 font-medium">{method || "N/A"}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-green-400 font-semibold">৳ {amount}</span>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id) => <span className="text-xs text-gray-300">{id}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let className = "";

        if (status === "Completed")
          className = "bg-green-500/10 text-green-500";
        else if (status === "Failed") className = "bg-red-500/10 text-red-500";
        else if (status === "Pending")
          className = "bg-orange-500/10 text-orange-500";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div
      className="
w-full
     overflow-hidden flex flex-col
    bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035]
    shadow-[0_0_100px_rgba(99,102,241,0.15),0_40px_80px_rgba(0,0,0,0.7)]
    p-4
  "
    >
      <h2 className="text-white text-lg font-semibold my-4">Payment History</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : paymentData?.data?.length ? (
        <Table
          columns={columns}
          dataSource={paymentData.data}
          rowKey="_id"
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
          }}
          scroll={{ x: "max-content" }}
          className="custom-ant-table"
        />
      ) : (
        <div className="flex items-center justify-center h-full ">
          <Empty description="No Payments Found" />
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
