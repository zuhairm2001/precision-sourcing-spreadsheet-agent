import sqlite3
from spreadsheet_agent import SpreadsheetAgent 
from schemas.chat_schemas import ChatResponse, ChatHistory, ChatHistoryList, ChatRequest


#Service handler to create response 
def generate_response(user_chat: str) -> ChatResponse:
    agent = SpreadsheetAgent()
    completed_chat = agent.complete_chat(user_chat) 
    
    # Extract the output message from the agent response
    agent_message = completed_chat.get('output', 'No response generated')
    
    return ChatResponse(message=agent_message)


#Service handler to return chat history
def get_chat_history() -> ChatHistoryList:
    try:
        conn = sqlite3.connect('chat_history.db')
        c = conn.cursor()
        
        # Get past chat history from db 
        c.execute('''
            SELECT user_message, user_timestamp, agent_message, agent_timestamp 
            FROM messages 
            ORDER BY user_timestamp DESC
        ''')
        
        rows = c.fetchall()
        conn.close()
        
        # Convert database rows to ChatHistory objects
        history_items = []
        for row in rows:
            user_msg, user_time, system_msg, system_time = row
            chat_item = ChatHistory(
                user_message=ChatRequest(message=user_msg),
                user_timestamp=user_time,
                agent_message=ChatResponse(message=system_msg),
                agent_timestamp=system_time
            )
            history_items.append(chat_item)
        
        return ChatHistoryList(
            history=history_items,
            total_count=len(history_items)
        )
        
    except sqlite3.Error as e:
        # Return empty history if database error occurs
        print("Error occurred whilst retreiving chat history: ", e)
        return ChatHistoryList(history=[], total_count=0)

