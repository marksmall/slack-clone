import { QueryClient, useMutation } from '@tanstack/react-query';

import { CHANNELS_API } from './chat.constants';
import { Channel, ChannelData } from './use-channels.hook';

const queryClient = new QueryClient();

export const useUpdateChannel = () => {
  return useMutation(
    async (channel: Channel) => {
      const response = await fetch(`${CHANNELS_API}/${channel.id}`, {
        method: 'PUT',
        body: JSON.stringify(channel),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error updating Channel: ${channel.id}, Message: ${error.message}`);
      }

      const data: Channel = await response.json();

      return ChannelData.parse(data);
    },
    {
      onMutate: async channel => {
        // Cancel current queries for the channels
        await queryClient.cancelQueries(['channel', channel.id]);
        await queryClient.cancelQueries(['channels']);

        // Get current channel
        const currentChannel = queryClient.getQueryData<Channel[]>(['channel', channel.id]);

        // Optimistically update channel
        queryClient.setQueryData<Channel>(['channel', channel.id], () => ({
          ...channel,
        }));

        // Return current channel, so we can rollback in case of failure.
        return { currentChannel };
      },
      onSettled: (channel: Channel | undefined): void => {
        queryClient.invalidateQueries(['channel', channel?.id]);
      },
      onError: (error, variables, context): void => {
        // Rollback to current channel
        queryClient.setQueryData(['channel', context?.currentChannel?.id], context?.currentChannel);
      },
    },
  );
};
