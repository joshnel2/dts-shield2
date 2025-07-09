import React, { useState } from 'react';
import { encryptData, checkLLMRisk } from './shield';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [alert, setAlert] = useState('');
  const [insights] = useState([{ id: 1, item: 'Top Purchase', value: '$500' }]);

  const handleQuery = async () => {
    if (!query) return;
    const encrypted = encryptData(query);
    const risk = await checkLLMRisk(encrypted);
    setAlert(risk);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
        DTS Privacy Shield
      </h1>
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter customer query"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
        />
        <button
          onClick={handleQuery}
          style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Check Privacy
        </button>
        {alert && (
          <div
            style={{
              marginTop: '16px',
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: alert.includes('Unauthorized') ? '#fee2e2' : '#dcfce7',
              color: alert.includes('Unauthorized') ? '#b91c1c' : '#15803d',
            }}
          >
            {alert}
          </div>
        )}
        <h2 style={{ marginTop: '24px', fontSize: '18px', fontWeight: '600' }}>Secure Insights</h2>
        <table style={{ width: '100%', marginTop: '8px', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb' }}>
              <th style={{ padding: '8px' }}>Item</th>
              <th style={{ padding: '8px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((insight) => (
              <tr key={insight.id} style={{ borderTop: '1px solid #ccc' }}>
                <td style={{ padding: '8px' }}>{insight.item}</td>
                <td style={{ padding: '8px' }}>{insight.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
