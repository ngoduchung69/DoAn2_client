import React, { useState, useEffect } from "react";
import HanhTable from "./HanhTable";
import { SUBSCRIPTION } from "../../schema/subscription";
import { FIND_USER } from "../../schema/query";
import {
  useMutation,
  useSubscription,
  useQuery,
  useLazyQuery,
} from "@apollo/react-hooks";
import HanhSignUp from "./HanhSignUp";
import { notification } from "antd";

const Hanh = () => {
  const [tableData, setTableData] = useState([{}]);
  const [
    displayContentWhenAddFinger,
    setDisplayContentWhenAddFinger,
  ] = useState();

  const [findUser, { loading, data }] = useLazyQuery(FIND_USER);

  const { data2, loading2 } = useSubscription(SUBSCRIPTION, {
    onSubscriptionData: (data1) => {
      let jsonString = data1.subscriptionData.data.postAdded;
      console.log(jsonString);
      let content = jsonString.replace(/'/g, '"');
      let a = JSON.parse(content);
      // console.log(a.value);
      // setValue(a.value)
      if (a.type === "add finger") {
        setDisplayContentWhenAddFinger(a.description);
      } else {
        findUser({ variables: { fingerId: a.fingerId } });
        notification["success"]({
          message: "Notification Title",
          description: "",
        });
      }
    },
  });
  useEffect(() => {
    if (data) {
      let array = tableData;
      let array1 = null;
      let x;
      for (x = 0; x < array.length; x++) {
        if (data.findUser.fingerId == array[x]["fingerId"]) {
          array1 = array.splice(x, 1);
        }
      }
      console.log("x", x);
      if (array1 === null) {
        array.push(data.findUser);
        setTableData([...array]);
        console.log("array", array);
      } else {
        setTableData([...array]);
        console.log("array", array);
      }
    }
  }, [data]);
  {
    console.log("rerender");
  }
  return (
    <div>
      <HanhSignUp displayContent={displayContentWhenAddFinger} />

      <HanhTable tableData={tableData} />
    </div>
  );
};

export default Hanh;
