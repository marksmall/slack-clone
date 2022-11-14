import React, { FC, ReactElement, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const MessageFormSchema = z.object({
  message: z.string(),
});

export type MessageFormType = z.infer<typeof MessageFormSchema>;

interface Props {
  onSubmit: (form: MessageFormType) => void;
}

const MessageForm: FC<Props> = ({ onSubmit }): ReactElement => {
  const [message, setMessage] = useState<string>('');

  const { register, handleSubmit } = useForm<MessageFormType>({
    resolver: zodResolver(MessageFormSchema),
  });

  const handleFormSubmit: SubmitHandler<MessageFormType> = (form: MessageFormType) => {
    console.log('Submitting Message Form: ', form);
    onSubmit(form);
    setMessage('');
  };

  return (
    <form className="flex w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        type="text"
        {...register('message')}
        className="w-full border-2 border-gray-500 text-black"
        placeholder="Enter Message..."
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' && onSubmit({ message })}
      />

      <button
        className="rounded-r-md bg-gray-500 p-2 text-gray-900 hover:bg-green-900 hover:text-white active:bg-blue-500 active:text-gray-900 disabled:cursor-not-allowed disabled:opacity-75"
        type="submit"
      >
        &#9658;
      </button>
    </form>
  );
};

export default MessageForm;
