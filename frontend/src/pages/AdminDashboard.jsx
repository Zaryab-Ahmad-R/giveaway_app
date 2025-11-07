import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useForm } from "react-hook-form";
import SettingsForm from "../components/SettingsForm";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClaims: 0,
    last24Users: 0,
    last24Claims: 0,
  });
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Zainverse - Dashboard";
  }, []);

  const token = localStorage.getItem("adminToken");


  const fetchWithAuth = async (url) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (res.status === 401 || res.status === 403) {
      // token missing/invalid -> redirect to login
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
      throw new Error("Unauthorized");
    }
    return res;
  };

  const fetchUsers = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/admin/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClaims = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/admin/claims`);
      const data = await res.json();
      setClaims(data);
    } catch (err) {
      console.error(err);
    }
  };

  const pickWinner = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/admin/users/random`);
      const data = await res.json();
      setWinner(data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetchUsers();
    fetchClaims();
  }, []);

  useEffect(() => {
    if (users.length > 0 || claims.length > 0) {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const recentUsers = users.filter(
        (u) => new Date(u.createdAt) > last24h
      ).length;
      const recentClaims = claims.filter(
        (c) => new Date(c.createdAt) > last24h
      ).length;

      setStats({
        totalUsers: users.length,
        totalClaims: claims.length,
        last24Users: recentUsers,
        last24Claims: recentClaims,
      });
    }
  }, [users, claims]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");

  };



  return (
    <section className="min-h-screen bg-[#5A9690] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🎁 Admin Dashboard</h1>

      <div className="logut-button flex justify-end mr-3 p-2.5 px-8">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-8 py-2 rounded-lg text-white font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#3f7a74] p-4 rounded-xl text-center shadow">
          <h3 className="text-lg font-semibold text-yellow-300">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-[#3f7a74] p-4 rounded-xl text-center shadow">
          <h3 className="text-lg font-semibold text-blue-300">Total Claims</h3>
          <p className="text-3xl font-bold">{stats.totalClaims}</p>
        </div>
        <div className="bg-[#3f7a74] p-4 rounded-xl text-center shadow">
          <h3 className="text-lg font-semibold text-green-300">New Users (24h)</h3>
          <p className="text-3xl font-bold">{stats.last24Users}</p>
        </div>
        <div className="bg-[#3f7a74] p-4 rounded-xl text-center shadow">
          <h3 className="text-lg font-semibold text-pink-300">New Claims (24h)</h3>
          <p className="text-3xl font-bold">{stats.last24Claims}</p>
        </div>
      </div>


      {/* Chart Section */}
      <div className="bg-[#3f7a74] p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">📊 24-Hour Activity</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { name: "New Users", value: stats.last24Users },
              { name: "New Claims", value: stats.last24Claims },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2d5c57" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ background: "#2d5c57", borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#00c49f" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Tabs.Root defaultValue="users" className="w-full">
        <Tabs.List className="flex justify-center gap-4 mb-6">
          <Tabs.Trigger
            value="users"
            className="px-4 py-2 bg-blue-600 rounded-lg font-semibold data-[state=active]:bg-blue-800"
          >
            Registered Users
          </Tabs.Trigger>
          <Tabs.Trigger
            value="claims"
            className="px-4 py-2 bg-blue-600 rounded-lg font-semibold data-[state=active]:bg-blue-800"
          >
            Prize Claims
          </Tabs.Trigger>
          <Tabs.Trigger
            value="settings"
            className="px-4 py-2 bg-blue-600 rounded-lg font-semibold data-[state=active]:bg-blue-800"
          >
            Settings
          </Tabs.Trigger>
        </Tabs.List>

        {/* USERS TAB */}
        <Tabs.Content value="users">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Registered Users</h2>
            <button
              onClick={pickWinner}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold"
            >
              🎯 Pick Random Winner
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#3f7a74] rounded-lg overflow-hidden">
              <thead className="bg-[#2d5c57]">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Instagram</th>
                  <th className="px-4 py-3 text-left">Facebook</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-gray-600">
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.phone}</td>
                    <td className="px-4 py-2">{u.city}</td>
                    <td className="px-4 py-2">{u.instagramHandle}</td>
                    <td className="px-4 py-2">{u.facebookProfile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        {/* CLAIMS TAB */}
        <Tabs.Content value="claims">
          <h2 className="text-xl font-semibold mb-4">Prize Claim Entries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#3f7a74] rounded-lg overflow-hidden">
              <thead className="bg-[#2d5c57]">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Bank</th>
                  <th className="px-4 py-3 text-left">Account Number</th>
                  <th className="px-4 py-3 text-left">IBAN</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id} className="border-t border-gray-600">
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.phone}</td>
                    <td className="px-4 py-2">{c.city}</td>
                    <td className="px-4 py-2">{c.bankName}</td>
                    <td className="px-4 py-2">{c.accountNumber}</td>
                    <td className="px-4 py-2">{c.iban}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        {/*Settings Tab */}
        <Tabs.Content value="settings">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Registration Settings</h2>

          <SettingsForm token={token} />
        </Tabs.Content>
      </Tabs.Root>

      {/* WINNER POPUP (Dialog) */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0" />
          <Dialog.Content className="bg-white text-black p-6 rounded-xl shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
            <Dialog.Title className="text-2xl font-bold mb-2 text-center">🏆 Winner Selected!</Dialog.Title>
            {winner && (
              <div className="text-center space-y-2">
                <p><strong>Name:</strong> {winner.name}</p>
                <p><strong>Phone:</strong> {winner.phone}</p>
                <p><strong>City:</strong> {winner.city}</p>
                <p><strong>Instagram Handle:</strong> {winner.instagramHandle}</p>
                <p><strong>Facebook Profile:</strong> {winner.facebookProfile}</p>
              </div>
            )}
            <div className="text-center mt-6">
              <Dialog.Close asChild>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
