export interface IMenuItems {
    label: string;
    route: string;
    icon: string;
    children?: [
        {
            label: string;
            route: string;
            icon: string;
        }
    ]
}