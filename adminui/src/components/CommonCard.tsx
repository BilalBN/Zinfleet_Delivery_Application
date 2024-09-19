import styled from "@emotion/styled";
import Background from '../assets/images/cardbackground.png'
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
type cardType = 'FLEET' | 'ORDER' | 'SHOP'
const Container = styled.div`
  box-sizing: border-box;
  width: 370px;
  height: 170px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 16px;
  position: relative;
`

const CardBackground = styled.img`
  position: absolute;
  width: 270px;
  height: 140px;
  right: -12px;
  rotate: -5deg;
  top: 5px;
`

const Header = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const IconContainer = styled.div`
  width:56px;
  height: 56px;
  border-radius: 50px;
  background-color: #D7E4ED;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CardTitle = styled.div`
  font-weight: 500;
`
const Count = styled.div`
  font-size: 64px;
  color: #0066AD;
`
const CommonCard = ({ title, value, type }: { title: string, value: number, type: cardType }) => {
  const getIconBasedOnType = () => {
    switch (type) {
      case 'FLEET':
        return <ManageAccountsIcon sx={{ color: '#0066AD' }} />
      case 'ORDER':
        return <ListAltIcon sx={{ color: '#0066AD' }} />
      case 'SHOP':
        return <StorefrontIcon sx={{ color: '#0066AD' }} />
    }
  }
  return (<Container>
    <CardBackground src={Background} />
    <Header>
      <IconContainer>
        {getIconBasedOnType()}
      </IconContainer>
      <CardTitle>{title}</CardTitle>
    </Header>
    <Count>{value}</Count>

  </Container>);
};

export default CommonCard;
