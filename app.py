import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import shap
import os
import joblib

# Set aesthetic style
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams['figure.figsize'] = (10, 6)

MODEL_PATH = 'model/rf_model.pkl'
DATASET_PATH = 'dataset/DATASET_TRACIA_50K_FINAL - DATASET_TRACIA_50K_FINAL.csv'

def predict_interactive(model, feature_names):
    print("\n🔮 --- Prediction for New Data ---")
    print("Please enter the values for the following features:")
    input_data = {}
    for feature in feature_names:
        while True:
            try:
                val = input(f"Input {feature}: ")
                input_data[feature] = float(val)
                break
            except ValueError:
                print("❌ Invalid input. Please enter a numerical value.")
    
    # Create DataFrame for prediction
    new_df = pd.DataFrame([input_data])
    prediction = model.predict(new_df)[0]
    probability = model.predict_proba(new_df)[0]
    
    print("\n🎯 --- Prediction Results ---")
    status = "⚠️ HIGH RISK" if prediction == 1 else "✅ LOW RISK"
    color_code = "\033[91m" if prediction == 1 else "\033[92m"
    reset_code = "\033[0m"
    
    print(f"Prediction: {color_code}{status}{reset_code}")
    print(f"Probability: Low Risk ({probability[0]:.2%}), High Risk ({probability[1]:.2%})")

def main():
    print("🚀 Starting TRACIA Classification with Random Forest and SHAP...")
    
    # 1. Load Dataset (still needed for column names and SHAP if retraining)
    if not os.path.exists(DATASET_PATH):
        print(f"❌ Dataset not found at {DATASET_PATH}")
        return

    df = pd.read_csv(DATASET_PATH)
    if 'Student_ID' in df.columns:
        df = df.drop(columns=['Student_ID'])
    
    X = df.drop(columns=['Risk_Label'])
    y = df['Risk_Label']
    feature_names = X.columns.tolist()

    rf_model = None

    # 2. Load or Train Model
    if os.path.exists(MODEL_PATH):
        print(f"📦 Loading existing model from {MODEL_PATH}...")
        rf_model = joblib.load(MODEL_PATH)
    else:
        print("🌲 Model not found. Training new Random Forest Classifier...")
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        
        rf_model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        rf_model.fit(X_train, y_train)
        
        # Save Model
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        joblib.dump(rf_model, MODEL_PATH)
        print(f"💾 Model saved to {MODEL_PATH}")
        
        # Evaluation (only if retraining)
        print("\n📝 Model Evaluation:")
        y_pred = rf_model.predict(X_test)
        print(f"✅ Accuracy: {accuracy_score(y_test, y_pred):.4f}")
        
        # SHAP Explanation (only if retraining or requested)
        print("\n🔍 Generating SHAP explanations...")
        explainer = shap.TreeExplainer(rf_model)
        shap_values = explainer.shap_values(X_test)
        
        # Plotting
        plt.figure(figsize=(12, 8))
        if isinstance(shap_values, list):
            shap.summary_plot(shap_values[1], X_test, show=False)
        else:
            shap.summary_plot(shap_values, X_test, show=False)
        plt.title('SHAP Summary Plot', fontsize=16)
        plt.savefig('shap_summary_plot.png', dpi=300, bbox_inches='tight')
        print("💾 SHAP Summary Plot saved.")

    # 3. Interactive Prediction
    while True:
        predict_interactive(rf_model, feature_names)
        cont = input("\nDo you want to try another prediction? (y/n): ").lower()
        if cont != 'y':
            break

    print("\n✨ Process Completed Successfully!")

if __name__ == "__main__":
    main()
