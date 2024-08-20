import React, { useState } from "react";

// Modal component
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-black text-white rounded hover:bg-transparent hover:text-black border border-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        if (value.trim().length < 3) {
          errorMessage = "Name must be at least 3 characters long";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "message":
        if (value.trim() === "") {
          errorMessage = "Message is required";
        }
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields before submitting
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("message", formData.message);

    if (Object.values(errors).some((error) => error !== "")) {
      console.error("Validation errors:", errors);
      return;
    }

    const formElement = event.target;
    const formDataObject = new FormData(formElement);

    formDataObject.append("access_key", "88eeb5d1-5c86-48bf-bf34-b255452947af");

    const object = Object.fromEntries(formDataObject);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Form submitted successfully:", data);
        formElement.reset();
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({
          name: "",
          email: "",
          message: "",
        });
        setModalMessage("Your message has been sent successfully!");
        setIsModalOpen(true);
      } else {
        console.error("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="flex justify-center w-full lg:w-[800px]">
        <form
          onSubmit={onSubmit}
          className="max-w-[800px] w-full lg:w-[800px] flex flex-col items-center sm:p-8 rounded-lg shadow-md"
        >
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">{errors.name}</span>
            )}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">{errors.email}</span>
            )}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black resize-none"
            ></textarea>
            {errors.message && (
              <span className="text-red-600 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center flex-col sm:flex-row gap-10">
            <button
              type="submit"
              className="py-2 px-4 bg-black text-white rounded hover:bg-transparent hover:text-black border border-black"
            >
              Submit
            </button>
            <button
              type="reset"
              className="py-2 px-4 bg-black text-white rounded hover:bg-transparent hover:text-black border border-black"
              onClick={handleChangeReset}
            >
              Reset
            </button>
          </div>
        </form>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={modalMessage}
        />
      </div>
    </>
  );
};

export default ContactForm;
