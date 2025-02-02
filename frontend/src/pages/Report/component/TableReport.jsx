import React from 'react';
import { Table, Tag } from 'antd';
const columns = [
    {
        title: 'Measurement',
        dataIndex: 'measurement',
        width: "20%",
    },
    {
        title: 'Field',
        dataIndex: 'field',
        width: "15%",
    },
    {
        title: 'Value',
        dataIndex: 'value',
        render: (i) => (i.toFixed(2)),
        width: "15%",
    },
    {
        title: 'Start',
        dataIndex: 'start',
        width: "20%",
    },
    {
        title: 'Stop',
        dataIndex: 'stop',
        width: "20%",
    },
    {
        title: 'Status',
        dataIndex: 'status',
        defaultSortOrder: 'descend',
        width: "10%",
        sorter: (a, b) => {
            return a.status < b.status
        },
        render: (i) => {
            if (i === "Not Ok") {
                return <Tag color='error'>{i}</Tag>
            } else {
                return <Tag color='success'>{i}</Tag>
            }
        }
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const TableReport = ({ dataSource }) => {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            onChange={onChange}
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
            pagination={{
                pageSize: dataSource.length,
                total: dataSource.length
            }}
        />
    )
};
export default TableReport;