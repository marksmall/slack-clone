import React, { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const MessageList: FC<Props> = ({ children }): ReactElement => {
  return <div className="h-1/2">{children}</div>;
};

export default MessageList;