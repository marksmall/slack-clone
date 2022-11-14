import React, { FC, ReactElement } from 'react';

interface MessageItem {
  id: number;
  content: string;
}

interface Props {
  message: MessageItem;
}

const MessageListItem: FC<Props> = ({ message }): ReactElement => (
  <div className="grid h-20 w-32 place-content-center rounded">{message.content}</div>
);

export default MessageListItem;
