import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotify } from "@/components/shared-components/notife/notife";
import { IClubCompanyInfo, IClubCompanyTheme } from "../../../../../types/club-types/club_theme_types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetClubCompanyInfo, updateClubCompanyInfo } from "@/api/club-api/club-setting-service";
import { IClubHttpResult } from "@/api/club-api/club-http-result";


const validationSchema = Yup.object().shape({
    colors: Yup.object().shape({
        cta: Yup.string(),
        "ctaDisabled": Yup.string(),
        "ctaHover": Yup.string(),
        "ctaFocus": Yup.string(),
        "cta30": Yup.string(),
        highlighter: Yup.string(),
        "highlighterDisabled": Yup.string(),
        "highlighterHover": Yup.string(),
        "highlighterFocus": Yup.string(),
        "highlighterFaded": Yup.string(),
        bg: Yup.string(),
        alert: Yup.string(),
        tritary: Yup.string(),
        secondary: Yup.string(),
        primary: Yup.string(),
        focus: Yup.string()
    }),
});

const useGetClubCompanyInfo = (refetchOnWindowFocus?: boolean) => {
    return useQuery<IClubHttpResult<IClubCompanyInfo>, Error>({
        queryKey: ["ClubCompanyInfo"], // ✅ Correct queryKey syntax
        queryFn: () => GetClubCompanyInfo(), // ✅ Cleaner query function
        refetchOnWindowFocus: refetchOnWindowFocus, // ✅ Prevents automatic refetch on window focus
        refetchInterval: false,
    });
};
const useUpdateClubCompanyInfo = (onClose: () => void) => {
    const { notify } = useNotify()

    return useMutation({
        mutationKey: ["ClubCompanyInfo"], // ✅ Correct queryKey syntax
        mutationFn: (payload: IClubCompanyInfo) => updateClubCompanyInfo(payload), // ✅ Cleaner query function
        onSuccess: () => {
            notify("success", "اطلاعات مجموعه بروز شد");
            onClose();
        },
        onError: () => {
            notify("error", "خطا در بروزرسانی  مجموعه");
        }
    });
};
function useClubThemeSetting(onClose: () => void) {
    const defaultThemeConfig: IClubCompanyTheme = {
        cta: "#1976d2",
        "ctaDisabled": "#90caf9",
        "ctaHover": "#1565c0",
        "ctaFocus": "#115293",
        "cta30": "#e3f2fd",
        highlighter: "#ffeb3b",
        "highlighterDisabled": "#fffde7",
        "highlighterHover": "#fff176",
        "highlighterFocus": "#ffee58",
        "highlighterFaded": "#fffde7",
        bg: "#ffffff",
        alert: "#f44336",
        tritary: "#e0e0e0",
        secondary: "#9c27b0",
        primary: "#1976d2",
        focus: "#388e3c"
    };
    const { data: ClubData, isLoading, isRefetching, isError, error: ClubCompanyError, refetch } = useGetClubCompanyInfo(true);
    const loading = isLoading || isRefetching
    const error = isError || ClubCompanyError
    const { mutate: updateClub } = useUpdateClubCompanyInfo(onClose)
    const ThemeForm = useForm<IClubCompanyInfo | any>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            colors: defaultThemeConfig,
        },
    });
    const { notify } = useNotify();
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    const initThemeFromCompany = useCallback(() => {
        if (ClubData?.status) {
            Object.entries(ClubData.result).map(([key, value]) => {
                ThemeForm.setValue(
                    `${key as keyof IClubCompanyInfo}` as const,
                    value
                );
            });
        }
    }, [ClubData]);
    useEffect(() => {
        let isCanceld = false
        if (!isCanceld) {
            initThemeFromCompany();
        }
        return () => {
            isCanceld = true
        }
    }, [initThemeFromCompany]);
    const onSubmit = async (data: IClubCompanyInfo) => {
        setActionLoading(true);
        try {
            updateClub(data)
        } catch (e) {
            notify("error", e.response.data.message);
        } finally {
            setActionLoading(false);
        }
    };

    return {
        refetch,
        initLaoding: loading,
        loading: actionLoading || loading,
        error,
        ClubData,
        onSubmit,
        ThemeForm: ThemeForm,
    };
}

export default useClubThemeSetting;
