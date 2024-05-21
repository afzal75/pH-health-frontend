import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import Link from "next/link";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type IProps = {
    item: DrawerItem;
}

const SidebarItems = ({ item }: IProps) => {
    const linkPaths = `/dashboard/${item.path}`
    const pathName = usePathname()
    console.log(pathName)
    return (
        <Link href={linkPaths} >
            <ListItem disablePadding
                sx={{
                    ...pathName === linkPaths ?
                        {
                            borderRight: "3px solid #1586FD", "& svg":
                                { color: "#1586FD" }
                        } : {},
                    mb: 1
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        {
                            item.icon && <item.icon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default SidebarItems;