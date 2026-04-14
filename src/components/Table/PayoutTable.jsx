import React from "react";
import { Table, Spin, Empty } from "antd";
import dayjs from "dayjs";
import { useGetAllWithdrawQuery } from "../../redux/services/withdraw/withdrawApiService";
import useAuthData from "../../hooks/useAuthData";

const PayoutTable = () => {
  const { user } = useAuthData();

  const { data: payOutData, isLoading } = useGetAllWithdrawQuery(
    user?.userId
  );

  // ✅ Table Columns
  const columns = [
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        dayjs(date).format("DD MMM YYYY, hh:mm A"),
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet) => (
        <span className="text-indigo-300 font-medium capitalize">
          {wallet || "N/A"}
        </span>
      ),
    },
    {
      title: "Wallet Number",
      dataIndex: "walletNumber",
      key: "walletNumber",
      render: (number) => (
        <span className="text-gray-300">{number}</span>
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      render: (type) => (
        <span className="text-cyan-300 capitalize">
          {type}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-green-400 font-semibold">
          ৳ {amount}
        </span>
      ),
    },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let className = "";

        if (status === "Completed") {
          className =
            "bg-green-500/10 text-green-400";
        } else if (status === "Failed") {
          className =
            "bg-red-500/10 text-red-400";
        } else {
          className =
            "bg-orange-500/10 text-orange-400";
        }

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
      overflow-hidden
      flex flex-col
      bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035]
      shadow-[0_0_100px_rgba(99,102,241,0.15),0_40px_80px_rgba(0,0,0,0.7)]
      p-4
    "
    >
      <h2 className="text-white text-lg font-semibold my-4">
        Payout History
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : payOutData?.data?.length ? (
        <Table
          columns={columns}
          dataSource={payOutData.data}
          rowKey="_id"
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
          }}
          scroll={{ x: "max-content" }}
          className="custom-ant-table"
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <Empty description="No Payout Found" />
        </div>
      )}
    </div>
  );
};

export default PayoutTable;