import React from 'react';
import { MainButton } from '../Buttons';
import { CardContainer, TextName, ImageContainer, TextPrice, Price } from './styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ProductCard = ({ image, name, price, onClick, addToCart, added, deleteFromCart, selected, favorite, onClickFavorite }) => {

    return (
        <CardContainer onClick={onClick} selected={selected}>
            <div onClick={onClickFavorite} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 'calc(100% - 30px)' }}>
                {
                    favorite ? <FavoriteIcon size={25} /> : <FavoriteBorderIcon size={25} />
                }


            </div>
            <ImageContainer>
                <img style={{ width: '100%', objectFit: 'contain', height: 200 }} src={image} alt="" />
            </ImageContainer>
            <TextName>{name?.slice(0, 40)}</TextName>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, columnGap: 24 }}>
                <div>
                    <TextPrice>Price</TextPrice>
                    <Price>${price}</Price>
                </div>


                <MainButton textStyle={{ color: "#000" }} style={{ background: "#fff", border: '1px solid #CCC' }} onClick={added ? deleteFromCart : addToCart}>
                    {added ? "Delete from cart" : "Add to cart"}
                </MainButton>
            </div>
        </CardContainer>
    )
}

