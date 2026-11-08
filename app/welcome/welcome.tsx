
import { useContext, useEffect, useState } from "react"
import Signin from "~/signin/signin"
import Signup from "~/signup/signup"
import Spinner from "~/raw-components/spinner"
import TogoContext from "~/context-materials/togoContext"
import { useSearchParams } from "react-router"

const Welcome = () => {
  const { } = useContext(TogoContext);
  const [mail, setMail] = useState<String | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<Boolean>(true);
  const [searchParam] = useSearchParams();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const auth_host = import.meta.env.VITE_CLOUD_AUTH_HOST;
  const dashboard = import.meta.env.VITE_CLOUD_DASHBOARD;

// Step 1: Handle logout parameter FIRST before checking localStorage
  useEffect(() => {
    if (searchParam.get("auth") === "logout") {
      localStorage.removeItem("email");
      sessionStorage.clear();
      setMail(null);
      setIsTokenValid(false);
      setIsLoading(false); // Stop loading immediately so login form shows
      return;
    }

    // Step 2: Grab email from localStorage only if NOT logging out
    const email = localStorage.getItem("email");
    if (email) {
      setMail(email);
    } else {
      setIsLoading(false);
      setIsTokenValid(false);
    }
  }, [searchParam]);
// Step 3: Verify token only when mail is present and we are not logging out
  useEffect(() => {
    if (!mail || searchParam.get("auth") === "logout") return;

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
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [mail, auth_host, dashboard, searchParam]);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      {/* Show Spinner while loading */}
      {isLoading && <Spinner />}

      {/* Show Signin/Signup ONLY when loading is finished AND token is invalid */}
      {!isLoading && !isTokenValid && (
        <div className='w-100 d-flex align-items-center justify-content-end'>
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
