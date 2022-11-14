import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CHANNELS_API } from './chat.constants';
import { Channel, ChannelData } from './use-channels.hook';

export const useCreateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (channel: Channel) => {
      const response = await fetch(CHANNELS_API, {
        method: 'POST',
        body: JSON.stringify(channel),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error Creating Channel: ${error.message}`);
      }

      const data: Channel = await response.json();

      return ChannelData.parse(data);
    },
    {
      onSettled: (): void => {
        queryClient.invalidateQueries(['channels']);
      },
    },
  );
};
