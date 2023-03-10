import { signIn } from "next-auth/react";
import Link from "next/link";
import { Header } from "~/components";
import Image from "next/image";

const Loginpage = () => {
  const continueWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <>
      <Header category={false} />

      <main className="py-8 text-center">
        <div className="mx-auto w-1/4">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-medium text-dark-blue">Log In</h1>
            <p className="text-base">
              Need an account?{" "}
              <Link href={"/signup"}>
                <span className="font-semibold hover:underline">Sign Up</span>
              </Link>
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

          <p className="my-4 text-center">OR</p>

          <form>
            <input
              type="email"
              placeholder="Email"
              className="my-3 w-full border-b border-gray py-2 text-base outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="my-3 w-full border-b border-gray py-2 text-base outline-none"
            />
            <div className="itmes-center my-6 flex justify-between">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="h-[0.85rem] w-[0.85rem]"
                  name="remember"
                  checked={true}
                  id="remember"
                />
                <label htmlFor="remember">Remember me?</label>
              </div>
              <p className="text-sm underline">Forgot Password?</p>
            </div>
            <button className="btn-primary">Log In</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Loginpage;
