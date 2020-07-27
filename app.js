const express = require('express')
const ejs = require('ejs')
const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ATMwZy6nb4SnFq73_D02lJIKe28MZtVOv4XZT7RITwnjAgnWMBcCsIxxtD8lNtTV-fpzlK4KZnKD-hr9',
    'client_secret': 'ELuulwmMm2LAP1rAlFXOwg2RaHw1Vg1PmGM1Ek86kMJCBCq1svtMY6MKDKurkBaChSUjHsr1qDxIQPzb'
  });

const app = express()

app.set('view engine','ejs');

app.get('/',(req,res) => res.render('index'))

app.post('/pay',(req,res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Watch",
                    "sku": "001",
                    "price": "1000.00",
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1000.00"
            },
            "description": "You purchased a hat."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.send('test')
        }
    });
})

app.listen(3000,() => console.log('Server is up on port 3000'))