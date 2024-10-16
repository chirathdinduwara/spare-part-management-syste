import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavbarOder from "../oder_nav/navbar";
import "../oder_dash/order_dash.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function OderDash() {
  const [orders, setOrders] = useState([]); // Original items
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredOders, setFilteredOrders] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_order_dash")
      .then((result) => {
        console.log(result.data);
        setOrders(result.data); // Store original data
        setFilteredOrders(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_order/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload(); // optional one for reload page
      })
      .catch((err) => console.log(err));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Order History", 10, 10);
    // Table headers
    const headers = [
      [
        "Full Name",
        "Item Name",
        "Item Price",
        "Delivery Fee",
        "Item Quantity",
        "Total Price",
        "Payment Method",
      ],
    ];

    // Map data to table rows
    const data = filteredOders.map((order) => [
      order.full_name, // Change this to order.delivery_person_name or similar
      order.item_name,
      order.item_price,
      order.delivery_fee,
      order.item_quantity,
      order.total_price,
      order.payment_method,
    ]);

    // Generate the table in the PDF
    doc.autoTable({
      head: headers,
      body: data,
    });

    doc.save("report.pdf"); // Save the PDF
  };

  // Search function
  const handleSearch = () => {
    if (searchKey.trim() === "") {
      // If the search key is empty, reset to original items
      setFilteredOrders(orders);
    } else {
      const filteredData = orders.filter((order) =>
        order.item_name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredOrders(filteredData);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Filter data based on the selected suggestion
    const filteredData = orders.filter((order) =>
      order.item_name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredOrders(filteredData);
  };

  return (
    <>
      <NavbarOder />
      <div id="search_function">
        <input
          type="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)} // Update search key
          placeholder="Search here . . ."
          className="search_bar"
          id="search_bar"
        />
        <button
          className="search_bar_btn"
          id="search_bar_btn"
          onClick={handleSearch}
        >
          Search &ensp; <i className="fa fa-search"></i>
        </button>
        <br />
        <button onClick={generatePDF} className="pdf_btn" id="pdf_btn">
          Download Report &ensp; <i className="fa fa-download"></i>
        </button>
      </div>
      <div id="table_container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Delivery Fee</th>
              <th>Item Quantity</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOders.map((order, index) => (
              <tr key={index}>
                <td>{order.full_name}</td>
                <td>{order.item_name}</td>
                <td>{order.item_price}</td>
                <td>{order.delivery_fee}</td>
                <td>{order.item_quantity}</td>
                <td>{order.total_price}</td>
                <td>{order.payment_method}</td>
                <td>
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(order._id)}
                  >
                    <i className="fa fa-trash">&ensp;</i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OderDash;
