# Student Dropout Prediction (Advanced ML Edition) 🎓🚀

**Student Dropout Prediction** adalah solusi Machine Learning mutakhir yang dikembangkan untuk mengidentifikasi dan menganalisis risiko dropout mahasiswa. Proyek ini menggunakan algoritma **XGBoost** yang dioptimalkan secara otomatis menggunakan **Optuna**, serta integrasi **SHAP** untuk transparansi model (Explainable AI).

Tujuan utamanya adalah menyediakan alat proaktif bagi institusi pendidikan untuk memprediksi risiko sekaligus memahami faktor penyebabnya, sehingga intervensi dapat dilakukan tepat sasaran.

---

## ✨ Fitur Utama
- **Extreme Accuracy**: Menggunakan **XGBoost** yang dioptimalkan oleh **Optuna** untuk mencapai akurasi maksimal (~99.99%).
- **Auto-Tuning**: Pencarian hyperparameter otomatis (learning rate, depth, dll.) untuk performa terbaik.
- **Explainable AI (XAI)**: Menggunakan **SHAP Summary Plot** untuk membedah bagaimana fitur seperti GPA atau kehadiran memengaruhi risiko.
- **Data Export**: Secara otomatis mengekspor dataset yang telah di-preprocess ke format CSV untuk analisis lebih lanjut.
- **Single Pipeline Persistence**: Menyimpan seluruh proses (Preprocessing + XGBoost) ke dalam satu file `.pkl`.
- **FastAPI Integration**: Siap digunakan sebagai layanan API untuk prediksi real-time.

## 🛠️ Tech Stack
- **AI/ML**: Python 3.x, Scikit-Learn, XGBoost
- **Optimization**: Optuna
- **Explainability**: SHAP (TreeExplainer)
- **Data Ops**: Pandas, NumPy, Joblib
- **Visualization**: Matplotlib, Seaborn
- **Backend**: FastAPI & Uvicorn

---

## 📦 Instalasi & Setup

Clone repositori dan masuk ke folder proyek:
```bash
git clone https://github.com/tracia-AI/Student-Risk-Predictor.git
cd Student-Risk-Predictor/notebook
```

### 🍎 MAC OS / 🐧 LINUX
1. **Buat Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. **Install Dependensi**:
   ```bash
   pip install -r requirements.txt
   ```

### 💻 WINDOWS
1. **Buat Virtual Environment**:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
2. **Install Dependensi**:
   ```powershell
   pip install -r requirements.txt
   ```

---

## 🚀 Cara Menjalankan

### 1. Pelatihan & Optimasi (training.py)
Jalankan skrip ini untuk melakukan tuning otomatis, melatih model, dan mengekspor data.
```bash
python training.py
```
**Output:**
- `model/dropout_pipeline.pkl`: Pipeline model akhir.
- `model/shap_summary.png`: Visualisasi pengaruh fitur.
- `../dataset/student_dropout_prediction_after_preprocessing.csv`: Dataset hasil preprocessing.

### 2. Menjalankan API (app.py)
Gunakan uvicorn untuk menjalankan server API.
```bash
uvicorn app:app --reload
```

---

## 📊 Insight & Visualisasi
Setelah menjalankan pelatihan, Anda akan mendapatkan:
1. **Metrik Performa**: Laporan akurasi, F1-Score, dan ROC-AUC yang sangat mendetail.
2. **SHAP Insight**: Peta pengaruh fitur yang menunjukkan secara visual mengapa seorang mahasiswa diprediksi berisiko (misalnya: gagal mata kuliah atau tren IPK menurun).

## 📝 Lisensi
Proyek ini dilisensikan di bawah MIT License.

---
*Dikembangkan untuk Analytics Pendidikan Lanjut - Tim TRACIA AI.*
