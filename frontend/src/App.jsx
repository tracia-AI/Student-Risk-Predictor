import React, { useState } from 'react';
import axios from 'axios';
import logoImg from '/logo.png';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Semester: 1,
    Current_GPA: 3.5,
    GPA_Trend: 0.1,
    Attendance_Rate: 95,
    Credit_Accumulation_Velocity: 20,
    Failed_Course_Count: 0,
    Total_Credits_Completed: 20,
    Payment_Status: 'Paid',
    Average_Final_Score: 85,
    Highest_Final_Score: 90,
    Lowest_Final_Score: 80,
    Final_Score_Std: 5
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'Payment_Status' ? value : parseFloat(value)
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${baseUrl}/predict`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setPrediction({
        risk_level: response.data.risk_level,
        probability: response.data.dropout_risk_probability,
        prediction: response.data.prediction
      });
    } catch (err) {
      setError('Failed to connect to server. Ensure the FastAPI backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const riskMeta = {
    Low:    { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'Low',    badge: 'Stable' },
    Medium: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Medium', badge: 'Needs Attention' },
    High:   { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'High',   badge: 'At Risk' },
  };

  const fields = [
    { name: 'Semester',                   label: 'Semester',                    type: 'number', step: '1'    },
    { name: 'Current_GPA',                label: 'Current GPA',                 type: 'number', step: '0.01' },
    { name: 'GPA_Trend',                  label: 'GPA Trend',                   type: 'number', step: '0.01' },
    { name: 'Attendance_Rate',            label: 'Attendance (%)',              type: 'number', step: '0.1'  },
    { name: 'Credit_Accumulation_Velocity', label: 'Credit Velocity',             type: 'number', step: '0.01' },
    { name: 'Failed_Course_Count',        label: 'Failed Courses',              type: 'number', step: '1'    },
    { name: 'Total_Credits_Completed',    label: 'Total Credits',               type: 'number', step: '1'    },
    { name: 'Average_Final_Score',        label: 'Avg Score',                   type: 'number', step: '0.1'  },
    { name: 'Highest_Final_Score',        label: 'Highest Score',               type: 'number', step: '0.1'  },
    { name: 'Lowest_Final_Score',         label: 'Lowest Score',                type: 'number', step: '0.1'  },
    { name: 'Final_Score_Std',            label: 'Score Std Dev',               type: 'number', step: '0.01' },
  ];

  const meta = prediction ? riskMeta[prediction.risk_level] || riskMeta.Low : null;
  const pct  = prediction ? Math.round(prediction.probability * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafb', fontFamily: "'Roboto', 'Segoe UI', sans-serif" }}>

      {/* Top App Bar - Material style */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}>
        <img src={logoImg} alt="TRACIA" style={{ height: 36, width: 36, objectFit: 'contain' }} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1b5e20', letterSpacing: 0.2 }}>TRACIA Predictor</div>
          <div style={{ fontSize: 11, color: '#757575', fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}>Student Risk Intelligence</div>
        </div>
      </header>

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

        {/* ---- LEFT CARD: FORM ---- */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ background: '#2e7d32', padding: '20px 24px' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Student Profile</div>
            <div style={{ fontSize: 12, color: '#a5d6a7', marginTop: 2 }}>Enter the student's academic data below</div>
          </div>

          <form onSubmit={handlePredict} style={{ padding: '24px 24px 20px' }}>
            {/* 2-column grid for numeric fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {fields.map(f => (
                <div key={f.name} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#616161', marginBottom: 6, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    step={f.step}
                    value={formData[f.name]}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: 4,
                      fontSize: 14,
                      color: '#212121',
                      outline: 'none',
                      background: '#fafafa',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#2e7d32'}
                    onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              ))}
            </div>

            {/* Payment Status — full width */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#616161', marginBottom: 6, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Payment Status
              </label>
              <select
                name="Payment_Status"
                value={formData.Payment_Status}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  fontSize: 14,
                  color: '#212121',
                  background: '#fafafa',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Delayed">Delayed</option>
                <option value="Late">Late</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 4, padding: '10px 14px', marginBottom: 16, color: '#b91c1c', fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px 0',
                background: loading ? '#a5d6a7' : '#2e7d32',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 4px rgba(46,125,50,0.3)',
                transition: 'background 0.2s, box-shadow 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#1b5e20'; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#2e7d32'; }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Analyzing...
                </>
              ) : 'Analyze Dropout Risk'}
            </button>
          </form>
        </div>

        {/* ---- RIGHT CARD: RESULTS ---- */}
        <div>
          {!prediction && !loading && (
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '60px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>📋</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#424242', marginBottom: 8 }}>Ready for Analysis</div>
              <div style={{ fontSize: 13, color: '#9e9e9e', lineHeight: 1.6 }}>Fill in the student profile data on the left<br />and click the Analyze button to see prediction results.</div>
            </div>
          )}

          {loading && (
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '60px 32px', textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: '3px solid #e8f5e9', borderTop: '3px solid #2e7d32', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <div style={{ fontSize: 14, color: '#757575' }}>Querying AI model...</div>
            </div>
          )}

          {prediction && meta && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Main Result Card */}
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ background: meta.color, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>Prediction Result</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>{meta.label} Risk</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Dropout Probability</div>
                  </div>
                </div>

                <div style={{ padding: '20px 24px' }}>
                  {/* Progress Bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#757575', fontWeight: 500 }}>Risk Score</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{pct}%</span>
                    </div>
                    <div style={{ height: 8, background: '#f5f5f5', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: meta.color,
                        borderRadius: 4,
                        transition: 'width 1s ease'
                      }} />
                    </div>
                  </div>

                  {/* Status Chip */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 16, padding: '5px 14px' }}>
                    <div style={{ width: 8, height: 8, background: meta.color, borderRadius: '50%' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: meta.color }}>{meta.badge}</span>
                  </div>

                  <p style={{ margin: '16px 0 0', fontSize: 13, color: '#616161', lineHeight: 1.6 }}>
                    Based on the provided academic data, this student has a <strong style={{ color: '#212121' }}>{pct}%</strong> probability of dropping out.
                    {prediction.risk_level === 'High' && ' Immediate academic consultation and intervention are recommended.'}
                    {prediction.risk_level === 'Medium' && ' Closely monitor the student\'s academic progress.'}
                    {prediction.risk_level === 'Low' && ' This student shows strong academic stability.'}
                  </p>
                </div>
              </div>

              {/* Secondary Info Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Data Summary */}
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#2e7d32', marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase' }}>Data Summary</div>
                  {[
                    { label: 'GPA', val: formData.Current_GPA },
                    { label: 'Attendance', val: `${formData.Attendance_Rate}%` },
                    { label: 'Failed Courses', val: formData.Failed_Course_Count },
                    { label: 'Total Credits', val: formData.Total_Credits_Completed },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #f5f5f5' }}>
                      <span style={{ fontSize: 13, color: '#757575' }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#212121' }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#2e7d32', marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase' }}>Recommendations</div>
                  {prediction.risk_level === 'High' && (
                    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: '#424242', lineHeight: 1.8 }}>
                      <li>Immediate academic consultation</li>
                      <li>Review course workload</li>
                      <li>Evaluate payment status</li>
                    </ul>
                  )}
                  {prediction.risk_level === 'Medium' && (
                    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: '#424242', lineHeight: 1.8 }}>
                      <li>Monitor GPA trends regularly</li>
                      <li>Improve attendance rate</li>
                      <li>Provide academic coaching</li>
                    </ul>
                  )}
                  {prediction.risk_level === 'Low' && (
                    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: '#424242', lineHeight: 1.8 }}>
                      <li>Maintain academic performance</li>
                      <li>Continue monitoring progress</li>
                      <li>Encourage campus involvement</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '24px 0 32px', color: '#bdbdbd', fontSize: 12 }}>
        TRACIA Student Risk Predictor — Powered by XGBoost &amp; SHAP
      </footer>

      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          main { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
