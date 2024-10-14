import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update_user() {
  const { id } = useParams(); // Get the id from the URL
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact_no, setContact_no] = useState("");
  const [user_type, setUserType] = useState("customer"); // Set default value

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data by id when the component mounts
    axios
      .get("http://localhost:8020/getUser/" + id)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        setPassword(userData.password); // Assuming password comes from the backend
        setAge(userData.age);
        setAddress(userData.address);
        setContact_no(userData.contact_no);
        setUserType(userData.user_type);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    // Send updated user data to the backend
    axios
      .put("http://localhost:8020/user_update/" + id, {
        name,
        email,
        password,
        address,
        contact_no,
        user_type,
        age,
      })
      .then((result) => {
        console.log(result);
        toast.success("User Updated successfully !", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/user_rept"); // Redirect to home after success
        }, 1500); // Optional delay
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form id="userForm" onSubmit={Update}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={contact_no}
          onChange={(e) => setContact_no(e.target.value)}
          required
        />

        <label htmlFor="user_type">User Type:</label>
        <select
          id="user_type"
          name="user_type"
          value={user_type}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="supplier">Supplier</option>
        </select>

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Update_user;
