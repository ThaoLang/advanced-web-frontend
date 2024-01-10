"use client";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { AppState, AppActions } from "./state";

export const socketIOUrl = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}notification`;

interface MySocketIOProps {
  accessToken: string;
  state: AppState;
  actions: AppActions;
}

export const MySocketIO = (props: MySocketIOProps) => {
  // socket io notification
  try {
    // var connectionOptions = {
    //   "force new connection": true,
    //   reconnectionAttempts: "Infinity",
    //   timeout: 10000,
    //   transports: ["websocket", "polling", "flashsocket"],
    // };

    console.log("Trying to connect to server");

    const socket = io(socketIOUrl, {
      auth: { token: props.accessToken },
      transports: ["websocket", "polling", "flashsocket"],
      // reconnectionAttempts: 10,
      // timeout: 10000,
    });

    socket.on("connect", () => {
      console.log("[Inside] Is connected: " + socket.connected.toString());
      toast("Socket is connected!!");

      socket.on("returnNotification", (message: string) => {
        toast(
          <div>
            New notification! <br />
            <b>{message}</b>
          </div>
        );
      });
    });

    console.log("[Outside] Is connected: " + socket.connected.toString());
    console.log("Finished");
    return socket;
  } catch (err) {
    //
    return io();
  }
};
