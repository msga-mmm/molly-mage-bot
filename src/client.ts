import { debuglog } from "util";
import Bot from "bot";

const debug = debuglog("client-all");

export default class Client {
  private readonly bot: Bot = new Bot();
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint
      .replace("http", "ws")
      .replace("board/player/", "ws?user=")
      .replace("?code=", "&code=");
  }

  connect() {
    const socket = new WebSocket(this.endpoint);

    socket.addEventListener("open", () => {
      debug("[open] Connection established");
      debug("Sending to server");
    });

    socket.onmessage = (event) => {
      debug(`[message] Data received: ${event.data}`);

      // Get board content: "board=..." => "..."
      const board_string = event.data;
      const board_vector = board_string.split("=")[1];

      const response = this.bot.response(board_vector);

      socket.send(response);

      debug(`[message] Data sended: ${response}`);
    };

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        debug(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        debug(`[close] Connection died ${event.code}`);
      }
    });

    socket.onerror = function (error) {
      debug(`[error] ${error}`);
    };
  }
}
