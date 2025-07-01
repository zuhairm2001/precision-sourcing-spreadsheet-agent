#We want to make a sqlite db to store the user message history
#Store user message, agent messages, date, time of messages, it will have an incrementing id as the primary key 
import sqlite3


def table_exists(conn, table_name: str) -> bool:
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
    return c.fetchone() is not None

def create_db(conn):
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS messages
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_message TEXT,
                  agent_message TEXT,
                  user_timestamp DATETIME,
                  agent_timestamp DATETIME)''')
    conn.commit()

if __name__ == '__main__':
    print("Creating Databse")
    create_db()
