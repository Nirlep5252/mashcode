export default function AuthError(props: { message?: string }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0">
      {props.message || "You are not authorized to view this page."}
    </div>
  );
}
