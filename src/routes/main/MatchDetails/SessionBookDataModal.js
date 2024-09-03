import React from 'react';
import { Modal, Table } from 'antd';

function SessionBookDataModal({ sessionBookData, handleCloseSessionBookModal }) {
  // Define the columns for the table
  const columns = [
    {
      title: (
        <div className='gx-text-black'>Runs</div>
      ),
      dataIndex: 'runs',
      key: 'runs',
      onHeaderCell: (column) => ({
        style: {
          background:"transparent"
        },
      }),
    },
    {
      title: (
        <div className='gx-text-black'>Profit/Loss</div>
      ),
      dataIndex: 'profitLoss',
      key: 'profitLoss',
      onHeaderCell: (column) => ({
        style: {
          background:"transparent"
        },
      }),
    },
  ];
  const customLocale = {
    emptyText: <div>No Data Found</div>,
  };

  const dataSource =  sessionBookData ?Object.entries(sessionBookData).map(([key, value]) => ({
    key,           
    runs: key,      
    profitLoss: value, 
  })): [];

  return (
    <Modal
      open={true}
      title="Session Book"
      onCancel={handleCloseSessionBookModal}
      footer={null}
      className="gx-px-3"
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false} 
        locale={customLocale}
      />
    </Modal>
  );
}

export default SessionBookDataModal;

