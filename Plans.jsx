import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Plans = () => {

    const navigate = useNavigate()

const handleFree =()=>{
     navigate("/home")
}
const handlePay =()=>{
     navigate("/payment")
}

  return (
    <div style={styles.container}>
    <h1 onClick={handleFree} style={styles.planCard}>
      If you want to go with <span style={styles.highlightedText}>Free</span> Plan.
    </h1>
    <h1 onClick={handlePay} style={styles.planCard}>
      If you want to go with the premium plan, pay <span style={styles.price}>INR 100</span>.
    </h1>
  </div>
);
};

const styles = {
container: {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
  padding: '20px',
},
planCard: {
  width: '95%',
  padding: '20px',
  textAlign: 'center',
  border: '1px solid #4CAF50',
  backgroundColor: '#FFFFFF',
  margin: '10px',
  cursor: 'pointer',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
},
highlightedText: {
  color: '#FF5733',
},
price: {
  color: '#4CAF50',
  fontWeight: 'bold',
},
};