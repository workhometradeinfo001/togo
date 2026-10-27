
import { useContext, useEffect, useState } from "react"
import Signin from "~/signin/signin"
import Signup from "~/signup/signup"
import Spinner from "~/raw-components/spinner"
import TogoContext from "~/context-materials/togoContext"

const Welcome = () => {
  const { } = useContext(TogoContext);
  const [mail, setMail] = useState<String | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const auth_host = import.meta.env.VITE_CLOUD_AUTH_HOST;
  const dashboard = import.meta.env.VITE_CLOUD_DASHBOARD;

  // Step 1: Grab email from localStorage on mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setMail(email);
    } else {
      // If there's no email stored, stop loading immediately and show login
      setIsLoading(false);
      setIsTokenValid(false);
    }
  }, []);

  // Step 2: Verify token only when mail changes and is present
  useEffect(() => {
    if (!mail) return;
    const verifyToken = async () => {
      try {
        const res = await fetch(`${auth_host}/gToken/verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ email: mail })
        });

        if (res.status === 202) {
          window.location.href = dashboard;
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setIsTokenValid(false);
      } finally {
        // 2. Only turn off loading *after* the async fetch completely finishes
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [mail, auth_host, dashboard]);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      {/* Show Spinner while loading */}
      {isLoading && <Spinner />}

      {/* Show Signin/Signup ONLY when loading is finished AND token is invalid */}
      {!isLoading && !isTokenValid && (
        <div className='container d-flex align-items-center justify-content-end vh-100'>
          <Signin classNameTopDiv="me-3 p-mid-0 w-25" />
          <Signup
            classNameTopDiv="ps-2 p-mid-0 ms-3 border-start border-green w-50"
            formClassName="w-100"
          />
        </div>
      )}
    </div>
  )
}

export default Welcome
