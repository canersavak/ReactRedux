import React, { useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flag, Form, FormFieldProps, Grid, Header, Icon, Input, Label, Modal, Table } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';
import { Context } from './DataContext';
import { IProduct } from './models/IProduct';
import { IProAction } from './reducers/ProductReducer';
import { StateType } from './ReduxStore';
import { ProductType } from './types/ProductType';
import styled, {keyframes} from 'styled-components';
import { headShake, fadeIn  } from 'react-animations';

// animation infinite forward yerine tekrar sağlar
const animation = keyframes`${fadeIn}`;
const AnimateDiv = styled.div`
animation: forwards 5s ${animation};
`;




function App() {    
  
  const [modal, setModal] = useState(false);

  const [did, setDid] = useState(0);

  const [handleClick, setHandleClick]= useState(true)


  //ref using
  const refTitle = useRef<HTMLInputElement>(null);


  const context = useContext(Context);

  // redux using
  const productReducer= useSelector((state: StateType) => state.ProductReducer);
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const productAdd = () => {

      const pro:IProduct={
        id: parseInt(""+Math.random() * 1000),
        title: title,
        price: price
      }
      const item:IProAction = {
        type: ProductType.PRODUCT_ADD,
        payload: pro
      }
      dispatch(item)

      setTitle("")
      setPrice(0)

      refTitle.current?.focus()
      
  }

  const itemDelete = (id:number) => {

    const pro:IProduct={
      id:id,
      title: "",
      price: 0
    }

    const item:IProAction = {
      type: ProductType.PRODUCT_DELETE,
      payload: pro
    }

    dispatch(item)

  }
  
  const productUpdate = (id:number) => {
    const pro:IProduct={
      id: id,
      title: title,
      price: price,
    }

    const item:IProAction = {
      type: ProductType.PRODUCT_UPDATE,
      payload: pro
    }
    dispatch(item)
      setTitle("")
      setPrice(0)
      setHandleClick(true)

  }


 
  return (
    <>
      <AnimateDiv><h1>Welcome React - { context.name }</h1></AnimateDiv>
      <h2>{process.env.NODE_ENV}</h2>      
      <p>{process.env.REACT_APP_USER_NAME}</p>
      
      <p>{process.env.REACT_APP_USER_PASSWORD}</p>
      <Button animated onClick={() => { alert("alert")}} >
        <Button.Content visible> Login </Button.Content>
        <Button.Content hidden> <Icon name='arrow right' ></Icon> </Button.Content>
      </Button>
      
      <Button as='div' labelPosition='right'>
      <Button color='red'>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>
        2,048
      </Label>
    </Button>
    
    <Flag name='tr' />

    <Header> 
      
      Welcome Semantic 
      <Header.Subheader>
        Semantic Detail
      </Header.Subheader>
    </Header>


    <Form>
      <Grid columns='equal'>
        <Grid.Column width={4}> <Form.Field><input ref={refTitle} onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title'></input> </Form.Field></Grid.Column>

        <Grid.Column width={4}> <Form.Field><input type='number' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder='Price'></input></Form.Field> </Grid.Column>

        <Grid.Column width={4}><Button onClick={(e) => {handleClick ? productAdd(): productUpdate(did)}}>{handleClick ? 'Add' : 'Update'}</Button> </Grid.Column>
      </Grid>
    </Form>
    <h2>Product List</h2>
    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
        <Table.HeaderCell>Edit</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {productReducer.map( (item, index) => 
      <Table.Row key ={index}>
        <Table.Cell>
          <Label ribbon>{item.id}</Label>
        </Table.Cell>
        <Table.Cell>{item.title}</Table.Cell>
        <Table.Cell>{item.price}₺</Table.Cell> 
        <Table.Cell><Button onClick={() => {setModal(true); setDid(item.id)}}  color='red' size='small' icon > <Icon name='trash alternate outline'/>Delete</Button></Table.Cell> 
        <Table.Cell><Button onClick={() => {setHandleClick(false); setTitle(item.title);setPrice(item.price);setDid(item.id)}}   color='blue' size='small' icon > <Icon name='edit'/>Edit</Button></Table.Cell> 
      </Table.Row>
      )}
    </Table.Body>
    </Table>
    
    <Modal size="mini"
          open={modal}          
    >
        <Modal.Header>Delete Your Product</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your product</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() =>  setModal(false)}>
            No
          </Button>
          <Button positive onClick={(e) => {itemDelete(did);setModal(false) }}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>

    </>
  );
}

export default App;
