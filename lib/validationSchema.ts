import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(["pending", "in-progress", "completed"])
    .required("Status is required"),
});

export const clientValidationSchema = Yup.object().shape({
  name: Yup.string().required("Client name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  company: Yup.string(),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
