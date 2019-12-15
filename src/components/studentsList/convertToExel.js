import React from "react";
import { CONVERT_TO_EXEL } from "./../../schema/mutation";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button,notification } from "antd";

const ConvertToExel = () => {
  const [convert] = useMutation(CONVERT_TO_EXEL);

  return (
    <Button
      onClick={() => {
        convert();
        notification.success({
            message: "chuyển đổi thành công"
          });
      }}
    >
      Convert to Exel
    </Button>
  );
};

export default ConvertToExel;
