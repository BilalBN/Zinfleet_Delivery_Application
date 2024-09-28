import TimerIcon from '@mui/icons-material/Timer';
import StopIcon from '@mui/icons-material/Stop';
import styled from "@emotion/styled";
const Counter = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`
const TimerItem = styled.div`
  border: 1px solid #D40000;
    width: 24px;
    height: 17px;
    display: flex;
    align-items: center;
    font-size: 13px;
    justify-content: center;
    color: #D40000;
    font-family: 'Bai Jamjuree', sans-serif;;
`
const Timer = () => {
    return (<Counter>
        <TimerIcon sx={{ color: '#D40000' }} />
        <TimerItem>09</TimerItem>
        <TimerItem>00</TimerItem>
        <StopIcon sx={{ color: '#D40000' }} />
    </Counter >);
};

export default Timer;
