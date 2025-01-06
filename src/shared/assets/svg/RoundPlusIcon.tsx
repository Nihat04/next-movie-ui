import { SVGProps } from "@/shared/types/SVGProps";
import React from "react";

export default function RoundPlusIcon({
    fillColor = "#fff",
    strokeColor = "#fff",
}: SVGProps) {
    return (
        <>
            <svg
                viewBox="-0.5 -0.5 22 22"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>plus_circle [#1427]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                    id="Page-1"
                    stroke={strokeColor}
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-179.000000, -600.000000)"
                        fill={fillColor}
                    >
                        <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                        >
                            <path
                                d="M137.7,450 C137.7,450.552 137.2296,451 136.65,451 L134.55,451 L134.55,453 C134.55,453.552 134.0796,454 133.5,454 C132.9204,454 132.45,453.552 132.45,453 L132.45,451 L130.35,451 C129.7704,451 129.3,450.552 129.3,450 C129.3,449.448 129.7704,449 130.35,449 L132.45,449 L132.45,447 C132.45,446.448 132.9204,446 133.5,446 C134.0796,446 134.55,446.448 134.55,447 L134.55,449 L136.65,449 C137.2296,449 137.7,449.448 137.7,450 M133.5,458 C128.86845,458 125.1,454.411 125.1,450 C125.1,445.589 128.86845,442 133.5,442 C138.13155,442 141.9,445.589 141.9,450 C141.9,454.411 138.13155,458 133.5,458 M133.5,440 C127.70085,440 123,444.477 123,450 C123,455.523 127.70085,460 133.5,460 C139.29915,460 144,455.523 144,450 C144,444.477 139.29915,440 133.5,440"
                                id="plus_circle-[#1427]"
                            ></path>
                        </g>
                    </g>
                </g>
            </svg>
        </>
    );
}
