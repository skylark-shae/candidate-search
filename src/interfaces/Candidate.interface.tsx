// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    readonly img: string | null,
    readonly login: string,
    readonly email: string | null,
    readonly location: string | null,
    readonly company: string | null,
    readonly bio?: string | null,
}

export default Candidate 