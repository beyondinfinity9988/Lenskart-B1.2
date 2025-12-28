const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 
let policies = [];      
let incidents = [];     
let servicesMap = {};   
function getOnCallPerson(serviceName) {
    const policyId = servicesMap[serviceName];
    if (!policyId) return null;
    
    const policy = policies.find(p => p.id === policyId);
    if (!policy || !policy.people || policy.people.length === 0) return null;

    return policy.people[0]; 
}


app.post('/api/policy', (req, res) => {
    const { service_name, people } = req.body; 
    
    if (!service_name || !people) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const newPolicy = {
        id: uuidv4(),
        service_name,
        people
    };

    policies.push(newPolicy);
    servicesMap[service_name] = newPolicy.id;
    
    console.log(`[POLICY] Created for service: ${service_name}`);
    res.json({ message: "Policy Created", id: newPolicy.id });
});

app.post('/api/incident', (req, res) => {
    const { service_name, description } = req.body;

    const onCallPerson = getOnCallPerson(service_name);

    if (!onCallPerson) {
        return res.status(404).json({ error: "No on-call policy found for this service" });
    }

    const newIncident = {
        id: uuidv4(),
        service_name,
        description,
        status: "TRIGGERED", 
        assigned_to: onCallPerson.name,
        contact: onCallPerson.email,
        created_at: new Date().toISOString(),
        history: [`Triggered at ${new Date().toISOString()}`]
    };

    incidents.unshift(newIncident); 
    console.log(`[ALERT] SMS Sent to ${onCallPerson.name} (${onCallPerson.phone}): ${description}`);

    res.json(newIncident);
});

app.get('/api/dashboard', (req, res) => {
    res.json({ incidents, policies });
});

app.post('/api/incident/:id/ack', (req, res) => {
    const { id } = req.params;
    const { user } = req.body; 

    const incident = incidents.find(i => i.id === id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });

    if (incident.status !== "RESOLVED") {
        incident.status = "ACKNOWLEDGED";
        incident.history.push(`Acknowledged by ${user} at ${new Date().toISOString()}`);
        res.json({ status: "success", incident });
    } else {
        res.status(400).json({ error: "Already resolved" });
    }
});

app.post('/api/incident/:id/resolve', (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    const incident = incidents.find(i => i.id === id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });

    incident.status = "RESOLVED";
    incident.history.push(`Resolved by ${user} at ${new Date().toISOString()}`);
    res.json({ status: "success", incident });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});