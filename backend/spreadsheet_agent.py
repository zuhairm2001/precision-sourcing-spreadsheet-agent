#Delegating Schemas and core logic to this file in relation to spread sheet agent
from langchain.agents import AgentType
from langchain_openai import ChatOpenAI 
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent 
import pandas as pd
import os
import sqlite3
from datetime import datetime
from utility.db_init import table_exists, create_db
from dotenv import load_dotenv
from pydantic import BaseModel


class SpreadsheetAgent:

    def __init__(self) -> None:
        load_dotenv()
        df = pd.read_csv(os.getenv('SPREADSHEET_URL'))
        self.agent = create_pandas_dataframe_agent(
            ChatOpenAI(api_key=os.getenv('OPENAI_API_KEY'), temperature=0, model="gpt-4o"),
            df,
            verbose=True,
            agent_type=AgentType.OPENAI_FUNCTIONS,
            allow_dangerous_code=True
        )

    def complete_chat(self, user_chat: str) -> dict:
        #Takes in param of user_chat and reads the last 5 messages for any additional context and then chooses to answer using the langchain agent
        #take the user_chat and agent_chat parameters and take the current date and time at the time of calling this function to store them in the sqlite db.
        
        user_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        response_dict = self.agent.invoke(user_chat)
        agent_response = response_dict.get('output', '')
        agent_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        

        
        conn = sqlite3.connect('chat_history.db')

        if table_exists(conn, 'messages'):
            pass
        else:
            create_db(conn)

        c = conn.cursor()
        c.execute(
            "INSERT INTO messages (user_message, agent_message, user_timestamp, agent_timestamp) VALUES (?, ?, ?, ?)",
            (user_chat, agent_response, user_timestamp, agent_timestamp)
        )
        conn.commit()
        conn.close()

        return response_dict
