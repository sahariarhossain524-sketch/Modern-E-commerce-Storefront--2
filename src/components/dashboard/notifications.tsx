import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  return (
    <DropdownMenu>
      {/* @ts-ignore */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500">
            3
          </Badge>
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      {/* @ts-ignore */}
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">
              You have 3 unread messages.
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-sm">New Order #12345</span>
              <span className="text-xs text-muted-foreground">A new order was placed by john@example.com</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-sm">System Update</span>
              <span className="text-xs text-muted-foreground">Server maintenance scheduled for 2 AM.</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-sm text-green-600">Payment Successful</span>
              <span className="text-xs text-muted-foreground">Payment for Order #12344 received.</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-center text-primary justify-center cursor-pointer">
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
