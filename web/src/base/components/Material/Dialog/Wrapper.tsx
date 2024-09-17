import { Dialog, DialogProps, styled } from '@mui/material';

const Wrapper = styled((props: DialogProps) => <Dialog {...props} />)(() => ({}));

export default Wrapper;
