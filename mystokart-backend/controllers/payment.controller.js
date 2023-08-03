const {catchAsyncError} = require('../middlewares/catchAsyncError')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

exports.createPayment = catchAsyncError(async (req, res, next)=>{
    const {total} = req.body
    console.log(total)
})
