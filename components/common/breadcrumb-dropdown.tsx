import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {ChevronDownIcon, Link, LogOut} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function BreadcrumbDropdown() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                            Settings
                            <ChevronDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Chage Account</DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogOut />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}