import { IMenuDetailSlice, menuDetailSubmitPayload, menuDetailUpdateProductDetail } from "@/redux/menuDetail/menuDetailSlice";
import { RootState } from "@/redux/store";
import { DiscountType, IMenuSelectedProduct } from "@/types/ditgitalmenu-types/menu";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

function useProductDetail(selectedProduct: number, selectedCategory: number) {
    const initialStates = {
        discount_type: 'percentage' as DiscountType,
        discount_value: "0",
        discount_start_date: null,
        discount_end_date: null,
    };

    type Action =
        | {
            type: 'SET_VALUE'; payload: {
                key: Partial<keyof IMenuSelectedProduct>
                value: DiscountType | string | null
            }
        }
        | { type: 'RESET' } | { type: 'SET_TYPE', payload: DiscountType };;

    const reducer = (state: IMenuSelectedProduct, action: Action) => {
        switch (action.type) {
            case 'SET_VALUE':
                return { ...state, [`${action.payload.key}`]: action.payload.value };
            case 'SET_TYPE':
                return { ...initialStates, discount_type: action.payload };
            case 'RESET':
                return initialStates;
            default:
                return state;
        }
    };
    const [state, setState] = useReducer(reducer, initialStates);
    const { tempData: payloadData } = useSelector<RootState, IMenuDetailSlice>(
        (state) => state.menuDetailSlice
    );
    const currentProductDetail = useMemo(() => {
        if (payloadData && payloadData.categories) {
            const currentCategory = payloadData.categories.find(i => i.category_id == selectedCategory);
            return currentCategory && currentCategory.products.find(p => p.product_id == selectedProduct)
        }
    }, [payloadData, selectedProduct, selectedCategory])


    const appDispatch = useDispatch()
    const handleSubmit = () => {
        const value = {
            discount_type: state.discount_type,
            discount_value: state.discount_value,
            has_discount: +state.discount_value > 0,
            discount_start_date: state.discount_start_date ?? null,
            discount_end_date: state.discount_end_date ?? null,
            product_id: selectedProduct,
        } as IMenuSelectedProduct;
        appDispatch(menuDetailUpdateProductDetail({
            categoryId: selectedCategory,
            value: value
        }))
        appDispatch(menuDetailSubmitPayload())
    }


    const initSelectedProductDetail = useCallback(() => {
        if (currentProductDetail) {
            Object.keys(currentProductDetail).map((i) =>
                setState({
                    type: "SET_VALUE",
                    payload: {
                        key: i as keyof IMenuSelectedProduct,
                        value: currentProductDetail[i]
                    }
                })
            )
        } else {
            setState({
                type: "RESET",
            })
        }
    }, [currentProductDetail])

    useEffect(() => { initSelectedProductDetail() }, [initSelectedProductDetail])
    return {
        discountValue: state.discount_value,
        discountType: state.discount_type,
        dateRange: [state.discount_start_date, state.discount_end_date],
        setValue: (key: keyof IMenuSelectedProduct, value: any) => {
            setState({
                type: "SET_VALUE",
                payload: {
                    key: key,
                    value: value
                }
            })
        },
        setDiscountType: (value: DiscountType) => {
            setState({
                type: "SET_TYPE",
                payload: value
            })
        },
        handleSubmit,
    }
}

export default useProductDetail