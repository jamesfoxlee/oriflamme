import { MessageType } from "../types/index";

type MessageMocks = {
  [key: string]: MessageType;
};

export const messageMocks: MessageMocks = {
  placeholder: {
    from: "",
    content: "",
    timestamp: "",
  },
  simple: {
    from: "be",
    content: "gl",
    timestamp: "2021-11-01T15:21:13.892Z",
  },
};

const messages: MessageType[] = [
  {
    from: "be",
    content: "gl",
    timestamp: "2021-11-01T15:21:13.892Z",
  },
  {
    from: "ch",
    content: "Ready?",
    timestamp: "2021-11-01T15:20:09.892Z",
  },
  {
    from: "be",
    content: "Yup  let's do this",
    timestamp: "2021-11-01T15:20:33.892Z",
  },
  {
    from: "al",
    content: "Yeah ready!",
    timestamp: "2021-11-01T15:20:43.892Z",
  },
  {
    from: "ch",
    content: "Hey, how's it going",
    timestamp: "2021-11-01T15:20:03.892Z",
  },
  {
    from: "ch",
    content: "Boom",
    timestamp: "2021-11-01T15:21:03.892Z",
  },
];
