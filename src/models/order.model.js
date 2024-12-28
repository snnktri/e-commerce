import mongoose, {Schema} from "mongoose";

const orderItemsSchema = new Schema({
    prouctId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "DELEVERED", "CANCELLED"],
        default: "PENDING"
    },
}, {timestamps: trye});

export const Order = mongoose.model("Order", orderSchema);