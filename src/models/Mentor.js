import { Gender, Industry } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const mentorSchema = new Schema({
    isUniversityTeacher: {
        type: Boolean,
        required: true
    },
    canSupervise: {
        type: Boolean,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.keys(Gender),
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    bio: {
        type: String,
        required: true
    },
    industries: [{
        type: String,
        enum: Object.keys(Industry)
    }],
    contact: {
        type: String,
        required: true
    }, 
    roomNum: {
        type: String,
        default: null
    },
    officeHours: {
        type: [{
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            },
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
        }],
        validator: function (value) {
            return value.length < 8;
        },
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    pastProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
},{timestamps: true})

const Mentor = models.Mentor || model('Mentor', mentorSchema);
export default Mentor;
