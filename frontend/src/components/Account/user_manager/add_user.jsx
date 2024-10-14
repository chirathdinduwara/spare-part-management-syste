import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../user_manager/user_mg_nav/user_fill_form.css";
import Navbar from "../user_manager/user_mg_nav/user_mg_nav";
import { ToastContainer, toast } from "react-toastify";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact_no, setContact] = useState("");
  const [user_type, setUserType] = useState("supplier");

  const navigate = useNavigate();

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  const contactPattern = /^[0-9]{10}$/; // Assumes a 10-digit phone number, modify if necessary

  const Submit = (e) => {
    e.preventDefault();

    // Basic form validations
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    if (!contact_no.match(contactPattern)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    // All validations passed, submit form data
    axios
      .post("http://localhost:8020/createUser", {
        name,
        email,
        password,
        address,
        contact_no,
        user_type,
        age: Number(age), // Convert age to a number
      })
      .then((result) => {
        console.log(result);
        toast.success("User added successfully !", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/user_rept");
        }, 2000);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
      });
  };

  return (
    <>
      <form id="userForm" onSubmit={Submit}>
        <label htmlFor="name" id="label">
          Name:
        </label>
        <input
          type="text"
          id="inputs"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email" id="label">
          Email:
        </label>
        <input
          type="email"
          id="inputs"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" id="label">
          Password:
        </label>
        <input
          type="password"
          id="inputs"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="age" id="label">
          Age:
        </label>
        <input
          type="number"
          id="inputs"
          name="age"
          min="1"
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label htmlFor="address" id="label">
          Address:
        </label>
        <input
          type="text"
          id="inputs"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="contact" id="label">
          Contact:
        </label>
        <input
          type="tel"
          id="inputs"
          name="contact"
          pattern="[0-9]{10}"
          onChange={(e) => setContact(e.target.value)}
          required
          title="Enter a 10-digit contact number"
        />

        <label htmlFor="user_type" id="label">
          User Type:
        </label>
        <select
          id="inputs"
          name="user_type"
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="supplier">Supplier</option>
        </select>

        <button type="submit" id="s_btn">
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddUser;
