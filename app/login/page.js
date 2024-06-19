"use client";
//import { set } from "mongoose";
import { useState } from "react";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      if (result?.error) {
        toast.error(result?.error);
      } else {
        toast.success("Login success");
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container mt-10">
        <div className="flex flex-row justify-center items-center h-100 mx-auto">
          <div className="grid-col-5 gap-5 bg-gray-100 p-5 shadow">
            <h2 className="mb-4">Login</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Your email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Your password"
              />
              <button
                className="bg-white"
                disabled={loading || !email || !password}
              >
                {loading ? "Please wait.." : "Submit"}
              </button>
              <Link className="btn mb-4" href="/forgot-password">
                <small>Forgot Password</small>
              </Link>
              
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
