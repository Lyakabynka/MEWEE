import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthStore } from "../../../entities";
import { useFormik } from 'formik'; // Import Formik library
import * as Yup from 'yup'; // Import Yup for validation
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import LOGO from './images/logo.png'
import './index.css'

export function AuthHeaderForm() {

    

    return (
        <div className='header-content'>
            <div></div>
        </div>
    );
}
