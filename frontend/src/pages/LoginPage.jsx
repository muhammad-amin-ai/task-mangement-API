import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(form);

    setIsSubmitting(false);
    if (result.success) {
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Pick up right where you left off."
      subtitle="Sign in to see what's pending, in progress, and done."
    >
      <h2 className="font-display text-2xl font-semibold text-ink">Sign in</h2>
      <p className="mt-1.5 text-sm text-muted">Enter your details to access your tasks.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {!error && location.state?.registered && (
          <Alert variant="success">Account created. Sign in to continue.</Alert>
        )}
        <Alert>{error}</Alert>

        <Input
          id="username"
          label="Username"
          autoComplete="username"
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
        />

        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-accent hover:text-accent-hover">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
