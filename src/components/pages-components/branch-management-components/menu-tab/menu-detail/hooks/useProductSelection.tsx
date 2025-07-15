import { IMenuDetailSlice, menuDetailSubmitPayload, menuDetailUpdateProducts } from '@/redux/menuDetail/menuDetailSlice';
import { RootState } from '@/redux/store';
import { IProductResult } from '@/types/ditgitalmenu-types/product';
import { getProductsList } from '@/api/digitalmenu-api/productService';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IMenuDetailItemsModalProps } from './useCategorySelection';
import { DiscountType } from '@/types/ditgitalmenu-types/menu';
const initDetailForProduct = {
    discount_type: 'percentage' as DiscountType,
    discount_value: "0",
}
function useProductSelection(categoryId: number) {
    const dispatch = useDispatch()
    const { tempData: payloadData } = useSelector<RootState, IMenuDetailSlice>(
        (state) => state.menuDetailSlice
    );
    const [openProductDetailModal, setOpenProductDetailModal] = useState<IMenuDetailItemsModalProps>({
        itemId: null,
        state: false,
    });
    const currentCatDetail = useMemo(() => {
        return payloadData && payloadData.categories && payloadData.categories.find(i => i.category_id == categoryId)
    }, [payloadData, categoryId])

    const { data } = useQuery<AxiosResponse<IProductResult>, Error>({
        queryKey: ["getProductListByCategory", categoryId], // ✅ Correct queryKey syntax
        queryFn: () =>
            getProductsList(
                categoryId && {
                    category_id: String(categoryId),
                }
            ), // ✅ Cleaner query function
        refetchOnWindowFocus: true, // ✅ Prevents automatic refetch on window focus
        refetchInterval: false,
    });
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const productOptions = useMemo(() => {
        return data?.data?.data;
    }, [data]);
    const handleSelectProducts = (item) => {
        setSelectedProducts((prev) => {
            const updated = prev.includes(item.product_id)
                ? prev.filter((i) => i != item.product_id)
                : [...prev, item.product_id];
            dispatch(menuDetailUpdateProducts({
                category_id: categoryId,
                products: updated.map((i) => {
                    const prevItemDetails = currentCatDetail?.products.find(p => p.product_id == i);
                    const detailData = prevItemDetails ? prevItemDetails : initDetailForProduct;
                    return {
                        product_id: i,
                        ...detailData,
                        discount_value: detailData.discount_value ? detailData.discount_value : "0"
                    }
                })
            }))
            return updated
        })
    }

    const handleSubmit = () => {
        dispatch(menuDetailSubmitPayload())
    }
    const initSelectedProduct = useCallback(() => {
        if (currentCatDetail) {
            setSelectedProducts(() => {
                return currentCatDetail.products.map(i => i.product_id)
            })
        }
    }, [currentCatDetail])

    useEffect(() => { initSelectedProduct() }, [initSelectedProduct])
    return {
        payloadData,
        productOptions,
        selectedProducts,
        setSelectedProducts,
        handleSelectProducts,
        openProductDetailModal,
        handleSubmit,
        setOpenProductDetailModal
    }
}

export default useProductSelection