import React, { FC } from 'react'
import { CircularProgress } from '@mui/material'
import { Button } from '@mui/material'
import { useUserProfile } from '@contexts'
import { axiosInstance } from '@utils'
import { toast } from 'react-hot-toast'

export const CanDeleteUlasan = ({canteenId, ulasanId}:any) => {
    const refreshPage = ()=>{window.location.reload()}
    const deleteReview = async () => {
        const data = {
            ulasanId: parseInt(ulasanId)
        }
        axiosInstance
            .post(`/kantin/ulasan/delete/${canteenId}`, data)
            .then((res) => {
                if (res.status == 200) {
                    toast.success(`Delete Review Success`)
                    setTimeout(refreshPage, 1000)

                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.detail ?? 'Something went wrong')
            })
    }

    return (
        <div>
            {useUserProfile().user?.is_admin == true ? (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={deleteReview}>
                    Delete Ulasan
                </Button>
            ) : (
                <></>
            )}
        </div>
    )
}