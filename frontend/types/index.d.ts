interface ChatProps {
    user: string;
    text: string;
  }
  
interface ChatResponseSteps {
  action_type: "SEARCH" | "RESEARCH" | "CREATE" | "INSERT" | "PREPARE" | "DELETE" | "RUN";
  message: string;
}

interface ChatResponse {
  response_type: "work" | "text";
  responses: Record<string, ChatResponseSteps>;
}
