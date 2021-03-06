import React, {useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography, Circularprogress,Divider,Button} from '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';

const steps = ['Shipping address','Payment details']
const Checkout = ({cart}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep]=useState(0);
    const [checkoutToken, setCheckoutToken]=useState([]);

    useEffect(()=>{
        const generateToken=async()=>{
            
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log(token)
                setCheckoutToken(token);
                console.log(checkoutToken);
            } catch (error) {
                
            }
        }
        generateToken();
    },[])

    const Confirmation =()=>(
        <div>
            Confirmation
        </div>
    )
    
    const Form =()=>activeStep === 0
        ? <AddressForm />
        : <PaymentForm />
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={0} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length? <Confirmation />:<Form />}

                </Paper>

            </main>
        </>
    )
}

export default Checkout
