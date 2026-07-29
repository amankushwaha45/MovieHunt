import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaSignOutAlt,
  FaUserPlus,
  FaTrash,
  FaLock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [admins, setAdmins] = useState([]);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchAdmins();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/admin/profile");

      setAdmin(res.data.admin);

      setForm({
        name: res.data.admin.name,
        phone: res.data.admin.phone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await API.get("/admin/all");
      setAdmins(res.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await API.put("/admin/profile", form);

      setAdmin(res.data.admin);

      alert("Profile Updated Successfully");
    } catch (error) {
      alert("Profile Update Failed");
    } finally {
      setSaving(false);
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/register", newAdmin);

      alert(res.data.message);

      setNewAdmin({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;

    try {
      await API.delete(`/admin/${id}`);
      fetchAdmins();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await API.put(
        "/admin/change-password",
        password
      );

      alert(res.data.message);

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");

    navigate("/movie-hunt-control-panel");

    window.location.reload();
  };

  if (loading) {
    return <h2 className="loading">Loading Profile...</h2>;
  }
  return (
  <div className="profile-page">

    {/* ================= PROFILE ================= */}

    <div className="profile-card">

      <div className="profile-avatar">
        <FaUser />
      </div>

      <h1>{admin?.name}</h1>

      <span className="role">{admin?.role}</span>

      <div className="profile-info">

        <div>
          <FaEnvelope />
          <span>{admin?.email}</span>
        </div>

        <div>
          <FaPhone />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

        </div>

      </div>

      <form onSubmit={updateProfile}>

        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          value={form.name}
          onChange={handleChange}
        />

        <button
          className="save-btn"
          disabled={saving}
        >
          <FaSave />

          {saving ? "Saving..." : "Update Profile"}

        </button>

      </form>

    </div>

    {/* ================= ADD ADMIN ================= */}

    <div className="profile-card">

      <h2>

        <FaUserPlus />

        Add New Admin

      </h2>

      <form onSubmit={createAdmin}>

        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          value={newAdmin.name}
          onChange={handleAdminChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={handleAdminChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newAdmin.phone}
          onChange={handleAdminChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={handleAdminChange}
          required
        />

        <button className="save-btn">

          <FaUserPlus />

          Create Admin

        </button>

      </form>

    </div>

    {/* ================= CHANGE PASSWORD ================= */}

    <div className="profile-card">

      <h2>

        <FaLock />

        Change Password

      </h2>

      <form onSubmit={changePassword}>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={password.currentPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={password.newPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={password.confirmPassword}
          onChange={handlePasswordChange}
        />

        <button className="save-btn">

          <FaLock />

          Change Password

        </button>

      </form>

    </div>
        {/* ================= ALL ADMINS ================= */}

    <div className="profile-card">

      <h2>

        <FaUser />

        All Admins

      </h2>

      <div className="admin-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              admins.length === 0 ?

              (

                <tr>

                  <td colSpan="5">

                    No Admin Found

                  </td>

                </tr>

              )

              :

              admins.map((item)=>(

                <tr key={item._id}>

                  <td>{item.name}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>

                    <span className="role-badge">

                      {item.role}

                    </span>

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteAdmin(item._id)}
                    >

                      <FaTrash />

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

    {/* ================= LOGOUT ================= */}

    <div className="profile-card logout-card">

      <button
        className="logout-btn"
        onClick={logout}
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>

  </div>
);

}

export default Profile;