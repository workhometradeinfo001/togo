import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import ContextState from "~/context-materials/contextState";
import { Bounce, ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </ContextState>
  );
}
