
type ActiveMode = 'plan' | 'execute';

type Model = 'llama3-70b-8192'| 'deepseek-r1-distilled-llama-70b'| 'llama3-8b-8192';

type AssistantMessage = {
    message:string
}

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string | AssistantMessage;
}