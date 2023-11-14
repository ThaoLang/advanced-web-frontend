import Image from "next/image";
import styles from "./page.module.css";
import { UserProvider } from "@/context/UserContext";

export default function Home() {
  const line = `test${process.env.DB_HOST}`;
  return (
    <UserProvider>
      <div className="text-center underline">
        <h1>
          The value of customKey is: {process.env.DB_HOST} {line}
        </h1>
      </div>
    </UserProvider>
    // <div className="text-center underline">
    //   <h1>
    //     The value of customKey is: {process.env.DB_HOST} {line}
    //   </h1>
    // </div>
  );
}
