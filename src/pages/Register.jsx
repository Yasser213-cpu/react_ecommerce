import  { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper,  } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.name) tempErrors.name = "Name is required";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email format";
    if (!formData.username || formData.username.includes(' ')) tempErrors.username = "Username required & no spaces";
    if (!passwordRegex.test(formData.password)) tempErrors.password = "Password must be 8+ chars, with upper, lower, digit & special char";
    if (formData.confirmPassword !== formData.password) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formData, null, 2));
      navigate('/'); // Redirect to products list
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Register</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField fullWidth label="Name" margin="normal" error={!!errors.name} helperText={errors.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <TextField fullWidth label="Email" margin="normal" error={!!errors.email} helperText={errors.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <TextField fullWidth label="User Name" margin="normal" error={!!errors.username} helperText={errors.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <TextField fullWidth type="password" label="Password" margin="normal" error={!!errors.password} helperText={errors.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <TextField fullWidth type="password" label="Confirm Password" margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, py: 1.5 }}>Register</Button>
        </Box>
      </Paper>
    </Container>
  );
}