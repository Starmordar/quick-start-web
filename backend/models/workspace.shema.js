const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    categoty: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    dateString: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true
    }
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);
module.exports = Workspace;