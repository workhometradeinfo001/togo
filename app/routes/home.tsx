import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import ContextState from "~/context-materials/contextState";
import { Bounce, ToastContainer } from "react-toastify";
import { LoadingBarContainer } from "react-top-loading-bar";
import ForgotPassword from "~/forgot-password/forgotPassword";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Togo Here" },
    { name: "description", content: "Welcome to Togo." },
  ];
}

export default function Home() {

  return (
    <ContextState>
        < Welcome />
    </ContextState>
  );
}
