import { Channel } from '~/chat/useChannels';

let channels: Channel[] = [
  {
    id: 1,
    label: 'Blog 1',
  },
  {
    id: 2,
    label: 'Blog 2',
  },
  {
    id: 3,
    label: 'Blog 3',
  },
  {
    id: 4,
    label: 'Blog 4',
  },
  {
    id: 5,
    label: 'Blog 5',
  },
  {
    id: 6,
    label: 'Blog 6',
  },
  {
    id: 7,
    label: 'Blog 7',
  },
  {
    id: 8,
    label: 'Blog 8',
  },
  {
    id: 9,
    label: 'Blog 9',
  },
  {
    id: 10,
    label: 'Blog 10',
  },
  {
    id: 11,
    label: 'Blog 11',
  },
  {
    id: 12,
    label: 'Blog 12',
  },
];

const getChannels = (): Channel[] => channels;

const getChannel = (id: number): Channel | undefined => channels.find(channel => channel.id === id);

const createChannel = (channel: Channel): Channel => {
  const existingChannel = channels.find(existingChannel => existingChannel.id === channel.id);

  if (existingChannel) {
    throw new Error('Channel already exists');
  }

  const lastChannel = channels[channels.length - 1];

  channels.push({
    ...channel,
    id: lastChannel.id + 1,
  });

  return channels[channels.length - 1];
};

const updateChannel = (channel: Channel): Channel => {
  const existingChannel = channels.find(existingChannel => existingChannel.id === channel.id);

  if (!existingChannel) {
    throw new Error(`No Channel called ${channel.label} exists`);
  }

  channels = channels.map(existingChannel => (existingChannel.id === channel.id ? channel : existingChannel));

  return channel;
};

const deleteChannel = (id: number): void => {
  const existingChannel = channels.find(channel => channel.id === id);

  if (!existingChannel) {
    throw new Error(`No Channel with id ${id} exists`);
  }

  channels = channels.filter(channel => channel.id !== id);
};

export { getChannels, getChannel, createChannel, updateChannel, deleteChannel };
