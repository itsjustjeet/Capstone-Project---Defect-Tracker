const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database: Array of defects
let defects = [
  {
    id: uuidv4(),
    title: 'Login page displays blank',
    description: 'User unable to see login form after clearing cache',
    priority: 'High',
    status: 'Open',
    assignedTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Database connection timeout',
    description: 'Backend occasionally throws timeout errors on POST requests',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'John Dev',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: uuidv4(),
    title: 'Styling issue on mobile devices',
    description: 'Dashboard layout breaks on screens smaller than 400px',
    priority: 'Medium',
    status: 'Open',
    assignedTo: null,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// ===== API ENDPOINTS =====

// GET: Retrieve all defects
app.get('/api/defects', (req, res) => {
  res.json({
    success: true,
    data: defects,
    count: defects.length
  });
});

// GET: Retrieve a single defect by ID
app.get('/api/defects/:id', (req, res) => {
  const defect = defects.find(d => d.id === req.params.id);
  if (!defect) {
    return res.status(404).json({
      success: false,
      message: 'Defect not found'
    });
  }
  res.json({
    success: true,
    data: defect
  });
});

// POST: Create a new defect
app.post('/api/defects', (req, res) => {
  const { title, description, priority } = req.body;

  // Validation
  if (!title || !description || !priority) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: title, description, priority'
    });
  }

  const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid priority. Must be: Low, Medium, High, or Critical'
    });
  }

  const newDefect = {
    id: uuidv4(),
    title,
    description,
    priority,
    status: 'Open', // Default status
    assignedTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  defects.push(newDefect);

  res.status(201).json({
    success: true,
    message: 'Defect created successfully',
    data: newDefect
  });
});

// PUT: Update a defect (status, assignedTo, description)
app.put('/api/defects/:id', (req, res) => {
  const { status, assignedTo, description } = req.body;
  const defect = defects.find(d => d.id === req.params.id);

  if (!defect) {
    return res.status(404).json({
      success: false,
      message: 'Defect not found'
    });
  }

  // Validate status if provided
  if (status) {
    const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: Open, In Progress, Resolved, or Closed'
      });
    }
    defect.status = status;
  }

  if (assignedTo !== undefined) {
    defect.assignedTo = assignedTo || null;
  }

  if (description) {
    defect.description = description;
  }

  defect.updatedAt = new Date().toISOString();
  res.json({
    success: true,
    message: 'Defect updated successfully',
    data: defect
  });
});

// DELETE: Delete a defect
app.delete('/api/defects/:id', (req, res) => {
  const index = defects.findIndex(d => d.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Defect not found'
    });
  }

  const deletedDefect = defects.splice(index, 1)[0];
  res.json({
    success: true,
    message: 'Defect deleted successfully',
    data: deletedDefect
  });
});

// GET: Statistics (for dashboard insights)
app.get('/api/stats', (req, res) => {
  const stats = {
    totalDefects: defects.length,
    byStatus: {
      Open: defects.filter(d => d.status === 'Open').length,
      'In Progress': defects.filter(d => d.status === 'In Progress').length,
      Resolved: defects.filter(d => d.status === 'Resolved').length,
      Closed: defects.filter(d => d.status === 'Closed').length
    },
    byPriority: {
      Low: defects.filter(d => d.priority === 'Low').length,
      Medium: defects.filter(d => d.priority === 'Medium').length,
      High: defects.filter(d => d.priority === 'High').length,
      Critical: defects.filter(d => d.priority === 'Critical').length
    }
  };

  res.json({
    success: true,
    data: stats
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
  Defect Tracking & Management System (DTMS)        
  Server running on http://localhost:${PORT}        
  Frontend: http://localhost:${PORT}                
  API Base: http://localhost:${PORT}/api            

  `);
});

module.exports = app;
