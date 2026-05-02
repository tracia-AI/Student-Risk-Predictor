# TRACIA Student Risk Predictor 🎓🛡️

**TRACIA Student Risk Predictor** is a sophisticated machine learning solution developed to identify and analyze student risk levels. Built using the **TRACIA Dataset**, this project integrates the power of the **Random Forest** algorithm with the transparency of **SHAP (SHapley Additive exPlanations)**.

The primary goal is to provide educational institutions with a proactive tool that doesn't just predict risks, but also explains the underlying factors—enabling data-driven interventions to improve student retention and success.

---

## ✨ Key Features
- **High-Fidelity Classification**: Achieving near-perfect accuracy (~99.9%) on the TRACIA 50K dataset.
- **XAI (Explainable AI)**: Uses SHAP summary plots to decode "black-box" decisions.
- **Model Persistence**: Efficient save/load system for trained models using `.pkl`.
- **Interactive CLI**: Real-time prediction tool for manual data testing.
- **Automated Reporting**: Generates confusion matrices and feature importance visualizations.

## 🛠️ Tech Stack
- **Core**: Python 3.x, Scikit-Learn
- **Explainability**: SHAP (TreeExplainer)
- **Data & Ops**: Pandas, NumPy, Joblib
- **Visualization**: Matplotlib, Seaborn

---

## 📦 Installation & Setup

First, clone the repository to your local machine:
```bash
git clone https://github.com/tracia-AI/Student-Risk-Predictor.git
cd Student-Risk-Predictor
```

### 💻 WINDOWS
1. **Create Virtual Environment**:
   ```powershell
   python -m venv venv
   ```
2. **Activate Environment**:
   ```powershell
   .\venv\Scripts\activate
   ```
3. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

### 🍎 MAC OS
1. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv
   ```
2. **Activate Environment**:
   ```bash
   source venv/bin/activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### 🐧 LINUX (UBUNTU)
1. **Install Prerequisites**:
   ```bash
   sudo apt update
   sudo apt install python3-venv python3-pip
   ```
2. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv
   ```
3. **Activate Environment**:
   ```bash
   source venv/bin/activate
   ```
4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Running the Application

### 💻 WINDOWS
```powershell
python app.py
```

### 🍎 MAC OS / 🐧 LINUX
```bash
python3 app.py
```

---

## 📊 Evaluation & Insight
Upon running, the application provides:
1. **Performance Metrics**: Detailed classification report (Precision, Recall, F1-Score).
2. **`confusion_matrix.png`**: Visual breakdown of correct vs. incorrect predictions.
3. **`shap_summary_plot.png`**: Comprehensive map of how features (like GPA, Attendance, LMS activity) impact the risk score.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Developed by the TRACIA AI Team for Advanced Educational Analytics.*
