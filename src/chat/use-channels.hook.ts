import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { CHANNELS_API } from './chat.constants';

export const ChannelData = z.object({
  id: z.number(),
  label: z.string(),
});
const Channels = z.array(ChannelData);

export type Channel = z.infer<typeof ChannelData>;

export const useChannels = () =>
  useQuery(
    ['channels'],
    async () => {
      const response = await fetch(CHANNELS_API);

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching channels: ${error.message}`);
      }

      const data: Channel = await response.json();

      return Channels.parse(data);
    },
    {
      keepPreviousData: true,
    },
  );
