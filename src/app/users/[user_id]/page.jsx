import { Vote } from "@/components/Vote";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function UserProfile({ params }) {
  const profileId = (await params).user_id;

  //get user data
  const { rows: userRes } = await db.query(
    `SELECT * FROM users WHERE users.id = ${profileId}`
  );

  const user = userRes[0];

  console.log("UserData:", user);

  //get all posts from user
  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.body, TO_CHAR(posts.created_at, 'YYYY-MM-DD') AS date, users.name, COALESCE(SUM(votes.vote), 0) AS vote_total
     FROM posts
     JOIN users ON posts.user_id = users.id
     LEFT JOIN votes ON votes.post_id = posts.id
     WHERE posts.user_id = $1
     GROUP BY posts.id, users.name
     ORDER BY vote_total DESC`,
    [profileId]
  );

  return (
    <div>
      <Image
        src={`${user.image}`}
        width={150}
        height={150}
        alt="user profile picture"
        className="rounded-full"
      />
      <h3>Username: {user.name}</h3>
      <br></br>

      <h2 className="text-pink-500">Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">posted by {post.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
