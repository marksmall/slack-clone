import { rest } from 'msw';

import { createChannel, deleteChannel, getChannel, getChannels, updateChannel } from '~/mocks/fixtures/channels';

const URL_PATH = '*/api/channels';

const getChannelsHandler = rest.get(URL_PATH, (req, res, ctx) => res(ctx.status(200), ctx.json(getChannels())));

const getChannelHandler = rest.get(`${URL_PATH}/:id`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getChannel(+req.params.id))),
);

const createChannelHandler = rest.post(URL_PATH, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(createChannel(req.json()))),
);

const updateChannelHandler = rest.put(`${URL_PATH}/:id`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(updateChannel(req.json())));
});

const deleteChannelHandler = rest.delete(`${URL_PATH}/:id`, (req, res, ctx) => {
  deleteChannel(+req.params.id);

  return res(ctx.status(200), ctx.json(getChannels()));

  // return res(ctx.status(405), ctx.json({ message: 'Something went wrong deleting channel' }));
});

const handlers = [
  getChannelsHandler,
  getChannelHandler,
  createChannelHandler,
  updateChannelHandler,
  deleteChannelHandler,
];

export default handlers;
