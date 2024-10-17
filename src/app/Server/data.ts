// pages/api/data.js
const storedData = []; // Temporary storage

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newData = req.body; // Assuming body-parser is configured
    storedData.push(newData); // Store the incoming data
    return res.status(201).json(newData); // Respond with the created data
  } else if (req.method === 'GET') {
    return res.status(200).json(storedData); // Respond with stored data
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}