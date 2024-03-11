import React from "react";
import "react-json-view-lite/dist/index.css";
import { JSONTree } from "react-json-tree";
import {ScrollShadow} from "@nextui-org/react";

const ShowSpace = ({ data, selectedKey, selectedDataType }:any) => {



  const isEmptyObjectOrArray = (value : any) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
  
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length === 0;
    }
  
    return true; // Return true for non-object and non-array values
  };

  const lightTheme = {
    scheme: "light",
    author: "Your Name",
    base00: "#ffffff",
    // Background
    base01: "#f0f0f0",
    // Nested items background
    base02: "#d3d3d3",
    // Keys
    base03: "#757575",
    // Values
    base04: "#555555",
    // Strings, numbers, booleans
    base05: "#000000",
    // Objects, arrays
    base06: "#000000",
    // Functions
    base07: "#000000",
    // Undefined, null, error
    base08: "#e53935",
    // Object key highlight
    base09: "#3949ab",
    // Value numbers highlight
    base0A: "#00acc1",
    // Functions highlight
    base0B: "#8bc34a",
    // Arrays highlight
    base0C: "#ffeb3b",
    // Strings highlight
    base0D: "#64b5f6",
    // Key quotes
    base0E: "#aa00ff",
    // Template strings
    base0F: "#ff5722",
    // Regular expressions
  };
  const Key = selectedKey.split(":").join(": ");
  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <h2 className="text-center font-bold px-3 h-[5%] bg-gray-400 mb-5">
        {Key}
      </h2>
      {["list", "zset", "hash", "set", "stream"].includes(selectedDataType) ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Key
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map((key, value) => (
              <tr
                key={key as any}
                className=" border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{key as any}</td>
                <td className="px-6 py-4">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : selectedDataType == "string" ? (
        <>
          <h2 className="text-center font-bold text-gray-400">{data}</h2>
        </>
      ) : (
        <div className="w-full h-full box-border-2 shadow-lg p-5 mb-5 overflow-auto ">
        <ScrollShadow hideScrollBar className="w-full h-full" >
          {isEmptyObjectOrArray(data) ? (
            <p className="p-3">No data available</p>
          ) : (
            <JSONTree
              data={data}
              theme={lightTheme}
              hideRoot
            />
          )}
        </ScrollShadow>
      </div>
      )}
    </div>
  );
};

export default ShowSpace;
