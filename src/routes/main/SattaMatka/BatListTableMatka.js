import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

export default function BetListTableMatka(props) {
    const { betList } = props;

    const columns = [
        {
            title: 'SR.',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Matka Name',
            dataIndex: 'matkaName',
            key: 'matkaName',
            align: 'left',
        },
        {
            title: 'Bet Number',
            dataIndex: 'betNumber',
            key: 'betNumber',
            align: 'center',
        },
        {
            title: 'Game Type',
            dataIndex: 'gameType',
            key: 'gameType',
            align: 'center',
        },
        {
            title: 'Amt.',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => Number.parseFloat(Math.abs(amount)).toFixed(2).replace(/\.?0+$/, ""),
            align: 'center',
        },
        {
            title: 'Result',
            dataIndex: 'isDeclare',
            key: 'isDeclare',
            render: (isDeclare, record) => (isDeclare === 1 ? (record.result === null ? "Not Declare" : record.result) : "Not Declare"),
            align: 'center',
        },
        {
            title: 'P&L',
            dataIndex: 'profitLoss',
            key: 'profitLoss',
            render: (profitLoss) => (
                <span className={profitLoss > 0 ? "text-red-500" : "text-green-800"}>
                    {Number.parseFloat(Math.abs(profitLoss)).toFixed(2).replace(/\.?0+$/, "")}
                </span>
            ),
            align: 'center',
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => createdAt ? moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss") : '',
            align: 'left',
        },
    ];

    const dataSource = betList ? betList.map((tempData, index) => ({ ...tempData, key: index })) : [];

    return (
        <div className="gx-overflow-x-auto gx-w-full">
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                size="small"
                scroll={{ x: true }}
            />
        </div>
    );
}
