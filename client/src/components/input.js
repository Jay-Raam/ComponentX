import React, { useState } from "react";

const Input = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState({
    name: "",
    password: "",
  });
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value.trim());

      if (value.trim() === "") {
        setNameError("Please fill in the name field");
      } else if (value.length < 3) {
        setNameError("Name should be at least 3 characters long");
      } else {
        setNameError(null);
      }
    } else if (name === "password") {
      setPassword(value.trim());

      if (value.trim() === "") {
        setPasswordError("Please fill in the password field");
      } else if (value.length < 4) {
        setPasswordError("Password must be at least 4 characters long");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameError || passwordError) {
      console.log("Please fix the errors before submitting");
      return;
    }

    setValue({
      name: name,
      password: password,
    });

    console.log("Form submitted with:", { name, password });
    setName("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
          required
        />
        {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleChange}
          required
        />
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <button type="submit">Submit</button>
      </form>
      {value.name && value.password && (
        <div>
          <h2>Form values:</h2>
          <p>Name: {value.name}</p>
          <p>Password: {value.password}</p>
        </div>
      )}
    </>
  );
};

export default Input;
