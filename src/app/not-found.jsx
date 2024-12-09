import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>
        The page you tried to access could not be found. Please return to the
        Home page
      </p>
      <Link href={"/"}>
        Home <HomeIcon />{" "}
      </Link>
    </div>
  );
}
