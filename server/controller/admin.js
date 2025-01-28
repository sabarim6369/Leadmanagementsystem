const Lead = require("../schema/leadschema");
const Telecaller = require("../schema/telecallerschema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../schema/Adminschema');
const mongoose = require('mongoose');
const {connectToDatabase} = require('../config/db');  // Import the connection handler

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "Admin not found." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const databaseName = admin.databaseName;

        const adminDbUri = process.env.MONGODB_URI.replace("<Database>", databaseName);

        await connectToDatabase(adminDbUri);

        const token = jwt.sign({ adminId: admin._id, databaseName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in", error: err });
    }
};

const addtelecaller = async (req, res) => {
    try {
        const { email, password, username, number, adminId } = req.body;  
        if (!email || !password || !username || !number || !adminId) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const existingTelecaller = await Telecaller.findOne({ email });
        if (existingTelecaller) {
            return res.status(400).json({ message: "Telecaller with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTelecaller = new Telecaller({
            email,
            password: hashedPassword,
            username,
            number,
            admin: adminId, 
            leads: [],
            history: []
        });

        await newTelecaller.save();
       

        res.status(201).json({ message: "Telecaller added successfully", data: newTelecaller });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding telecaller", error: err });
    }
};

const updatetelecaller = async (req, res) => {
    try {
        const { telecallerId } = req.params;
        const { email, password, username, number, status } = req.body;

        if (!email && !password && !username && !number && !status) {
            return res.status(400).json({ message: "Please provide at least one field to update." });
        }

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        if (email) telecaller.email = email;
        if (password) telecaller.password = await bcrypt.hash(password, 10);
        if (username) telecaller.username = username;
        if (number) telecaller.number = number;
        if (status) telecaller.status = status;

        await telecaller.save();
        res.status(200).json({ message: "Telecaller updated successfully", data: telecaller });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating telecaller", error: err });
    }
};

const deletetelecaller = async (req, res) => {
    try {
        const { telecallerId } = req.params;

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        await Telecaller.findByIdAndDelete(telecallerId);
        res.status(200).json({ message: "Telecaller deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting telecaller", error: err });
    }
};

const assignleads = async (req, res) => {
    try {
        const { telecallerId, leadIds } = req.body;  
        if (!telecallerId || !Array.isArray(leadIds) || leadIds.length === 0) {
            return res.status(400).json({ message: "Please provide telecaller ID and lead IDs." });
        }

        const telecaller = await Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        const leads = await Lead.find({ '_id': { $in: leadIds } });
        if (leads.length !== leadIds.length) {
            return res.status(404).json({ message: "Some leads not found." });
        }

        telecaller.leads.push(...leads.map(lead => lead._id));
        await telecaller.save();

        for (const lead of leads) {
            lead.assignedTo.push(telecaller._id);
            await lead.save();
        }

        res.status(200).json({ message: "Leads assigned successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error assigning leads", error: err });
    }
};

const swapleads = async (req, res) => {
    try {
        const { telecallerId1, telecallerId2, leadId } = req.body;

        if (!telecallerId1 || !telecallerId2 || !leadId) {
            return res.status(400).json({ message: "Please provide both telecaller IDs and lead ID." });
        }

        const telecaller1 = await Telecaller.findById(telecallerId1);
        const telecaller2 = await Telecaller.findById(telecallerId2);
        const lead = await Lead.findById(leadId);

        if (!telecaller1 || !telecaller2 || !lead) {
            return res.status(404).json({ message: "One or more records not found." });
        }

        telecaller1.leads = telecaller1.leads.filter(leadId => leadId.toString() !== lead._id.toString());
        await telecaller1.save();

        telecaller2.leads.push(lead._id);
        await telecaller2.save();

        lead.assignedTo = lead.assignedTo.filter(telecallerId => telecallerId.toString() !== telecaller1._id.toString());
        lead.assignedTo.push(telecaller2._id);
        await lead.save();

        res.status(200).json({ message: "Leads swapped successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error swapping leads", error: err });
    }
};

const addleads = async (req, res) => {
    try {
        const leadsData = req.body;

        if (!Array.isArray(leadsData) || leadsData.length === 0) {
            return res.status(400).json({ message: "No data provided or invalid format." });
        }

        const leads = leadsData.map((lead) => {
            return {
                name: lead.name,
                mobilenumber: lead.mobilenumber,
                address: lead.address || "",
                status: lead.status || "unassigned",
                assignedTo: lead.assignedTo || [],
            };
        });

        const result = await Lead.insertMany(leads);
        res.status(201).json({ message: "Leads uploaded successfully", data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading leads", error: err });
    }
};

module.exports = {
    addtelecaller,
    updatetelecaller,
    deletetelecaller,
    assignleads,
    swapleads,
    addleads,
    login
};
