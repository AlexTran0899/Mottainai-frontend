import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel, LinearProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

function MerchantForm() {
  const steps = ['Basic Info', 'Shop Details', 'Contact Info', 'Pickup Times'];
  const [activeStep, setActiveStep] = useState(0);
  const [merchant, setMerchant] = useState({
    email: "",
    password: "",
    shop_name: "",
    shop_logo_url: "",
    shop_banner_url: "",
    zipcode: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
    description: "",
    pickup_start_time: null,
    pickup_end_time: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const handleTimeChange = (name, newValue) => {
    setMerchant({ ...merchant, [name]: newValue });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://your-api-endpoint.com/merchants', merchant);
      console.log("Merchant Data Submitted:", response.data);
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField label="Email" name="email" value={merchant.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Password" name="password" value={merchant.password} onChange={handleChange} fullWidth margin="normal" type="password" />
          </>
        );
      case 1:
        return (
          <>
            <TextField label="Shop Name" name="shop_name" value={merchant.shop_name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Shop Logo URL" name="shop_logo_url" value={merchant.shop_logo_url} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Shop Banner URL" name="shop_banner_url" value={merchant.shop_banner_url} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 2:
        return (
          <>
            <TextField label="Zip Code" name="zipcode" value={merchant.zipcode} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Address Line 1" name="address_1" value={merchant.address_1} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="City" name="city" value={merchant.city} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="State" name="state" value={merchant.state} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Country" name="country" value={merchant.country} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 3:
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <TimePicker
                  label="Pickup Start Time"
                  value={merchant.pickup_start_time}
                  onChange={(newValue) => handleTimeChange("pickup_start_time", newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <TimePicker
                  label="Pickup End Time"
                  value={merchant.pickup_end_time}
                  onChange={(newValue) => handleTimeChange("pickup_end_time", newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Box>
            </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Enter Merchant Information</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <LinearProgress variant="determinate" value={(activeStep / steps.length) * 100} sx={{ my: 2 }} />

      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined">Back</Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained">Next</Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default MerchantForm;