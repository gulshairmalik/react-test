import React from "react"
import {Button,Dialog,DialogActions,DialogContent,DialogTitle} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

 const SuccessMsg = () => {
     
  const [open, setOpen] = React.useState(true)

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <Alert>Your course has been successfully registered.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SuccessMsg