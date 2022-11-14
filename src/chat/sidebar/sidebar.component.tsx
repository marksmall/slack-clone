import React, { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const Sidebar: FC<Props> = ({ children }): ReactElement => {
  return <div className="h-full w-1/5">{children}</div>;
};

export default Sidebar;
