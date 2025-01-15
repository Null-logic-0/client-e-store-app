"use server";

import { redirect } from "next/navigation";
import { BASE_URL } from "./data-services";
import { getCookie, setCookie } from "./cookies";
import { cookies } from "next/headers";

export async function registerUser(formData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errRes = await response.json();
    return redirect(
      `/sign-up?errorMessage=${
        errRes.message || "Something went wrong. Please try again."
      }`
    );
  }

  const resData = await response.json();
  setCookie("customer_jwt_token", resData.token, { maxAge: 2 * 60 * 60 });

  redirect("/");
}

export async function loginUser(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errRes = await response.json();
    return redirect(
      `/login?errorMessage=${
        errRes.message || "Something went wrong. Please try again."
      }`
    );
  }

  const resData = await response.json();
  setCookie("customer_jwt_token", resData.token, { maxAge: 2 * 60 * 60 });

  redirect("/");
}

export async function deleteCookie(name) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function getCustomerData() {
  const customerJwtToken = await getCookie("customer_jwt_token");

  const res = await fetch(`${BASE_URL}/api/customer`, {
    credentials: "include",
    headers: {
      Cookie: `customer_jwt_token=${customerJwtToken}`,
    },
  });

  if (!res.ok) {
    await deleteCookie("customer_jwt_token");
  }

  const data = await res.json();
  return data;
}

export async function logoutUser() {
  await deleteCookie("customer_jwt_token");
}
