import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: String,
            trim: true,
            default: "",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },



        status: {
            type: String,
            enum: ["Interested", "Follow-up", "Closed"],
            default: "Interested",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Contact", contactSchema);
