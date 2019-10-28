import React, { useState } from "react";
import "antd/dist/antd.css";
import { Drawer, List, Avatar, Divider, Col, Row, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { StudentQuery } from "../../schema/query";
import CheckInTable from "./checkInTable";

const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const Profile = ({ visible, mssv, setVisible }) => {
    const [openProfile, setOpenProfile] = useState(false);
    const { loading, error, data } = useQuery(StudentQuery, { variables: { mssv: mssv } });
	if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  return (
    <Drawer
      width={640}
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
    >
        <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
        <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content={data.user.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Age" content={data.user.age} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="MSSV" content={data.user.mssv} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="tel" content={data.user.tel} />
            </Col>
          </Row>
          <Divider />
          <CheckInTable ID={data.user._id} />
    </Drawer>
  );
};

export default Profile;
