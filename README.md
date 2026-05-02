# TRACIA Student Risk Predictor 🎓🛡️

A high-performance machine learning classifier designed to predict student risk levels using the **TRACIA Dataset**. This project leverages **Random Forest** for accurate classification and **SHAP (SHapley Additive exPlanations)** to provide transparent, interpretable insights into the model's decision-making process.

## 🚀 Overview
This tool helps educational institutions identify students who might be at risk based on various parameters such as GPA, attendance, LMS activity, and social interaction. Unlike typical "black-box" models, this project uses Explainable AI (XAI) to show exactly *why* a certain risk level was assigned.

## ✨ Key Features
- **Accurate Classification**: Achieving ~99.9% accuracy using Random Forest.
- **Explainable AI (SHAP)**: Visualizes feature importance and individual prediction logic.
- **Model Persistence**: Saves trained models to `.pkl` files for instant loading.
- **Interactive Prediction**: Built-in CLI tool to try predictions with custom manual input.
- **Professional Visualization**: Generates Confusion Matrix and SHAP summary plots automatically.

## 🛠️ Tech Stack
- **Language**: Python 3.x
- **Machine Learning**: Scikit-Learn
- **Interpretability**: SHAP
- **Data Handling**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/TRACIA-Student-Risk-Predictor.git
   cd TRACIA-Student-Risk-Predictor
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Usage

Run the main application to train/load the model and start interactive prediction:
```bash
python app.py
```

### Input Parameters:
The model requires the following features for prediction:
- Semester, GPA, Attendance
- Quiz Scores, Assignment Completion
- LMS Activity, Weekly Study Hours
- Social Interaction Score, Achievement Points
- Internship Points, Financial Support Score, Scholarship Status

## 📊 Results & Interpretation
- **Confusion Matrix**: Saved as `confusion_matrix.png` to evaluate model performance.
- **SHAP Summary Plot**: Saved as `shap_summary_plot.png`. This plot reveals which factors (like GPA or Attendance) are the primary drivers of student risk.

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Created for Hackathon Purposes - Empowering Education with AI.*
