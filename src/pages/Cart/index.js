import React from 'react'
import { Wrapper, ShoppingCartContainer, SummaryContainer, Title } from './styles'
import { data } from '../../utils/data';
import { ItemCart } from '../../components/ItemCart';
import { Summary } from '../../components/SummarySection';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export const Cart = () => {
    useAuth();
    const [dict, setDict] = useState({});

    //Esto es provicional
    const handleCounter = (id, action, price) => {
        parseFloat(price);
        let aux = dict;
        if (aux[id]) {
            aux = {
                ...aux,
                [id]: {
                    quantity: action === "add" ? aux[id].quantity + 1 : aux[id].quantity - 1,
                    total: action === "add" ? aux[id].total + price : aux[id].total - price
                }
            }
        } else {
            aux = {
                ...aux,
                [id]: {
                    quantity: action === "add" ? 1 : 0,
                    total: action === "add" ? price : 0
                }
            }
        }
        setDict(aux);
    }

    const getItems = (obj) => {
        const array = Object.values(obj);
        let items = 0;
        let total = 0;
        if (array.length > 0) {
            array.forEach((item) => {
                items += item.quantity;
                total += item.total
            })
        }
        return {
            items,
            total: parseFloat(total).toFixed(2)
        }
    }

    const cart_data = data.data.products.items.slice(3, 5);

    return (
        <Wrapper>
            <ShoppingCartContainer>
                <Title>Shopping Cart</Title>
                <br />
                {
                    cart_data.map(item => {
                        return (
                            <ItemCart
                                id={item.id}
                                key={item.id}
                                image={item.images[0]}
                                price={item.price}
                                name={item.name}
                                quantity={dict[item.id]?.quantity}
                                addItem={handleCounter}
                                deleteItem={handleCounter}
                            />
                        )
                    })
                }
            </ShoppingCartContainer>
            <SummaryContainer>
                <Summary
                    items={getItems(dict).items}
                    total={getItems(dict).total}
                />
            </SummaryContainer>
        </Wrapper>
    )
}
