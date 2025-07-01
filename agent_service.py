from spreadsheet_agent import SpreadsheetAgent, ChatResponse


#Service handler to create response 
def generate_response(user_chat: str) -> ChatResponse:
    agent = SpreadsheetAgent()
    completed_chat = agent.complete_chat(user_chat) 
    
    # Extract the output message from the agent response
    agent_message = completed_chat.get('output', 'No response generated')
    
    return ChatResponse(message=agent_message)
