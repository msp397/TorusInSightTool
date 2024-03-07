// import { getData } from "@/utilsFunctions/apiCallUnit";
// import React, { useEffect, useState } from "react";
// import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
// import "react-json-view-lite/dist/index.css";

// const ShowSpace = ({ selectedKey, selectedDataType }: any) => {
//   const [data, setData] = useState([]);

//   async function fetchData(Key: any, Type: any) {
//     const res = await getData(Key, Type);
//     console.log(res);

//     // setData(res);
//   }

//   useEffect(() => {
//     fetchData(selectedKey, selectedDataType);
//   }, [selectedKey]);
//   return (
//     <div className="flex">
//       <h2 className="text-center font-bold">{selectedKey}</h2>
//       {["list", "zset", "hash", "set", "stream"].includes(selectedDataType) ? (
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Key
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Value
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((key: any, value: any) => (
//               <tr
//                 key={key}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//               >
//                 <td className="px-6 py-4">{key}</td>
//                 <td className="px-6 py-4">{value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : selectedDataType == "string" ? (
//         <>
//           {/* <h2 className="text-center font-bold text-gray-400">{data}</h2> */}
//         </>
//       ) : // <JsonView
//       //   data={data}
//       //   shouldExpandNode={allExpanded}
//       //   style={darkStyles}
//       // />
//       null}
//     </div>
//   );
// };

// export default ShowSpace;

import React from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const ShowSpace = ({ data, selectedKey, selectedDataType }) => {
  const Key = selectedKey.split(":").join("> ")
  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <h2 className="text-center font-bold px-3 h-[5%] bg-gray-400">{Key}</h2>
      {["list", "zset", "hash", "set", "stream"].includes(selectedDataType) ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{key}</td>
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
        <JsonView
          data={data}
          shouldExpandNode={allExpanded}
          // style={darkStyles}
        />
      )}
    </div>
  );
};

export default ShowSpace;
