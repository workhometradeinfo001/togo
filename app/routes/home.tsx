import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Togo Here" },
    { name: "description", content: "Welcome to Togo." },
  ];
}

export default function Home() {
  return <Welcome />;
}
