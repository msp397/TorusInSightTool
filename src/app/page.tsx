"use client";
import App from "@/Datatable/App";
import ShowSpace from "@/Datatable/ShowSpace";
import React from "react";

import { signIn, useSession } from "next-auth/react";
import { ScrollShadow } from "@nextui-org/react";

interface Key {
  key: string;
  type: string;
}

export default function Home() {
  const [redisView, setRedisView] = React.useState<Key>({ key: "", type: "" });
  const [data, setData] = React.useState(null);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert("Please signed in to continue");
      signIn();
    },
  });

  return (
    <main className="flex w-full h-[93vh] mt-3">
      <div
        className={`${
          data
            ? "overflow-y-auto overflow-x-hidden px-2 w-3/4 resize-x max-w-3/4"
            : "w-full px-2"
        }`}
      >
        <ScrollShadow hideScrollBar className="w-full h-full">
          <App setRedisView={setRedisView} setData={setData} />
        </ScrollShadow>
      </div>
      {data && (
        <div
          className={` ${
            data
              ? "overflow-auto w-1/4 pl-2 mt-5 resize-x max-w-1/2 min-w-1/4"
              : null
          }`}
        >
          <ShowSpace
            data={data}
            setData={setData}
            selectedKey={redisView.key}
            selectedDataType={redisView.type}
          />
        </div>
      )}
    </main>
  );
}
