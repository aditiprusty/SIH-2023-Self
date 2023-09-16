from flask import Flask, request, render_template
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

app = Flask(__name__)

# Load your career data from a CSV file (adjust the file path and column names)
df = pd.read_csv('skills.csv')

# Tokenize the text data using TF-IDF vectorization
tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X = tfidf_vectorizer.fit_transform(df['Skills'])
y = df['Recommended Career']

# Train a Random Forest classifier
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X, y)

# Serve static files (CSS)
app.static_folder = 'static'

# Define the root route to render the HTML form
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# Define an API endpoint for career recommendations
@app.route('/recommend', methods=['POST'])
def recommend_career():
    user_input = request.form  # Receive user input from the HTML form
    user_profile_text = create_user_profile(user_input)
    user_profile_vector = tfidf_vectorizer.transform([user_profile_text])
    predicted_probs = rf_classifier.predict_proba(user_profile_vector)
    
    # Get the top N predicted career paths
    num_paths = 3  # Adjust the number of desired career paths
    top_careers = [rf_classifier.classes_[i] for i in predicted_probs.argsort()[0][-num_paths:]][::-1]
    
    # Render the results.html template with the recommendations
    return render_template('results.html', recommendations=top_careers)

# Create a user profile text from user input
def create_user_profile(user_input):
    return f"Class/Grade: {user_input['Class/Grade']} " \
           f"Skills: {user_input['Skills']} " \
           f"Interests: {user_input['Interests']} " \
           f"Hobbies: {user_input['Hobbies']} " \
           f"Passion: {user_input['Passion']} " \
           f"Favourite Subject: {user_input['Favourite Subject']}"

# Route to display career details when clicked
@app.route('/career/<career_name>', methods=['GET'])
def display_career_details(career_name):
    # Retrieve career details from the dataset
    career_details = df[df['Recommended Career'] == career_name].iloc[0]
    
    # Render the career details template with the data
    return render_template('career_template.html',
                           career=career_name,
                           salary=career_details['Salary'],
                           job_description=career_details['Job Description'],
                           job_security=career_details['Job Security'])

if __name__ == '__main__':
    app.run(debug=True)
