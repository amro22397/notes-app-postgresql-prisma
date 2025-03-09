import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({

    noteName: {
        type: String,
      },
      noteContent: {
        type: String,
      },
    
      dateCreation: {
        type: Date,
        // default: Date.now(),
      },

      isPinned: {
        type: Boolean,
        default: false,
      },

      isLocked: {
        type: Boolean,
        default: false,
      },

      emailRef: {
        type: String,
      },

      lockedPassword: {
        type: String,
      },

      categories: {
        type: [String],
      },
      
}, { timestamps: true });

const Note = mongoose.models?.Note || mongoose.model("Note", noteSchema);

export default Note;