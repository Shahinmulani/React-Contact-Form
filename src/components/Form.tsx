import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Simple Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? 'input-error' : ''}
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'input-error' : ''}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
