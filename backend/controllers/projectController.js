const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, location, areaHectares, projectType, startDate, endDate, metadata } = req.body;

    if (!title) return res.status(400).json({ message: 'title is required' });

    // use authenticated user as owner if present
    const owner = req.user?.id || req.body.owner;
    if (!owner) return res.status(400).json({ message: 'owner is required' });

    const project = new Project({
      title,
      description,
      owner,
      location,
      areaHectares,
      projectType,
      startDate,
      endDate,
      metadata,
    });

    await project.save();
    return res.status(201).json({ project });
  } catch (err) {
    console.error('createProject error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get list of projects with optional filters
exports.getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.owner) filter.owner = req.query.owner;
    if (req.query.status) filter.status = req.query.status;

    const projects = await Project.find(filter).populate('owner', 'name email role').sort({ createdAt: -1 });
    return res.json({ count: projects.length, projects });
  } catch (err) {
    console.error('getProjects error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a single project by id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email role');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.json({ project });
  } catch (err) {
    console.error('getProjectById error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update project (owner or admin)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const requester = req.user; // may be undefined for unauthenticated
    if (requester && requester.role !== 'admin' && project.owner.toString() !== requester.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // apply allowed updates
    const allowed = ['title', 'description', 'location', 'areaHectares', 'projectType', 'startDate', 'endDate', 'status', 'metadata', 'images', 'documents'];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) project[key] = req.body[key];
    });

    await project.save();
    return res.json({ project });
  } catch (err) {
    console.error('updateProject error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete project (owner or admin)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const requester = req.user;
    if (requester && requester.role !== 'admin' && project.owner.toString() !== requester.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await project.deleteOne();
    return res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('deleteProject error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
