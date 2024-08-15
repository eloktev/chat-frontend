import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';




export default function BasicCard({ topic }) {
  // const navigate = useNavigate();
  return (
    <Link to={`/chat/${topic.id}`} >
    <Box sx={{ p: 1 }}>
        <Chip label={topic.caption} variant="outlined"/>
    </Box>
    </Link>
  );
}
