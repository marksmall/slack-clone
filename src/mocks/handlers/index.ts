import accountHandlers from './accounts';
import appHandlers from './app';
import channelHandlers from './channels';

const handlers = [...appHandlers, ...accountHandlers, ...channelHandlers];

export default handlers;
