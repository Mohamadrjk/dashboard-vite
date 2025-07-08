// import { DiscountType } from "@/types/ditgitalmenu-types/menu";
// import { CloseOutlined } from "@ant-design/icons";
// import { Collapse } from "antd";

// import { IMenuProducts } from "./hooks/useCategorySelection";

// const SelectedProductItem = ({
//   category,
//   products,
//   initProducts,
//   handleDeleteProduct,
//   setSelectedProducts,
// }: {
//   products: Array<IMenuProducts>;
//   initProducts: Array<IMenuProducts>;

//   setSelectedProducts: (value: React.SetStateAction<IMenuProducts[]>) => void;
//   category: any;
//   handleDeleteProduct: (item: any) => void;
// }) => {
//   return (
//     <Collapse
//       bordered={false}
//       defaultActiveKey={products.map((i) => i.product_id)}
//       className=" flex gap-4  w-full flex-wrap !bg-transparent [&_.ant-collapse-item]:!border-none !font-Regular"
//     >
//       {products
//         .filter((p) => p?.category_id == category)
//         .map((p) => (
//           <Collapse.Panel
//             key={p.product_id}
//             className=" w-[400px]   [&_.ant-collapse-header]:!items-center  !duration-200 !rounded-lg !outline  !h-max !outline-1 "
//             header={
//               <div className="flex relative  items-center  justify-between ">
//                 <span>{p.label}</span>
//                 <span
//                   role="button"
//                   className="text-Alert active:scale-75  absolute left-0 top-0 z-50 transition-all duration-150"
//                   onClick={() => handleDeleteProduct(p)}
//                 >
//                   <CloseOutlined />
//                 </span>
//               </div>
//             }
//           >
//             <div className="flex  flex-col gap-1 items-center">
//               <SelectDetailsItems
//                 product={p}
//                 initProduct={initProducts.find(
//                   (i) => i.product_id == p.product_id
//                 )}
//                 setSelectedProduct={(item: IMenuProducts) => {
//                   const update = products.map((i) => {
//                     if (i.product_id === item.product_id) {
//                       return {
//                         ...item,
//                         has_discount: i.discount_type ? true : false,
//                       };
//                     }
//                     return {
//                       ...i,
//                       has_discount: i.discount_type ? true : false,
//                     };
//                   });

//                   setSelectedProducts(update);
//                 }}
//               />
//             </div>
//           </Collapse.Panel>
//         ))}
//     </Collapse>
//   );
// };

// export default SelectedProductItem;
