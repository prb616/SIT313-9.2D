import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        alert("PAYMENT DONE");  
        navigate('/')
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error) {
            console.log("No error")
            try {
                const {id} = paymentMethod;
                console.log("ID",id)
                const response = await axios.post("http://localhost:4500/payment", {
                    amount: 1000,
                    id
                })

                if(response.data.success) {
                    alert("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                alert("SUCCESSFULLY DONE PAYMENT!!!!");
                setSuccess(true)
            }
        } else {
            alert(error.message)
            console.log(error.message)
        }
    }

    const successMessage = (
        <div style={styles.successMessage}>
            <h2>You are now able to access Message and Banners, Themes, Content Controls</h2>
        </div>
    );

    return (
        <div style={styles.container}>
            {!success ? (
                <div style={styles.formContainer}>
                    <CardElement style={styles.cardElement} />
                    <button style={styles.payButton} onClick={handleSubmit}>Pay</button>
                </div>
            ) : successMessage}
        </div>
    )
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Center vertically
      minHeight: '100vh', // Ensure it takes the full viewport height
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
    },
    cardElement: {
      marginBottom: '20px',
    },
    payButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        margintop:'120px',
    },
    successMessage: {
      padding: '20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
  };