interface ChatProps {
    user: string;
    text: string;
  }
  
interface ChatResponseSteps {
  action_type: string;
  message: string;
}

interface ChatResponse {
  response_type: "work" | "text";
  responses: Record<string, ChatResponseSteps>;
}
