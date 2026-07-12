import { 
    type RouteConfig, 
    index,
    route
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("forgetpassword", "./forgot-password/forgotPassword.tsx")
] satisfies RouteConfig;
