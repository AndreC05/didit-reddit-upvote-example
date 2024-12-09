import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {
  const { rows: users } = await db.query(`SELECT * FROM users`);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Image src={"user.image"} alt="user profile picture" />
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
