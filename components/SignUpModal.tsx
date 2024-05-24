// components/SignUpModal.tsx
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import "./styles/signup-styles.css";
import useSignUPModal from "@/hooks/useSignUpModal";

const SignUpModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  const { onClose, isOpen } = useSignUPModal();

  const getUsersByUsername = async (username: any) => {
    let { data } = await supabase
      .from("users")
      .select("id")
      .eq("username", username);
    return data;
  };

  const handleSignUp = async () => {
    setLoading(true);

    const users = await getUsersByUsername(username);
    console.log(users);

    if (users?.length && users?.length > 0) {
      setError(`User with username ${username} already exists`);
      setLoading(false);
      return;
    }
    // Sign up the user with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Insert the username and email into the profiles table
    const { error: profileError } = await supabase
      .from("users")
      .update({ username: username })
      .eq("id", data.user?.id);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setError(null);
    onClose();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal
    bg-neutral-900/90 
    backdrop-blur-sm 
    fixed 
    inset-0
  "
    >
      <div className="modal-content bg-neutral-800">
        <div className="modal-header">
          <h2 className="text-white">Sign Up</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          className="submit-button"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
