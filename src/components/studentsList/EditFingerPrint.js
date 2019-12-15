import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button, Icon } from "antd";

const EditFingerPrint = () => {
  const [visible, setVisible] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <div>
      <a onClick={() => setVisible(true)}>vân tay</a>
      <Modal
        title="Sửa Vân tay"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            icon="poweroff"
            loading={loadingButton}
            onClick={() => setLoadingButton(true)}
          >
            Nhập vân tay
          </Button>
          {/* {loadingButton && <Icon type="check-circle" />} */}
          {/* <div>{!loading && data.postAdded}</div> */}
        </div>
      </Modal>
    </div>
  );
};

export default EditFingerPrint;
