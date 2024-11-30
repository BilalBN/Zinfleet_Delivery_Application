import React from 'react';
import styled from "@emotion/styled";
import {
  Dialog,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Content = styled.div`
display: flex;
justify-content: space-between;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Right = styled.div` 
display: flex;
flex-direction: column;
gap: 5px;
align-items: flex-start;
`
type OrderDialogProps = {
  open: boolean,
  onClose: (_event: React.MouseEvent, reason: string) => void
  handleClickOpen: (value: boolean) => void
}

export const OrderDialog = ({ open, onClose, handleClickOpen }: OrderDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Header>
        <IconButton
          onClick={() => {
            handleClickOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Header>
      <DialogContent>
        <Content>

          <Right>
            <Typography variant="body2" color="orange">
              Order ID: #59217
            </Typography>
            <Typography variant="body2" gutterBottom>
              Billed to
            </Typography>

            <Typography variant="body2">Rinshad</Typography>
            <Typography variant="body2"> Box No. 11272,Dubai</Typography>
          </Right>
          <Left>

            <Typography variant="body2" align="left">
              Date
            </Typography>
            <Typography variant="body2" gutterBottom>
              20-11-2024
            </Typography>
          </Left>
        </Content>

        <Divider sx={{ marginY: 2 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Line total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Mobile Phone</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="right">25,000</TableCell>
                <TableCell align="right">25,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Men's Black Shirt</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="right">2,000</TableCell>
                <TableCell align="right">2,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ marginTop: 2 }}
        >
          <Typography variant="h6" color="orange">
            Total: 27,000
          </Typography>
        </Box>
      </DialogContent>
      <Divider />
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Typography variant="body2">www.luluwarehouse.com</Typography>
        <Typography variant="body2">+91 00000 00000</Typography>
        <Typography variant="body2">luluwarehouse@email.com</Typography>
      </Box>
    </Dialog>
  );
};
