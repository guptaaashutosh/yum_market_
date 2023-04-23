import React,{useEffect} from 'react';
import SideBar from './SideBar';
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Chart from 'chart.js/auto';
import { Doughnut,Line } from 'react-chartjs-2';
import { useSelector,useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/ProductActions';
import { allOrders } from '../../actions/orderAction';
import { getUsersAction } from '../../actions/UserActions';


const Dashboard=()=>{

  const dispatch=useDispatch();
  const {loading,error,products}=useSelector((state)=>state.allAdminProducts);

  const {loading:orderLoading,error:orderError,adminOrders}=useSelector((state)=>state.allOrders);

  const {loading:userLoading,error:userError,users}=useSelector((state)=>state.AllUsers);


  let outOfStock=0;
  products 
      && products.forEach((item)=>{
    if(item.stock===0){
      outOfStock += 1;
    }
  })

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(allOrders());
    dispatch(getUsersAction());
  },[dispatch]);

//total amount calculation
let totalAmount=0;
adminOrders 
    && 
    adminOrders.forEach((item)=>{
   totalAmount+=item.totalPrice;
})


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Chart For Total Amount',
          },
        },
      };

    const lineState={
        labels:["initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                borderColor: 'rgb(255, 99, 132)',
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,totalAmount],
            },
        ],
    };


    const doughState={
      labels:["Out of Stock","InStock"],
      datasets:[
          {
              backgroundColor:["#f56042","#32e352"],
              borderColor: 'rgb(255, 99, 132)',
              hoverBackgroundColor:["#ed2d18","#06b826"],
              data:[outOfStock,products.length-outOfStock],
          },
      ],
  };



    return(
        <div className="dashboard">
            <SideBar/>

            <div className="dashboardContainer">

              <Typography component="h1"> Dashboard </Typography>

              <div className="dashboardSummary">
                
                <div>
                    <p>
                        Total Amount <br/> Rs:{totalAmount}
                    </p>
                </div>
                
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{adminOrders && adminOrders.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
            </div>

            
              <div className="lineChart">
                <Line data={lineState} options={options} />
              </div>
             
             <div className="doughnutChart">
               <Doughnut
                 data={doughState}
               />
             </div>


            </div>
        </div>
    )
}

export default Dashboard;