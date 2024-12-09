import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function UsersPage() {
  const { rows: users } = await db.query(`SELECT * FROM users`);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <Image
                src={`${user.image}`}
                width={25}
                height={25}
                alt="user profile picture"
                className="rounded-full"
              />{" "}
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
