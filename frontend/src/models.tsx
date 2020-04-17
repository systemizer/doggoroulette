export interface Chat {
  message: string;
  username: string;
  image: string;
}

export interface Chatroom {
  id: number;
}

export interface ChatroomParams {
  id: string;
}

export interface Entry {
  images: {
    original: {
      url: string;
    };
  };
}

export interface WebSocketData {
  type: string;
  payload: any;
}
