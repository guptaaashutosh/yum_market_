import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/Profile.png';
import { TreeView,TreeItem } from '@material-ui/lab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';

import './SideBar.css';


function SideBar() {
  return (
    <div className='sidebar'>
      <Link to='/'>{/* <img src={logo} alt="yum Market"/> */}</Link>

      <NavLink to='/admin/dashboard'>
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </NavLink>

      <NavLink>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId='1' label='Products'>
            <NavLink to='/admin/products'>
              <TreeItem nodeId='2' label='All' icon={<PostAddIcon />} />
            </NavLink>

            {/* <Link to='/admin/product/new'>
              <TreeItem nodeId='3' label='Create' icon={<AddIcon />} />
            </Link> */}

            <NavLink to='/admin/product/new'>
              <TreeItem nodeId='3' label='Create' icon={<AddIcon />} />
            </NavLink>
          </TreeItem>
        </TreeView>
      </NavLink>

      <NavLink to='/admin/orders'>
        <p>
          <ListAltIcon /> Orders
        </p>
      </NavLink>

      <NavLink to='/admin/users'>
        <p>
          <PeopleIcon /> Users
        </p>
      </NavLink>

      <NavLink to='/admin/reviews'>
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </NavLink>

      <NavLink>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId='1' label='Slider'>
            <NavLink to='/admin/allslider'>
              <TreeItem nodeId='2' label='All' icon={<PostAddIcon />} />
                      </NavLink>
                      
            <NavLink to='/admin/slider'>
              <TreeItem nodeId='3' label='Upload Slider' icon={<AddIcon />} />
            </NavLink>
          </TreeItem>
        </TreeView>
          </NavLink>
          
    </div>
  );
}

export default SideBar
