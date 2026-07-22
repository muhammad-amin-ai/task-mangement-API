import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";

const initialForm = { username: "", email: "", password: "", confirmPassword: "" };

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const errors = {};
    if (form.username.trim().length < 3) errors.username = "At least 3 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address.";
    if (form.password.length < 8) errors.password = "At least 8 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords don't match.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    const result = await register({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate("/login", { replace: true, state: { registered: true } });
    } else {
      setError(result.message);
    }
  }

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Give every task a clear owner and a due date."
      subtitle="Create an account to start organizing pending, in-progress, and completed work in one place."
    >
      <h2 className="font-display text-2xl font-semibold text-ink">Create your account</h2>
      <p className="mt-1.5 text-sm text-muted">It takes less than a minute.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Alert>{error}</Alert>

        <Input
          id="username"
          label="Username"
          autoComplete="username"
          value={form.username}
          onChange={(e) => updateField("username", e.target.value)}
          error={fieldErrors.username}
          required
        />
        <Input
          id="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={fieldErrors.email}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={fieldErrors.password}
          required
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          error={fieldErrors.confirmPassword}
          required
        />

        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-accent hover:text-accent-hover">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
