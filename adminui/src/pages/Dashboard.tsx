import styled from "@emotion/styled";
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
    margin-bottom: 100px
`
const CardsRow = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`
export const Dashboard = () => {
    return (
        <Container>
            <WidgetContainer>
                <CardsRow>
                    {[1, 2, 3, 4].map((card) => (
                        <div key={card} style={{ width: 275, height: 200, background: '#fff' }}>
                            Card {card}
                        </div>
                    ))}
                </CardsRow>
            </WidgetContainer>
        </Container>
    )
}