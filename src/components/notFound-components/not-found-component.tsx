import React from "react";
const imageNotFound = "./people-analyzing-growth-charts_23-2148866843.jpg"
interface NotFoundComponentProps {
    topic?: string;
    title: string;
    image?: string;
}

const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
    title,
    topic,
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 my-auto">
            <div className="w-full flex flex-col gap-4 items-center">
                <img
                    src={imageNotFound}
                    width={1000}
                    height={1000}
                    alt="people-analyzing-growth-charts"
                    className="w-[500px] "
                />
            </div>
            <p className="w-full flex flex-col items-center text-Tritary  justify-center gap-[10px] font-medium">
                <span className="bold-16">{topic ? topic : "متاسفیم!"} </span>
                <span className="w-1/2 flex flex-col gap-2 text-tertiary regular-14 text-center">
                    {title}
                </span>
            </p>
            <button
                onClick={() => window.location.reload()}
                className="font-medium bg-cta text-Highlighter p-3 text-lg rounded-lg w-max"
            >
                تلاش مجدد
            </button>
        </div>
    );
};

export default NotFoundComponent;
