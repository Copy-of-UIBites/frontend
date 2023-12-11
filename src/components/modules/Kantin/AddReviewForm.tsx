
'use client'
import { MultiTextfield } from '@elements'
import { Button, TextField } from '@mui/material'
import { axiosInstance } from '@utils'
import { useRouter } from 'next/navigation'

import React from 'react'
import toast from 'react-hot-toast'

import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Box,
    Select,
    MenuItem,
} from '@mui/material'

export const AddReviewForm = ({ kantin }: any) => {
    const [review, setReview] = React.useState('')
    const [rating, setRating] = React.useState('')
    const [fotoUrls, setFoto] = React.useState<string[]>([])

    const refreshPage = ()=>{window.location.reload()}
    const postReview = async (e:any) => {
        const data = {
            review: review,
            rating: parseInt(rating, 10),
            foto: fotoUrls,
        }
        axiosInstance
            .post(`/kantin/ulasan/create/${kantin.id}`, data)
            .then((res) => {
                if (res.status == 201) {
                    toast.success('Add Review Success')
                    setTimeout(refreshPage, 1000)
                    
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.detail ?? 'Something went wrong')
            })
    }

    return (
        <>
            <center><h1><b>Add Review</b></h1></center>
            <FormControl className='mt-4'>
                <InputLabel htmlFor="review">Review *</InputLabel>
                <Input required id="review" onChange={(e) => { setReview(e.target.value) }} />
                <Box sx={{ minWidth: 120 }} className='mt-4 mb-8'>
                    <FormControl fullWidth>
                        <InputLabel id="rating">Rating *</InputLabel>
                        <Select
                            labelId="rating"
                            id="select_rating"
                            value={rating}
                            label="Rating"
                            onChange={(e) => { setRating(e.target.value) }}
                            required={true}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>

                    </FormControl>
                </Box>
                <MultiTextfield
                    label="Add Foto"
                    fields={fotoUrls}
                    setFields={setFoto}
                />
            </FormControl>
            <center>
                <Button
                    variant="outlined"
                    onClick={(e)=>{postReview(e)}}
                    className="mb-4 mt-10"
                >
                    Submit
                </Button>
            </center>
        </>
    )

}