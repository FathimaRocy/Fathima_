import React, { useState } from 'react';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);

  const addSchema = (value) => {
    if (value) {
      const selectedOption = availableOptions.find(option => option.value === value);
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableOptions(availableOptions.filter(option => option.value !== value));
    }
  };

  const handleSave = async () => {
    const schemaData = selectedSchemas.map(option => ({ [option.value]: option.label }));
    const payload = {
      segment_name: segmentName,
      schema: schemaData
    };

    try {
      await axios.post('https://webhook.site/YOUR_UNIQUE_URL', payload);
      alert('Data sent successfully');
    } catch (error) {
      alert('Failed to send data');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button
        onClick={() => setShowModal(true)}
        style={{
          fontSize: '18px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Save Segment
      </button>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '300px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                fontSize: '20px',
                cursor: 'pointer',
                background: 'none',
                border: 'none'
              }}
            >
              &times;
            </button>
            <h2>Save Segment</h2>
            <input
              type="text"
              placeholder="Segment Name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />

            <div style={{ marginTop: '10px' }}>
              {selectedSchemas.map((schema, index) => (
                <select
                  key={index}
                  value={schema.value}
                  onChange={(e) => addSchema(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                >
                  <option value="">{schema.label}</option>
                  {availableOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
              <select
                onChange={(e) => addSchema(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => addSchema('')}
                style={{
                  fontSize: '16px',
                  padding: '8px 12px',
                  color: '#fff',
                  backgroundColor: '#007bff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                + Add new schema
              </button>
            </div>

            <button
              onClick={handleSave}
              style={{
                fontSize: '16px',
                padding: '10px 20px',
                marginTop: '20px',
                color: '#fff',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
