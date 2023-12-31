import { nanoid } from "nanoid";
import { Socket } from "socket.io-client";
import { proxy, ref } from "valtio";
import { subscribeKey } from "valtio/utils";
import { MySocketIO } from "./socketio";
import axios from "axios";
import { NotificationType } from "@/model/NotificationType";

type WsError = {
  type: string;
  message: string;
};

type WsErrorUnique = WsError & {
  id: string;
};

export type AppState = {
  //   isLoading: boolean;
  accessToken?: string;
  socket?: Socket;
  wsErrors: WsErrorUnique[];
};

const state = proxy<AppState>({
  //   isLoading: false,
  wsErrors: [],
});

const actions = {
  //   startLoading: (): void => {
  //     state.isLoading = true;
  //   },
  //   stopLoading: (): void => {
  //     state.isLoading = false;
  //   },
  setAccessToken: (token?: string): void => {
    state.accessToken = token;
  },
  initializeSocket: (accessToken: string): void => {
    if (!state.accessToken) {
      state.accessToken = accessToken;
    }

    if (!state.socket) {
      state.socket = ref(
        MySocketIO({
          accessToken,
          state,
          actions,
        })
      );

      return;
    }

    if (!state.socket.connected) {
      state.socket.connect();
      return;
    }

    // actions.stopLoading();
  },
  reset: (): void => {
    state.socket?.disconnect();
    state.accessToken = undefined;
    // state.isLoading = false;
    state.socket = undefined;
    state.wsErrors = [];
  },
  notify: (message: string, room: string): void => {
    //test
    state.socket?.emit("notify", { message, room });
    state.socket?.emit("newMessage", { message, room });
    state.socket?.emit("sendMessage", { message, room });
  },
  //notificationList
  sendNotification: async (
    accessToken: string,
    notification: NotificationType
  ) => {
    if (!state.accessToken) {
      state.accessToken = accessToken;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}notification/create`,
        {
          notification,
          // classId: notification.classId,
          // reviewId: notification.reviewId,
          // senderRole: notification.senderRole,
          // receiverIdList: notification.receiverIdList,
          // message: notification.message,
          // redirectUrl: notification.redirectUrl,
          // createdAt: notification.createdAt,
          // isRead: notification.isRead,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Notification response", response);

        let room = notification.classId;
        if (notification.reviewId) room = notification.reviewId;

        actions.notify(notification.message, room);
      })
      .catch((error) => {
        console.error("Error creating notification:", error);
      });
  },
  addWsError: (error: WsError): void => {
    state.wsErrors = [
      ...state.wsErrors,
      {
        ...error,
        id: nanoid(6),
      },
    ];
  },
  removeWsError: (id: string): void => {
    state.wsErrors = state.wsErrors.filter((error: any) => error.id !== id);
  },
};

subscribeKey(state, "accessToken", () => {
  if (state.accessToken) {
    localStorage.setItem("access_token", state.accessToken);
  }
});

export type AppActions = typeof actions;

export { state, actions };
