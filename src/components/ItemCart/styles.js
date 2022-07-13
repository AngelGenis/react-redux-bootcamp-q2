import styled from 'styled-components';

export const ItemCartWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 24px;
    border-top: 1px solid #CCCCCC;
`;

export const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F0F0F0;
    border-radius: 10px;
`;

export const ItemContent = styled.div`
    padding-left:  20px;
    width: calc(80% - 200px);
`;

export const TotalPriceContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    padding-right: 20px ;
`;

export const ItemTitle = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 10px;
    color: #000000;

`;

export const PriceText = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 24px;
    color: #707070;
`;

export const CounterContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    width: 91px;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;


export const TotalPrice = styled.p`
    font-family: 'Roboto';
    font-style: normal; 
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #0A0A0A;
`;
export const RemoveButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    cursor: pointer ;
`;