from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn
import os

# 1. Load model/dropout_pipeline.pkl
MODEL_PATH = 'model/dropout_pipeline.pkl'

if not os.path.exists(MODEL_PATH):
    print(f"❌ Error: Model file {MODEL_PATH} not found. Please run training.py first.")
    pipeline = None
else:
    print(f"📦 Loading real trained model from {MODEL_PATH}...")
    pipeline = joblib.load(MODEL_PATH)

# 2. Gunakan FastAPI
app = FastAPI(title="Student Dropout Prediction API")

# Input Schema
class StudentData(BaseModel):
    Semester: int
    Current_GPA: float
    GPA_Trend: float
    Attendance_Rate: float
    Credit_Accumulation_Velocity: float
    Failed_Course_Count: int
    Total_Credits_Completed: int
    Payment_Status: str
    Average_Final_Score: float
    Highest_Final_Score: float
    Lowest_Final_Score: float
    Final_Score_Std: float

# 3. Endpoint GET /
@app.get("/")
def read_root():
    return {"status": "online", "message": "Real Dropout Prediction API"}

# 4. Endpoint POST /predict
@app.post("/predict")
def predict(data: StudentData):
    if pipeline is None:
        return {"error": "Model not loaded."}
    
    # Convert JSON to DataFrame
    input_df = pd.DataFrame([data.dict()])
    
    # 6. Prediksi menggunakan model PKL asli
    prediction_int = int(pipeline.predict(input_df)[0])
    
    # 7. Gunakan predict_proba()
    # probability kelas "Yes" (1)
    probability = float(pipeline.predict_proba(input_df)[0][1])
    
    prediction_label = "Yes" if prediction_int == 1 else "No"
    
    # 8. Buat Risk_Level
    if probability < 0.30:
        risk_level = "Low"
    elif probability < 0.70:
        risk_level = "Medium"
    else:
        risk_level = "High"
    
    # Output JSON
    return {
        "prediction": prediction_label,
        "dropout_risk_probability": round(probability, 2),
        "risk_level": risk_level
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
