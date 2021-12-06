import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Label } from 'reactstrap';
import { Order } from './Types/Order'
import { Item } from './Types/Item'
import '../App.css'

const Home = () => {
    const getOrderRequest = async (orderNumber: string) => {
        axios.get(`https://localhost:44354/test/order?orderNumber=${orderNumber}`, { headers: { "Content-Type": "application/json" } }).then(response => { setOrderData(response.data) })
    }
    const getItemRequest = async (itemNumber: string) => {
        axios.get(`https://localhost:44354/test/item?itemNumber=${itemNumber}`, { headers: { "Content-Type": "application/json" } }).then(response => { setItemData(response.data) })
    }

    const [orderNumber, setOrderNumber] = useState<string>();
    const [itemNumber, setItemNumber] = useState<string>();
    const [orderData, setOrderData] = useState<Order>({} as Order);
    const [itemData, setItemData] = useState<Item>({} as Item);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
    }

    const handleOrderSubmit = async (event: any) => {
        event.preventDefault();
        if (orderNumber !== null) {
            getOrderRequest(orderNumber!)
            console.log(orderData)
        }
    }
    const handleItemSubmit = async (event: any) => {
        event.preventDefault();
        if (itemNumber !== null) {
            getItemRequest(itemNumber!)
            console.log(itemData)
        }
    }
    const handleItemNumberChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemNumber(e.target.value);
        console.log(e.target.value)
    }, [setItemNumber])

    return (
        <div className="html body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h3 className="d-flex justifiy-content-center m-3" style={{ marginTop: "5%", fontSize: "30px" }}>TestIQ</h3>
            <form style={{ marginTop: "1%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onSubmit={handleSubmit} >
                <Label style={{ marginBottom: "10%" }}>
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>Insert order number</p>
                    <input type="text" onChange={e => setOrderNumber(e.target.value)} required />
                    <Button onClick={handleOrderSubmit}>Get Order</Button>
                </Label>
                {orderData ? (
                    <div style={{ border: "1px solid", borderRadius: "3px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)" }}>
                        <div style={{ display: "block", textAlign: "center" }}>
                            Order Number: {orderData?.orderNumber}
                        </div>
                        <div>
                            {orderData.orders ? (
                                Object.keys(orderData.orders).map((t) => {
                                    return <div>{
                                        <div style={{ borderTop: "1px solid", display: "grid", gridTemplateColumns: "50% 50%", padding: "5px" }}>
                                            <div style={{ display: "inline" }}>
                                                <p style={{ fontWeight: "bold" }}>Itemcode</p>
                                                <span style={{ textAlign: "center" }}>{orderData.orders[t].itemCode}</span>
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: "bold" }}>Name</p>
                                                {orderData.orders[t].description}
                                            </div>
                                        </div>
                                    }</div>
                                }
                                )
                            ) : ""}
                        </div>
                    </div>
                ) : ""}

                <Label style={{ marginTop: "10%" }}>
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>Insert item code</p>
                    <input type="text" onChange={e => setItemNumber(e.target.value)} />

                    <select onChange={handleItemNumberChange}>

                        {orderData ? (
                            Object.keys(orderData.orders).map((x) =>

                                <option style={{ width: "200px", color: "black" }} value={orderData.orders[x].itemCode}>{"(" + orderData.orders[x].itemCode + ")" + " " + orderData.orders[x].description.split(" ")[0] + orderData.orders[x].description.split(" ")[1].toString()}</option>
                            )
                        ) : ""}


                    </select>
                    <Button onClick={handleItemSubmit}>Get Item</Button>
                </Label>
                {itemData ? (
                    <div style={{ border: "1px solid", borderRadius: "3px", marginTop: "10%", boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)" }}>
                        <div style={{ display: "block", textAlign: "center" }}>
                            Item Number: {itemData?.code}
                        </div>
                        <div style={{ borderTop: "1px solid", display: "grid", gridTemplateColumns: "150px 150px", padding: "5px" }}>
                            <p style={{ fontWeight: "bold" }}>Name</p>
                            <p>{itemData.name}</p>
                            <p style={{ fontWeight: "bold" }}>Diameter: </p>
                            <p>{itemData.diameter}mm</p>
                            <p style={{ fontWeight: "bold" }}>Length: </p>
                            <p>{itemData.length}m</p>
                        </div>
                    </div>
                ) : ""}
            </form>
        </div>
    )
}
export default Home;

