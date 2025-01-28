const Telecaller = require("../schema/telecallerschema");
const Lead = require("../schema/leadschema");

const updateLeadResult = async (req, res) => {
    try {
        const { telecallerId, leadId, action, notes } = req.body;

        if (!telecallerId || !leadId || !action) {
            return res.status(400).json({ message: "Telecaller ID, Lead ID, and action are required." });
        }

        const telecaller = await req.db.Telecaller.findById(telecallerId);
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        const lead = await req.db.Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found." });
        }

        const validStatuses = ["unassigned", "warm", "cold", "hot", "fulfilled"];
        if (!validStatuses.includes(action)) {
            return res.status(400).json({ message: `Invalid action provided. Valid actions: ${validStatuses.join(", ")}.` });
        }

        lead.status = action;
        await lead.save();

        telecaller.history.push({
            leadId: lead._id,
            action,
            notes,
        });

        await telecaller.save();

        res.status(200).json({ message: "Lead result updated successfully.", lead });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating lead result.", error: err });
    }
};

const getAssignedLeads = async (req, res) => {
    try {
        const { telecallerId } = req.params;

        const telecaller = await req.db.Telecaller.findById(telecallerId).populate("leads");
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        res.status(200).json({ leads: telecaller.leads });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching assigned leads.", error: err });
    }
};

const getTelecallerHistory = async (req, res) => {
    try {
        const { telecallerId } = req.params;

        const telecaller = await req.db.Telecaller.findById(telecallerId).populate("history.leadId");
        if (!telecaller) {
            return res.status(404).json({ message: "Telecaller not found." });
        }

        res.status(200).json({ history: telecaller.history });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching telecaller history.", error: err });
    }
};

module.exports = {
    updateLeadResult,
    getAssignedLeads,
    getTelecallerHistory,
};
