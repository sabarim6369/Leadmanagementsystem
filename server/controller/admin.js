const Lead = require("../schema/leadschema"); 
const Telecaller = require("./models/Telecaller");  
const bcrypt = require("bcryptjs"); 
const addtelecaller = async (req, res) => {
    try {
        const { email, password, username} = req.body;

        if (!email || !password || !username) {
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


const updatetelecaller=(req,res)=>{

}
const deletetelecaller=(req,res)=>{

}
const assignleads=(req,res)=>{

}
const swapleads=(req,res)=>{

}

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