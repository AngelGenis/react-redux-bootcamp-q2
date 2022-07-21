import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Filter } from '../../components/Filter'
import { Container, Grid, Body, Tittle } from './styles'
import { ProductDetails } from '../../components/ProductDetails';
import { Search } from '../../components/Search';
import { ProductCard } from '../../components/ProductCard';
import { addToCart, fetchCategories, fetchProducts, getLoadingProducts, getFavorites, getProducts, getCategories, getItemsCart, deleteCart, addToFavorites, deleteFromFavorites, getShowFavorites, setShowFavorites } from '../../redux/products';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { didTryAutoLogin } from '../../redux/auth';

export const Products = () => {
  const [productSelected, setProductSelected] = useState({});
  const [categorySelected, setCategorySelected] = useState('');
  const [search, setSearch] = useState('');
  const products = useSelector(getProducts);
  const categories = useSelector(getCategories)
  const isLoadingProducts = useSelector(getLoadingProducts);
  const items = useSelector(getItemsCart);
  const favorites = useSelector(getFavorites)
  const dispatch = useDispatch();
  const didTry = useSelector(didTryAutoLogin);
  const showFavorites = useSelector(getShowFavorites);
  const data = showFavorites ? favorites : products;

  useEffect(() => {
    const promise = dispatch(fetchProducts({
      category: categorySelected,
      query: search
    }))

    return () => {
      // `createAsyncThunk` attaches an `abort()` method to the promise
      promise.abort()
    }
  }, [dispatch, categorySelected, search]);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  const handleCategoryCheck = (val, name) => {
    setProductSelected({});
    showFavorites && dispatch(setShowFavorites(false))
    name === categorySelected ? setCategorySelected('') : setCategorySelected(name);
  }

  const handleSearch = useCallback((value) => {
    showFavorites && dispatch(setShowFavorites(false))
    setSearch(value.target.value);
  }, [])

  if (!didTry) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Container>
      <Filter
        categories={categories}
        onCheck={handleCategoryCheck}
        categorySelected={categorySelected}
      />
      <Body>
        <Search onChange={handleSearch} value={search} />
        {showFavorites && <Tittle>Estos son tus productos favoritos</Tittle>}
        {
          isLoadingProducts ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              <CircularProgress />
            </div>
            : (
              <Grid>
                {
                  data?.map((product) => {
                    const { id, images, name, price } = product;
                    const added = items.some(e => e.id === id);
                    const favorite = favorites.some(e => e.id === id);

                    return (
                      <ProductCard
                        key={id}
                        image={images[0]}
                        name={name}
                        price={price}
                        onClick={() => { setProductSelected(product) }}
                        deleteFromCart={() => { dispatch(deleteCart(id)) }}
                        addToCart={() => { dispatch(addToCart(id)) }}
                        added={added}
                        favorite={favorite}
                        selected={productSelected.id === id}
                        onClickFavorite={() => { favorite ? dispatch(deleteFromFavorites(id)) : dispatch(addToFavorites(id)) }}
                      />
                    )
                  })
                }
              </Grid>
            )
        }

      </Body>
      <ProductDetails
        product={productSelected}
      />

    </Container>
  )
}
