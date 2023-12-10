import { ChatPreview } from '../../components/chat-preview';

export const chats = [
  new ChatPreview({ id: 'one', icon: '', name: 'Андрей', lastMessage: 'Изображение' }),
  new ChatPreview({
    id: 'two',
    icon: '',
    name: 'Киноклуб',
    lastMessage: 'Тут очень интересный текст, который непременно нужно прочитать',
  }),
];
