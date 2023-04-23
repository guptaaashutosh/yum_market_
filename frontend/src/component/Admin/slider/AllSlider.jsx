import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllSlider, clearErrors, deleteSlider } from '../../../actions/SliderAction';
import Loader from '../../layout/Loader/Loader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MetaData from '../../layout/MetaData'
import SideBar from '../SideBar'
import { DELETE_OTHERS_DETAILS_RESET, OTHERS_DETAILS_RESET } from '../../../constants/OtherConstant';

const AllSlider = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success, slider } = useSelector(
    state => state.allSlider
  );

  const { error: deleteError, isDeleted } = useSelector(
    state => state.removeSlider
  );




  //console.log('slider in allslider : ', slider, success);

  //deleting product function
  const deleteSliderHandler = id => {
    //dispatch(deleteSlider(id));
    dispatch(deleteSlider(id));
  };

  //getAllSlider
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Slider Deleted Successfully!!');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_OTHERS_DETAILS_RESET });
    }

    dispatch(getAllSlider());

  }, [dispatch, error, alert, deleteError,isDeleted, navigate]);

  //for datagrid
  const columns = [
    { field: 'id', headerName: 'Slider Id', minWidth: 200, flex: 0.5 },
    {
      field: 'heading',
      headerName: 'Heading',
      minWidth: 350,
      flex: 0.5
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 150,
      flex: 0.3
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.3,
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <>
            <NavLink
              to={`/admin/slider/${params.getValue(params.id, 'id')}`}
            >
              <EditIcon />
            </NavLink>

            <Button
            onClick={() => {
              deleteSliderHandler(params.getValue(params.id, 'id'));
            }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      }
    }
  ];

  const rows = [];

  //value pushing in row of DataGrid
  slider &&
    slider.forEach((item, index) => {
      rows.push({
        id: item._id,
        heading: item.heading,
        description: item.description
      });
    });

  return (
    <>
      <MetaData title='All Slider --Admin' />
      <div className='dashboard'>
        <SideBar />

        {loading ? (
          <Loader />
        ) : (
          <div className='productListContainer'>
            <h1 id='productListHeading'>ALL Sliders</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={12}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            ></DataGrid>
          </div>
        )}
      </div>
    </>
  );
}

export default AllSlider
