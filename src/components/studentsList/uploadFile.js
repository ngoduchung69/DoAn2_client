import React from "react";
import { Mutation } from "react-apollo";
import { UPLOAD_FILE } from "./../../schema/mutation";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Dropzone from "react-dropzone";
import { UsersQuery, StudentsQuery } from "./../../schema/query";
import XLSX from "xlsx";
import { AddUserMutation } from "../../schema/mutation";
import { Upload, message, Button, Icon } from "antd";
import "antd/dist/antd.css";
import './../../App.css';
const excelToJson = require("convert-excel-to-json");

const UploadFile = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [addUser] = useMutation(AddUserMutation);
  return (
    // <input
    //     type="file"
    //     required
    //     onChange={({
    //       target: {
    //         validity,
    //         files: [file]
    //       }
    //     }) => validity.valid && uploadFile({ variables: { file } })
    //   }
    //   />


    <div className="upload-btn-wrapper"> 
      <button className="btn">upload a file</button>
      <input
        type="file"
        name="myfile"
        required
        accept=".xlsx" // chỉ chấp nhận file xlsx
        onChange={e => {
          console.log(e);
          e.stopPropagation();
          e.preventDefault();
          
          var files = e.target.files,
            f = files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: "array" });
            var first_sheet_name = workbook.SheetNames[0];
            var address_of_cell = "A1";

            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            const studentsJSON = XLSX.utils.sheet_to_json(worksheet);
            for (var x of studentsJSON) {
              addUser({
                variables: {
                  name: x.name,
                  mssv: x.mssv,
                  role: false,
                  age: x.age,
                  tel: x.tel
                }
              });
            }
            /* DO SOMETHING WITH workbook HERE */
          };
          reader.readAsArrayBuffer(f);
          window.location.reload();
        }}
      />
    </div>
    
    // <Mutation mutation={UPLOAD_FILE}>
    //   {mutate => (
    //     <Dropzone onDrop={([file]) => mutate({ variables: { file } })}>
    //       drop here
    //     </Dropzone>
    //   )}
    // </Mutation>
  );
};

export default UploadFile;
