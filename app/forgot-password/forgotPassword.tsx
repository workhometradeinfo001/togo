import React, { use, useContext, useDebugValue, useEffect, useMemo, type ChangeEvent } from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
import HeaderSection from './headerSection';
import FormFiled from './formFiled';
import Button from '~/raw-components/button';
import TogoContext from '~/context-materials/togoContext';
import Input from '~/raw-components/input';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { handleGetMethodWithParam } = useContext(TogoContext);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDoneByCode, setDoneByCode] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [updateCodeInput, setUpdateCIn] = useState(false);
  const [passwordValue, setPassValue] = useState({ pass: "", con_pass: "" });
  const findingEmail = useMemo<{ email: string }>(() => ({
    email: email
  }), [email]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your password reset logic here
    const data = await handleGetMethodWithParam(
      "forgotPass/code-verify", findingEmail.email,
      "Wrong Email!"
    );
    if(data === undefined) {
      toast.error("kdkdk");
    }
    if (data.Http === 302) {
      setIsSubmitted(true);
    }
  };
  const obj = [
    {
      id: 1, label: "New Password",
      type: "password",
      placeHolder: "[A-Z]+[a-z]+[0-9]+[~!@#$...]",
      value: passwordValue.pass
    },
    {
      id: 2, label: "Confirm Password",
      type: "password",
      placeHolder: "[A-Z]+[a-z]+[0-9]+[~!@#$...]",
      value: passwordValue.con_pass
    }
  ];
  const handleOnChange = (id: number, value: string) => {
    setPassValue((prev) => {
      switch (id) {
        case 1:
          return { ...prev, pass: value }
        case 2:
          return { ...prev, con_pass: value }
        default:
          return prev;
      }
    })
  }
  const handleVerify = () => {
    const code = sessionStorage.getItem("code");
    if (String(code) === String(userCode)) {
      sessionStorage.removeItem("code");
      setDoneByCode(true);
      toast.success("Verify success");
    } else {
      toast.error("Verify Unsuccessful")
    }
  }
  useEffect(() => {
    if (userCode.length < 6) {
      setUpdateCIn(false);
    }
    if (userCode.length === 6) {
      setUpdateCIn(false);
    } else if (userCode.length > 6) {
      setUpdateCIn(true);
    }
  }, [userCode])
  return (
    <>
      <div className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light ${isDoneByCode && "d-none"}`}>
        <div className="row w-100 justify-content-center">
          {/* Card wrapper: max-width keeps it neat on desktop, w-100 lets it flex on mobile */}
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 p-4 p-sm-5 bg-white rounded-4">

              {/* Header section with responsive font sizes */}
              <HeaderSection
                h2Text='Forgot Password'
                pText='Enter your email address below and well send you a link to reset your password.'
              />
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
                  <Button
                    className="btn btn-primary btn-lg w-100 fs-6 fw-medium py-2 shadow-sm mb-3"
                    type="submit"
                    text="Verify Email"
                  />
                </form>
              ) : (
                /* Success State */
                <div className="alert alert-success text-center p-3 fs-6" role="alert">
                  <Input
                    type="number"
                    className={`form-control form-control-lg fs-6 text-center ${updateCodeInput && "is-invalid"}`}
                    value={userCode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserCode(e.target.value)}
                  />
                  <Button
                    className="btn btn-primary mt-4 mb-3 w-75"
                    text="Verify"
                    onclickBtn={handleVerify}
                  />
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
      <div className={`container w-25 vh-100 d-flex align-items-center justify-content-center
         ${!isDoneByCode && 'd-none'}`}>
        <div className='row'>
          <div className='col-12'>
            <HeaderSection
              h2Text='Create new password'
              pText=''
            />
          </div>
          <div className='col-12'>
            <FormFiled
              formClassName='w-100'
              fields={obj}
              onChange={handleOnChange}
              btnText='Change'
              email={findingEmail.email}
            />
          </div>
        </div>


      </div>

    </>
  )
}

export default ForgotPassword
