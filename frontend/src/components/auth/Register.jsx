import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/Input";
import { FaFolderPlus } from "react-icons/fa";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { useNavigate } from "react-router-dom";
// import apis from "../../utils/apis";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const nameChange = (event) => {
    setName(event.target.value);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5555/user/register', { name, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);

    // console.log(name, email, password);
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFolderPlus />
            <p className="auth_heading">Welcome</p>
            <p className="auth_title">Create a new account</p>
          </div>
          <div className="auth_item">
            <label>Name *</label>
            <Input
              onChange={nameChange}
              type="text"
              required
              placeholder="enter your name"
            />
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              onChange={emailChange}
              type="email"
              required
              placeholder="enter your email"
            />
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="enter your password"
            />
          </div>

          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Register" />
            </Button>
          </div>
          <div>
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
