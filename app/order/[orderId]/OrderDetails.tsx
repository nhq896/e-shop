import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div className="">Order ID: {order.id}</div>
      <div className="">
        Name: <span className="font-semibold">{order.name}</span>
      </div>
      <div className="">
        Phone: <span className="font-semibold">{order.phone}</span>
      </div>
      <div className="">
        Address:{" "}
        <span className="font-semibold">
          {order.address?.line1}
          {order.address?.line2 && `, ${order.address.line2}`},{" "}
          {order.address?.city}, {order.address?.country}
        </span>
      </div>
      <div className="">
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="">Payment status:</div>
        <div className="">
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="">Delivery status:</div>
        <div className="">
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="">Date: {moment(order.createdDate).fromNow()}</div>
      <div className="">
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-sm gap-4 pb-2 pr-4 items-center font-semibold">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        <div className="max-h-[400px] overflow-y-auto pr-4">
          {order.products &&
            order.products.map((item) => {
              return (
                <OrderItem
                  key={`${item.selectedImg.color} ${item.id}`}
                  item={item}
                ></OrderItem>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
