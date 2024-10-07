import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string;
    username: Schema.Types.ObjectId,
    createdAt: Date,
}

interface IThought extends Document {
    thoughtText: string, 
    createdAt: Date,
    username: Schema.Types.ObjectId, 
    
    reactions?: Schema.Types.ObjectId[], 
    
}
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 128,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => new Date(timestamp),
        }
    },
    {
        toJSON: { getters: true },
        _id: false,
    }
)

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 128,
        },
        createdAt:{
            type: Date,
            default: Date.now, 
            get: (timestamp: Date) => new Date(timestamp),
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: { getters: true },
    }
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;