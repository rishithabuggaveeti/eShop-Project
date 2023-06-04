import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
export default function ProductCard(props) {
 
  const role = localStorage.getItem("role");
  const navigate = useNavigate();  
  const showProduct=()=>{
    navigate(`/productDetailPage/${props.id}`)
  }
  if (role === "admin") {
    return (
      <Card sx={{ maxWidth: 345,height:480,pt:2,mb:3 , border: "2px solid black",boxShadow:"6px 9px 1px black",padding:"10px",marginBottom:"20px",borderRadius:"10px" }}>
        <img src={props.imgUrl} alt="product"height={"300px"} width={"300px"} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{height:40,overflow:'hidden'}}>
            {props.desc}
          </Typography> */}
          <Typography variant="body2" color="text.secondary" sx={{height:40,overflow:'hidden'}}>
            {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>{props.dltClick(props.id)}} size="small">Delete</Button>
          <Button onClick={()=>{props.navToProduct(props.id)}} size="small">Modify</Button>
        </CardActions>
      </Card>
    );
  }else if(role==='user'){
    return(
        <Card sx={{ maxWidth: 345,border:'2px solid black',boxShadow:"6px 9px 1px black",padding:"10px",marginBottom:"20px",borderRadius:"10px" }}>
     <img src={props.imgUrl} alt="product" height={'300px'} width={'300px'}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
       
      </CardContent>
      <CardActions> 
        <button  onClick={showProduct}>Buy</button>
      </CardActions>
    </Card>

    //
    
    )
  }
}
