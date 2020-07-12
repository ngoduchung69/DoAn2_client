import React, { useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { FIND_USER } from "../../schema/query";
import { useMutation, useSubscription, useQuery, useLazyQuery } from "@apollo/react-hooks";

const HanhTable = ({tableData}) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Temperature',
          dataIndex: 'temp',
          key: 'temp',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'time',
        },
      ];
    return (
      <div>
<Table dataSource={tableData} columns={columns} />
      </div>
        
    );
};

export default HanhTable;