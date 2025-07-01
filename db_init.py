#We want to make a sqlite db to store the user message history
#Store user message, agent messages, date, time of messages, it will have an incrementing id as the primary key 
import sqlite3

def create_db():
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS messages
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_message TEXT,
                  agent_message TEXT,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_db()
