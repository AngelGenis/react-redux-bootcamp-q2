import React from 'react'
import { Wrapper, ShoppingCartContainer, SummaryContainer, Title } from './styles'
import { ItemCart } from '../../components/ItemCart';
import { Summary } from '../../components/SummarySection';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteCart, deleteItem, getItemsCart, getTotalItems, getTotalPrice } from '../../redux/products';
import { didTryAutoLogin } from '../../redux/auth';
import { CircularProgress } from '@mui/material';

export const Cart = () => {
    const items = useSelector(getItemsCart);
    const totalItems = useSelector(getTotalItems);
    const totalPrice = useSelector(getTotalPrice);
    const dispatch = useDispatch();
    const didTry = useSelector(didTryAutoLogin)

    let sorted = [...items]?.sort(function (a, b) {
        if (a?.name > b?.name) return 1;
        if (b?.name > a?.name) return -1;

        return 0;
    })

    if (!didTry) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

    return (
        <Wrapper>
            <ShoppingCartContainer>
                <Title>Shopping Cart</Title>
                <br />
                {
                    sorted?.map(item => {
                        return (
                            <ItemCart
                                id={item.id}
                                key={item.id}
                                image={item.images[0]}
                                price={parseFloat(item.price).toFixed(2)}
                                name={item.name}
                                quantity={item.quantity}
                                addItem={() => { dispatch(addToCart(item.id)) }}
                                deleteItem={() => { dispatch(deleteItem(item.id)) }}
                                onRemove={() => { dispatch(deleteCart(item.id)) }}
                            />
                        )
                    })
                }
            </ShoppingCartContainer>
            <SummaryContainer>
                <Summary
                    items={totalItems}
                    total={parseFloat(totalPrice).toFixed(2)}

                />
            </SummaryContainer>
        </Wrapper>
    )
}
