import Brain from "brain";
import { Board } from "classes";
import { CommandType } from "interfaces";

export default class Bot {
  private readonly brain = new Brain();
  private readonly board = new Board();

  response(data: string): string {
    return this.rawResponse(data);
  }

  rawResponse(data: string): CommandType {
    this.board.update(data);
    const response = this.brain.decide(this.board);

    return response;
  }

  printBoard() {
    console.log(this.board.toPrettyString());
  }
}
