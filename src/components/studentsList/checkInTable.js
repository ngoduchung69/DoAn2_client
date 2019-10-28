import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CheckInTimeQuery } from '../../schema/query';
import { Table, Tag, Button, Icon } from 'antd';
import "antd/dist/antd.css";

const CheckInTable = ({ID}) => {
    const { loading, error, data } = useQuery(CheckInTimeQuery, { variables: {id : ID } });
	if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <div></div>
        // <Table
		// 		columns={[
		// 			{
		// 				title: 'UserId',
        //                 dataIndex: 'userId',
        //                 key:'userId'
		// 			},
		// 			{
		// 				title: 'Giờ vào',
        //                 dataIndex: 'checkInTime',
        //                 key:'checkInTime',
		// 				render: text => (<div>
		// 					<Icon type="clock-circle-o" style={{ fontSize: '16px', color: "green", marginRight: "5px" }} />
		// 					{text}
		// 				</div>)
		// 			}
		// 		]}
		// 		dataSource={data.checkInTimes} />
    );
};

export default CheckInTable;