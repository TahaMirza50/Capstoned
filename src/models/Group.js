import { Approval } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: null
    },
    selectedProposal: {
        type: [{
            proposal: {
                type: Schema.Types.ObjectId,
                ref: 'Proposal',
                default: null,
            },
            status: {
                type: String,
                enum: Object.keys(Approval)
            }
        }],
        validator: function (v) {
            return v.length <= 5;
        }
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null
    },
    mentors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mentor'
        }
    ],
    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Group = models.Group || model('Group', groupSchema);
export default Group;
