"use client";
import App from "@/Datatable/App";

// import { signIn, useSession } from "next-auth/react";

export default function Home() {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     alert("Please signed in to continue");
  //     signIn();
  //   },
  // });

  return (
    <main>
      <App />
    </main>
  );
}
