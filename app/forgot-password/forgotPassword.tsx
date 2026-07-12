import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your password reset logic here
    console.log('Reset link requested for:', email);
    setIsSubmitted(true);
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        {/* Card wrapper: max-width keeps it neat on desktop, w-100 lets it flex on mobile */}
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 p-4 p-sm-5 bg-white rounded-4">

            {/* Header section with responsive font sizes */}
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark fs-3 fs-sm-2 mb-2">
                Forgot Password?
              </h2>
              <p className="text-muted fs-6 fs-sm-6 px-1">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="emailInput" className="form-label fw-semibold small text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg fs-6"
                    id="emailInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fs-6 fw-medium py-2 shadow-sm mb-3"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="alert alert-success text-center p-3 fs-6" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                Check your email for a reset link!
              </div>
            )}

            {/* Back to Login Link */}
            <div className="text-center mt-2">
              <Link to="/" className="text-decoration-none small fw-medium">
                <i className="bi bi-arrow-left me-1"></i> Back to Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
