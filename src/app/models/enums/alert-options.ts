import { MessageType, Position } from "./swal-eunms";

export class AlertOptions {
    messageType: MessageType;
    position: Position;
    delay: number;
    hasProgress: boolean;
    hasConfirmButton: boolean;
    html: string;
  }

