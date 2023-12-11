"use client"
import { BuildingStorefrontIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { Button, Card, Typography } from "@mui/material"
import { axiosInstance } from "@utils"
import React from "react"
import toast from "react-hot-toast"
import { Kantin } from "./type"

export const VerifyCanteen = () => {
    const [canteens, setCanteens] = React.useState<Kantin[]>([])
    const status = false
    React.useEffect(() => {
        axiosInstance
            .get(`/kantin/unverified`)
            .then((res) => {
                if (res.status == 200) {
                    setCanteens(res.data)
                } else {
                    toast.error('Something Wrong')
                }
            })
    }, [])

    const refreshPage = () => { window.location.reload() }
    const updateVerificationStatus = async (action: any, status: any, id: any) => {
        const data = {
            status_verifikasi: status
        }
        axiosInstance
            .patch(`/kantin/verify/${id}`, data)
            .then((res) => {
                if (res.status == 200) {
                    toast.success(`${action} Kantin Regristration Success`)
                    setTimeout(refreshPage, 1000)

                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.detail ?? 'Something went wrong')
            })
    }


    return (
        <div>
            {canteens.length != 0 ?
                (<>
                    {canteens.map((data, index) => {
                        return (
                            <>
                                <Card className="flex flex-col gap-4 p-4" variant='outlined'>
                                    <Typography variant="h5" component="div">
                                        {data.nama}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        className="flex flex-row gap-2 items-centr"
                                    >
                                        <span>
                                            <BuildingStorefrontIcon className="w-5" />
                                        </span>
                                        {data.lokasi}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="flex flex-row gap-2 items-centr"
                                    >
                                        <span>
                                            <InformationCircleIcon className="w-5" />
                                        </span>
                                        {data.deskripsi}
                                    </Typography>
                                    <center>
                                        <Button
                                            variant="outlined"
                                            color='error'
                                            className="mb-4 mr-2"
                                            onClick={() => { updateVerificationStatus("Reject", "Tidak terverifikasi", data.id) }}
                                        >
                                            Reject
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            className="mb-4 ml-2"
                                            onClick={() => { updateVerificationStatus("Accept", "Terverifikasi", data.id) }}
                                        >
                                            Accept
                                        </Button>
                                    </center>
                                </Card>
                            </>

                        )
                    })}

                </>) :
                (<>
                    <Typography variant="h5" component="div">
                        All canteens have been verified
                    </Typography>


                </>)}


        </div>

    )
}