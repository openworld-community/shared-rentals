import { useEffect, useState } from 'react';
import './App.css';

const REQUEST_URL = `${import.meta.env.VITE_API_PREFIX}/status`;

function App() {
  const [appInfo, setAppInfo] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = async () => {
    fetch(REQUEST_URL, { method: 'PUT' }).then((res) => {
      res.json().then((data) => {
        setAppInfo(data);
      });
    });
  };

  useEffect(() => {
    if (appInfo || loading) return;

    setLoading(true);
    fetch(REQUEST_URL, {
      method: 'GET',
    }).then((response) => {
      setLoading(false);
      if (response.ok) {
        response.json().then((data) => {
          setAppInfo(data);
        });
      }
    });
  }, [loading, appInfo]);

  return (
    <div className="App">
      <div>
        <a
          href="https://peredelanostartups.notion.site/Peredelano-Shared-Rentals-c1589d0baba340508e02065b73031013"
          target="_blank"
          rel="noopener noreferrer"
        >
          <big>🏠</big>
        </a>
      </div>
      <h1>Shared Rentals</h1>
      <div className="card">
        <button onClick={() => makeRequest()}>Make Request!</button>
        <p>App info: {loading ? 'loading...' : JSON.stringify(appInfo)}</p>
      </div>
      <p className="read-the-docs">Click on the house logo to learn more</p>
    </div>
  );
}

export default App;
