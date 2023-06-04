import React, { useState } from "react";
import Header from "../../common/header/Header";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Product.css'
import ProductCard from "../productcard/ProductCard";
import ImageList from '@mui/material/ImageList';
import { useNavigate } from "react-router-dom";
import Product from './product/Product';
const style = {
  position: "absolute",
  left: "35%",
  width: '30%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  height:'95%',
  marginTop:'1%',
};
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
function Products() {
  const navigate = useNavigate()
  let token = localStorage.getItem('token')
  const [age, setAge] = React.useState('');
  const [products,showProducts]=useState([])
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = "http://localhost:3001/api/v1/products";
  async function fetchProducts() {
    let res = await axios.get(url);
    let obj = res.data;
    let filter = localStorage.getItem('filter');
    if(filter==='low-to-high'){
obj=obj.sort((a,b)=>a.price-b.price);
    }else if(filter==='high-to-low'){
      obj=obj.sort((a,b)=>b.price-a.price);
    }else if(filter==='newest'){
      obj =obj.sort((a, b) => new Date(b.date) - new Date(a.date));
    }else{
      obj=obj.reverse();
    }
    let arrProducts=obj.map((item,index)=>{
      console.log('key is  > '+ item._id)
        return <ProductCard dltClick={deleteProduct} navToProduct={navigateProduct} name={item.name} id = {item._id} key={index} desc={item.description} imgUrl={item.imageURL} price={item.price}/>
    })
    showProducts([...arrProducts])
  }
  async function deleteProduct(key){
    let dltURL = `http://localhost:3001/api/v1/products/${key}`

    let res = await axios.delete(dltURL,{
      headers: {
        'x-auth-token': `${token}`,
      }
    })
    console.log(res.data)
    window.location.reload()
  }
  function navigateProduct(id){
    navigate(`/Products/${id}`)
  }
  useEffect(() => {
    fetchProducts();
  }, [<Header/>]);
  const handleProduct= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('in handle submit')
    let currName=data.get('productName')
    let currCategories=data.get('categories')
    let currPrice = data.get('price')
    let currDescription = data.get('productDesc')
    let currManufacturer = data.get('manufacturer')
    let currItemAvailablity = data.get('itemAvailablity')
    let currImageURL = data.get('imageURL')
    let obj={name:currName,
      category:currCategories,
      price:currPrice,
      description:currDescription,
      manufacture:currManufacturer,
      availableItems:currItemAvailablity,
      imageURL:currImageURL,}
    console.log(obj)
   try{
    let res= await axios.post(url,JSON.stringify(obj),{headers:{
      "content-type":"application/json",
      'x-auth-token': `${token}`,
    }})
   }catch(err){
    console.log('err > '+err)
   }
   handleClose()
   window.location.reload()
  }
  return (
    <div>
      <Header click={handleOpen} role={localStorage.getItem("role")} />
      <ImageList
        sx={{ width: "80%", height: "100%", ml: "18%" }}
        cols={3}
        rowHeight={164}
      >
        {products}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <AddShoppingCartIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Product
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleProduct}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="productName"
                        required
                        fullWidth
                        id="productName"
                        label="Product Name"
                        
                        inputProps={{ maxLength: 50, minLength: 5 }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Categories
                        </InputLabel>
                        <Select
                          name="categories"
                          id="demo-simple-select"
                          value={age}
                          label="Categories"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Electronics"}>Electronics</MenuItem>
                          <MenuItem value={"Men's wear"}>Men\'s wear</MenuItem>
                          <MenuItem value={"Shoes"}>Shoes</MenuItem>
                          <MenuItem value={"Clothes"}>Clothes</MenuItem>
                          <MenuItem value={"Furniture"}>Furniture</MenuItem>
                          <MenuItem value={"Food and beverage"}>
                            Food and beverage
                          </MenuItem>
                          <MenuItem value={"Book"}>Book</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="Price"
                        label="price"
                        name="price"
                        autoComplete="price"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="itemAvailablity"
                        label="itemAvailablity"
                        type="number"
                        id="itemAvailablity"
                        autoComplete="itemAvailablity"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="imageURL"
                        label="imageURL"
                        type="url"
                        id="imageURL"
                        autoComplete="imageURL"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="manufacturer"
                        label="manufacturer"
                        type="name"
                        id="manufacturer"
                        autoComplete="manufacturer"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <textarea
                        id="productDesc"
                        name="productDesc"
                        rows={6}
                        cols={45}
                      ></textarea>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Product
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 2 }} />
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default Products;
