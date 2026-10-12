import axios from "axios";
import loaderimg from "./../../../public/spinning-dots.svg";
import contactnotfound from "./../../../public/contact-not-found.png";
import { useState, useEffect } from "react";

export default function ContactList({ setContacts, contacts }) {
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);

                const query =
                    `?status=${encodeURIComponent(filter)}` +
                    `&search=${encodeURIComponent(search)}`;

                const res = await axios.get(
                    `http://localhost:5000/contacts${query}`
                );

                setContacts(res.data);

            } catch (err) {
                console.error(
                    "GET ERROR:",
                    err.response?.data || err.message
                );
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchContacts();
    }, [filter, search, setContacts]);

    const handleStatusChange = async (id, status) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/contacts/${id}`,
                { status }
            );

            setContacts((prev) =>
                prev.map((contact) =>
                    contact._id === id
                        ? res.data
                        : contact
                )
            );

        } catch (err) {
            console.error(
                "UPDATE ERROR:",
                err.response?.data || err.message
            );
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/contacts/${id}`
            );

            setContacts((prev) =>
                prev.filter((contact) => contact._id !== id)
            );

        } catch (err) {
            console.error(
                "DELETE ERROR:",
                err.response?.data || err.message
            );
        }
    };

    return (
        <>
            <div className="flex gap-10">
                <select
                    className="p-2 rounded bg-blue-900 text-white cursor-pointer outline-0"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow Up</option>
                    <option value="Closed">Closed</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by name or company"
                    className="p-3 rounded w-full bg-gray-100 outline-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="w-full h-80 flex flex-col items-center justify-center rounded p-2.5 mt-2.5 gap-3">
                    <img
                        src={loaderimg}
                        alt="Loading"
                        width={60}
                        height={60}
                    />

                    <p className="text-blue-900 text-2xl font-semibold">
                        Loading...
                    </p>
                </div>
            ) : contacts.length === 0 ? (
                <div className="w-full h-80 flex flex-col items-center justify-center rounded p-2.5 mt-10 gap-3 bg-white">
                    <img
                        src={contactnotfound}
                        alt="No contacts"
                        width={200}
                        height={200}
                    />

                    <p className="text-blue-900 text-2xl font-semibold">
                        No Contact Found
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-10 mt-10">
                    {contacts.map((c) => (
                        <div key={c._id}>
                            <div className="shadow-md rounded bg-gray-200 p-3 hover:shadow-lg transition">

                                <div className="text-sm flex justify-between items-center gap-2 mb-2 bg-gray-100 p-2">
                                    <h3 className="font-bold text-2xl text-blue-900">
                                        {c.name}
                                    </h3>

                                    <p className="font-bold text-sm text-blue-900">
                                        {c.company}
                                    </p>
                                </div>
                                <div className="border border-blue-900 px-2 p-3 rounded">
                                    <div className="flex gap-2 my-3 justify-between ">
                                        <p className="text-sm text-gray-900">
                                            📧 {c.email}
                                        </p>

                                        <p className="text-sm text-gray-900">
                                            📱 {c.phone}
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-900">
                                            🏠 {c.address}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-2 my-3 justify-between">
                                    <select
                                        value={c.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                c._id,
                                                e.target.value
                                            )
                                        }
                                        className="p-2 rounded bg-blue-900 text-white cursor-pointer outline-0 text-sm"
                                    >
                                        <option value="Interested">
                                            Interested
                                        </option>

                                        <option value="Follow-up">
                                            Follow Up
                                        </option>

                                        <option value="Closed">
                                            Closed
                                        </option>
                                    </select>

                                    <button
                                        className="bg-red-500 px-2 py-1.5 text-white rounded-sm cursor-pointer text-sm"
                                        onClick={() =>
                                            handleDelete(c._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
