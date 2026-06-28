import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <form className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Admin User" />
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="admin@novaflow.com" readOnly />
          <p className="text-[0.8rem] text-muted-foreground">
            You can change your email in the Account settings.
          </p>
        </div>
        <Button type="button">Update profile</Button>
      </form>
    </div>
  )
}
