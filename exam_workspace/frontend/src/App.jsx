import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/crud';

function App() {
  const [centers, setCenters] = useState([]);
  const [formData, setFormData] = useState({
    siteName: '',
    location: '',
    roomCount: '',
    open: false,
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Show temporary alert banner
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  // 1. Get all centers
  const fetchCenters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/DisplayAll`);
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const data = await response.json();
      setCenters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching centers:', error);
      showAlert('Failed to connect to backend server. Make sure CrudService is running on port 8081.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 2. Add center
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.siteName.trim()) {
      showAlert('Please enter a site name.', 'error');
      return;
    }
    if (!formData.location.trim()) {
      showAlert('Please enter a location.', 'error');
      return;
    }
    if (formData.roomCount === '' || Number(formData.roomCount) < 0) {
      showAlert('Please enter a valid room count.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        siteName: formData.siteName.trim(),
        location: formData.location.trim(),
        roomCount: parseInt(formData.roomCount, 10),
        open: formData.open,
      };

      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errMsg = `Error ${response.status}: Failed to add center`;
        try {
          const errData = await response.json();
          if (errData?.message) errMsg = `${errMsg} - ${errData.message}`;
        } catch (_) {}
        throw new Error(errMsg);
      }

      showAlert('Community center added successfully!', 'success');
      setFormData({
        siteName: '',
        location: '',
        roomCount: '',
        open: false,
      });
      fetchCenters();
    } catch (error) {
      console.error('Error adding center:', error);
      showAlert(error.message || 'Failed to add community center. Please check backend connection.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Delete center by ID
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/Delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errMsg = `Error ${response.status}: Failed to delete center`;
        try {
          const errData = await response.json();
          if (errData?.message) errMsg = `${errMsg} - ${errData.message}`;
        } catch (_) {}
        throw new Error(errMsg);
      }

      showAlert('Community center deleted successfully!', 'success');
      fetchCenters();
    } catch (error) {
      console.error('Error deleting center:', error);
      showAlert(error.message || 'Failed to delete community center.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      {/* Header Bar */}
      <div className="header-bar">
        Community Center Management
      </div>

      <div className="content-body">
        {/* Alert Notification */}
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {/* Add Community Center Form */}
        <div className="form-card">
          <h2 className="form-title">Add Community Center</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="siteName">
                Site Name
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                className="form-input"
                placeholder="Example: Downtown Community Hall"
                value={formData.siteName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-input"
                placeholder="Example: 5th Avenue, North Sector"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="roomCount">
                Room Count
              </label>
              <input
                id="roomCount"
                name="roomCount"
                type="number"
                min="0"
                className="form-input"
                placeholder="Example: 12"
                value={formData.roomCount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input
                id="open"
                name="open"
                type="checkbox"
                checked={formData.open}
                onChange={handleInputChange}
              />
              <label className="form-checkbox-label" htmlFor="open">
                Center Open
              </label>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Adding Center...' : 'Add Community Center'}
            </button>
          </form>
        </div>

        {/* Community Center Records Table */}
        <div className="records-section">
          <div className="records-header">
            <h3 className="records-title">Community Center Records</h3>
            <button
              className="btn-refresh"
              onClick={fetchCenters}
              disabled={loading}
              title="Refresh Records"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="table-wrapper">
            <table className="records-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>ID</th>
                  <th style={{ width: '25%' }}>Site Name</th>
                  <th style={{ width: '25%' }}>Location</th>
                  <th style={{ width: '15%' }}>Room Count</th>
                  <th style={{ width: '12%' }}>Status</th>
                  <th style={{ width: '13%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {centers.length > 0 ? (
                  centers.map((center) => (
                    <tr key={center.id}>
                      <td>{center.id}</td>
                      <td>{center.siteName}</td>
                      <td>{center.location}</td>
                      <td>{center.roomCount}</td>
                      <td>
                        <span
                          className={`badge ${
                            center.open ? 'badge-open' : 'badge-closed'
                          }`}
                        >
                          {center.open ? 'Open' : 'Closed'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(center.id)}
                          disabled={deletingId === center.id}
                        >
                          {deletingId === center.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      {loading
                        ? 'Loading records...'
                        : 'No community center records found. Add one above!'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
