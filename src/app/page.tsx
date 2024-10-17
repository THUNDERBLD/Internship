"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null); // Store title
  const [status, setStatus] = useState(null); // Store status
  const [catIDs, setcatID] = useState(null); // Store category ID
  const [isEditing, setIsEditing] = useState(false); // Track if in "edit" mode

  useEffect(() => {
    const title = localStorage.getItem('title'); // Retrieve from local storage
    setData(title);
    const stat = localStorage.getItem('status1');
    setStatus(stat);
    const catID = localStorage.getItem('catID');
    setcatID(catID);
  }, []);

  // Function to handle clicking the Edit button
  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  // Function to handle selecting a new status (either "Pending" or "Draft")
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); // Update status
    localStorage.setItem('status1', newStatus); // Save new status to localStorage
    setIsEditing(false); // Exit edit mode, show Edit button again
  };

  // Function to handle deleting the data
  const handleDelete = () => {
    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      // Remove data from localStorage
      localStorage.removeItem('title');
      localStorage.removeItem('status1');
      localStorage.removeItem('catID');

      // Reset state
      setData(null);
      setStatus(null);
      setcatID(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="text-white bg-stone-950 w-full h-screen sm:py-20 font-[family-name:var(--font-geist-sans)]">
      {/* Main Section */}
      <main className="flex justify-center mb-10">
        <div className="text-center sm:text-left">
          <div className="text-2xl text-center mb-4">ASSIGNMENT FORM</div>
          <div className="flex justify-center">
            <Link
              className="rounded-full border bg-blue-500 border-transparent transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
              href="/Form"
              rel="noopener noreferrer"
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="white"
              >
                {/* SVG Path */}
                <path
                  d="M14.236 5.29178C14.236 4.77191 14.236 4.51198 14.1789 4.29871C14.0238 3.71997 13.5717 3.26793 12.9931 3.11285C12.4315 2.96238 11.5684 2.96238 11.0068 3.11285C10.4281 3.26793 9.97609 3.71997 9.82101 4.29871C9.76387 4.51198 9.76387 4.77191 9.76387 5.29178C9.76387 6.34588 9.76387 9.109 9.43641 9.43647C9.10894 9.76393 6.34582 9.76393 5.29172 9.76393C4.77185 9.76393 4.51192 9.76393 4.29865 9.82107C3.71991 9.97615 3.26787 10.4282 3.11279 11.0069C2.96232 11.5685 2.96232 12.4315 3.11279 12.9931C3.26787 13.5718 3.71991 14.0239 4.29865 14.1789C4.51192 14.2361 4.77185 14.2361 5.29172 14.2361C6.34582 14.2361 9.10894 14.2361 9.43641 14.5635C9.76387 14.891 9.76387 15.418 9.76387 16.4721C9.76387 16.992 9.76387 19.4881 9.82101 19.7013C9.97609 20.28 10.4281 20.7321 11.0068 20.8871C11.5684 21.0376 12.4315 21.0376 12.9931 20.8871C13.5717 20.7321 14.0238 20.28 14.1789 19.7013C14.236 19.4881 14.236 16.992 14.236 16.4721C14.236 15.418 14.236 14.891 14.5635 14.5635C14.8909 14.2361 17.654 14.2361 18.7082 14.2361C19.228 14.2361 19.488 14.2361 19.7013 14.1789C20.28 14.0239 20.732 13.5718 20.8871 12.9931C21.0376 12.4315 21.0376 11.5685 20.8871 11.0069C20.732 10.4282 20.28 9.97615 19.7013 9.82107C19.488 9.76393 19.228 9.76393 18.7082 9.76393C17.654 9.76393 14.8909 9.76393 14.5635 9.43647C14.236 9.109 14.236 6.34588 14.236 5.29178Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create Now
            </Link>
          </div>
        </div>
      </main>

      {/* Additional Content */}
      <div className="w-[80%] h-[70%] mx-auto rounded-lg items-center bg-stone-900 text-white p-4 overflow-auto">
        <p className="text-xl underline p-1">Inbox</p>
        {data ? ( // Check if data is available 
          <div>
            <div className="w-full bg-stone-600 text-lg flex justify-between div-2 my-2 rounded-lg">
              <div className="p-5 px-6">
                <span className="font-semibold">Title:</span> {data} <span className="font-semibold">| Category:</span> {catIDs}
              </div>
              <div className="flex p-4 px-6">
                {isEditing ? (
                  <div className="flex">
                    <div
                      onClick={() => handleStatusChange('PENDING')}
                      className="p-1 px-4 mx-2 hover:cursor-pointer rounded-lg bg-blue-500"
                    >
                      PENDING
                    </div>
                    <div
                      onClick={() => handleStatusChange('DRAFT')}
                      className="p-1 px-4 mx-2 hover:cursor-pointer rounded-lg bg-blue-500"
                    >
                      DRAFT
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={handleEditClick}
                    className="p-1 px-4 mx-2 hover:cursor-pointer rounded-lg bg-blue-500"
                  >
                    Edit
                  </div>
                )}
                <div className="p-1 ml-4">
                  <span className="font-semibold">Status:</span> {status}
                </div>
                {/* Delete Button */}
                <div
                  onClick={handleDelete}
                  className="p-1 px-4 ml-4 hover:cursor-pointer rounded-lg bg-red-500"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center mt-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="180"
                height="180"
                color="#FFFFFF"
                fill="none"
              >
                <path
                  d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.4141C15.8775 22 14.5961 22 12.0334 22H11.9666C9.40392 22 8.12251 22 7.19929 21.4141C6.72531 21.1273 6.31666 20.7431 5.99917 20.2879C5.35721 19.3671 5.27813 18.0864 5.11974 15.5251L4.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20.5 3.5H3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 3C14 2.44772 13.5523 2 13 2H11C10.4477 2 10 2.44772 10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-center mt-5">
              <p className="text-2xl text-stone-500">Inbox is Empty</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="mx-auto text-center mt-10">
        <p className="text-center text-lg">
          <Link
            className="underline hover:decoration-stone-500"
            href="https://assignment-form.netlify.app/"
          >
            About
          </Link>
          &nbsp; | &nbsp;
          <Link
            className="underline hover:decoration-stone-500"
            href="https://github.com/THUNDERBLD"
          >
            GitHub
          </Link>
        </p>
      </div>
    </div>
  );
}
