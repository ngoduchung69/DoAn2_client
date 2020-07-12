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
  const [tableData, setTableData] = useState([]);
  const [temp,setTemp] = useState()
  const [counter, setCounter] = useState(1);
  const [
    displayContentWhenAddFinger,
    setDisplayContentWhenAddFinger,
  ] = useState();

  const [findUser, { loading, data }] = useLazyQuery(FIND_USER, {
    onCompleted: (dulieu) => {
      setCounter((counter) => counter + 1);
      console.log('oncompleted',counter)
    },
  });

  const { data2, loading2 } = useSubscription(SUBSCRIPTION, {
    onSubscriptionData: (data1) => {
      let jsonString = data1.subscriptionData.data.postAdded;
      console.log(jsonString);
      let content = jsonString.replace(/'/g, '"');
      console.log("content", content);
      let a = JSON.parse(content);
      // console.log(a.value);
      // setValue(a.value)
      console.log(a);
      
      if (a.type == "add ID") {
        setDisplayContentWhenAddFinger(a.value);
      } else if (a.type === "GetIn") {
        setTemp(a.temp)
        findUser({ variables: { fingerId: a.fingerId } });
      }
    },
  });
  useEffect(() => {
    console.log("data useEffect", data);
    if (data) {
      let array = tableData;
      let array1 = null;
      let x;
      if (array.length >= 1) {
        for (x = 0; x < array.length; x++) {
          if (data.findUser.fingerId == array[x]["fingerId"]) {
            array1 = array.splice(x, 1);
          }
        }
      }

      console.log("x", x);
      if (array1 === null) {
        let d = new Date()
        
        array.push({...data.findUser,temp:temp,time:d.toString()});
        console.log({...data.findUser,temp:temp,time:d.toString()})
        setTableData([...array]);
        notification["success"]({
          message: `${data.findUser.name} get in`,
        });
      } else {
        setTableData([...array]);
        notification["error"]({
          message: `${data.findUser.name} get out`,
        });
      }
    }
  }, [counter]);
  {
    console.log("rerender");
  }
  return (
    <div>
      <HanhSignUp
        setDisplayContent={setDisplayContentWhenAddFinger}
        displayContent={displayContentWhenAddFinger}
      />

      <HanhTable tableData={tableData} />
    </div>
  );
};

export default Hanh;
