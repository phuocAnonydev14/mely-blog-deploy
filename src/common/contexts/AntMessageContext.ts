import { MessageInstance } from 'antd/es/message/interface';
import { createContext } from 'react';

export type AntMessageContextValue = MessageInstance;

const AntMessageContext = createContext<MessageInstance | null>(null);

export default AntMessageContext;
