import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"

// @ts-ignore
export default function Confirm({ open, text, onSuccess }) {
  return (
    <Dialog open={open} fullWidth>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={onSuccess}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
