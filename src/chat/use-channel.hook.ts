import { useQuery } from '@tanstack/react-query';

import { CHANNELS_API } from './chat.constants';
import { Channel, ChannelData } from './use-channels.hook';

export const useChannel = (id: number) =>
  useQuery(
    ['Channel', id],
    async () => {
      const response = await fetch(`${CHANNELS_API}/${id}`);

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching channel for: ${id}, Message: ${error.message}`);
      }

      const data: Channel = await response.json();

      return ChannelData.parse(data);
    },
    {
      retry: 5,
    },
  );
