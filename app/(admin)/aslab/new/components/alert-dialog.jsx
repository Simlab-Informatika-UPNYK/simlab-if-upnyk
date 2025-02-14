import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DialogAlert = ({ open, setOpen, message }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-2xl text-center">{message?.title ?? "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-md">
                        {message?.description ?? "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mx-auto">
                    <AlertDialogCancel onClick={message?.footer?.cancel?.onClick}>
                        {message?.footer?.cancel?.label ?? "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={message?.footer?.action?.onClick}>
                        {message?.footer?.action?.label ?? "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogAlert