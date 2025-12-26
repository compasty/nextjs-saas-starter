import { getMessages } from 'next-intl/server';

export default async function requestConfig() {
  const messages = await getMessages();
  
  return {
    messages,
  };
}
