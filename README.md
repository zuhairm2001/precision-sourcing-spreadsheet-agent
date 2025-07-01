### Prerequisites

1. Python 3.12
2. pip install -r requirements.txt

### Setup

1. Create a .env file in the root directory of the project
2. Add the following variables to the .env file
    - OPENAI_API_KEY
    - SPREADSHEET_URL
3. Initialise the sqlite database by running db_init.py
4. Run the main.py file with uvicorn main:app --reload
5. Query the bot on the /chat endpoint with a POST request