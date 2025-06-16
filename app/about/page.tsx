import prisma from "@/utils/db";

async function AboutPage() {
  const task = await prisma.testProfile.create({
    data: {
      name: "random name",
    },
  });

  const users = await prisma.testProfile.findMany();

  return (
    <div>
      {users.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </div>
  );
}
export default AboutPage;
