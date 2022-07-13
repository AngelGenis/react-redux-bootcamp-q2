import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RemoveButtonContainer, ItemCartWrapper, CounterContainer, ImageContainer, ItemContent, TotalPriceContainer, ItemTitle, PriceText, TotalPrice } from './styles'

export const ItemCart = ({ id, image, name, price, addItem, deleteItem, quantity = 0 }) => {
    return (
        <ItemCartWrapper>
            <ImageContainer>
                <img style={{ width: '100%', objectFit: 'contain' }} src={image} alt="" />
            </ImageContainer>

            <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <PriceText>${price}</PriceText>

                <CounterContainer>
                    <RemoveIcon style={{ cursor: 'pointer' }} onClick={() => { quantity > 0 && deleteItem(id, "substract", price) }} />
                    <p>{quantity}</p>
                    <AddIcon style={{ cursor: 'pointer' }} onClick={() => { addItem(id, "add", price) }} />
                </CounterContainer>
            </ItemContent>

            <TotalPriceContainer>
                <TotalPrice>${price * quantity}</TotalPrice>

                <RemoveButtonContainer>
                    <DeleteIcon />
                    <PriceText style={{ color: 'black' }}>Remove</PriceText>
                </RemoveButtonContainer>
            </TotalPriceContainer>
        </ItemCartWrapper>
    )
}