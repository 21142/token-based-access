import { importJWK, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET_KEY = { kty: "oct", k: process.env.SECRET_KEY };

const checkCookie = async () => {
  const availableCookies = cookies();
  const cookie = availableCookies.get("tokenOwnership");

  if (!cookie) {
    return false;
  }

  try {
    const secretKey = await importJWK(SECRET_KEY, "HS256");
    await jwtVerify(cookie.value, secretKey);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};

export default async function Restricted() {
  const validCookie = await checkCookie();

  if (!validCookie) {
    redirect("/auth");
  }

  return (
    <div className="w-full h-full">
      <div className="-z-10 background--custom absolute inset-0 w-full h-full" />
      <div className="flex h-[60vh] items-center justify-center">
        <h1>This content is available only for owners of the token.</h1>
      </div>
    </div>
  );
}
