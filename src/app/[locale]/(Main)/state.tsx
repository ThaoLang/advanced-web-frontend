import { nanoid } from "nanoid";
import { Socket } from "socket.io-client";
import { proxy, ref } from "valtio";
import { subscribeKey } from "valtio/utils";
import { MySocketIO } from "./socketio";

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
  notify: (message: string): void => {
    //test
    state.socket?.emit("notify", { message });
    state.socket?.emit("newMessage", { message });
    state.socket?.emit("sendMessage", { message });
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
