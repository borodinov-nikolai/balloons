import { Box, Button, Dialog, DialogContent, DialogTitle, FormLabel, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';

import style from './../Artist.module.scss'
interface BookProps {
  open: boolean,
  setState: Function,
  username: string | undefined
}
const BookModal: FC<BookProps> = ({open, setState, username}: BookProps) => {
  const onClose = () => {
    setState(false)
  }
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Box  className={style.modalHeader}><Typography variant='h2'>{username}</Typography></Box>
          <Box><Typography>Заполните поля:</Typography></Box>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <TextField required className={style.textField} label={"Имя"}></TextField>
            <TextField required className={style.textField} label={'Нормер телефона'}></TextField>
            <TextField required className={style.textField}  label={'E-mail'}></TextField>
            <FormLabel required>Дата мероприятия</FormLabel>
            <TextField required className={style.textField} type='date'></TextField>
            <TextField required className={style.textField} multiline label={'Сообщение'}></TextField>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
           <Button variant='contained' className={style.book__button} >Заказать</Button> 
          </Box>
          
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookModal;