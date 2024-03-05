export default function AuthError(props: {
    message?: string;
}) {
    return <>{props.message || 'You are not authorized to view this page.'}</>
}
