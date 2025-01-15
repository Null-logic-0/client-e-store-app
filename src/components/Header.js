"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { objectToQueryString } from "@/utils/utils";
import { getCustomerData, logoutUser } from "@/lib/actions";
import { CartIcon, SearchIcon, UserIcon } from "./icons";
import Input from "./ui/Input";
import { useProductContext } from "./ProductContext";

function Header() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const existingSearchParams = {
    productTypeId: searchParams.get("productTypeId"),
    sortBy: searchParams.get("sortBy"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    rating: searchParams.get("rating"),
    inStock: searchParams.get("inStock"),
    openAccordion: searchParams.get("openAccordion"),
  };

  const router = useRouter();

  const updateSearchParams = (newParamsArray) => {
    const updatedSearchParams = { ...existingSearchParams, search: search };

    newParamsArray?.forEach((param) => {
      Object.entries(param).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          delete updatedSearchParams[key];
        } else {
          updatedSearchParams[key] = value;
        }
      });
    });

    router.push(`/?${objectToQueryString(updatedSearchParams)}`);
  };

  const handleFilterChange = (filterType, value) => {
    updateSearchParams([
      {
        [filterType]: value,
      },
    ]);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (customerData?.id) {
      setDropdownOpen(!dropdownOpen);
    } else {
      router.push("/login");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const { cartItems, customerData, setCustomerData } = useProductContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerData();
      setCustomerData(res?.data);
      console.log(res);
    };
    fetchData();
  }, [setCustomerData]);

  const handleLogout = async () => {
    await logoutUser();
    setCustomerData({});
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-semibold">MyStore</h1>
          </Link>

          <div className="relative w-full max-w-lg">
            <SearchIcon className="absolute left-2 top-2 w-7 h-7" />
            <Input
              placeholder="Search Product..."
              className="pl-10"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex gap-3">
              <Link href="/cart">
                <div className="relative">
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex justify-center items-center text-xs font-semibold">
                    {cartItems.length}
                  </div>
                  <CartIcon className="w-7 h-7" />
                </div>
              </Link>
              <button className="icon-button" onClick={toggleDropdown}>
                <UserIcon className="w-7 h-7" />
              </button>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-light">Welcome, </p>
                  <p className="text-lg">{customerData.customerName}</p>
                </div>
                <Link
                  href="/"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  My Wishlist
                </Link>
                <button
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
