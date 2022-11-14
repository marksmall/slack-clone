import React, { FC, ReactElement, useState } from 'react';

import MessageForm, { MessageFormType } from './messages/message-form.component';
import MessageListItem from './messages/message-list-item.component';
import MessageList from './messages/message-list.component';
import ChannelList from './sidebar/channels/channel-list.component';
import DirectMessageList from './sidebar/direct-messages/direct-message-list.component';
import Sidebar from './sidebar/sidebar.component';

interface Message {
  id: number;
  room: string;
  author: string;
  content: string;
  datetime: Date;
}

const MESSAGES: Message[] = [
  { id: 1, room: 'Chat Room 1', author: 'mark', content: 'Message 1', datetime: new Date('2001-01-01T01:45:32') },
  { id: 2, room: 'Chat Room 2', author: 'kerry', content: 'Message 2', datetime: new Date('2005-05-05T05:27:16') },
  { id: 3, room: 'Chat Room 1', author: 'kerry', content: 'Message 3', datetime: new Date('2010-011-026T04:04:38') },
  { id: 4, room: 'Chat Room 2', author: 'mark', content: 'Message 4', datetime: new Date('2015-05-53T17:22:33') },
  { id: 5, room: 'Chat Room 1', author: 'mark', content: 'Message 5', datetime: new Date('2020-09-18T22:12:58') },
];

interface Props {
  children: ReactElement;
}

const Chat: FC<Props> = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);

  const onSubmit = (form: MessageFormType) => {
    console.log('Submitting message: ', form);
    if (form.message) {
      const messageData: Message = {
        id: 1,
        room: 'chat room',
        // room: chatDetails.room,
        author: 'Mark',
        // author: chatDetails.username,
        content: form.message,
        datetime: new Date(),
      };

      // await socket.emit('send-message', messageData);

      setMessages((list: Message[]) => [...list, messageData]);
    }
  };

  return (
    <div className="flex">
      <Sidebar>
        <>
          <ChannelList>
            {channels.map(channel => (
              <div>channel</div>
            ))}
          </ChannelList>

          <DirectMessageList>
            {directMessages.map(message => (
              <div>message</div>
            ))}
          </DirectMessageList>
        </>
      </Sidebar>

      <div className="flex h-full w-2/3 flex-col">
        <MessageList>
          <>
            {messages.map(message => (
              <MessageListItem key={message.id} message={message} />
            ))}
          </>
        </MessageList>
        <MessageForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Chat;
