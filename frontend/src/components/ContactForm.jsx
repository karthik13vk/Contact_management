import { useState } from "react";
import axios from "axios";

export default function ContactForm({ setContacts }) {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("Interested");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert("Name and Email are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/contacts",
                {
                    name: name.trim(),
                    company: company.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    address: address.trim(),
                    status,
                }
            );

            console.log("Created:", res.data);

            setContacts((prev) => [res.data, ...prev]);

            setName("");
            setCompany("");
            setEmail("");
            setPhone("");
            setAddress("");
            setStatus("Interested");

        } catch (err) {
            console.error("POST ERROR:", err.response?.data || err.message);

            alert(
                err.response?.data?.message ||
                "Failed to create contact"
            );
        }
    };

    return (
        <div>
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Company"
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <select
                    className="w-full rounded-md bg-gray-100 p-3 text-blue-950 outline-none focus:ring-2 focus:ring-blue-950"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Closed">Closed</option>
                </select>

                <button
                    type="submit"
                    className="px-4 py-3 rounded-md text-white w-full mt-3 bg-blue-900 hover:bg-blue-800 transition cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
