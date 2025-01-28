const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../schema/Adminschema');
const addadmin = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, username, superadminId } = req.body;

        if (!email || !password || !username || !superadminId) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique database name (e.g., using email or admin ID)
        const databaseName = `admin_${email.replace('@', '_').replace('.', '_')}`;

        // Create a new admin
        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            username,
            superadmin: superadminId,
            status: "active",
            databaseName // Store the database name for future reference
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin added successfully", data: newAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding admin", error: err });
    }
};


const updateadmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { email, password, username, status } = req.body;

        if (!email && !password && !username && !status) {
            return res.status(400).json({ message: "Please provide at least one field to update." });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        if (email) admin.email = email;
        if (password) admin.password = await bcrypt.hash(password, 10);
        if (username) admin.username = username;
        if (status) {
            if (!["active", "inactive", "paused"].includes(status)) {
                return res.status(400).json({ message: "Invalid status provided." });
            }
            admin.status = status;
        }

        await admin.save();
        res.status(200).json({ message: "Admin updated successfully", data: admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating admin", error: err });
    }
};


const deleteadmin = async (req, res) => {
    try {
        const { adminId } = req.params;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        await Admin.findByIdAndDelete(adminId);
        res.status(200).json({ message: "Admin deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting admin", error: err });
    }
};


const pauseadmin = async (req, res) => {
    try {
        const { adminId } = req.params;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        admin.status = "paused";
        await admin.save();

        res.status(200).json({ message: "Admin paused successfully.", data: admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error pausing admin", error: err });
    }
};

module.exports = {
    addadmin,
    updateadmin,
    deleteadmin,
    pauseadmin,
};
