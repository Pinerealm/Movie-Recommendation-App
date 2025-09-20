import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import setAuthToken from '../utils/setAuthToken';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return '';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!password2) {
      newErrors.password2 = 'Please confirm your password';
    } else if (password !== password2) {
      newErrors.password2 = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordValidationItems = () => {
    return [
      { text: 'At least 6 characters', valid: password.length >= 6 },
      { text: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
      { text: 'Contains lowercase letter', valid: /[a-z]/.test(password) },
      { text: 'Contains number', valid: /[0-9]/.test(password) },
    ];
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccess('');

    const userData = {
      name: name.trim(),
      email,
      password,
    };

    try {
      const data = await userService.register(userData);
      // console.log(data);
      
      // Store token and set auth header
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setSuccess('Registration successful! Welcome aboard!');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
        // Force refresh to update navigation state
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else if (err.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = {};
        err.response.data.errors.forEach(error => {
          if (error.param) {
            backendErrors[error.param] = error.msg;
          }
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Join Us Today</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder=" "
              name="name"
              value={name}
              onChange={onChange}
              className={styles.input}
              required
            />
            <label className={styles.floatingLabel}>Full Name</label>
            {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder=" "
              name="email"
              value={email}
              onChange={onChange}
              className={styles.input}
              required
            />
            <label className={styles.floatingLabel}>Email Address</label>
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder=" "
              name="password"
              value={password}
              onChange={onChange}
              className={styles.input}
              required
            />
            <label className={styles.floatingLabel}>Password</label>
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            
            {password && (
              <>
                <div className={`${styles.passwordStrengthIndicator} ${styles[passwordStrength]}`}>
                  Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </div>
                <div className={styles.validationList}>
                  {getPasswordValidationItems().map((item, index) => (
                    <div key={index} className={`${styles.validationItem} ${item.valid ? styles.valid : styles.invalid}`}>
                      <span className={styles.validationIcon}>
                        {item.valid ? '✓' : '×'}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder=" "
              name="password2"
              value={password2}
              onChange={onChange}
              className={`${styles.input} ${
                password2 && password ? 
                  (password === password2 ? styles.passwordMatch : styles.passwordMismatch) : 
                  ''
              }`}
              required
            />
            <label className={styles.floatingLabel}>Confirm Password</label>
            {errors.password2 && <div className={styles.errorMessage}>{errors.password2}</div>}
            {password2 && password && password === password2 && (
              <div className={styles.successMessage}>Passwords match!</div>
            )}
          </div>

          {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading && <span className={styles.loadingSpinner}></span>}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
