import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                             f1_score, confusion_matrix, roc_auc_score)

def main():
    # 1. Load dataset
    dataset_path = 'dataset/student_dropout_prediction_dataset.csv'
    if not os.path.exists(dataset_path):
        print(f"❌ Error: Dataset not found at {dataset_path}")
        return
    
    print(f"📂 Loading real dataset from {dataset_path}...")
    df = pd.read_csv(dataset_path)

    # 2. Cek missing values
    if df.isnull().values.any():
        print("⚠️ Warning: Missing values detected. Filling with 0.")
        df = df.fillna(0)

    # 3. Pisahkan X dan y
    # Student_ID di-drop sesuai aturan
    X = df.drop(columns=['Student_ID', 'Dropout_Label'])
    y = df['Dropout_Label'].map({'Yes': 1, 'No': 0})

    # 4. Buat preprocessing transformer
    categorical_features = ['Payment_Status']
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ],
        remainder='passthrough' # Numeric columns tetap ada
    )

    # 5. Buat sklearn Pipeline (Preprocessing + Model)
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(
            n_estimators=100, 
            class_weight='balanced', 
            random_state=42, 
            n_jobs=-1
        ))
    ])

    # 6. Split dataset (80:20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 7. Train pipeline
    print("🌲 Training Random Forest pipeline (this is a real training process)...")
    pipeline.fit(X_train, y_train)

    # 8. Evaluasi model
    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]

    print("\n📊 --- Model Evaluation Results ---")
    print(f"Accuracy  : {accuracy_score(y_test, y_pred):.4f}")
    print(f"Precision : {precision_score(y_test, y_pred):.4f}")
    print(f"Recall    : {recall_score(y_test, y_pred):.4f}")
    print(f"F1-Score  : {f1_score(y_test, y_pred):.4f}")
    print(f"ROC-AUC   : {roc_auc_score(y_test, y_prob):.4f}")

    # 9. Simpan pipeline asli
    if not os.path.exists('model'):
        os.makedirs('model')
    
    model_file = 'model/dropout_pipeline.pkl'
    joblib.dump(pipeline, model_file)
    print(f"\n✅ Real trained pipeline saved successfully to {model_file}")

    # 10. Verifikasi: Load ulang dan test prediksi
    print("🔍 Verifying saved model...")
    loaded_pipeline = joblib.load(model_file)
    
    # Test data (Baris pertama dari X_test)
    test_sample = X_test.iloc[[0]]
    test_pred = loaded_pipeline.predict(test_sample)[0]
    test_prob = loaded_pipeline.predict_proba(test_sample)[0][1]
    
    print(f"Test Prediction Success!")
    print(f"Sample Prediction: {test_pred}, Probability: {test_prob:.2f}")
    print("\n✨ Real trained pipeline saved successfully")

if __name__ == "__main__":
    main()
