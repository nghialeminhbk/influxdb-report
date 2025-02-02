import React from 'react';
import { Tabs } from 'antd';
import TableReport from './TableReport';

const TabsReport = ({ data, onResize }) => {
  const items = data.map((e, i) => ({
    key: `${e.bucket}${i}`,
    label: e.bucket,
    children: <TableReport dataSource={e.data} />,
  }))

  return (
    <Tabs className='layout-content' defaultActiveKey="1" items={items} />
  )
};
export default TabsReport;