import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../Redux/UserSlice';
import { supabaseClient } from '../supabaseClient';

function ProfileSetup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.authState.session);

  const [userDetails, setUserDetails] = useState({
    name: '',
    position: '',
    company: '',
    productDescription: ''
  });

  const handleInputChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleUserInfoSubmit = async (event) => {
    event.preventDefault();
    dispatch(setUserInfo(userDetails));

    const { error } = await supabaseClient
    .from('users')
    .update({ isFirstLogin: false })
    .eq('id', session.user.id);

    if (error) {
      console.error('error updating isFirstLogin', error)
    }

    navigate('/')
  };

  return (
    <form onSubmit={handleUserInfoSubmit}>
      <TextField name="name" label="Name" onChange={handleInputChange} />
      <TextField name="position" label="Position" onChange={handleInputChange} />
      <TextField name="company" label="Company" onChange={handleInputChange} />
      <TextField name="productDescription" label="Product Description" onChange={handleInputChange} />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ProfileSetup;