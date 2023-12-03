import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./Types";
export const getCreateMeetingBreadCrumbs=(
    navigate:NavigateFunction
    ):Array<BreadCrumbsType>=>[
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
    },
];
export const getOneonOneMeetingBreadCrumbs=( navigate:NavigateFunction
    ):Array<BreadCrumbsType>=>[
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
        href:"#",
        onClick:()=>{
            navigate("/create");
        },
    },
    {
        text:"Create One on One Meeting",
    }
];


export const getVideoConferenceBreadCrumbs=( navigate:NavigateFunction
    ):Array<BreadCrumbsType>=>[
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
        href:"#",
        onClick:()=>{
            navigate("/create");
        },
    },
    {
        text:"Create Video Conference",
    }
];

export const getMyMeetingsBreadCrumbs=( navigate:NavigateFunction
    ):Array<BreadCrumbsType>=>[
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{
            navigate("/");
        },
    },
    
    {
        text:"My Meetings",
    }
];

export const getMeetingsBreadCrumbs=( navigate:NavigateFunction
    ):Array<BreadCrumbsType>=>[
    {
        text:"Dashboard",
        href:"#",
        onClick:()=>{
            navigate("/");
        },
    },
    
    {
        text:"Meetings",
    }
];