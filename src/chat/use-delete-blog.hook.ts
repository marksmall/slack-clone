import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CHANNELS_API } from './chat.constants';
import { Channel } from './use-channels.hook';

export const useDeleteChannel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (channel: Channel) => {
      const response = await fetch(`${CHANNELS_API}/${channel.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error deleting Channel: ${channel.id}, Message: ${error.message}`);
      }
    },
    {
      onMutate: async ({ id }) => {
        // Cancel current queries for the channels
        await queryClient.cancelQueries(['channel', id]);
        await queryClient.cancelQueries(['channels']);

        // Get current channel
        const currentChannels = queryClient.getQueryData<Channel[]>(['channels']);

        // Optimistically delete channel
        queryClient.setQueryData<Channel[]>(['Channels'], oldChannels =>
          oldChannels?.filter((channel: Channel) => channel.id !== id),
        );

        // Return current list of channels, so we can rollback in case of failure.
        return { currentChannels };
      },
      onSettled: (): void => {
        // Invalidate and refetch all Channels.
        queryClient.invalidateQueries(['Channels']);
      },
      onError: (error, variables, context): void => {
        // Rollback to current list of blogs
        queryClient.setQueryData(['channels'], context?.currentChannels);
      },
    },
  );
};
