import streamlit as st
import pandas as pd
import random

# Load the CSV file
csv_file_path = '/Users/abjasser1/Desktop/csvtest/binbaz.csv'
df = pd.read_csv(csv_file_path)

# Function to get a random Fatwa
def get_random_fatwa():
    random_index = random.randint(0, len(df) - 1)
    selected_fatwa = df.iloc[random_index]
    return selected_fatwa

# Initialize session state for storing the current Fatwa if not already set
if 'current_fatwa' not in st.session_state:
    st.session_state['current_fatwa'] = get_random_fatwa()

# Display the current Fatwa
fatwa = st.session_state['current_fatwa']
st.markdown(f"<div class='fatwa-title'>{fatwa['title'].strip()}</div>", unsafe_allow_html=True)
st.markdown(f"<div class='fatwa-content'><strong>السؤال:</strong> {fatwa['question'].strip()}</div>", unsafe_allow_html=True)
st.markdown(f"<div class='fatwa-content'><strong>الجواب:</strong> {fatwa['Answers'].strip()}</div>", unsafe_allow_html=True)

# Apply custom CSS for text styling and colors
st.markdown(
    """
    <style>
    .fatwa-title {
        color: #4CAF50;  /* Green */
        text-align: center;
        font-family: 'Arial', sans-serif;
        font-size: 26px;
        font-weight: bold;
        margin-top: 20px;
    }

    .fatwa-content {
        color: #E91E63;  /* Pink */
        text-align: right;
        font-family: 'Arial', sans-serif;
        font-size: 20px;
        line-height: 1.6;
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 10px;
    }

    .stButton button {
        background-color: #4CAF50;  /* Green */
        color: white;
        padding: 10px 24px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        margin: 20px auto;
        display: block;
    }

    .stButton button:hover {
        background-color: #45a049;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Button to get another random Fatwa (positioned under the Fatwa)
if st.button('احصل على فتوى أخرى'):
    st.session_state['current_fatwa'] = get_random_fatwa()
    st.experimental_rerun()  # Forces the app to rerun immediately (if available in your version)
