import { signIn } from "~/auth"

export function GitHub() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button type="submit">Sign in with GitHub</button>
        </form>
    )
} 