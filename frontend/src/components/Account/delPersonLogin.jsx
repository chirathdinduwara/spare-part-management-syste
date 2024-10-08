import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/delManagerReg.css";

function DelManagerLogin() {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8020/delPersonlogin", { email, password })
      .then((result) => {
        const userData = result.data.user; 
          console.log(userData);
        console.log(result);
        if (result.data.message === "Success") {
          localStorage.setItem('user', JSON.stringify(userData));
          navigate("/deliveryPerson");
        } else {
          alert("Invalid ! Pleace check again");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* this is left side */}
      <div className="main_container">
        <div className="left_side">
          <h1>
            The Racers <br />
            Edge
          </h1>
        </div>

        <div className="right_side">
          <form method="post" onSubmit={handleSubmit}>
            <h3>Delivery Person Login</h3>
            <label htmlFor="delPersonEmail">Email </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="delPersomEmail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="delPersonPass">Password</label>
            <input
              type="password"
              placeholder="*************"
              name="delPersonPass"
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">LOGIN</button>
            <br />
            <Link to="/delPersonReg">
              Don't have an account : Register here
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default DelManagerLogin;
