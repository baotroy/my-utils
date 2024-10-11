"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Input/Button";
import TextArea from "@/components/Input/TextArea";
import axios from "axios";
import InputDataDecoder from "ethereum-input-data-decoder";
import { Interface } from "ethers";
import { FC, useState } from "react";
import toast from "react-hot-toast";
interface UniversalCallDataDecoderProps {}
const UniversalCallDataDecoderComponent: FC<
UniversalCallDataDecoderProps
> = () => {
  // const [abi, setAbi] = useState("");
  const [inputData, setInputData] = useState("0x04e45aaf000000000000000000000000e4864c1a5c3d941ff973a489fe2167b1c51e8bf1000000000000000000000000acb5413c06c303f968df20e83851cb0465c946fc0000000000000000000000000000000000000000000000000000000000000bb80000000000000000000000000a936a3a1746f3a3fed69a3ea9f3604adc7d3e1f000000000000000000000000000000000000000000000000fa5af46b840c000000000000000000000000000000000000000000000000008d6d30ced0b0f840010000000000000000000000000000000000000000000000000000000000000000");
  const [output, setOutput] = useState("");
  const signatureDataApi = "https://api.openchain.xyz/signature-database/v1/lookup?function="


  const doDecode = () => {
    const funcName = inputData.substring(0, 10);
    axios.get(signatureDataApi + funcName).then((response) => {
      try {
        const funcRes = response.data.result.function[funcName][0].name
        console.log("🚀 ----------------------------------------------------------------------------🚀")
        console.log("🚀 ~ file: universal-call-data-decoder.tsx:25 ~ axios.get ~ funcRes:", funcRes)
        console.log("🚀 ----------------------------------------------------------------------------🚀")

        const functionName = funcRes.split("(")[0];
        console.log("🚀 --------------------------------------------------------------------------------------🚀")
        console.log("🚀 ~ file: universal-call-data-decoder.tsx:43 ~ axios.get ~ functionName:", functionName)
        console.log("🚀 --------------------------------------------------------------------------------------🚀")

        const iface = new Interface([`function ${funcRes}`]);
        const parsedData = iface.parseTransaction({ data: inputData });
        console.log(parsedData?.fragment?.inputs)

      } catch(e) {
        toast.error("Unable to decode data");
      }
    }).catch(() => {
      toast.error("Unable to decode data");
    });
       
    // if (inputData.trim() === "") {
    //   return;
    // }
    // try {
    //   const jsonAbi = JSON.parse(abi);
    //   const parsed = new InputDataDecoder(jsonAbi).decodeData(inputData);

    //   setOutput(JSON.stringify(parsed, null, 2));
    // } catch (e) {
    //   setOutput("");
    // }
  };
  return (
    <>
      <Breadcrumb pageName="" />
      <div className="flex w-full">
        <div className="w-1/3 mr-3">
          <label htmlFor="" className="text-sm">
            Input Data
          </label>
          <TextArea
            rows={5}
            additionalClass="w-full text-sm leading-4"
            onChange={(e) => setInputData(e.target.value)}
            value={inputData}
          />
        </div>
        
      </div>
      <div className="text-right mt-2">
        <Button label="Decode" handleOnClick={doDecode} />
      </div>
    </>
  );
};

export default UniversalCallDataDecoderComponent;
