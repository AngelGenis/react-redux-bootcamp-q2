import styled from 'styled-components'

export const CardContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid #F1F1F1;
    border-radius: 20px;
    width: 30%;
    min-height: 327px;
    padding: 10px;
    cursor: pointer;
    transform:  ${props => props.selected ? 'scale(1.05)' : 'scale(1)'};
    box-shadow:  ${props => props.selected ? '0px 1px 10px lightgray' : '0px'} ;
    transition-duration: .05s;

    &:hover{
        transition-duration: .05s;
        transform: scale(1.05);
    }
`

export const TextName = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
`
export const ImageContainer = styled.div`
    width: 100% ;
    height: 200px;
    margin-bottom: 10px ;
`

export const TextPrice = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #CCCCCC;
`

export const Price = styled.p`

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
`

