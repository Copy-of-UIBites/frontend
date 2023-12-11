import React from 'react'
import { Button } from '@mui/material'
import { useUserProfile } from '@contexts'

export const CanVerifyKantin = () => {
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