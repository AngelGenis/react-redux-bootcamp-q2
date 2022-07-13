import React from 'react'
import { MainButton } from '../../components/Buttons';
import { Content, Text } from './styles'

export const Summary = ({ items = 0, total = 0 }) => {
    return (
        <Content>
            <div>
                <Text>Summary</Text>
                <Text>items {items}</Text>
            </div>

            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 12 }}>
                    <Text>Total Cost</Text>
                    <Text style={{ fontWeight: 'bold' }}>${total}</Text>

                </div>

                <MainButton>Checkout</MainButton>
            </div>
        </Content>
    )
}