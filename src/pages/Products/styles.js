import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: var(--background);
`
export const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    background-color: var(--background);
    padding: 10px;
`

export const Tittle = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px 0;
    color: gray;
`
export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    background-color: var(--background);
    padding: 10px;
    gap: 20px;
    justify-content: space-between;
`