import React, { useState } from 'react'

const SimpleForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const validateForm = () => {
        const {name, email, message} = formData;
        const newErrors = {};

        if(!name.trim()) newErrors.name = "Name is required.";
        if(!email.trim()) newErrors.email = "Please enter your email address.";
        if(!message.trim()) newErrors.message = "Message is required.";

        setErrors(newErrors);
        
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) {
            return
        }

        console.log("form submitted: ", formData)
        setFormData({
            name: "",
            email: "",
            message: ""
        })
    }




  return (
    <div>
        <h1>Welcome to Simple Form</h1>

        <h3>What's on your mind?</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} />
                {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
            </div>
            <div>
                <label>Email: </label>
                <input type="text"
                        name='email'
                        value={formData.email}
                        onChange={handleChange} />
                {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
            </div>
            <div>
                <label>Message: </label>
                <textarea type="text"
                          name='message'
                          value={formData.message}
                          onChange={handleChange} />
                {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default SimpleForm
