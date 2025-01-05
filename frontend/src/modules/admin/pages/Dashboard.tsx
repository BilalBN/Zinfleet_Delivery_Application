import styled from "@emotion/styled";
import CommonCard from "../components/CommonCard";
import LineChart from "../components/LineChart";
import CustomPieChart from "../components/PieChart";
import { ManagersActitvity } from "../../../types/chart";
const data: ManagersActitvity[] = [
    { name: 'Manager A', value: 50, color: '#00C49F' },
    { name: 'Manager B', value: 80, color: '#FFBB28' },
    { name: 'Manager C', value: 50, color: '#0088FE' },
    { name: 'Manager D', value: 50, color: '#FF8042' },
];
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
`
const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    width: 100%;
    margin-bottom: 100px;
    gap: 10px;
`
const CardsRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`
const ChartContainer = styled.div`
    display: flex;
    gap: 10px;
`
const LineChartContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    flex: 2;
    height: 350px;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 10px 20px 10px;
`
const PieChartContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    flex: 1;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 10px 20px 10px;flex-direction: column;

`
const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 30px;
`
const Title = styled.div`
    font-weight: 500;
`
const Count = styled.div`
    font-size: 18px;
    font-weight: 700;
    span{
        color: #217CB9;
        font-size: 10px;
        font-weight: 400;
    }
`
const Legends = styled.div`
    display: flex;
    gap: 20px;
    padding-left: 30px;
`

const LegendRow = styled.div`
 display: flex;
 gap: 10px;
 align-items: center;
`
const Legend = styled.div<{ color: string }>`
    width: 10px;
    height: 10px;
    background-color:${(props) => props.color};;
`
export const Dashboard = () => {
    return (
        <Container id="admin-dashboard">
            <WidgetContainer>
                <CardsRow>
                    <CommonCard type={'FLEET'} value={50} title="Total Fleet Managers" />
                    <CommonCard type={'SHOP'} value={40} title="Total Shops" />
                    <CommonCard type={'ORDER'} value={30} title="Total Orders" />

                </CardsRow>

                <ChartContainer>
                    <LineChartContainer>
                        <Header>
                            <Title>
                                Total Orders
                            </Title>
                            <Count>12.4K <span>+10.7% last month</span></Count>
                        </Header>
                        <LineChart />
                    </LineChartContainer>
                    <PieChartContainer>
                        <Header>
                            <Title>
                                Fleet manager's activity
                            </Title>
                        </Header>
                        <CustomPieChart data={data} />
                        <Legends>
                            {data.map((item) => (
                                <LegendRow>
                                    <Legend color={item.color}></Legend>
                                    <Title>{item.name}</Title>
                                </LegendRow>
                            ))}
                        </Legends>
                    </PieChartContainer>
                </ChartContainer>
            </WidgetContainer>
        </Container>
    )
}