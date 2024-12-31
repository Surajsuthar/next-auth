import { auth } from "@/auth";
import { signOut } from "@/auth";

const  Settings = async () => {
    const session = await auth()
    return (
        <div>
        {JSON.stringify(session)}
        <form action={async () => {
            "use server";
            await signOut()
        }}>
            <button type="submit" >
            Sing out
            </button>
        </form>
        </div>
    )
}

export default Settings;