 // src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, blogs: 0 });
  const [sales, setSales] = useState({ daily: 0, monthly: 0, yearly: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [statsResponse, salesResponse] = await Promise.all([
          axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/sales', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats(statsResponse.data);
        setSales(salesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const salesChartData = {
    labels: ['Daily', 'Monthly', 'Yearly'],
    datasets: [
      {
        label: 'Sales (₦)',
        data: [sales.daily, sales.monthly, sales.yearly],
        backgroundColor: 'rgba(220, 53, 69, 0.5)', // Danger red
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
     <div className="col-md-12">
     <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleHomeRedirect}>
          Go to Home
        </button>
      </div>
     </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">{stats.users}</p>
              <Link to="/admin/users" className="btn btn-light">View Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">{stats.orders}</p>
              <Link to="/admin/orders" className="btn btn-light">View Orders</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text">{stats.products}</p>
              <Link to="/admin/products" className="btn btn-light">View Products</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Blogs</h5>
              <p className="card-text">{stats.blogs}</p>
              <Link to="/admin/blogs" className="btn btn-light">View Blogs</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h3>Sales Statistics</h3>
          <Bar
            data={salesChartData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales Overview' } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;