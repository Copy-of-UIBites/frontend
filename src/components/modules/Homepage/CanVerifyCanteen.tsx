import React, { FC } from 'react'
import { CircularProgress} from '@mui/material'
import { Button } from '@mui/material'
import { useUserProfile } from '@contexts'
import { axiosInstance } from '@utils'

export const CanVerifyCanteen = () => {
  return (
    <div>
      {useUserProfile().user?.is_admin == true ? (
        <Button 
        variant="outlined"
        onClick={()=>{window.location.replace('/kantin/verification')}}>
        Verify Canteen
      </Button>
      ) : (
        <></>
      )}
    </div>
  )
}