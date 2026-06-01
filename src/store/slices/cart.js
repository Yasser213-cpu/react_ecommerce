import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find(item => item.id === product.id)
            if (existingItem) existingItem.quantity += 1
            else state.items.push({ ...product, quantity: 1 })
            
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload
            const item = state.items.find(item => item.id === productId)
            if (item) item.quantity += 1
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload
            const item = state.items.find(item => item.id === productId)
            if (item) {
                if (item.quantity > 1) item.quantity -= 1
                else state.items = state.items.filter(item => item.id !== productId)
            }
        
                
        },
        removeFromCart: (state, action) => {
            const productId = action.payload
            state.items = state.items.filter(item => item.id !== productId)
            
            
        }

    }
});
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer