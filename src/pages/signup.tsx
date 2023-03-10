import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuthHeader, Notification } from "~/components";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [user, setUser] = useState<string>("USER");
  const continueWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <>
      <Notification />
      <AuthHeader />
      <main className="w-full py-8">
        <div className="container mx-auto text-center">
          <div className="mx-auto w-1/3">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-medium text-dark-blue">
                Join easyCart.com
              </h1>
              <p className="text-base">
                Sign up as a customer for 20% off your first order. Your coupon
                will be emailed after sign up.
              </p>
            </div>

            <button
              onClick={() => void continueWithGoogle()}
              className="flex w-full items-center justify-center gap-2 rounded-md border-[3px] border-light-blue bg-light-gray-alpha px-2 py-3 outline-none"
            >
              <Image
                src={"/images/google_logo.png"}
                width={20}
                height={20}
                alt="Google Logo"
              />
              <p className="text-sm font-medium">Continue with Google</p>
            </button>

            <p className="my-6 text-center text-xl">OR</p>

            <div className="mb-8 flex items-center">
              <button
                onClick={() => void setUser("SELLER")}
                className={`relative w-1/2 rounded-l-md border-[3px] p-4 outline-none ${
                  user === "SELLER"
                    ? "border-navy"
                    : "border-gray border-r-transparent"
                }`}
              >
                {user === "SELLER" && (
                  <div className="absolute -top-5 left-2 bg-white p-1">
                    <i className="uil uil-check text-2xl" />
                  </div>
                )}
                <i className="uil uil-user-md mb-3 block text-4xl text-navy" />
                <h1 className="mb-2 text-base">Customer Signup</h1>
                <p className="text-sm">
                  Browse the marketplace and find your thing
                </p>
              </button>

              <button
                onClick={() => void setUser("USER")}
                className={`relative w-1/2 rounded-r-md border-[3px] p-4 outline-none ${
                  user === "USER"
                    ? "border-navy"
                    : "border-gray border-l-transparent"
                }`}
              >
                {user === "USER" && (
                  <div className="absolute -top-5 left-2 bg-white p-1">
                    <i className="uil uil-check text-2xl" />
                  </div>
                )}
                <i className="uil uil-shopping-cart mb-3 block text-4xl text-navy" />
                <h1 className="mb-2 text-base">Customer Signup</h1>
                <p className="text-sm">
                  Browse the marketplace and find your thing
                </p>
              </button>
            </div>

            <form className="mb-8">
              <input
                type="email"
                placeholder="Email"
                className="my-3 w-full border-b border-gray py-2 text-base outline-none"
              />
              <input
                type="text"
                placeholder="Username"
                className="my-3 w-full border-b border-gray py-2 text-base outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="my-3 w-full border-b border-gray py-2 text-base outline-none"
              />

              <div className="my-4 flex items-center gap-1">
                <input
                  type="checkbox"
                  name="email-preferences"
                  id="email-preferences"
                  className="h-[0.85rem] w-[0.85rem]"
                />
                <label htmlFor="email-preferences">
                  Email me special offers.
                </label>
              </div>

              <button className="btn-primary">Sign Up</button>
            </form>

            <p className="mb-6 text-center text-lg font-normal">
              Already have an account?{" "}
              <Link href={"/auth/login"}>
                <span className="font-semibold">Log In</span>
              </Link>
            </p>

            <p className="text-gray">
              By clicking Sign Up, you agree to our{" "}
              <span className="font-semibold">User Agreement</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
