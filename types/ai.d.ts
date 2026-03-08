
export type ActiveMode = 'plan' | 'execute';

export type Model = 'llama3-70b-8192'| 'deepseek-r1-distilled-llama-70b'| 'llama3-8b-8192';

export type Action ={
  id:string,
  description:string,
  command:string,
}

export type Plan = {
  actions: Action []
}

export type Message = {
  id?: string;
  role: 'user' | 'assistant';
  text: string;
  plan?: Plan ;
}

export type ChatContextType = {
  chat: Message[],
  addChat: (chatMessage:Message)=>void,
  clearChat: ()=>void,
  restoreChatPoint: (id:string)=>void
}
